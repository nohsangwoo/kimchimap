import { Seller } from './types'

// 추가 지역 데이터 (타입 오류 수정)
export const additionalRegions: Record<string, Seller[]> = {
  대구광역시: [
    {
      id: 'daegu-1',
      name: '대구 전통 김치',
      location: '대구시 중구',
      product: '찹쌀포기김치, 동치미',
      description:
        '100년 전통의 대구식 김치를 만듭니다. 찹쌀을 이용한 특별한 양념으로 감칠맛을 살린 김치가 특징입니다.',
      contactInfo: '053-421-5678 / daegu-kimchi@example.com',
      images: [
        'https://images.unsplash.com/photo-1583187552101-e5f7082e62c4?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1583187553384-2516b6ef9e1c?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1583187627942-9b533a3576ef?q=80&w=1974&auto=format&fit=crop',
      ],
    },
    {
      id: 'daegu-2',
      name: '약령시장 김치',
      location: '대구시 남구',
      product: '약재김치, 인삼김치',
      description:
        '대구 약령시장에서 영감을 받은 약재를 활용한 건강 김치를 생산합니다. 면역력 증진에 도움을 주는 특별 레시피.',
      contactInfo: '053-567-8901 / yangnyeong-kimchi@example.com',
      images: [
        'https://images.unsplash.com/photo-1583187554852-3039db82fe5e?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1626197031507-c17099753214?q=80&w=2074&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1578160112054-954a67602b88?q=80&w=1974&auto=format&fit=crop',
      ],
    },
  ],
  광주광역시: [
    {
      id: 'gwangju-1',
      name: '광주 김치 명인',
      location: '광주시 북구',
      product: '백김치, 열무김치',
      description:
        '전라도 전통 김치의 맛을 이어가는 김치 명인의 비법으로 만든 김치입니다. 깊은 맛과 풍미가 특징입니다.',
      contactInfo: '062-345-6789 / gwangju-master@example.com',
      images: [
        'https://images.unsplash.com/photo-1583187554845-af6ee24f1ef8?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1580651546971-dec959f6e8ee?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1583187544352-6c7818e948d2?q=80&w=1974&auto=format&fit=crop',
      ],
    },
  ],
  제주특별자치도: [
    {
      id: 'jeju-1',
      name: '제주 해풍 김치',
      location: '제주시 애월읍',
      product: '갈치속김치, 해산물김치',
      description:
        '제주 바닷바람을 맞고 자란 채소와 신선한 해산물을 활용한 김치입니다. 제주만의 특별한 풍미가 담겨있습니다.',
      contactInfo: '064-789-0123 / jeju-seafood@example.com',
      images: [
        'https://images.unsplash.com/photo-1583187554850-6d1b13ec1408?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1583187553080-5bba890cd788?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1583187554707-06c865526fe8?q=80&w=1974&auto=format&fit=crop',
      ],
    },
  ],
  전라북도: [
    {
      id: 'jeonbuk-1',
      name: '전주 비빔김치',
      location: '전라북도 전주시',
      product: '비빔김치, 돌산갓김치',
      description:
        '전주 비빔밥의 고장에서 만든 특별한 비빔김치입니다. 여러 가지 채소와 양념을 절묘하게 조합한 풍미가 일품입니다.',
      contactInfo: '063-234-5678 / jeonju-kimchi@example.com',
      images: [
        'https://images.unsplash.com/photo-1583187553588-85d8c16ae612?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1583187552722-321c94bb421c?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1583187608815-f70a8870943a?q=80&w=1974&auto=format&fit=crop',
      ],
    },
  ],
  경상북도: [
    {
      id: 'gyeongbuk-1',
      name: '안동 종가 김치',
      location: '경상북도 안동시',
      product: '안동식 배추김치, 무말랭이김치',
      description:
        '경북 안동의 종가에서 대대로 내려오는 전통 레시피로 만든 김치입니다. 깔끔하고 담백한 맛이 특징입니다.',
      contactInfo: '054-678-9012 / andong-kimchi@example.com',
      images: [
        'https://images.unsplash.com/photo-1583187553349-adfa67dac45f?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1583187544354-aee9a4d21fed?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1583188937447-6d1d3c1c300f?q=80&w=1974&auto=format&fit=crop',
      ],
    },
  ],
  전라남도: [
    {
      id: 'jeonnam-3',
      name: '여수 어가 김치',
      location: '전라남도 여수시',
      product: '젓갈김치, 해초김치',
      description:
        '여수 바다에서 갓 잡은 해산물로 만드는 풍미 가득한 젓갈김치와, 신선한 해초를 활용한 특색있는 김치입니다.',
      contactInfo: '061-456-7890 / yeosu-kimchi@example.com',
      images: [
        'https://images.unsplash.com/photo-1583187553588-85d8c16ae612?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1583187553080-5bba890cd788?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1590301157622-795d847044c7?q=80&w=2070&auto=format&fit=crop',
      ],
    },
  ],
  강원특별자치도: [
    {
      id: 'gangwon-1',
      name: '강원 산채 김치',
      location: '강원도 평창군',
      product: '고랭지 배추김치, 곤드레나물김치',
      description:
        '강원도의 청정 자연에서 자란 산나물과 채소로 만든 특별한 김치입니다. 평창의 맑은 공기와 물로 발효시킵니다.',
      contactInfo: '033-678-9012 / gangwon-kimchi@example.com',
      images: [
        'https://images.unsplash.com/photo-1583187554080-5d31a73d0510?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1576020997414-8ac4f0ea984c?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=2070&auto=format&fit=crop',
      ],
    },
  ],
}

// 가짜 판매자 데이터
export const mockSellers: Record<string, Seller[]> = {
  서울특별시: [
    {
      id: 'seoul-1',
      name: '서울김치명가',
      location: '서울시 종로구',
      product: '깍두기, 배추김치',
      description:
        '3대째 이어오는 전통 김치 제조업체입니다. 종로에서 40년 넘게 운영해온 김치 전문점으로, 모든 재료를 국내산만 사용합니다.',
      contactInfo: '02-123-4567 / seoul-kimchi@example.com',
      images: [
        'https://images.unsplash.com/photo-1583669314533-19667111bc5e?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1583669314533-19667111bc5e?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1581016456877-7e7040f6c9ad?q=80&w=2070&auto=format&fit=crop',
      ],
    },
    {
      id: 'seoul-2',
      name: '명동김치공방',
      location: '서울시 중구 명동',
      product: '총각김치, 열무김치',
      description:
        '현대적인 레시피로 재해석한 김치를 만듭니다. 젊은 세대들에게도 사랑받는 김치 맛을 연구합니다.',
      contactInfo: '02-987-6543 / myeongdong-kimchi@example.com',
      images: [
        'https://images.unsplash.com/photo-1631156332165-62ed753ba50c?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1564834166127-4de30a08dfb9?q=80&w=1974&auto=format&fit=crop',
      ],
    },
    {
      id: 'seoul-3',
      name: '강남 프리미엄 김치',
      location: '서울시 강남구',
      product: '백김치, 전복김치',
      description:
        '고급 식자재만을 사용한 프리미엄 김치를 생산합니다. 맞춤형 김치 제작 서비스도 제공합니다.',
      contactInfo: '02-555-7890 / gangnam-kimchi@example.com',
      images: [
        'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?q=80&w=2074&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1583187553636-28d764be942a?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1590301157622-795d847044c7?q=80&w=2070&auto=format&fit=crop',
      ],
    },
    {
      id: 'seoul-4',
      name: '신촌 대학가 김치',
      location: '서울시 서대문구',
      product: '오이소박이, 파김치',
      description:
        '젊은 층의 입맛에 맞춘 현대적인 김치를 생산합니다. 덜 맵고 상큼한 맛이 특징입니다.',
      contactInfo: '02-324-5678 / sinchon-kimchi@example.com',
      images: [
        'https://images.unsplash.com/photo-1583187554387-fbcb9c5a75c1?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1590301156710-67454e4d4b92?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1564834166640-d12e4678c73b?q=80&w=1974&auto=format&fit=crop',
      ],
    },
    {
      id: 'seoul-5',
      name: '홍대 푸드 김치',
      location: '서울시 마포구',
      product: '비트김치, 퓨전김치',
      description:
        '전통과 현대의 퓨전 레시피로 독특한 김치를 생산합니다. 인스타그램에서 인기있는 비주얼 김치 전문점입니다.',
      contactInfo: '02-312-9876 / hongdae-kimchi@example.com',
      images: [
        'https://images.unsplash.com/photo-1583192311073-f20f2a869ec7?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1583192318265-e0b4c9c46d60?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1583192395804-6fdb089b1352?q=80&w=1974&auto=format&fit=crop',
      ],
    },
  ],
  경기도: [
    {
      id: 'gyeonggi-1',
      name: '수원 맛김치',
      location: '경기도 수원시',
      product: '포기김치, 갓김치',
      description:
        '경기도 수원에서 30년 전통을 자랑하는 김치 제조업체입니다. 지역 농산물을 활용한 신선한 김치를 제공합니다.',
      contactInfo: '031-456-7890 / suwon-kimchi@example.com',
      images: [
        'https://images.unsplash.com/photo-1583187554056-c6e727bdbbbe?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1638957773782-f9626200b8?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1580651315530-69c8e0026377?q=80&w=2070&auto=format&fit=crop',
      ],
    },
    {
      id: 'gyeonggi-2',
      name: '분당 친환경 김치',
      location: '경기도 성남시 분당구',
      product: '유기농 배추김치, 갓김치',
      description:
        '유기농 재료만을 사용한 건강한 김치를 생산합니다. 무항생제, 무농약 채소로 만듭니다.',
      contactInfo: '031-701-2345 / bundang-kimchi@example.com',
      images: [
        'https://images.unsplash.com/photo-1583187553841-0b1a33f22b0a?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1583187554704-07fe7970d66e?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1590301157484-93589bdb5064?q=80&w=2070&auto=format&fit=crop',
      ],
    },
    {
      id: 'gyeonggi-3',
      name: '파주 DMZ 농장 김치',
      location: '경기도 파주시',
      product: '민통선 배추김치, DMZ 무김치',
      description:
        '민통선 근처의 청정지역에서 재배된 채소로 만든 김치입니다. 북한 접경지역의 깨끗한 환경에서 생산됩니다.',
      contactInfo: '031-945-6789 / paju-kimchi@example.com',
      images: [
        'https://images.unsplash.com/photo-1583187554154-64fe5ca92bc7?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1583187553239-9a1d049eada3?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1583187553723-4f5f7c3137b1?q=80&w=1974&auto=format&fit=crop',
      ],
    },
    {
      id: 'gyeonggi-4',
      name: '김포 가정식 김치',
      location: '경기도 김포시',
      product: '어머니표 배추김치, 총각김치',
      description:
        '가정식 레시피 그대로 만든 정성이 담긴 김치입니다. 소규모 생산으로 품질을 엄격하게 관리합니다.',
      contactInfo: '031-984-1234 / gimpo-kimchi@example.com',
      images: [
        'https://images.unsplash.com/photo-1583187553190-66503ba9ad63?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1583187553399-a1eace914819?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1583187554665-91cfc01ac4a7?q=80&w=1974&auto=format&fit=crop',
      ],
    },
    {
      id: 'gyeonggi-5',
      name: '용인 농협 김치',
      location: '경기도 용인시',
      product: '농협 공동 김치, 계절별 특산김치',
      description:
        '지역 농협에서 공동 생산하는 김치로, 지역 농민들의 농산물로 만듭니다. 계절별 특산 김치를 판매합니다.',
      contactInfo: '031-332-4567 / yongin-kimchi@example.com',
      images: [
        'https://images.unsplash.com/photo-1583187553078-32cc5ef2aa73?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1583187554765-5110dbccc42f?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1583187554040-addb9a8a3d74?q=80&w=1974&auto=format&fit=crop',
      ],
    },
  ],
  부산광역시: [
    {
      id: 'busan-1',
      name: '해운대 어머니 김치',
      location: '부산시 해운대구',
      product: '물김치, 동치미',
      description:
        '부산의 바다 내음을 담은 김치를 생산합니다. 해산물을 활용한 특별한 레시피로 유명합니다.',
      contactInfo: '051-789-0123 / haeundae-kimchi@example.com',
      images: [
        'https://images.unsplash.com/photo-1583187553572-6c023a4818e8?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1503764654157-72d979d9af2f?q=80&w=2074&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1580651463725-cee1acffaa2a?q=80&w=2017&auto=format&fit=crop',
      ],
    },
    {
      id: 'busan-2',
      name: '기장 해풍 김치',
      location: '부산시 기장군',
      product: '해풍 배추김치, 멸치김치',
      description:
        '바닷가에서 자란 채소로 만든 김치입니다. 해풍을 맞고 자란 채소로 특별한 향을 가집니다.',
      contactInfo: '051-721-3456 / gijang-kimchi@example.com',
      images: [
        'https://images.unsplash.com/photo-1583187554887-a2a8503c3fb2?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1583187553872-0effa7a78cb5?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1583187554432-7b3d6c2833e7?q=80&w=1974&auto=format&fit=crop',
      ],
    },
  ],
  강원특별자치도: [
    {
      id: 'gangwon-1',
      name: '강원 산채 김치',
      location: '강원도 평창군',
      product: '고랭지 배추김치, 곤드레나물김치',
      description:
        '강원도의 청정 자연에서 자란 산나물과 채소로 만든 특별한 김치입니다. 평창의 맑은 공기와 물로 발효시킵니다.',
      contactInfo: '033-678-9012 / gangwon-kimchi@example.com',
      images: [
        'https://images.unsplash.com/photo-1583187554080-5d31a73d0510?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1576020997414-8ac4f0ea984c?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=2070&auto=format&fit=crop',
      ],
    },
  ],
}

// 다른 지역 데이터도 추가
export const otherRegions = {
  부산광역시: [
    {
      id: 'busan-1',
      name: '해운대 어머니 김치',
      location: '부산시 해운대구',
      product: '물김치, 동치미',
      description:
        '부산의 바다 내음을 담은 김치를 생산합니다. 해산물을 활용한 특별한 레시피로 유명합니다.',
      contactInfo: '051-789-0123 / haeundae-kimchi@example.com',
      images: [
        'https://images.unsplash.com/photo-1583187553572-6c023a4818e8?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1503764654157-72d979d9af2f?q=80&w=2074&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1580651463725-cee1acffaa2a?q=80&w=2017&auto=format&fit=crop',
      ],
    },
    {
      id: 'busan-2',
      name: '기장 해풍 김치',
      location: '부산시 기장군',
      product: '해풍 배추김치, 멸치김치',
      description:
        '바닷가에서 자란 채소로 만든 김치입니다. 해풍을 맞고 자란 채소로 특별한 향을 가집니다.',
      contactInfo: '051-721-3456 / gijang-kimchi@example.com',
      images: [
        'https://images.unsplash.com/photo-1583187554887-a2a8503c3fb2?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1583187553872-0effa7a78cb5?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1583187554432-7b3d6c2833e7?q=80&w=1974&auto=format&fit=crop',
      ],
    },
  ],
  전라남도: [
    {
      id: 'jeonnam-2',
      name: '순천 명품 김치',
      location: '전라남도 순천시',
      product: '갓김치, 무말랭이김치',
      description:
        '전라도 특유의 맛깔스러운 양념으로 만든 김치입니다. 순천의 기름진 땅에서 자란 신선한 채소만을 사용합니다.',
      contactInfo: '061-345-6789 / suncheon-kimchi@example.com',
      images: [
        'https://images.unsplash.com/photo-1583669095223-2f7aa4a41449?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1563565375-943015199386?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1599232288126-7dbd2127db14?q=80&w=1973&auto=format&fit=crop',
      ],
    },
  ],
  강원특별자치도: [
    {
      id: 'gangwon-1',
      name: '강원 산채 김치',
      location: '강원도 평창군',
      product: '고랭지 배추김치, 곤드레나물김치',
      description:
        '강원도의 청정 자연에서 자란 산나물과 채소로 만든 특별한 김치입니다. 평창의 맑은 공기와 물로 발효시킵니다.',
      contactInfo: '033-678-9012 / gangwon-kimchi@example.com',
      images: [
        'https://images.unsplash.com/photo-1583187554080-5d31a73d0510?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1576020997414-8ac4f0ea984c?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=2070&auto=format&fit=crop',
      ],
    },
  ],
}
