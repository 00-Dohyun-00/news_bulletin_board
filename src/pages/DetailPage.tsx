import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useStory } from "../hooks/useStory";
import { LoadingSkeleton } from "../components/LoadingSkeleton";
import { ErrorState } from "../components/ErrorState";

export const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const storyId = id ? parseInt(id, 10) : 0;
  const { data: story, isLoading, error, refetch } = useStory(storyId);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDomain = (url?: string) => {
    if (!url) return "";
    try {
      return new URL(url).hostname;
    } catch {
      return "";
    }
  };

  const getImageUrls = (url?: string) => {
    if (!story) return [];
    
    const domain = getDomain(url);
    const seed = story.id % 1000;
    
    // 여러 fallback 이미지 서비스
    return [
      // Picsum Photos - 더 큰 이미지로
      `https://picsum.photos/seed/${seed}/800/400`,
      // UI Avatars - 텍스트 기반
      `https://ui-avatars.com/api/?name=${encodeURIComponent(domain || 'News')}&size=800&background=3b82f6&color=fff&format=png`,
      // DummyImage - 심플한 플레이스홀더  
      `https://dummyimage.com/800x400/3b82f6/ffffff&text=${encodeURIComponent(domain || 'News')}`
    ];
  };

  const handleImageError = () => {
    const imageUrls = getImageUrls(story?.url);
    if (currentImageIndex < imageUrls.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
      setImageLoaded(false);
    } else {
      setImageError(true);
    }
  };

  if (isLoading) {
    return <LoadingSkeleton type="detail" />;
  }

  if (error || !story) {
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
        <ErrorState
          title="Story not found"
          message="The story you're looking for doesn't exist or has been removed."
          onRetry={() => refetch()}
          showRetry={!!error}
        />
      </div>
    );
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
        {/* Hero Image */}
        {!imageError && (
          <div className="mb-8 -mx-8 -mt-8">
            <div className="relative h-64 sm:h-80 overflow-hidden rounded-t-lg bg-gray-100">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
              )}
              <img
                src={getImageUrls(story.url)[currentImageIndex]}
                alt={`Cover image for ${story.title}`}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={handleImageError}
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        )}

        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {story.title}
          </h1>

          {/* Story Metadata */}
          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">Author:</span>
                <span className="font-semibold text-gray-900">{story.by}</span>
              </div>

              {story.score && (
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">Score:</span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {story.score} points
                  </span>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <span className="text-gray-500">Posted:</span>
                <span className="text-gray-900">{formatTime(story.time)}</span>
              </div>

              {story.descendants !== undefined && (
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">Comments:</span>
                  <span className="text-gray-900">{story.descendants}</span>
                </div>
              )}
            </div>

            {story.url && (
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-start space-x-2">
                  <span className="text-gray-500 mt-1">URL:</span>
                  <div className="flex-1">
                    <a
                      href={story.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      Visit Article ↗
                    </a>
                    <div className="text-sm text-gray-600 mb-1">
                      {getDomain(story.url)}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>

        {story.text ? (
          <div className="prose prose-lg max-w-none">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Content
            </h2>
            <div
              dangerouslySetInnerHTML={{ __html: story.text }}
              className="text-gray-700 leading-relaxed bg-gray-50 p-6 rounded-lg"
            />
          </div>
        ) : story.url ? (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <div className="text-blue-800">
              <h3 className="font-semibold mb-2">External Article</h3>
              <p className="text-sm">
                This post links to an external article. Click the "Visit
                Article" button above to read the full content.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
            <div className="text-gray-600">
              <h3 className="font-semibold mb-2">Discussion Post</h3>
              <p className="text-sm">
                This is a discussion post without additional content.
              </p>
            </div>
          </div>
        )}
      </article>
    </div>
  );
};
