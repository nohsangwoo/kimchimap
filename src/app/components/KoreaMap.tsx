import React, { useState, useEffect, useRef } from 'react';
import { 
  ComposableMap, 
  Geographies, 
  Geography,
  ZoomableGroup,
  GeographyProps
} from 'react-simple-maps';
import { geoCentroid } from 'd3-geo';
import { useTheme } from 'next-themes';

// 한국 지도 데이터
const geoUrl = 'https://raw.githubusercontent.com/southkorea/southkorea-maps/master/kostat/2018/json/skorea-provinces-2018-topo-simple.json';

// 각 지역별 색상 매핑 (밝은 색상만 사용)
const regionColors: Record<string, string> = {
  "서울특별시": "#FFD1DC", // 연한 핑크
  "부산광역시": "#FFECB3", // 연한 황색
  "대구광역시": "#E1F5FE", // 연한 하늘색
  "인천광역시": "#DCEDC8", // 연한 연두색
  "광주광역시": "#F8BBD0", // 연한 분홍색
  "대전광역시": "#D1C4E9", // 연한 보라색
  "울산광역시": "#B3E5FC", // 연한 파랑색
  "세종특별자치시": "#CFD8DC", // 연한 회색
  "경기도": "#C8E6C9", // 연한 초록색
  "강원특별자치도": "#B2DFDB", // 연한 청록색
  "충청북도": "#BBDEFB", // 연한 남색
  "충청남도": "#D7CCC8", // 연한 갈색
  "전라북도": "#FFF9C4", // 연한 노란색
  "전라남도": "#C5CAE9", // 연한 인디고색
  "경상북도": "#FFE0B2", // 연한 주황색
  "경상남도": "#F0F4C3", // 연한 라임색
  "제주특별자치도": "#B39DDB" // 연한 자주색
};

// 판매자 예시 데이터
interface Seller {
  id: string;
  name: string;
  location: string;
  product: string;
  description: string;
  contactInfo: string;
  images: string[];
}

interface KoreaMapProps {
  sellers: Record<string, Seller[]>;
  onSellerClick: (sellerId: string) => void;
}

// 지리 데이터 타입 정의
interface GeoData {
  rsmKey: string;
  properties: {
    name: string;
    [key: string]: any;
  };
  [key: string]: any;
}

const KoreaMap: React.FC<KoreaMapProps> = ({ sellers, onSellerClick }) => {
  const { theme, resolvedTheme } = useTheme();
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [isListVisible, setIsListVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [fixedPosition, setFixedPosition] = useState({ x: 0, y: 0 });
  const [showPopup, setShowPopup] = useState(false);
  const [isPopupFixed, setIsPopupFixed] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  // 컴포넌트가 마운트된 후에만 테마 상태를 사용
  useEffect(() => {
    setMounted(true);
  }, []);

  // 현재 표시할 지역 (호버 상태가 우선, 없으면 선택된 지역)
  const displayRegion = hoveredRegion || selectedRegion;

  // 선택된 지역이 변경될 때 목록 애니메이션 활성화
  const handleRegionClick = (regionName: string) => {
    // 기존 팝업이 고정되어 있고 같은 지역을 클릭한 경우 팝업 고정 해제
    if (isPopupFixed && selectedRegion === regionName) {
      setIsPopupFixed(false);
    } else {
      // 다른 지역을 클릭한 경우 새 위치에 팝업 고정
      setSelectedRegion(regionName);
      setFixedPosition({...hoverPosition});
      setIsPopupFixed(true);
      setIsListVisible(false);
      
      // 애니메이션 효과를 위해 약간의 지연 후 목록 표시
      setTimeout(() => {
        setIsListVisible(true);
      }, 50);
    }
  };

  // 팝업창 닫기 버튼 클릭 핸들러
  const handleClosePopup = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPopupFixed(false);
  };

  // 마우스 위치 추적 핸들러
  const handleMouseMove = (e: React.MouseEvent) => {
    if (mapRef.current) {
      const rect = mapRef.current.getBoundingClientRect();
      setHoverPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  // 테마에 따른 스타일 정의
  const mapBgStyle = {
    backgroundColor: resolvedTheme === 'dark' ? '#1a202c' : '#ffffff',
    backgroundImage: resolvedTheme === 'dark' 
      ? 'linear-gradient(to bottom right, #1a202c, #2d3748)' 
      : 'linear-gradient(to bottom right, #ffffff, #f7fafc)',
  };

  const mapOverlayStyle = {
    backgroundColor: resolvedTheme === 'dark' ? 'rgba(45, 55, 72, 0.9)' : 'rgba(255, 255, 255, 0.8)',
    color: resolvedTheme === 'dark' ? '#e2e8f0' : '#4a5568',
    boxShadow: resolvedTheme === 'dark' 
      ? '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.36)' 
      : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
  };

  const popupStyle = {
    backgroundColor: resolvedTheme === 'dark' ? 'rgba(45, 55, 72, 0.95)' : 'rgba(255, 255, 255, 0.95)',
    color: resolvedTheme === 'dark' ? '#e2e8f0' : '#4a5568',
    boxShadow: resolvedTheme === 'dark' 
      ? '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.36)' 
      : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    borderColor: resolvedTheme === 'dark' ? '#4a5568' : '#e2e8f0'
  };

  const sidebarStyle = {
    backgroundColor: resolvedTheme === 'dark' ? '#2d3748' : '#ffffff',
    boxShadow: resolvedTheme === 'dark' 
      ? '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)' 
      : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    borderColor: resolvedTheme === 'dark' ? '#4a5568' : '#e2e8f0'
  };

  const titleStyle = {
    color: resolvedTheme === 'dark' ? '#f7fafc' : '#1a202c',
    borderColor: resolvedTheme === 'dark' ? '#4a5568' : '#edf2f7'
  };

  const sellerItemStyle = {
    borderColor: resolvedTheme === 'dark' ? '#4a5568' : '#edf2f7',
    backgroundColor: resolvedTheme === 'dark' ? '#2d3748' : '#ffffff',
    transition: 'all 0.2s ease'
  };

  const sellerItemHoverStyle = {
    backgroundColor: resolvedTheme === 'dark' ? '#3a4559' : '#f7fafc',
  };

  const [hoverStates, setHoverStates] = useState<Record<string, boolean>>({});

  const handleSellerMouseEnter = (sellerId: string) => {
    setHoverStates(prev => ({ ...prev, [sellerId]: true }));
  };

  const handleSellerMouseLeave = (sellerId: string) => {
    setHoverStates(prev => ({ ...prev, [sellerId]: false }));
  };

  const getSellerItemStyle = (sellerId: string) => {
    return {
      ...sellerItemStyle,
      ...(hoverStates[sellerId] ? sellerItemHoverStyle : {})
    };
  };

  if (!mounted) {
    // 렌더링 시 깜빡임 방지를 위한 빈 레이아웃
    return (
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        <div className="w-full lg:w-3/4 h-[600px] rounded-lg relative overflow-hidden"></div>
        <div className="w-full lg:w-1/4 h-[600px] relative"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full">
      <div 
        className="w-full lg:w-3/4 h-[600px] rounded-lg relative overflow-hidden"
        onMouseMove={handleMouseMove}
        ref={mapRef}
      >
        <div className="absolute inset-0 z-0" style={mapBgStyle}></div>
        <div className="relative z-10 w-full h-full">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 5500,
              center: [128, 36] // 한국 중심점 좌표 조정
            }}
            className="w-full h-full"
          >
            <ZoomableGroup zoom={1}>
              <Geographies geography={geoUrl}>
                {({ geographies }: { geographies: GeoData[] }) =>
                  geographies.map(geo => {
                    const regionName = geo.properties.name;
                    const isHovered = hoveredRegion === regionName;
                    const isSelected = selectedRegion === regionName;

                    // 선택된 색상
                    const fillColor = regionColors[regionName] || "#DDD";
                    
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={fillColor}
                        stroke={resolvedTheme === 'dark' ? "#4a5568" : "#FFF"}
                        strokeWidth={isSelected ? 2 : 0.5}
                        style={{
                          default: {
                            fill: fillColor,
                            outline: "none",
                            stroke: isSelected ? (resolvedTheme === 'dark' ? "#f7fafc" : "#333") : (resolvedTheme === 'dark' ? "#4a5568" : "#FFF"),
                            strokeWidth: isSelected ? 2 : 0.5,
                            filter: isSelected ? "drop-shadow(0 0 2px rgba(0,0,0,0.3))" : "none"
                          },
                          hover: {
                            fill: `${fillColor}CC`, // 호버 시 색상
                            outline: "none",
                            cursor: "pointer",
                            filter: "drop-shadow(0 0 3px rgba(0,0,0,0.2))"
                          },
                          pressed: {
                            fill: resolvedTheme === 'dark' ? "#3a4559" : "#AAA",
                            outline: "none"
                          }
                        }}
                        onMouseEnter={() => {
                          setHoveredRegion(regionName);
                          if (!isPopupFixed) {
                            setShowPopup(true);
                          }
                        }}
                        onMouseLeave={() => {
                          setHoveredRegion(null);
                          if (!isPopupFixed) {
                            setShowPopup(false);
                          }
                        }}
                        onClick={() => {
                          handleRegionClick(regionName);
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        </div>

        {/* 호버 시 나타나는 팝업창 */}
        {((showPopup && hoveredRegion) || (isPopupFixed && selectedRegion)) && (
          <div 
            className="absolute z-30 p-3 rounded-lg shadow-lg border min-w-[200px] max-w-[250px]"
            style={{
              ...popupStyle,
              left: isPopupFixed ? fixedPosition.x + 15 : hoverPosition.x + 15,
              top: isPopupFixed ? fixedPosition.y + 10 : hoverPosition.y + 10,
              transform: `translateY(${(isPopupFixed ? fixedPosition.y : hoverPosition.y) > 400 ? '-100%' : '0'})`,
              transition: isPopupFixed ? 'none' : 'opacity 0.2s ease',
              maxHeight: '300px',
              overflow: 'auto'
            }}
          >
            {isPopupFixed && (
              <button 
                onClick={handleClosePopup}
                className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center hover:bg-opacity-80 text-xs"
                style={{
                  backgroundColor: resolvedTheme === 'dark' ? 'rgba(74, 85, 104, 0.3)' : 'rgba(237, 242, 247, 0.7)'
                }}
              >
                ✕
              </button>
            )}
            <h3 className="text-sm font-bold mb-2 border-b pb-1" style={titleStyle}>
              {(isPopupFixed ? selectedRegion : hoveredRegion)} <span className="text-kimchi">김치 생산자</span>
            </h3>
            <ul className="space-y-2">
              {sellers[isPopupFixed ? selectedRegion! : hoveredRegion!] && 
               sellers[isPopupFixed ? selectedRegion! : hoveredRegion!].slice(0, 3).map((seller) => (
                <li 
                  key={`popup-${isPopupFixed ? selectedRegion : hoveredRegion}-${seller.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSellerClick(seller.id);
                  }}
                  className="p-2 rounded-md cursor-pointer text-xs hover:bg-opacity-80"
                  style={{ 
                    backgroundColor: resolvedTheme === 'dark' ? 'rgba(74, 85, 104, 0.3)' : 'rgba(237, 242, 247, 0.7)'
                  }}
                >
                  <p className="font-medium" style={{ color: resolvedTheme === 'dark' ? '#f7fafc' : '#1a202c' }}>
                    {seller.name}
                  </p>
                  <p style={{ color: resolvedTheme === 'dark' ? '#a0aec0' : '#4a5568' }}>
                    {seller.location}
                  </p>
                  <span style={{ 
                    backgroundColor: resolvedTheme === 'dark' ? '#4a5568' : '#FEF3F2',
                    color: resolvedTheme === 'dark' ? '#e2e8f0' : '#E53E3E'
                  }} className="inline-block px-1.5 py-0.5 text-[10px] rounded-full font-medium mt-1">
                    {seller.product}
                  </span>
                </li>
              ))}
              {sellers[isPopupFixed ? selectedRegion! : hoveredRegion!] && 
               sellers[isPopupFixed ? selectedRegion! : hoveredRegion!].length > 3 && (
                <li className="text-xs text-center pt-1">
                  <span style={{ color: resolvedTheme === 'dark' ? '#a0aec0' : '#718096' }}>
                    외 {sellers[isPopupFixed ? selectedRegion! : hoveredRegion!].length - 3}개 더보기...
                  </span>
                </li>
              )}
              {(!sellers[isPopupFixed ? selectedRegion! : hoveredRegion!] || 
                sellers[isPopupFixed ? selectedRegion! : hoveredRegion!].length === 0) && (
                <li className="text-xs text-center py-2">
                  <span style={{ color: resolvedTheme === 'dark' ? '#a0aec0' : '#718096' }}>
                    해당 지역에 등록된 생산자가 없습니다.
                  </span>
                </li>
              )}
            </ul>
          </div>
        )}

        {/* 지도 설명 오버레이 */}
        <div className="absolute bottom-4 left-4 p-3 rounded-lg text-sm max-w-sm opacity-80 hover:opacity-100 transition-opacity" style={mapOverlayStyle}>
          <p className="font-medium">지역별 김치 생산자 맵</p>
          <p className="text-xs">지역을 클릭하여 해당 지역의 김치 생산자를 확인하세요</p>
        </div>
      </div>

      <div className="w-full lg:w-1/4 h-[600px] relative">
        <div 
          style={{
            ...sidebarStyle,
            transform: isListVisible && selectedRegion ? 'translateY(0)' : 'translateY(8px)',
            opacity: isListVisible && selectedRegion ? 1 : 0,
            pointerEvents: selectedRegion ? 'auto' : 'none',
            transition: 'all 0.3s ease'
          }}
          className="absolute inset-0 p-5 rounded-xl overflow-y-auto"
        >
          {displayRegion ? (
            <>
              <h2 className="text-xl font-heading font-bold mb-4 border-b pb-2" style={titleStyle}>
                {displayRegion} <span className="text-kimchi">김치 생산자</span>
              </h2>
              {sellers[displayRegion] && sellers[displayRegion].length > 0 ? (
                <ul className="space-y-3">
                  {sellers[displayRegion].map((seller) => (
                    <li 
                      key={`${displayRegion}-${seller.id}`}
                      onClick={() => onSellerClick(seller.id)}
                      onMouseEnter={() => handleSellerMouseEnter(seller.id)}
                      onMouseLeave={() => handleSellerMouseLeave(seller.id)}
                      className="p-4 rounded-lg cursor-pointer transition-all"
                      style={getSellerItemStyle(seller.id)}
                    >
                      <h3 style={{ color: resolvedTheme === 'dark' ? '#f7fafc' : '#1a202c' }} className="font-medium mb-1">{seller.name}</h3>
                      <p style={{ color: resolvedTheme === 'dark' ? '#a0aec0' : '#4a5568' }} className="text-sm mb-1">{seller.location}</p>
                      <p className="text-sm">
                        <span style={{ 
                          backgroundColor: resolvedTheme === 'dark' ? '#4a5568' : '#FEF3F2',
                          color: resolvedTheme === 'dark' ? '#e2e8f0' : '#E53E3E'
                        }} className="inline-block px-2 py-1 text-xs rounded-full font-medium">
                          {seller.product}
                        </span>
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={resolvedTheme === 'dark' ? '#a0aec0' : '#718096'} className="w-8 h-8 mb-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                  </svg>
                  <p style={{ color: resolvedTheme === 'dark' ? '#a0aec0' : '#718096' }}>해당 지역에 등록된 생산자가 없습니다.</p>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={resolvedTheme === 'dark' ? '#4a5568' : '#cbd5e0'} className="w-10 h-10 mb-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
              </svg>
              <p style={{ color: resolvedTheme === 'dark' ? '#a0aec0' : '#718096' }}>지도에서 지역을 선택하세요</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KoreaMap; 