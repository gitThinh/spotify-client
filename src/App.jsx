import 'react-loading-skeleton/dist/skeleton.css'

import Routing from '/src/routes/Routing'

import { PlaySongProvider } from '/src/constants/stores'

import './App.css'


function App() {

  return (
    <PlaySongProvider>
      <Routing />
    </PlaySongProvider>
  )
}

export default App
