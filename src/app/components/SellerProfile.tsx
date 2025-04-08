import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

interface Seller {
  id: string;
  name: string;
  location: string;
  product: string;
  description: string;
  contactInfo: string;
  images: string[];
}

interface SellerProfileProps {
  seller: Seller;
  onBack: () => void;
}

const SellerProfile: React.FC<SellerProfileProps> = ({ seller, onBack }) => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 컴포넌트가 마운트된 후에만 테마 상태를 사용
  useEffect(() => {
    setMounted(true);
  }, []);

  // 테마에 따른 스타일 정의
  const containerStyle = {
    backgroundColor: resolvedTheme === 'dark' ? '#2d3748' : '#ffffff',
    borderColor: resolvedTheme === 'dark' ? '#4a5568' : '#e2e8f0',
    boxShadow: resolvedTheme === 'dark' 
      ? '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)' 
      : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s ease'
  };

  const noImageStyle = {
    backgroundColor: resolvedTheme === 'dark' ? '#4a5568' : '#e2e8f0',
    color: resolvedTheme === 'dark' ? '#a0aec0' : '#718096'
  };

  const buttonStyle = {
    backgroundColor: resolvedTheme === 'dark' ? '#4a5568' : '#ffffff',
    borderColor: resolvedTheme === 'dark' ? '#2d3748' : '#e2e8f0',
    color: resolvedTheme === 'dark' ? '#e2e8f0' : '#4a5568',
    transition: 'all 0.2s ease'
  };

  const buttonHoverStyle = {
    backgroundColor: resolvedTheme === 'dark' ? '#3a4559' : '#f7fafc',
  };

  const headingStyle = {
    color: resolvedTheme === 'dark' ? '#f7fafc' : '#1a202c'
  };

  const textStyle = {
    color: resolvedTheme === 'dark' ? '#cbd5e0' : '#4a5568'
  };

  const tagStyle = {
    backgroundColor: resolvedTheme === 'dark' ? '#4a5568' : '#FEF3F2',
    color: resolvedTheme === 'dark' ? '#e2e8f0' : '#E53E3E',
  };

  const contactBoxStyle = {
    backgroundColor: resolvedTheme === 'dark' ? 'rgba(45, 55, 72, 0.5)' : '#f7fafc',
    borderColor: resolvedTheme === 'dark' ? '#4a5568' : '#edf2f7',
    color: resolvedTheme === 'dark' ? '#cbd5e0' : '#4a5568'
  };

  const [isButtonHovered, setIsButtonHovered] = useState(false);

  if (!mounted) {
    // 마운트 전 빈 컨테이너 반환
    return <div className="w-full max-w-5xl mx-auto h-[600px] rounded-xl"></div>;
  }

  return (
    <div className="rounded-xl overflow-hidden max-w-5xl mx-auto" style={containerStyle}>
      <div className="relative h-80 w-full">
        {seller.images && seller.images.length > 0 ? (
          <>
            <Image 
              src={seller.images[0]}
              alt={`${seller.name} 대표 이미지`}
              className="object-cover"
              fill
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 w-full">
              <h1 className="text-3xl font-heading font-bold text-white drop-shadow-sm mb-2">{seller.name}</h1>
              <p className="text-gray-100 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {seller.location}
              </p>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={noImageStyle}>
            <p>이미지 없음</p>
          </div>
        )}
      </div>
      
      <div className="px-6 py-8">
        <button 
          onClick={onBack}
          style={{
            ...buttonStyle,
            ...(isButtonHovered ? buttonHoverStyle : {})
          }}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
          className="mb-6 px-4 py-2 rounded-full inline-flex items-center shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          지도로 돌아가기
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="mb-8">
              <h2 className="text-xl font-heading font-bold mb-3 flex items-center" style={headingStyle}>
                <span className="inline-block w-2 h-6 bg-kimchi mr-2 rounded-sm"></span>
                대표 상품
              </h2>
              <div className="flex flex-wrap gap-2">
                {seller.product.split(',').map((item, index) => (
                  <span 
                    key={index} 
                    style={tagStyle}
                    className="px-3 py-1.5 rounded-full text-sm font-medium"
                  >
                    {item.trim()}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-heading font-bold mb-3 flex items-center" style={headingStyle}>
                <span className="inline-block w-2 h-6 bg-kimchi mr-2 rounded-sm"></span>
                연락처
              </h2>
              <p className="p-4 rounded-lg border" style={contactBoxStyle}>
                {seller.contactInfo}
              </p>
            </div>
          </div>
          
          <div>
            <div className="mb-8">
              <h2 className="text-xl font-heading font-bold mb-3 flex items-center" style={headingStyle}>
                <span className="inline-block w-2 h-6 bg-kimchi mr-2 rounded-sm"></span>
                업체 소개
              </h2>
              <p className="leading-relaxed" style={textStyle}>
                {seller.description}
              </p>
            </div>
          </div>
        </div>
        
        {seller.images && seller.images.length > 1 && (
          <div className="mt-6">
            <h2 className="text-xl font-heading font-bold mb-4 flex items-center" style={headingStyle}>
              <span className="inline-block w-2 h-6 bg-kimchi mr-2 rounded-sm"></span>
              제품 이미지
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {seller.images.slice(1).map((img, index) => (
                <div 
                  key={index} 
                  className="relative h-48 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
                  style={{ 
                    boxShadow: resolvedTheme === 'dark' 
                      ? '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)' 
                      : '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
                  }}
                >
                  <Image 
                    src={img}
                    alt={`${seller.name} 제품 이미지 ${index + 1}`}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    fill
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerProfile; 