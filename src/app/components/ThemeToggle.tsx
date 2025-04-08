'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  // 모든 useState 훅을 최상단에 배치
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  // useEffect 훅은 useState 훅 다음에 배치
  useEffect(() => {
    setMounted(true);
  }, []);

  // 조건부 렌더링 전에 스타일 계산 함수 정의
  const getButtonStyle = () => {
    if (!mounted) return {};
    
    return {
      padding: '0.5rem',
      borderRadius: '0.5rem',
      backgroundColor: resolvedTheme === 'dark' 
        ? (isHovered ? '#2d3748' : '#4a5568') 
        : (isHovered ? '#cbd5e0' : '#e2e8f0'),
      color: resolvedTheme === 'dark' ? '#f7fafc' : '#1a202c',
      transition: 'all 0.2s ease'
    };
  };

  // 이벤트 핸들러 함수 정의
  const handleThemeToggle = () => {
    if (!mounted) return;
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // 마운트 되지 않았을 때 렌더링하지 않음
  if (!mounted) {
    return null;
  }

  // 실제 렌더링
  return (
    <button
      onClick={handleThemeToggle}
      style={getButtonStyle()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={resolvedTheme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
    >
      {resolvedTheme === 'dark' ? (
        // 햇빛 아이콘 (라이트 모드로 전환)
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          style={{ height: '1.25rem', width: '1.25rem', color: '#ecc94b' }}
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
          />
        </svg>
      ) : (
        // 달 아이콘 (다크 모드로 전환)
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          style={{ height: '1.25rem', width: '1.25rem', color: '#4a5568' }}
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
          />
        </svg>
      )}
    </button>
  );
} 