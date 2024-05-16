import './css/index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './view/Home';
//  



function App() {

                                

  return (
    <>  
      <BrowserRouter>
        <Routes>
          <Route index path='zodiac-game' element={<Home />} />
        </Routes>
      </BrowserRouter>
      
        
    </>
  )
}

export default App
