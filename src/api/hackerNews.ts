import { Story, StoryType } from '../types/news'

const BASE_URL = 'https://hacker-news.firebaseio.com/v0'

export const hackerNewsApi = {
  async getStoryIds(type: StoryType = 'top', limit: number = 30): Promise<number[]> {
    let endpoint: string
    
    switch (type) {
      case 'top':
        endpoint = `${BASE_URL}/topstories.json`
        break
      case 'new':
        endpoint = `${BASE_URL}/newstories.json`
        break
      case 'best':
        endpoint = `${BASE_URL}/beststories.json`
        break
      default:
        endpoint = `${BASE_URL}/topstories.json`
    }
    
    const response = await fetch(endpoint)
    const ids: number[] = await response.json()
    return ids.slice(0, limit)
  },

  async getStory(id: number): Promise<Story> {
    const response = await fetch(`${BASE_URL}/item/${id}.json`)
    const story: Story = await response.json()
    return story
  },

  async getStories(type: StoryType = 'top', limit: number = 30): Promise<Story[]> {
    const ids = await this.getStoryIds(type, limit)
    const stories = await Promise.all(
      ids.map(id => this.getStory(id))
    )
    return stories.filter(story => story && story.type === 'story')
  }
}