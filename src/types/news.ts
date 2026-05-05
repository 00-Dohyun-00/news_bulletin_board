export interface Story {
  id: number
  title: string
  url?: string
  text?: string
  by: string
  time: number
  descendants?: number
  score?: number
  kids?: number[]
  type: 'story' | 'comment' | 'job' | 'poll' | 'pollopt'
}

export interface Comment {
  id: number
  by?: string
  kids?: number[]
  parent: number
  text?: string
  time: number
  type: 'comment'
}

export type StoryType = 'top' | 'new' | 'best'

export interface NewsState {
  stories: Story[]
  loading: boolean
  error: string | null
}