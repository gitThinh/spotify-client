import { SONGS_PLAY, PLAYLIST_PLAY, ADD_TO_QUEUE, NEXT_SONG, PREV_SONG } from './constants'


export const initState = {
    playingSong: ' ',
    currentIndex: 0,
    playingList: []
}

const playSongReducer = (state = initState, action) => {
    let newState
    switch (action.type) {
        case SONGS_PLAY:
            newState = {
                ...state,
                playingSong: action.payload,
                playingList: [action.payload]
            }
            break
        case PLAYLIST_PLAY:
            newState = {
                ...state,
                playingSong: action.payload[0],
                playingList: [...action.payload]
            }
            break
        case ADD_TO_QUEUE:
            newState = {
                ...state,
                playingList: [...state.playingList, ...action.payload]
            }
            break
        case NEXT_SONG:
            newState = {
                ...state,
                currentIndex: state.currentIndex + 1,
                playingSong: state.playingList[state.currentIndex + 1]
            }
            break
        case PREV_SONG:
            newState = {
                ...state,
                currentIndex: state.currentIndex - 1,
                playingSong: state.playingList[state.currentIndex - 1]
            }
            break
        default:
            throw new Error(`Invalid actions, ${action}`)
    }
    return newState
}

export default playSongReducer