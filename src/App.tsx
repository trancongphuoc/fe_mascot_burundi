import { useState } from 'react';
// import './App.css'
import './index.css';
import MyBonusToday from './components/MyBonusToday';
import TopPlayers from './components/TopPlayers';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="first">
      <h1>ZODIAC</h1>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      <MyBonusToday/>
      <TopPlayers/>

    </div>

    </>
  )
}

export default App
