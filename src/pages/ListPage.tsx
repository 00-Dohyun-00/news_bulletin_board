import React, { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { Tabs } from '../components/Tabs'
import { NewsCard } from '../components/NewsCard'
import { LoadingSkeleton } from '../components/LoadingSkeleton'
import { ErrorState } from '../components/ErrorState'
import { EmptyState } from '../components/EmptyState'
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
    isFetchingNextPage,
    refetch
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
        <LoadingSkeleton count={8} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
        <ErrorState 
          onRetry={() => refetch()}
          message="We couldn't load the stories. Please check your internet connection and try again."
        />
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      {allStories.length > 0 ? (
        <div className="space-y-4">
          {allStories.map((story) => (
            <NewsCard key={story.id} story={story} />
          ))}
          
          {/* Infinite scroll trigger */}
          {hasNextPage && (
            <div ref={ref} className="flex justify-center py-8 transition-all duration-300">
              {isFetchingNextPage ? (
                <div className="flex items-center space-x-3 animate-in fade-in duration-300">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <span className="text-gray-600 font-medium">Loading more stories...</span>
                </div>
              ) : (
                <div className="text-gray-400 text-sm animate-pulse">Scroll for more stories</div>
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
        <EmptyState 
          title="No stories found"
          message={`No ${activeTab} stories are available at the moment. Try switching to a different category or check back later.`}
          action={{
            label: 'Refresh Page',
            onClick: () => refetch()
          }}
        />
      ) : null}
    </div>
  )
}