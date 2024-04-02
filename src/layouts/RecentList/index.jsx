import { useEffect, useState, useContext } from 'react'

import { PiDotOutlineFill } from 'react-icons/pi'
import { FaPlay, FaMusic } from 'react-icons/fa6'

import { urlApiAudioServer, apiKey } from '/src/constants/env'
import { LoadingPage } from '/src/constants/layouts'
import { SelectOptionsPlaylist, TableSongList } from "/src/constants/components"
import { PlaySongContext, actions, methodsHandlePlaylists } from '/src/constants/stores'

const index = ({ user, tokens, showPlaylist }) => {
    const [playingState, dispatch] = useContext(PlaySongContext)
    const handlePlaylists = useContext(methodsHandlePlaylists)

    const [arrSongs, setArrSongs] = useState([])

    useEffect(() => {
        fetch(`${urlApiAudioServer}user/playLists/recent`, {
            headers: {
                'x-api-key': apiKey,
                'Authorization': tokens.accessToken,
                'x-client-id': user.userId
            }
        })
            .then(respone => respone.json())
            .then(data => {
                setArrSongs(data.metadata)
            })
            .catch(err => { throw new Error(err) })
    }, [])


    return (
        arrSongs.length > 0 ?
            <div style={{ paddingTop: '10px' }}>
                {/* <h1 style={{ textAlign: 'center' }}>Nghe gần đây</h1> */}
                <div className="header_playlistpage">
                    <div className="thumb_playlist noone_coppy">
                        <FaMusic size={100} />
                    </div>
                    <div className="detail_playlist">
                        <p className="type_detail">Playlist</p>
                        <p className="title_playlist oneline_text">Nghe gần đây</p>
                        <div className="author_playlist">
                            <img className="user_avt" src="https://nth-audio.site/images/avt.jpg" />
                            <p className="user_name">{user.userName}</p>
                            <PiDotOutlineFill />
                            <p>20 bài hát</p>
                        </div>
                    </div>
                </div>
                <div className="body_songpage">
                    <div className="body_page_option">
                        <button className="play_button" onClick={() => arrSongs.length > 0 && dispatch(actions.playlistPlay(arrSongs))}>
                            <FaPlay size={25} color='black'/>
                        </button>
                    </div>
                </div>
                <TableSongList arrSongs={arrSongs} showPlaylist={showPlaylist} />
            </div>
            :
            <LoadingPage />
    )
}

export default index