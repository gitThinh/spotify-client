import Cookies from 'js-cookie'
import { useParams } from "react-router-dom"
import { PiDotOutlineFill } from 'react-icons/pi'
import { FaPlay } from 'react-icons/fa6'


import { urlApiAudioServer, urlMLServer, apiKey } from '/src/constants/env'
import { SelectOptionsSong, SongLine } from "/src/constants/components"
import handleGetPlaylists from '/src/utils/getPlayLists'

import './style.css'


const index = ({ changePlayingList, user, showPlaylist, tokens, handlePlaylists}) => {
    const id = useParams().id
    let playlists = showPlaylist.length ? showPlaylist : JSON.parse(Cookies.get('playlists'))
    let playList =
        playlists.filter((p) => {
            return p._id === id
    })

    console.log(user, tokens)

    // -------------------------------------------- RENDER ------------------------------------------
    return (
        <div className="show_playlist">
            <div className="header_playlistpage">
                <div className="thumb_playlist noone_coppy">
                    <img src='https://nth-audio.site/images/avt.jpg' />
                </div>
                <div className="detail_playlist">
                    <p className="type_detail">Playlist</p>
                    <p className="title_playlist oneline_text">{playList[0].playListName}</p>
                    <div className="author_playlist">
                        <img className="user_avt" src="https://nth-audio.site/images/avt.jpg" />
                        <p className="user_name">{user.userName}</p>
                        <PiDotOutlineFill />
                        <p>{playList[0].songs.length} bài hát</p>
                    </div>
                </div>
            </div>
            <div className="body_songpage">
                <div className="body_page_option">
                    <button className="play_button" onClick={() => changePlayingList(playList[0].songs)}>
                        <FaPlay size={25} />
                    </button>
                    <SelectOptionsSong playList={playList[0]} handlePlaylists={handlePlaylists}/>
                </div>
                <section className="body_page_option_rcm">
                    {
                        playList[0].songs.map((song, index) => {
                            return (
                                <div key={index}>
                                    <SongLine song={song} check={1} changePlayingList={changePlayingList} />
                                </div>
                            )
                        })
                    }
                </section>
            </div>
        </div>
    )
}

export default index