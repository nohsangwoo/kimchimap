import React, { useState } from 'react';
import { 
  ComposableMap, 
  Geographies, 
  Geography,
  ZoomableGroup,
  GeographyProps
} from 'react-simple-maps';
import { geoCentroid } from 'd3-geo';

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
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [isListVisible, setIsListVisible] = useState(false);

  // 현재 표시할 지역 (호버 상태가 우선, 없으면 선택된 지역)
  const displayRegion = hoveredRegion || selectedRegion;

  // 선택된 지역이 변경될 때 목록 애니메이션 활성화
  const handleRegionClick = (regionName: string) => {
    setSelectedRegion(regionName);
    setIsListVisible(false);
    
    // 애니메이션 효과를 위해 약간의 지연 후 목록 표시
    setTimeout(() => {
      setIsListVisible(true);
    }, 50);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full">
      <div className="w-full lg:w-3/4 h-[600px] rounded-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 z-0"></div>
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
                        stroke={"#FFF"}
                        strokeWidth={isSelected ? 2 : 0.5}
                        style={{
                          default: {
                            fill: fillColor,
                            outline: "none",
                            stroke: isSelected ? "#333" : "#FFF",
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
                            fill: "#AAA",
                            outline: "none"
                          }
                        }}
                        onMouseEnter={() => {
                          setHoveredRegion(regionName);
                        }}
                        onMouseLeave={() => {
                          setHoveredRegion(null);
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

        {/* 지도 설명 오버레이 */}
        <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-trendy text-sm text-gray-600 max-w-sm opacity-80 hover:opacity-100 transition-opacity">
          <p className="font-medium">지역별 김치 생산자 맵</p>
          <p className="text-xs">지역을 클릭하여 해당 지역의 김치 생산자를 확인하세요</p>
        </div>
      </div>

      <div className="w-full lg:w-1/4 h-[600px] relative">
        <div 
          className={`absolute inset-0 p-5 bg-white dark:bg-gray-800 rounded-xl shadow-trendy overflow-y-auto transition-all duration-300 transform
            ${isListVisible && selectedRegion ? 'translate-y-0 opacity-100 animate-slide-in' : 'translate-y-8 opacity-0'}
            ${!selectedRegion ? 'pointer-events-none' : 'pointer-events-auto'}
          `}
        >
          {displayRegion ? (
            <>
              <h2 className="text-xl font-heading font-bold mb-4 text-gray-900 dark:text-white border-b pb-2 border-gray-100 dark:border-gray-700">
                {displayRegion} <span className="text-kimchi">김치 생산자</span>
              </h2>
              {sellers[displayRegion] && sellers[displayRegion].length > 0 ? (
                <ul className="space-y-3">
                  {sellers[displayRegion].map((seller) => (
                    <li 
                      key={`${displayRegion}-${seller.id}`}
                      onClick={() => onSellerClick(seller.id)}
                      className="p-4 border border-gray-100 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-all hover:shadow-sm"
                    >
                      <h3 className="font-medium text-gray-900 dark:text-white mb-1">{seller.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{seller.location}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-200">
                        <span className="inline-block px-2 py-1 bg-kimchi-light dark:bg-gray-700 text-kimchi dark:text-gray-300 text-xs rounded-full font-medium">
                          {seller.product}
                        </span>
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-400 dark:text-gray-500 mb-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                  </svg>
                  <p className="text-gray-500 dark:text-gray-400">해당 지역에 등록된 생산자가 없습니다.</p>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-gray-300 dark:text-gray-600 mb-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
              </svg>
              <p className="text-gray-500 dark:text-gray-400">지도에서 지역을 선택하세요</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KoreaMap; 