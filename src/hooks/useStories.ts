import { useQuery } from '@tanstack/react-query'
import { hackerNewsApi } from '../api/hackerNews'
import { StoryType } from '../types/news'

export const useStories = (type: StoryType = 'top', limit: number = 30) => {
  return useQuery({
    queryKey: ['stories', type, limit],
    queryFn: () => hackerNewsApi.getStories(type, limit),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false
  })
}