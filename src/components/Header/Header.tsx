import { Box, Button, Typography } from '@mui/material';

interface Props {
  onRefreshClick: () => void;
  isHomePage: boolean;
}

const Header = ({ onRefreshClick, isHomePage }: Props) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
      <Typography variant="h4">Hacker News</Typography>
      {isHomePage ? (
        <Button variant="outlined" onClick={onRefreshClick}>Refresh News</Button>
      ) : (
        <Button variant="outlined" onClick={onRefreshClick}>Refresh Comments</Button>
      )}
    </Box>
  );
};

export default Header;

