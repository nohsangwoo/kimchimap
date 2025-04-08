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
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-trendy overflow-hidden max-w-5xl mx-auto transition-colors duration-300">
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
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">이미지 없음</p>
          </div>
        )}
      </div>
      
      <div className="px-6 py-8">
        <button 
          onClick={onBack}
          className="mb-6 px-4 py-2 rounded-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors inline-flex items-center shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          지도로 돌아가기
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="mb-8">
              <h2 className="text-xl font-heading font-bold mb-3 text-gray-900 dark:text-white flex items-center">
                <span className="inline-block w-2 h-6 bg-kimchi mr-2 rounded-sm"></span>
                대표 상품
              </h2>
              <div className="flex flex-wrap gap-2">
                {seller.product.split(',').map((item, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1.5 bg-kimchi-light dark:bg-gray-700 text-kimchi dark:text-gray-200 rounded-full text-sm font-medium"
                  >
                    {item.trim()}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-heading font-bold mb-3 text-gray-900 dark:text-white flex items-center">
                <span className="inline-block w-2 h-6 bg-kimchi mr-2 rounded-sm"></span>
                연락처
              </h2>
              <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                {seller.contactInfo}
              </p>
            </div>
          </div>
          
          <div>
            <div className="mb-8">
              <h2 className="text-xl font-heading font-bold mb-3 text-gray-900 dark:text-white flex items-center">
                <span className="inline-block w-2 h-6 bg-kimchi mr-2 rounded-sm"></span>
                업체 소개
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {seller.description}
              </p>
            </div>
          </div>
        </div>
        
        {seller.images && seller.images.length > 1 && (
          <div className="mt-6">
            <h2 className="text-xl font-heading font-bold mb-4 text-gray-900 dark:text-white flex items-center">
              <span className="inline-block w-2 h-6 bg-kimchi mr-2 rounded-sm"></span>
              제품 이미지
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {seller.images.slice(1).map((img, index) => (
                <div 
                  key={index} 
                  className="relative h-48 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
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