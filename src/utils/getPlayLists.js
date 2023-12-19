const urlApiAudioServer = import.meta.env.VITE_API_URL_AUDIOSERVER
const apiKey = import.meta.env.VITE_API_API_KEY

const handleGetPlaylists = (tokens, user, setShowPlaylist) => {
    fetch(`${urlApiAudioServer}user/playLists`, {
        headers: {
            'x-api-key': apiKey,
            'Authorization': tokens.accessToken,
            'x-client-id': user.userId
        }
    })
        .then(response => response.json())
        .then(data => {
            data.statusCode === 200 &&
                setShowPlaylist(prev => prev !== data.metadata.playLists && data.metadata.playLists)
        })
}

export default handleGetPlaylists