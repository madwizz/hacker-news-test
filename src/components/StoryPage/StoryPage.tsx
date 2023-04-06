import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import { CircularProgress, Typography } from '@mui/material';

import { Story } from '../../types';

const StoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const [story, setStory] = useState<Story | null>(null);

  useEffect(() => {
    const fetchStory = async () => {
      const response = await axios.get<Story>(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
      setStory(response.data);
    };

    fetchStory();
  }, [id]);

  if (!story) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Typography variant="h4" component="h1">
        {story.title}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        by {story.by} on {new Date(story.time * 1000).toLocaleString()}
      </Typography>
      <Typography variant="subtitle2" color="textSecondary">
        {story.score} points
      </Typography>
      {story.text && <Typography variant="body1">{story.text}</Typography>}
      {story.url && (
        <Typography variant="body1">
          <a href={story.url} target="_blank" rel="noreferrer">
            {story.url}
          </a>
        </Typography>
      )}
      {story.kids?.length > 0 && (
        <Typography variant="subtitle1" component="h2" sx={{ mt: 2 }}>
          Comments:
        </Typography>
      )}
    </div>
  );
};

export default StoryPage;


