import React from 'react';
import { cn } from '@/lib/utils';

// 基礎骨架屏組件
export const Skeleton: React.FC<{
  className?: string;
  children?: React.ReactNode;
}> = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-700/50",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// 智能Header骨架屏
export const HeaderSkeleton: React.FC = () => {
  return (
    <div className="header-ai-smart mb-6">
      {/* 桌面版 */}
      <div className="hidden lg:flex items-center justify-between py-4 px-6">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex items-center space-x-6">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-2 w-24" />
          <Skeleton className="h-8 w-20" />
        </div>
        <Skeleton className="h-10 w-28" />
      </div>
      
      {/* 移動端 */}
      <div className="lg:hidden header-ai-mobile">
        <div className="header-row">
          <Skeleton className="h-8 w-16" />
          <div className="flex-1 mx-4 text-center">
            <Skeleton className="h-4 w-20 mx-auto mb-1" />
            <Skeleton className="h-3 w-16 mx-auto" />
          </div>
          <Skeleton className="h-8 w-8" />
        </div>
        <div className="header-progress">
          <Skeleton className="h-2 flex-1 max-w-32" />
          <Skeleton className="h-6 w-16" />
        </div>
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  );
};

// 學習內容骨架屏
export const LearningContentSkeleton: React.FC = () => {
  return (
    <div className="layout-main-content">
      <div className="space-y-6 lg:space-y-8">
        {/* 課程描述 */}
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />
        
        {/* 主要內容段落 */}
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
        
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        
        {/* 應用案例 */}
        <div className="p-6 lg:p-8 bg-gray-800/30 rounded-xl">
          <Skeleton className="h-6 w-40 mb-4" />
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 側邊欄骨架屏
export const SidebarSkeleton: React.FC = () => {
  return (
    <div className="layout-sidebar-content">
      {/* 重點摘要 */}
      <div className="card-ai-base card-responsive">
        <div className="flex items-center mb-4">
          <Skeleton className="w-4 h-4 mr-2" />
          <Skeleton className="h-5 w-20" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-start space-x-3">
              <Skeleton className="w-3 h-3 mt-0.5" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </div>
      
      {/* 學習統計 */}
      <div className="bg-gray-800/30 rounded-xl card-responsive">
        <div className="flex items-center mb-4">
          <Skeleton className="w-4 h-4 mr-2" />
          <Skeleton className="h-5 w-20" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-12" />
            </div>
          ))}
        </div>
      </div>
      
      {/* 筆記區 - 只在桌面版顯示 */}
      <div className="hidden lg:block card-ai-base card-responsive">
        <div className="flex items-center mb-4">
          <Skeleton className="w-4 h-4 mr-2" />
          <Skeleton className="h-5 w-16" />
        </div>
        <Skeleton className="h-32 w-full" />
        <div className="mt-2 flex items-center justify-between">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-10" />
        </div>
      </div>
    </div>
  );
};

// 完整學習頁面骨架屏
export const LearningPageSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#121212' }}>
      <div className="container mx-auto px-6 py-0">
        <HeaderSkeleton />
        <div className="layout-learning-main desktop">
          <LearningContentSkeleton />
          <SidebarSkeleton />
        </div>
      </div>
    </div>
  );
};
