import { SONGS_PLAY, PLAYLIST_PLAY, ADD_TO_QUEUE, NEXT_SONG, PREV_SONG, SELECT_SONG_PLAY } from './constants'


export const initState = {
    playingSong: '',
    currentIndex: 0,
    playingList: []
}

const playSongReducer = (state = initState, action) => {
    console.log(action);
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
            newState =
                action.payload.length
                    ? {
                        ...state,
                        playingList: [...state.playingList, ...action.payload]
                    }
                    : {
                        ...state,
                        playingList: [...state.playingList, action.payload]
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
            const newIndex = state.currentIndex - 1 > 0 ? state.currentIndex - 1 : 0
            console.log(newIndex)
            newState = {
                ...state,
                currentIndex: newIndex,
                playingSong: state.playingList[newIndex]
            }
            break
        case SELECT_SONG_PLAY:
            newState = {
                ...state,
                playingSong: state.playingList[action.payload],
                currentIndex: action.payload
            }
            break
        default:
            throw new Error(`Invalid actions, ${action}`)
    }
    return newState
}

export default playSongReducer