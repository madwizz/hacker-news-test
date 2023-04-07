import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, CircularProgress, Link, Typography } from '@mui/material';
import { getStory, getComments } from '../../api';
import { Story, Comment } from '../../types';
import CommentSection from '../CommentSection/CommentSection';

interface StoryPageProps {
  id: string;
  getShortenedUrl: (url: string) => string;
  [key: string]: any;
}

const StoryPage = ({ getShortenedUrl }: StoryPageProps) => {
  const { id } = useParams<StoryPageProps>();
  const [story, setStory] = useState<Story | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [refreshComments, setRefreshComments] = useState<boolean>(false);
  const [isLoadingStory, setIsLoadingStory] = useState<boolean>(true);
  const [isLoadingComments, setIsLoadingComments] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      setIsLoadingStory(true);
      setIsLoadingComments(true);
      getStory(parseInt(id)).then((data) => {
        setStory(data);
        setIsLoadingStory(false);
      });
      getComments(parseInt(id)).then((data) => {
        setComments(data);
        setIsLoadingComments(false);
      });
    }
  }, [id, refreshComments]);

  const handleRefreshComments = () => {
    setRefreshComments((prevState) => !prevState);
  };

  return (
    <Box sx={{ margin: '1rem' }}>
      {isLoadingStory ? (
        <CircularProgress />
      ) : (
        <>
          {story && (
            <Box sx={{ marginBottom: '2rem' }}>


              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h4" sx={{ marginBottom: '1rem' }}>
                  {story.title}
                </Typography>                
                <Button 
                  variant="outlined" 
                  onClick={() => window.location.reload()}>
                    Refresh Comments
                </Button>
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
                  <Typography variant="subtitle1" color="text.secondary">
                    {`${story.descendants ?? 0} comments`}
                  </Typography>

                </Box>


              {story.url && (
                <a 
                  href={story.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                                    >
                    <Typography 
                      variant="caption" 
                      sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' }, cursor: 'pointer', fontSize: 'inherit' }}
                      >
                      ({getShortenedUrl(story.url)})
                    </Typography>
                </a>
              )}
            </Box>
          )}
          {isLoadingComments ? (
            <CircularProgress />
          ) : (
            <>
              {comments && comments.length > 0 ? (
                <>
                  <CommentSection
                    commentIds={comments.map((comment) => comment.id)}
                    refreshComments={refreshComments}
                    handleRefreshComments={handleRefreshComments}
                  />
                </>
              ) : (
                <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
                  No comments yet
                </Typography>
              )}
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default StoryPage;
