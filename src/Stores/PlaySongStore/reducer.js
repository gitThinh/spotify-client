import { SONGS_PLAY, PLAYLIST_PLAY, ADD_TO_QUEUE, NEXT_SONG, PREV_SONG, SELECT_SONG_PLAY } from './constants'


const initState = {
    playingSong: '',
    currentIndex: 0,
    playingList: [],
    isNewPlaying: false
}

const playSongReducer = (state = initState, action) => {
    console.log(action);
    let newState
    switch (action.type) {
        case SONGS_PLAY:
            newState = {
                ...state,
                currentIndex: 0,
                playingSong: action.payload,
                playingList: [action.payload],
                isNewPlaying: true
            }
            break
        case PLAYLIST_PLAY:
            newState = {
                ...state,
                currentIndex: 0,
                playingSong: action.payload[0],
                playingList: [...action.payload],
                isNewPlaying: true
            }
            break
        case ADD_TO_QUEUE:
            const payloadItem = action.payload
            const uniqueNewItems = payloadItem.length && payloadItem.filter(item => !state.playingList.includes(item))

            newState =
                action.payload.length
                    ? {
                        ...state,
                        playingList: [...state.playingList, ...uniqueNewItems],
                        isNewPlaying: false
                    }
                    : {
                        ...state,
                        playingList:
                            !state.playingList.includes(payloadItem)
                                ? [...state.playingList, action.payload]
                                : [...state.playingList],
                        isNewPlaying: false
                    }
            break
        case NEXT_SONG:
            newState = {
                ...state,
                currentIndex: state.currentIndex + 1,
                playingSong: state.playingList[state.currentIndex + 1],
                isNewPlaying: false
            }
            break
        case PREV_SONG:
            const newIndex = state.currentIndex - 1 > 0 ? state.currentIndex - 1 : 0
            console.log(newIndex)
            newState = {
                ...state,
                currentIndex: newIndex,
                playingSong: state.playingList[newIndex],
                isNewPlaying: false
            }
            break
        case SELECT_SONG_PLAY:
            newState = {
                ...state,
                playingSong: state.playingList[action.payload],
                currentIndex: action.payload,
                isNewPlaying: false
            }
            break
        default:
            throw new Error(`Invalid actions, ${action}`)
    }
    return newState
}

export { initState }
export default playSongReducer