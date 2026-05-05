import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { Story } from '../types/news'
import { hackerNewsApi } from '../api/hackerNews'

interface NewsCardProps {
  story: Story
}

export const NewsCard: React.FC<NewsCardProps> = ({ story }) => {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const queryClient = useQueryClient()

  const handlePrefetch = () => {
    queryClient.prefetchQuery({
      queryKey: ['story', story.id],
      queryFn: () => hackerNewsApi.getStory(story.id),
      staleTime: 10 * 60 * 1000,
    })
  }

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) {
      return 'less than an hour ago'
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
    }
  }

  const getDomain = (url?: string) => {
    if (!url) return ''
    try {
      return new URL(url).hostname
    } catch {
      return ''
    }
  }

  const getImageUrls = (url?: string) => {
    const domain = getDomain(url)
    const seed = story.id % 1000
    
    // 여러 fallback 이미지 서비스
    return [
      // Picsum Photos - 매우 안정적
      `https://picsum.photos/seed/${seed}/400/300`,
      // UI Avatars - 텍스트 기반
      `https://ui-avatars.com/api/?name=${encodeURIComponent(domain || 'News')}&size=400&background=3b82f6&color=fff&format=png`,
      // DummyImage - 심플한 플레이스홀더
      `https://dummyimage.com/400x300/3b82f6/ffffff&text=${encodeURIComponent(domain || 'News')}`
    ]
  }

  const imageUrls = getImageUrls(story.url)
  const currentImageUrl = imageUrls[currentImageIndex]

  const handleImageError = () => {
    if (currentImageIndex < imageUrls.length - 1) {
      setCurrentImageIndex(prev => prev + 1)
      setImageLoaded(false)
    } else {
      setImageError(true)
    }
  }

  return (
    <article 
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-blue-200 group"
      onMouseEnter={handlePrefetch}
    >
      <div className="flex items-start p-3 sm:p-4 gap-3 sm:gap-4">
        {/* 이미지 섹션 */}
        <div className="flex-shrink-0">
          {currentImageUrl && !imageError ? (
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 overflow-hidden rounded-lg bg-gray-100">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
              )}
              <img
                src={currentImageUrl}
                alt={`Thumbnail for ${story.title}`}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={handleImageError}
                loading="lazy"
              />
            </div>
          ) : (
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
              <div className="text-lg sm:text-2xl">📰</div>
            </div>
          )}
        </div>

        {/* 컨텐츠 섹션 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 sm:gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2 leading-tight mb-1 sm:mb-2">
                <Link
                  to={`/story/${story.id}`}
                  className="hover:text-blue-600 transition-colors focus:outline-none focus:text-blue-600 group-hover:text-blue-600"
                  aria-label={`Read full story: ${story.title}`}
                >
                  {story.title}
                </Link>
              </h3>
              
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-2">
                <span>by <span className="font-medium">{story.by}</span></span>
                <span className="hidden sm:inline">•</span>
                <span className="text-xs sm:text-sm">{formatTime(story.time)}</span>
                {story.url && (
                  <>
                    <span className="hidden sm:inline">•</span>
                    <a
                      href={story.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors text-xs sm:text-sm truncate max-w-[120px] sm:max-w-none"
                    >
                      {getDomain(story.url)} ↗
                    </a>
                  </>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                {story.score && (
                  <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                    {story.score} pts
                  </span>
                )}
                {story.descendants !== undefined && (
                  <Link
                    to={`/story/${story.id}`}
                    className="text-gray-600 hover:text-blue-600 transition-colors text-xs sm:text-sm"
                  >
                    {story.descendants} comments
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}