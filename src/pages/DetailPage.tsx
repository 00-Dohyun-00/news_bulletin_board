import React from "react";
import { useParams, Link } from "react-router-dom";
import { useStory } from "../hooks/useStory";

export const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const storyId = id ? parseInt(id, 10) : 0;
  const { data: story, isLoading, error } = useStory(storyId);

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
    );
  }

  if (error || !story) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <div className="text-red-600 text-lg font-medium">Story not found</div>
        <Link
          to="/"
          className="mt-4 inline-block text-blue-600 hover:text-blue-700"
        >
          ← Back to stories
        </Link>
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
