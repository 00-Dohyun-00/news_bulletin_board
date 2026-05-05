import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useStory } from '../hooks/useStory'

export const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const storyId = id ? parseInt(id, 10) : 0
  const { data: story, isLoading, error } = useStory(storyId)

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !story) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <div className="text-red-600 text-lg font-medium">
          Story not found
        </div>
        <Link 
          to="/"
          className="mt-4 inline-block text-blue-600 hover:text-blue-700"
        >
          ← Back to stories
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link 
          to="/"
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          ← Back to stories
        </Link>
      </div>

      <article className="bg-white rounded-lg shadow-lg p-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {story.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <span>by <span className="font-medium">{story.by}</span></span>
            <span>•</span>
            <span>{formatTime(story.time)}</span>
            {story.score && (
              <>
                <span>•</span>
                <span className="font-medium">{story.score} points</span>
              </>
            )}
            {story.descendants && (
              <>
                <span>•</span>
                <span>{story.descendants} comments</span>
              </>
            )}
          </div>
          
          {story.url && (
            <div className="mt-4">
              <a
                href={story.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 text-sm break-all"
              >
                {story.url} ↗
              </a>
            </div>
          )}
        </header>

        {story.text && (
          <div className="prose prose-lg max-w-none">
            <div 
              dangerouslySetInnerHTML={{ __html: story.text }}
              className="text-gray-700 leading-relaxed"
            />
          </div>
        )}

        {!story.text && story.url && (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">
              This is a link post. Click the link above to read the full article.
            </p>
          </div>
        )}
      </article>
    </div>
  )
}