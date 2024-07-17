import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './view/Home.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/zodiac-game" element={<Home />} />
        </Routes>
     </BrowserRouter>
    </ErrorBoundary>

  );
}

export default App;
