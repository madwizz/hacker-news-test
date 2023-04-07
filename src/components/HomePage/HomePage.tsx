import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, CircularProgress, List, ListItem, Typography } from '@mui/material';
import { Story } from '../../types';
import { getNewStories } from '../../api';

const HomePage = ({ getShortenedUrl }: { getShortenedUrl: (urlString: string) => string }) => {
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
        <Button variant="outlined" onClick={() => window.location.reload()}>Refresh News</Button>
      </Box>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', cursor: 'pointer' }}>
          <CircularProgress />
        </Box>
      ) : (
        <List sx={{ width: '100%', bgcolor: 'background.paper', marginTop: '1rem' }}>
          {stories.map((story) => (
            <ListItem 
              key={story.id} 
              disablePadding 
              sx={{ backgroundColor: '#f4f4f4', padding: '10px', mb: '10px' }}
            >
              {/* '&:hover': { backgroundColor: '#f4f4f4' } */}
              <Box sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                    <Link to={`/story/${story.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <Typography variant="h6" component="h2">{story.title}</Typography>
                    </Link>

                    {story.url && (
                      <a 
                        href={story.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none' }}
                      >
                        <Typography variant="caption" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' }, cursor: 'pointer', fontSize: 'inherit' }}>
                          ({getShortenedUrl(story.url)})
                        </Typography>
                      </a>
                    )}
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '10px' , py: 1 }}>
                  <Typography variant="subtitle1" color="text.secondary">
                    {`by ${story.by}`}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {`on ${new Date(story.time * 1000).toLocaleString()}`}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                      {`${story.score} rating`}
                    </Typography>
                  <a 
                    href={`/story/${story.id}`} 
                    style={{ textDecoration: 'none' }}
                  >
                    <Typography variant="subtitle1" color="text.secondary" sx={{ '&:hover': { textDecoration: 'underline' }, cursor: 'pointer' }}>
                      {`${story.descendants ?? 0} comments`}
                    </Typography>
                  </a>
                </Box>
              </Box>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}

export default HomePage

