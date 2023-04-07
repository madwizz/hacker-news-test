import {Routes, Route } from 'react-router-dom';

import HomePage from './components/HomePage/HomePage';
import StoryPage from './components/StoryPage/StoryPage';

const getShortenedUrl = (urlString: string): string => {
  const url = new URL(urlString);
  const hostname = url.hostname.replace('www.', '');
  const domain = hostname.split('.')[0];
  return domain + '.com';
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage getShortenedUrl={getShortenedUrl} />}/>
      <Route path="/story/:id" element={<StoryPage getShortenedUrl={getShortenedUrl}/>}/>
    </Routes>
  );
}

export default App;