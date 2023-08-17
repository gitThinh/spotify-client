import { useState } from 'react'
import './App.css'
import LoginPages from './pages/LoginPages'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <LoginPages/>
    </>
  )
}

export default App
