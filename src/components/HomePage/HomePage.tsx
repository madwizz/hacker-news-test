import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, CircularProgress, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Story } from '../../types';
import { getNewStories } from '../../api';

const HomePage = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getNewStories().then((data: Story[]) => {
      setStories(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <Box sx={{ margin: '1rem' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h4">Hacker News</Typography>
        <Button variant="outlined" onClick={() => window.location.reload()}>Refresh</Button>
      </Box>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <List sx={{ width: '100%', bgcolor: 'background.paper', marginTop: '1rem' }}>
          {stories.map((story) => (
            <ListItem key={story.id} disablePadding>
              <Link to={`/story/${story.id}`}>
                <ListItemText primary={story.title} secondary={`by ${story.by} on ${new Date(story.time * 1000).toLocaleString()}`} />
              </Link>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}

export default HomePage;
