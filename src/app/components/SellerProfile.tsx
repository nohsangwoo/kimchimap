import React from 'react';
import Image from 'next/image';

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
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-4xl mx-auto">
      <div className="relative h-64 w-full">
        {seller.images && seller.images.length > 0 ? (
          <Image 
            src={seller.images[0]}
            alt={`${seller.name} 대표 이미지`}
            className="object-cover"
            fill
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500">이미지 없음</p>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <button 
          onClick={onBack}
          className="mb-4 text-sm text-blue-600 hover:underline flex items-center"
        >
          ← 지도로 돌아가기
        </button>
        
        <h1 className="text-2xl font-bold mb-2">{seller.name}</h1>
        <p className="text-gray-600 mb-4">{seller.location}</p>
        
        <h2 className="text-xl font-semibold mb-2">대표 상품</h2>
        <p className="mb-4">{seller.product}</p>
        
        <h2 className="text-xl font-semibold mb-2">업체 소개</h2>
        <p className="mb-6">{seller.description}</p>
        
        <h2 className="text-xl font-semibold mb-2">연락처</h2>
        <p className="mb-6">{seller.contactInfo}</p>
        
        {seller.images && seller.images.length > 1 && (
          <>
            <h2 className="text-xl font-semibold mb-3">제품 이미지</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {seller.images.slice(1).map((img, index) => (
                <div key={index} className="relative h-40 w-full rounded-md overflow-hidden">
                  <Image 
                    src={img}
                    alt={`${seller.name} 제품 이미지 ${index + 1}`}
                    className="object-cover"
                    fill
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SellerProfile; 