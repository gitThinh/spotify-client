import { createContext } from "react"
import { useReducer } from 'react'

import * as actions from './actions'
import reducer, { initState } from './reducer'

const PlaySongContext = createContext()

const PlaySongProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initState)

    return (
        <PlaySongContext.Provider value={[state, dispatch]}>
            {children}
        </PlaySongContext.Provider>
    )
}

export { PlaySongContext, actions }
export default PlaySongProvider