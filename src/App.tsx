import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './view/Home.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/zodiac-game" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
