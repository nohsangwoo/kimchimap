'use client';

import { useState } from 'react';
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

export default function Home() {
  const [selectedSellerId, setSelectedSellerId] = useState<string | null>(null);
  
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
    <main className="min-h-screen p-4 md:p-8 bg-gray-50">
      <header className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">김치 지도</h1>
        <p className="text-gray-600 text-center">지역별 김치 생산자와 판매자를 찾아보세요</p>
      </header>
      
      <div className="max-w-6xl mx-auto">
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
