'use client';

import { useState, useEffect } from 'react';
import KoreaMap from './components/KoreaMap';
import SellerProfile from './components/SellerProfile';

// 판매자 데이터 타입 정의
interface Seller {
  id: string;
  name: string;
  location: string;
  product: string;
  description: string;
  contactInfo: string;
  images: string[];
}

// 가짜 판매자 데이터
const mockSellers: Record<string, Seller[]> = {
  "서울특별시": [
    {
      id: "seoul-1",
      name: "서울김치명가",
      location: "서울시 종로구",
      product: "깍두기, 배추김치",
      description: "3대째 이어오는 전통 김치 제조업체입니다. 종로에서 40년 넘게 운영해온 김치 전문점으로, 모든 재료를 국내산만 사용합니다.",
      contactInfo: "02-123-4567 / seoul-kimchi@example.com",
      images: [
        "https://images.unsplash.com/photo-1583669314533-19667111bc5e?q=80&w=1974&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1583669314533-19667111bc5e?q=80&w=1974&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1581016456877-7e7040f6c9ad?q=80&w=2070&auto=format&fit=crop"
      ]
    },
    {
      id: "seoul-2",
      name: "명동김치공방",
      location: "서울시 중구 명동",
      product: "총각김치, 열무김치",
      description: "현대적인 레시피로 재해석한 김치를 만듭니다. 젊은 세대들에게도 사랑받는 김치 맛을 연구합니다.",
      contactInfo: "02-987-6543 / myeongdong-kimchi@example.com",
      images: [
        "https://images.unsplash.com/photo-1631156332165-62ed753ba50c?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?q=80&w=1974&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1564834166127-4de30a08dfb9?q=80&w=1974&auto=format&fit=crop"
      ]
    },
    {
      id: "seoul-3",
      name: "강남 프리미엄 김치",
      location: "서울시 강남구",
      product: "백김치, 전복김치",
      description: "고급 식자재만을 사용한 프리미엄 김치를 생산합니다. 맞춤형 김치 제작 서비스도 제공합니다.",
      contactInfo: "02-555-7890 / gangnam-kimchi@example.com",
      images: [
        "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?q=80&w=2074&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1583187553636-28d764be942a?q=80&w=1974&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1590301157622-795d847044c7?q=80&w=2070&auto=format&fit=crop"
      ]
    },
    {
      id: "seoul-4",
      name: "신촌 대학가 김치",
      location: "서울시 서대문구",
      product: "오이소박이, 파김치",
      description: "젊은 층의 입맛에 맞춘 현대적인 김치를 생산합니다. 덜 맵고 상큼한 맛이 특징입니다.",
      contactInfo: "02-324-5678 / sinchon-kimchi@example.com",
      images: [
        "https://images.unsplash.com/photo-1583187554387-fbcb9c5a75c1?q=80&w=1974&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1590301156710-67454e4d4b92?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1564834166640-d12e4678c73b?q=80&w=1974&auto=format&fit=crop"
      ]
    },
    {
      id: "seoul-5",
      name: "홍대 푸드 김치",
      location: "서울시 마포구",
      product: "비트김치, 퓨전김치",
      description: "전통과 현대의 퓨전 레시피로 독특한 김치를 생산합니다. 인스타그램에서 인기있는 비주얼 김치 전문점입니다.",
      contactInfo: "02-312-9876 / hongdae-kimchi@example.com",
      images: [
        "https://images.unsplash.com/photo-1583192311073-f20f2a869ec7?q=80&w=1974&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1583192318265-e0b4c9c46d60?q=80&w=1974&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1583192395804-6fdb089b1352?q=80&w=1974&auto=format&fit=crop"
      ]
    }
  ],
  "경기도": [
    {
      id: "gyeonggi-1",
      name: "수원 맛김치",
      location: "경기도 수원시",
      product: "포기김치, 갓김치",
      description: "경기도 수원에서 30년 전통을 자랑하는 김치 제조업체입니다. 지역 농산물을 활용한 신선한 김치를 제공합니다.",
      contactInfo: "031-456-7890 / suwon-kimchi@example.com",
      images: [
        "https://images.unsplash.com/photo-1583187554056-c6e727bdbbbe?q=80&w=1974&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1638957773782-f9626200b8?q=80&w=1974&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1580651315530-69c8e0026377?q=80&w=2070&auto=format&fit=crop"
      ]
    },
    {
      id: "gyeonggi-2",
      name: "분당 친환경 김치",
      location: "경기도 성남시 분당구",
      product: "유기농 배추김치, 갓김치",
      description: "유기농 재료만을 사용한 건강한 김치를 생산합니다. 무항생제, 무농약 채소로 만듭니다.",
      contactInfo: "031-701-2345 / bundang-kimchi@example.com",
      images: [
        "https://images.unsplash.com/photo-1583187553841-0b1a33f22b0a?q=80&w=1974&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1583187554704-07fe7970d66e?q=80&w=1974&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1590301157484-93589bdb5064?q=80&w=2070&auto=format&fit=crop"
      ]
    },
    {
      id: "gyeonggi-3",
      name: "파주 DMZ 농장 김치",
      location: "경기도 파주시",
      product: "민통선 배추김치, DMZ 무김치",
      description: "민통선 근처의 청정지역에서 재배된 채소로 만든 김치입니다. 북한 접경지역의 깨끗한 환경에서 생산됩니다.",
      contactInfo: "031-945-6789 / paju-kimchi@example.com",
      images: [
        "https://images.unsplash.com/photo-1583187554154-64fe5ca92bc7?q=80&w=1974&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1583187553239-9a1d049eada3?q=80&w=1974&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1583187553723-4f5f7c3137b1?q=80&w=1974&auto=format&fit=crop"
      ]
    },
    {
      id: "gyeonggi-4",
      name: "김포 가정식 김치",
      location: "경기도 김포시",
      product: "어머니표 배추김치, 총각김치",
      description: "가정식 레시피 그대로 만든 정성이 담긴 김치입니다. 소규모 생산으로 품질을 엄격하게 관리합니다.",
      contactInfo: "031-984-1234 / gimpo-kimchi@example.com",
      images: [
        "https://images.unsplash.com/photo-1583187553190-66503ba9ad63?q=80&w=1974&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1583187553399-a1eace914819?q=80&w=1974&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1583187554665-91cfc01ac4a7?q=80&w=1974&auto=format&fit=crop"
      ]
    },
    {
      id: "gyeonggi-5",
      name: "용인 농협 김치",
      location: "경기도 용인시",
      product: "농협 공동 김치, 계절별 특산김치",
      description: "지역 농협에서 공동 생산하는 김치로, 지역 농민들의 농산물로 만듭니다. 계절별 특산 김치를 판매합니다.",
      contactInfo: "031-332-4567 / yongin-kimchi@example.com",
      images: [
        "https://images.unsplash.com/photo-1583187553078-32cc5ef2aa73?q=80&w=1974&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1583187554765-5110dbccc42f?q=80&w=1974&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1583187554040-addb9a8a3d74?q=80&w=1974&auto=format&fit=crop"
      ]
    }
  ],
  "부산광역시": [
    {
      id: "busan-1",
      name: "해운대 어머니 김치",
      location: "부산시 해운대구",
      product: "물김치, 동치미",
      description: "부산의 바다 내음을 담은 김치를 생산합니다. 해산물을 활용한 특별한 레시피로 유명합니다.",
      contactInfo: "051-789-0123 / haeundae-kimchi@example.com",
      images: [
        "https://images.unsplash.com/photo-1583187553572-6c023a4818e8?q=80&w=1974&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1503764654157-72d979d9af2f?q=80&w=2074&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1580651463725-cee1acffaa2a?q=80&w=2017&auto=format&fit=crop"
      ]
    },
    {
      id: "busan-2",
      name: "기장 해풍 김치",
      location: "부산시 기장군",
      product: "해풍 배추김치, 멸치김치",
      description: "바닷가에서 자란 채소로 만든 김치입니다. 해풍을 맞고 자란 채소로 특별한 향을 가집니다.",
      contactInfo: "051-721-3456 / gijang-kimchi@example.com",
      images: [
        "https://images.unsplash.com/photo-1583187554887-a2a8503c3fb2?q=80&w=1974&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1583187553872-0effa7a78cb5?q=80&w=1974&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1583187554432-7b3d6c2833e7?q=80&w=1974&auto=format&fit=crop"
      ]
    }
  ],
  "전라남도": [
    {
      id: "jeonnam-1",
      name: "순천 명품 김치",
      location: "전라남도 순천시",
      product: "갓김치, 무말랭이김치",
      description: "전라도 특유의 맛깔스러운 양념으로 만든 김치입니다. 순천의 기름진 땅에서 자란 신선한 채소만을 사용합니다.",
      contactInfo: "061-345-6789 / suncheon-kimchi@example.com",
      images: [
        "https://images.unsplash.com/photo-1583669095223-2f7aa4a41449?q=80&w=1974&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1563565375-943015199386?q=80&w=1974&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1599232288126-7dbd2127db14?q=80&w=1973&auto=format&fit=crop"
      ]
    }
  ],
  "강원특별자치도": [
    {
      id: "gangwon-1",
      name: "강원 산채 김치",
      location: "강원도 평창군",
      product: "고랭지 배추김치, 곤드레나물김치",
      description: "강원도의 청정 자연에서 자란 산나물과 채소로 만든 특별한 김치입니다. 평창의 맑은 공기와 물로 발효시킵니다.",
      contactInfo: "033-678-9012 / gangwon-kimchi@example.com",
      images: [
        "https://images.unsplash.com/photo-1583187554080-5d31a73d0510?q=80&w=1974&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1576020997414-8ac4f0ea984c?q=80&w=1974&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=2070&auto=format&fit=crop"
      ]
    }
  ]
};

// 다른 지역 데이터도 추가
const otherRegions = {
  "부산광역시": [
    // ... 기존 데이터 ...
    {
      id: "busan-1",
      name: "해운대 어머니 김치",
      location: "부산시 해운대구",
      product: "물김치, 동치미",
      description: "부산의 바다 내음을 담은 김치를 생산합니다. 해산물을 활용한 특별한 레시피로 유명합니다.",
      contactInfo: "051-789-0123 / haeundae-kimchi@example.com",
      images: [
        "https://images.unsplash.com/photo-1583187553572-6c023a4818e8?q=80&w=1974&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1503764654157-72d979d9af2f?q=80&w=2074&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1580651463725-cee1acffaa2a?q=80&w=2017&auto=format&fit=crop"
      ]
    },
    {
      id: "busan-2",
      name: "기장 해풍 김치",
      location: "부산시 기장군",
      product: "해풍 배추김치, 멸치김치",
      description: "바닷가에서 자란 채소로 만든 김치입니다. 해풍을 맞고 자란 채소로 특별한 향을 가집니다.",
      contactInfo: "051-721-3456 / gijang-kimchi@example.com",
      images: [
        "https://images.unsplash.com/photo-1583187554887-a2a8503c3fb2?q=80&w=1974&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1583187553872-0effa7a78cb5?q=80&w=1974&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1583187554432-7b3d6c2833e7?q=80&w=1974&auto=format&fit=crop"
      ]
    }
  ],
  "전라남도": [
    // ... 기존 데이터 ...
    {
      id: "jeonnam-1",
      name: "순천 명품 김치",
      location: "전라남도 순천시",
      product: "갓김치, 무말랭이김치",
      description: "전라도 특유의 맛깔스러운 양념으로 만든 김치입니다. 순천의 기름진 땅에서 자란 신선한 채소만을 사용합니다.",
      contactInfo: "061-345-6789 / suncheon-kimchi@example.com",
      images: [
        "https://images.unsplash.com/photo-1583669095223-2f7aa4a41449?q=80&w=1974&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1563565375-943015199386?q=80&w=1974&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1599232288126-7dbd2127db14?q=80&w=1973&auto=format&fit=crop"
      ]
    }
  ],
  "강원특별자치도": [
    // ... 기존 데이터 ...
    {
      id: "gangwon-1",
      name: "강원 산채 김치",
      location: "강원도 평창군",
      product: "고랭지 배추김치, 곤드레나물김치",
      description: "강원도의 청정 자연에서 자란 산나물과 채소로 만든 특별한 김치입니다. 평창의 맑은 공기와 물로 발효시킵니다.",
      contactInfo: "033-678-9012 / gangwon-kimchi@example.com",
      images: [
        "https://images.unsplash.com/photo-1583187554080-5d31a73d0510?q=80&w=1974&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1576020997414-8ac4f0ea984c?q=80&w=1974&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=2070&auto=format&fit=crop"
      ]
    }
  ]
};

// 나머지 지역 데이터를 추가합니다
Object.keys(otherRegions).forEach(region => {
  mockSellers[region] = otherRegions[region];
});

export default function Home() {
  const [selectedSellerId, setSelectedSellerId] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // 다크모드 토글 및 저장
  useEffect(() => {
    // 로컬 스토리지에서 다크모드 설정 불러오기
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
    
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);
  
  // 다크모드 토글 함수
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
    
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  // 선택된 판매자 정보 찾기
  const getSelectedSeller = (): Seller | null => {
    if (!selectedSellerId) return null;
    
    for (const region in mockSellers) {
      const seller = mockSellers[region].find(s => s.id === selectedSellerId);
      if (seller) return seller;
    }
    
    return null;
  };
  
  const selectedSeller = getSelectedSeller();
  
  return (
    <main className="min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <header className="max-w-7xl mx-auto mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white">김치 지도</h1>
          <p className="text-gray-600 dark:text-gray-300">지역별 김치 생산자와 판매자를 찾아보세요</p>
        </div>
        
        <button 
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          aria-label="다크 모드 토글"
        >
          {isDarkMode ? (
            // 해 아이콘 (라이트 모드로 전환)
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg>
          ) : (
            // 달 아이콘 (다크 모드로 전환)
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>
          )}
        </button>
      </header>
      
      <div className="max-w-7xl mx-auto">
        {selectedSeller ? (
          <SellerProfile 
            seller={selectedSeller}
            onBack={() => setSelectedSellerId(null)}
          />
        ) : (
          <KoreaMap 
            sellers={mockSellers}
            onSellerClick={(sellerId) => setSelectedSellerId(sellerId)}
          />
        )}
      </div>
    </main>
  );
}
