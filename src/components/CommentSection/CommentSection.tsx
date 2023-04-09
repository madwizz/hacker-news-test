import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { Comment } from '../../types';

interface CommentSectionProps {
  commentIds: number[];
  handleRefreshComments: () => void;
  refreshComments: boolean;
}

const CommentSection = ({ commentIds, refreshComments, handleRefreshComments }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [expandedComments, setExpandedComments] = useState<number[]>([]);

  useEffect(() => {
    setLoading(true);

    const fetchComments = async () => {
      const commentRequests: Promise<any>[] = commentIds.map((id) =>
        axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      );
      const commentResponses: any[] = await Promise.all(commentRequests);
      const commentsData: Comment[] = commentResponses.map((response) => response.data);
      setComments(commentsData);
      setLoading(false);
    };

    fetchComments();
  }, [commentIds]);

  const handleExpandClick = (commentId: number) => {
    if (!expandedComments.includes(commentId)) {
      setExpandedComments([...expandedComments, commentId]);
    } else {
      setExpandedComments(expandedComments.filter((id) => id !== commentId));
    }
  };

  const renderComment = (comment: Comment, depth: number) => {
    const hasChildren = comment.kids && comment.kids.length > 0;
    const isExpanded = expandedComments.includes(comment.id);

    return (
      <Box key={comment.id} sx={{ pl: depth * 2, pt: 2, pb: 1, backgroundColor: '#f4f4f4', py: 2, marginBottom: '10px', padding: '5px', borderRadius: '10px' }}>
        <Typography variant="subtitle1" color="text.secondary" sx={{ fontSize: '12px' }}>
          by {comment.by} on {new Date(comment.time * 1000).toLocaleString()}
        </Typography>
        <Typography variant="body1" dangerouslySetInnerHTML={{ __html: comment.text }} />
        {hasChildren && (
          <>
            <Button variant="outlined" onClick={() => handleExpandClick(comment.id)} sx={{ mt: 1, fontSize: '10px' }}>
              {isExpanded ? 'Hide replies' : 'Show replies'}
            </Button>
            {isExpanded && (
              <Box sx={{ pl: 2 }}>
                <CommentSection 
                  commentIds={comment.kids}
                  refreshComments={refreshComments}
                  handleRefreshComments={handleRefreshComments} 
                />
              </Box>
            )}
          </>
        )}
      </Box>
    );
  };

  return (
    <Box>
      {loading ? (
        <Typography variant="body1">
          <CircularProgress />
        </Typography>
      ) : (
        comments.map((comment) => renderComment(comment, 0))
      )}
    </Box>
  );
};

export default CommentSection;



