import { useQuery } from '@tanstack/react-query'
import { hackerNewsApi } from '../api/hackerNews'

export const useStory = (id: number) => {
  return useQuery({
    queryKey: ['story', id],
    queryFn: () => hackerNewsApi.getStory(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false
  })
}