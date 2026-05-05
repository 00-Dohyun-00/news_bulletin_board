import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Story } from '../types/news'

interface NewsCardProps {
  story: Story
}

export const NewsCard: React.FC<NewsCardProps> = ({ story }) => {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

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

  const getImageUrl = (url?: string) => {
    if (!url) return null
    
    const domain = getDomain(url)
    
    // 도메인별 이미지 생성
    const imageServices = [
      `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`,
      `https://shot.screenshotapi.net/screenshot?token=demo&url=${encodeURIComponent(url)}&width=400&height=300&file_type=png`,
      `https://placeholder.pics/svg/400x300/DEDEDE/555555/${encodeURIComponent(domain || 'News')}`
    ]
    
    return imageServices[2] // 플레이스홀더 이미지 사용
  }

  const imageUrl = getImageUrl(story.url)

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
      <div className="flex items-center p-4 gap-4">
        {/* 이미지 섹션 */}
        <div className="flex-shrink-0">
          {imageUrl && !imageError ? (
            <div className="relative w-20 h-20 overflow-hidden rounded-lg bg-gray-100">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
              )}
              <img
                src={imageUrl}
                alt={story.title}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
            </div>
          ) : (
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
              <div className="text-2xl">📰</div>
            </div>
          )}
        </div>

        {/* 컨텐츠 섹션 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 leading-tight mb-1">
                <Link
                  to={`/story/${story.id}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {story.title}
                </Link>
              </h3>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                <span>by <span className="font-medium">{story.by}</span></span>
                <span>•</span>
                <span>{formatTime(story.time)}</span>
                {story.url && (
                  <>
                    <span>•</span>
                    <a
                      href={story.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {getDomain(story.url)} ↗
                    </a>
                  </>
                )}
              </div>

              <div className="flex items-center gap-4 text-sm">
                {story.score && (
                  <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                    {story.score} pts
                  </span>
                )}
                {story.descendants !== undefined && (
                  <Link
                    to={`/story/${story.id}`}
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {story.descendants} comments
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}