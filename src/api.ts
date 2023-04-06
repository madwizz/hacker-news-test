import axios, { AxiosResponse } from 'axios';

import { Story } from './types';

export const getNewStories = async (): Promise<Story[]> => {
  const response: AxiosResponse<number[]> = await axios.get('https://hacker-news.firebaseio.com/v0/newstories.json');
  const storyIds: number[] = response.data.slice(0, 10);
  const storyRequests: Promise<AxiosResponse<Story, any>>[] = storyIds.map((id) =>
  axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
);
  const stories: AxiosResponse<Story>[] = await Promise.all(storyRequests);
  return stories.map((story) => story.data);
};