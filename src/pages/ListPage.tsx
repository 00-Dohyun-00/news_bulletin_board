import React, { useState } from 'react'
import { Tabs } from '../components/Tabs'
import { NewsCard } from '../components/NewsCard'
import { useStories } from '../hooks/useStories'
import { StoryType } from '../types/news'

export const ListPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<StoryType>('top')
  const { data: stories, isLoading, error } = useStories(activeTab, 30)

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
      
      {stories && stories.length > 0 ? (
        <div className="space-y-4">
          {stories.map((story) => (
            <NewsCard key={story.id} story={story} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-600 text-lg">
            No stories available
          </div>
        </div>
      )}
    </div>
  )
}