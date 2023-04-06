import {Routes, Route } from 'react-router-dom';

import HomePage from './components/HomePage/HomePage';
import StoryPage from './components/StoryPage/StoryPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/story/:id" element={<StoryPage />}/>
    </Routes>
  );
}

export default App;


