import { SONGS_PLAY, PLAYLIST_PLAY, ADD_TO_QUEUE, NEXT_SONG, PREV_SONG } from './constants'

export const songsPlay = payload => {
    return {
        type: SONGS_PLAY,
        payload
    }
}

export const playlistPlay = payload => {
    return {
        type: PLAYLIST_PLAY,
        payload
    }
}

export const addToQueue = payload => {
    return {
        type: ADD_TO_QUEUE,
        payload
    }
}

export const nextSong = () => {
    return {
        type: NEXT_SONG
    }
}

export const prevSong = () => {
    return {
        type: PREV_SONG
    }
}
