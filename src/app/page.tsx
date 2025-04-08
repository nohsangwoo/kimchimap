'use client';

import { useState, useEffect } from 'react';
import KoreaMap from './components/KoreaMap';
import SellerProfile from './components/SellerProfile';
import ThemeToggle from './components/ThemeToggle';
import { Seller } from './libs/types';
import { additionalRegions, mockSellers, otherRegions } from './libs/mockData';
import { useTheme } from 'next-themes';


// 함수를 만들어 모든 판매자의 이미지를 placeholder로 대체
const replaceWithPlaceholder = (sellerData: Record<string, Seller[]>): Record<string, Seller[]> => {
  const result: Record<string, Seller[]> = {};

  for (const [region, sellers] of Object.entries(sellerData)) {
    result[region] = sellers.map(seller => ({
      ...seller,
      images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'] // 모든 이미지를 placeholder로 대체
    }));
  }

  return result;
};

// 모든 이미지를 placeholder로 대체
const additionalRegionsWithPlaceholder = replaceWithPlaceholder(additionalRegions);
const mockSellersWithPlaceholder = replaceWithPlaceholder(mockSellers);
const otherRegionsWithPlaceholder = replaceWithPlaceholder(otherRegions);

// 데이터 병합 로직 수정
Object.entries(otherRegionsWithPlaceholder).forEach(([region, sellers]) => {
  if (!mockSellersWithPlaceholder[region]) {
    mockSellersWithPlaceholder[region] = [];
  }
  mockSellersWithPlaceholder[region] = [...mockSellersWithPlaceholder[region], ...sellers];
});

// 추가 지역 데이터 병합
Object.entries(additionalRegionsWithPlaceholder).forEach(([region, sellers]) => {
  if (!mockSellersWithPlaceholder[region]) {
    mockSellersWithPlaceholder[region] = [];
  }
  mockSellersWithPlaceholder[region] = [...mockSellersWithPlaceholder[region], ...sellers];
});

export default function Home() {

  const [selectedSellerId, setSelectedSellerId] = useState<string | null>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 컴포넌트가 마운트된 후에만 테마 상태를 사용
  useEffect(() => {
    setMounted(true);
  }, []);

  console.log("theme in main", resolvedTheme);

  // 선택된 판매자 정보 찾기
  const getSelectedSeller = (): Seller | null => {
    if (!selectedSellerId) return null;

    for (const region in mockSellersWithPlaceholder) {
      const seller = mockSellersWithPlaceholder[region].find(s => s.id === selectedSellerId);
      if (seller) return seller;
    }

    return null;
  };

  const selectedSeller = getSelectedSeller();
  
  // 테마에 따른 스타일 적용
  const mainStyle = {
    backgroundColor: resolvedTheme === 'dark' ? '#1a202c' : '#fcfcfd',
    color: resolvedTheme === 'dark' ? '#f7fafc' : '#1a202c',
    transition: 'all 0.3s ease'
  };
  
  const headerStyle = {
    backgroundColor: resolvedTheme === 'dark' ? '#2d3748' : 'transparent',
    color: resolvedTheme === 'dark' ? '#f7fafc' : '#1a202c'
  };
  
  const cardStyle = {
    backgroundColor: resolvedTheme === 'dark' ? '#2d3748' : '#ffffff',
    color: resolvedTheme === 'dark' ? '#f7fafc' : '#1a202c',
    boxShadow: resolvedTheme === 'dark' ? '0 10px 25px -5px rgba(0, 0, 0, 0.5)' : '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
  };
  
  const footerStyle = {
    backgroundColor: resolvedTheme === 'dark' ? '#2d3748' : '#ffffff',
    color: resolvedTheme === 'dark' ? '#a0aec0' : '#4a5568',
    borderTopColor: resolvedTheme === 'dark' ? '#4a5568' : '#e2e8f0'
  };

  // 서버 사이드 렌더링 시 기본 UI를 보여줌
  if (!mounted) {
    return (
      <main className="min-h-screen transition-colors duration-300 border">
        <div className="flex items-center justify-center h-screen">
          <div className="animate-pulse">로딩 중...</div>
        </div>
      </main>
    );
  }

  return (
    <main className={`min-h-screen transition-colors duration-300 border`} style={mainStyle}>
      {/* 헤더 섹션 */}
      <header className="pt-8 pb-12 md:pt-12 md:pb-16 px-4 md:px-8" style={headerStyle}>
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-3 tracking-tight" style={{ color: resolvedTheme === 'dark' ? '#ffffff' : '#1a202c' }}>
            <span className="text-kimchi">대한민국 김치 </span>
            <span>지도</span>
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto font-light" style={{ color: resolvedTheme === 'dark' ? '#e2e8f0' : '#4a5568' }}>
            지역별 특색있는 김치 생산자를 만나보세요. 전국 각지의 전통과 맛을 담은 김치를 소개합니다.
          </p>

          {/* 다크모드 토글 버튼 */}
          <div className="mt-6 flex justify-center">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* 소개 문구 */}
      {!selectedSeller && (
        <div className="max-w-7xl mx-auto px-4 mb-10">
          <div className="rounded-xl shadow-trendy p-6 text-center" style={cardStyle}>
            <p style={{ color: resolvedTheme === 'dark' ? '#e2e8f0' : '#4a5568' }}>
              <span className="font-medium">지도에서 지역을 선택</span>하시면 해당 지역의 김치 생산자 정보를 확인하실 수 있습니다.
            </p>
          </div>
        </div>
      )}

      {/* 메인 컨텐츠 */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
        {selectedSeller ? (
          <div className="animate-fade-in">
            <SellerProfile
              seller={selectedSeller}
              onBack={() => setSelectedSellerId(null)}
            />
          </div>
        ) : (
          <div className="rounded-xl overflow-hidden shadow-trendy" style={cardStyle}>
            <KoreaMap
              sellers={mockSellersWithPlaceholder}
              onSellerClick={(sellerId) => setSelectedSellerId(sellerId)}
            />
          </div>
        )}
      </div>

      {/* 푸터 */}
      <footer className="py-8 mt-auto border-t" style={footerStyle}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <p className="mb-2">© 2023 김치 지도. 모든 권리 보유.</p>
          <p className="text-sm">한국 전통 김치의 아름다움과 맛을 전 세계에 알립니다.</p>
        </div>
      </footer>
    </main>
  );
}
