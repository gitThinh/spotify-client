import { SONGS_PLAY, PLAYLIST_PLAY, ADD_TO_QUEUE, NEXT_SONG, PREV_SONG, SELECT_SONG_PLAY } from './constants'

const songsPlay = payload => {
    return {
        type: SONGS_PLAY,
        payload
    }
}

const playlistPlay = payload => {
    return {
        type: PLAYLIST_PLAY,
        payload
    }
}

const addToQueue = payload => {
    return {
        type: ADD_TO_QUEUE,
        payload
    }
}

const nextSong = () => {
    return {
        type: NEXT_SONG
    }
}

const prevSong = () => {
    return {
        type: PREV_SONG
    }
}

const selectSongPlay = payload => {
    return {
        type: SELECT_SONG_PLAY,
        payload
    }
}

export { songsPlay, playlistPlay, addToQueue, nextSong, prevSong, selectSongPlay }
