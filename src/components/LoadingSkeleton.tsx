import React from 'react'

interface LoadingSkeletonProps {
  count?: number
  type?: 'list' | 'detail'
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  count = 10, 
  type = 'list' 
}) => {
  if (type === 'detail') {
    return (
      <div className="max-w-4xl mx-auto animate-pulse">
        {/* Back button skeleton */}
        <div className="h-4 bg-gray-200 rounded w-24 mb-6"></div>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Title skeleton */}
          <div className="space-y-3 mb-8">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          </div>
          
          {/* Metadata skeleton */}
          <div className="bg-gray-50 rounded-lg p-6 space-y-4 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-gray-200">
              <div className="h-10 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
          
          {/* Content skeleton */}
          <div className="space-y-3">
            <div className="h-6 bg-gray-200 rounded w-20"></div>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
            ))}
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div 
          key={index} 
          className="bg-white rounded-lg shadow-sm border border-gray-200 animate-pulse"
        >
          <div className="flex items-start p-3 sm:p-4 gap-3 sm:gap-4">
            {/* Image skeleton */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-lg flex-shrink-0" />
            
            {/* Content skeleton */}
            <div className="flex-1 space-y-2 sm:space-y-3 min-w-0">
              {/* Title skeleton */}
              <div className="space-y-2">
                <div className="h-4 sm:h-5 bg-gray-200 rounded w-full"></div>
                <div className="h-4 sm:h-5 bg-gray-200 rounded w-3/4"></div>
              </div>
              
              {/* Metadata skeleton */}
              <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                <div className="h-3 bg-gray-200 rounded w-12"></div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
                <div className="h-3 bg-gray-200 rounded w-20"></div>
              </div>
              
              {/* Tags skeleton */}
              <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                <div className="h-5 sm:h-6 bg-gray-200 rounded-full w-12 sm:w-16"></div>
                <div className="h-3 bg-gray-200 rounded w-16 sm:w-20"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}