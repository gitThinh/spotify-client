import { urlApiAudioServer, apiKey } from '/src/constants/env'

const handleGetPlaylists = async (tokens, user) => {
    const playLists = await
    fetch(`${urlApiAudioServer}user/playLists`, {
        headers: {
            'x-api-key': apiKey,
            'Authorization': tokens.accessToken,
            'x-client-id': user.userId
        }
    })
        .then(response => response.json())
        .then(data => {
            return data.statusCode === 200 && data.metadata.playLists
        })
    return playLists
}

export default handleGetPlaylists