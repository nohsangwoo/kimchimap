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

// 각 지역별 색상 매핑
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
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full">
      <div className="w-full md:w-1/2 h-[500px]">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 4500,
            center: [128, 36] // 한국 중심점 좌표 조정
          }}
        >
          <ZoomableGroup zoom={1}>
            <Geographies geography={geoUrl}>
              {({ geographies }: { geographies: GeoData[] }) =>
                geographies.map(geo => {
                  const regionName = geo.properties.name;
                  const isSelected = selectedRegion === regionName;
                  
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={regionColors[regionName] || "#DDD"}
                      stroke="#FFF"
                      strokeWidth={0.5}
                      style={{
                        default: {
                          fill: regionColors[regionName] || "#DDD",
                          outline: "none"
                        },
                        hover: {
                          fill: regionColors[regionName] 
                            ? `${regionColors[regionName]}CC` // 색상에 투명도 추가
                            : "#DDC",
                          outline: "none",
                          cursor: "pointer"
                        },
                        pressed: {
                          fill: "#AAA",
                          outline: "none"
                        }
                      }}
                      onMouseEnter={() => {
                        setSelectedRegion(regionName);
                      }}
                      onMouseLeave={() => {
                        setSelectedRegion(null);
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>

      <div className="w-full md:w-1/2 p-4 bg-white rounded-lg shadow-sm overflow-y-auto h-[500px]">
        {selectedRegion ? (
          <>
            <h2 className="text-xl font-medium mb-4">{selectedRegion} 김치 생산자</h2>
            {sellers[selectedRegion] && sellers[selectedRegion].length > 0 ? (
              <ul className="space-y-3">
                {sellers[selectedRegion].map((seller) => (
                  <li 
                    key={seller.id}
                    onClick={() => onSellerClick(seller.id)}
                    className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer transition-all"
                  >
                    <h3 className="font-medium">{seller.name}</h3>
                    <p className="text-sm text-gray-600">{seller.location}</p>
                    <p className="text-sm">대표 상품: {seller.product}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">해당 지역에 등록된 생산자가 없습니다.</p>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">지도에서 지역을 선택하세요</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KoreaMap; 