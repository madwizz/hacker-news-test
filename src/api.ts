import axios, { AxiosResponse } from 'axios';
import { Comment, Story } from './types';

export const getNewStories = async (): Promise<Story[]> => {
  const response: AxiosResponse<number[]> = await axios.get('https://hacker-news.firebaseio.com/v0/newstories.json');
  const storyIds: number[] = response.data.slice(0, 100);
  const storyRequests: Promise<AxiosResponse<Story, any>>[] = storyIds.map((id) =>
    axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
  );
  const stories: AxiosResponse<Story>[] = await Promise.all(storyRequests);
  return stories.map((story) => story.data);
};

export const getStory = async (id: number): Promise<Story> => {
  const response = await axios.get<Story>(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
  return response.data;
};

export const getComments = async (id: number): Promise<Comment[]> => {
  const response = await axios.get<Comment>(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
  const commentIds = response.data?.kids || [];
  const commentRequests = commentIds.map((id) => axios.get<Comment>(`https://hacker-news.firebaseio.com/v0/item/${id}.json`));
  const comments = await Promise.all(commentRequests).then((responses) => responses.map((response) => response.data));
  return comments;
};

export const getComment = async (id: number): Promise<Comment> => {
  const response = await axios.get<Comment>(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
  return response.data;
};

export const getCommentsCount = async (id: number): Promise<number> => {
  const response = await axios.get<Story>(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
  const story = response.data;
  return story.kids ? story.kids.length : 0;
};

