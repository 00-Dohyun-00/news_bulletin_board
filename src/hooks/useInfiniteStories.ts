import { useInfiniteQuery } from '@tanstack/react-query'
import { hackerNewsApi } from '../api/hackerNews'
import { StoryType, Story } from '../types/news'

const STORIES_PER_PAGE = 20

export const useInfiniteStories = (type: StoryType = 'top') => {
  return useInfiniteQuery({
    queryKey: ['infiniteStories', type],
    queryFn: async ({ pageParam = 0 }) => {
      // 모든 스토리 ID를 먼저 가져옴
      const allIds = await hackerNewsApi.getStoryIds(type, 500) // 충분한 수의 ID 가져오기
      
      // 페이지에 맞는 범위의 ID 추출
      const startIndex = pageParam * STORIES_PER_PAGE
      const endIndex = startIndex + STORIES_PER_PAGE
      const pageIds = allIds.slice(startIndex, endIndex)
      
      // 해당 페이지의 스토리들 가져오기
      const stories = await Promise.all(
        pageIds.map(id => hackerNewsApi.getStory(id))
      )
      
      return {
        stories: stories.filter(story => story && story.type === 'story') as Story[],
        nextCursor: endIndex < allIds.length ? pageParam + 1 : undefined,
        hasMore: endIndex < allIds.length
      }
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    initialPageParam: 0
  })
}