import React, { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { Tabs } from '../components/Tabs'
import { NewsCard } from '../components/NewsCard'
import { useInfiniteStories } from '../hooks/useInfiniteStories'
import { StoryType } from '../types/news'

export const ListPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<StoryType>('top')
  const { 
    data, 
    isLoading, 
    error, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useInfiniteStories(activeTab)
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: '100px'
  })

  // 스크롤이 하단에 도달했을 때 다음 페이지 로드
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  // 모든 페이지의 스토리들을 하나의 배열로 합침
  const allStories = data?.pages.flatMap(page => page.stories) || []

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="space-y-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 animate-pulse">
              <div className="flex items-center p-4 gap-4">
                <div className="w-20 h-20 bg-gray-200 rounded-lg" />
                <div className="flex-1 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="text-center py-12">
          <div className="text-red-600 text-lg font-medium">
            Error loading stories
          </div>
          <p className="text-gray-500 mt-2">
            Please try again later
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      {allStories.length > 0 ? (
        <div className="space-y-4">
          {allStories.map((story) => (
            <NewsCard key={story.id} story={story} />
          ))}
          
          {/* Infinite scroll trigger */}
          {hasNextPage && (
            <div ref={ref} className="flex justify-center py-8">
              {isFetchingNextPage ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <span className="text-gray-600">Loading more stories...</span>
                </div>
              ) : (
                <div className="text-gray-400 text-sm">Scroll for more stories</div>
              )}
            </div>
          )}
          
          {!hasNextPage && allStories.length > 0 && (
            <div className="text-center py-8">
              <div className="text-gray-500 text-sm">
                You've reached the end of the stories
              </div>
            </div>
          )}
        </div>
      ) : !isLoading ? (
        <div className="text-center py-12">
          <div className="text-gray-600 text-lg">
            No stories available
          </div>
        </div>
      ) : null}
    </div>
  )
}