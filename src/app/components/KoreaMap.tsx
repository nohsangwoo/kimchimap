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

// 각 지역별 색상 매핑 (다크모드와 라이트모드용 색상)
const regionColors: Record<string, { light: string; dark: string }> = {
  "서울특별시": { light: "#FFD1DC", dark: "#8B4153" }, // 연한 핑크 / 진한 자주색
  "부산광역시": { light: "#FFECB3", dark: "#A67C00" }, // 연한 황색 / 황토색
  "대구광역시": { light: "#E1F5FE", dark: "#01579B" }, // 연한 하늘색 / 진한 파랑
  "인천광역시": { light: "#DCEDC8", dark: "#558B2F" }, // 연한 연두색 / 진한 초록
  "광주광역시": { light: "#F8BBD0", dark: "#880E4F" }, // 연한 분홍색 / 진한 자주
  "대전광역시": { light: "#D1C4E9", dark: "#4527A0" }, // 연한 보라색 / 진한 보라
  "울산광역시": { light: "#B3E5FC", dark: "#0277BD" }, // 연한 파랑색 / 진한 파랑
  "세종특별자치시": { light: "#CFD8DC", dark: "#455A64" }, // 연한 회색 / 진한 회색
  "경기도": { light: "#C8E6C9", dark: "#2E7D32" }, // 연한 초록색 / 진한 초록
  "강원특별자치도": { light: "#B2DFDB", dark: "#00695C" }, // 연한 청록색 / 진한 청록
  "충청북도": { light: "#BBDEFB", dark: "#1565C0" }, // 연한 남색 / 진한 남색
  "충청남도": { light: "#D7CCC8", dark: "#4E342E" }, // 연한 갈색 / 진한 갈색
  "전라북도": { light: "#FFF9C4", dark: "#F9A825" }, // 연한 노란색 / 진한 노랑
  "전라남도": { light: "#C5CAE9", dark: "#283593" }, // 연한 인디고색 / 진한 인디고
  "경상북도": { light: "#FFE0B2", dark: "#E65100" }, // 연한 주황색 / 진한 주황
  "경상남도": { light: "#F0F4C3", dark: "#9E9D24" }, // 연한 라임색 / 진한 라임
  "제주특별자치도": { light: "#B39DDB", dark: "#4527A0" } // 연한 자주색 / 진한 자주
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

  // 다크모드 체크
  const isDarkMode = typeof window !== 'undefined' && document.documentElement.classList.contains('dark');

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full">
      <div className="w-full lg:w-3/4 h-[600px] rounded-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 z-0"></div>
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

                    // 선택된 색상(다크모드/라이트모드 대응)
                    const colorSet = regionColors[regionName] || { light: "#DDD", dark: "#555" };
                    const fillColor = isDarkMode ? colorSet.dark : colorSet.light;
                    
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={fillColor}
                        stroke={isDarkMode ? "#333" : "#FFF"}
                        strokeWidth={isSelected ? 2 : 0.5}
                        style={{
                          default: {
                            fill: fillColor,
                            outline: "none",
                            stroke: isSelected ? (isDarkMode ? "#FFF" : "#333") : (isDarkMode ? "#333" : "#FFF"),
                            strokeWidth: isSelected ? 2 : 0.5,
                            filter: isSelected ? "drop-shadow(0 0 2px rgba(0,0,0,0.3))" : "none"
                          },
                          hover: {
                            fill: isDarkMode 
                              ? `${colorSet.dark}BB` // 다크모드일 때 hover 색상
                              : `${colorSet.light}CC`, // 라이트모드일 때 hover 색상
                            outline: "none",
                            cursor: "pointer",
                            filter: "drop-shadow(0 0 3px rgba(0,0,0,0.2))"
                          },
                          pressed: {
                            fill: isDarkMode ? "#777" : "#AAA",
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
        <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-trendy text-sm text-gray-600 dark:text-gray-300 max-w-sm opacity-80 hover:opacity-100 transition-opacity">
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