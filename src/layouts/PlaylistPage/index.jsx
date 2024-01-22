import { useContext } from "react"
import { useParams } from "react-router-dom"
import Cookies from 'js-cookie'

import { PiDotOutlineFill } from 'react-icons/pi'
import { FaPlay, FaMusic } from 'react-icons/fa6'

import { SelectOptionsPlaylist, SongLine } from "/src/constants/components"
import { PlaySongContext, actions } from '/src/constants/stores'

import './style.css'


const index = ({ changePlayingList, user, showPlaylist, tokens, handlePlaylists }) => {

    const [playingState, dispatch] = useContext(PlaySongContext)

    const id = useParams().id
    let playlists = showPlaylist.length ? showPlaylist : JSON.parse(Cookies.get('playlists'))
    let [playList] =
        playlists.filter((p) => {
            return p._id === id
        })


    // -------------------------------------------- RENDER ------------------------------------------
    return (
        <div className="show_playlist">
            <div className="header_playlistpage">
                <div className="thumb_playlist noone_coppy">
                    <FaMusic size={100}/>
                </div>
                <div className="detail_playlist">
                    <p className="type_detail">Playlist</p>
                    <p className="title_playlist oneline_text">{playList.playListName}</p>
                    <div className="author_playlist">
                        <img className="user_avt" src="https://nth-audio.site/images/avt.jpg" />
                        <p className="user_name">{user.userName}</p>
                        <PiDotOutlineFill />
                        <p>{playList.songs.length} bài hát</p>
                    </div>
                </div>
            </div>
            <div className="body_songpage">
                <div className="body_page_option">
                    <button className="play_button" onClick={() => playList.songs.length > 0 && dispatch(actions.playlistPlay(playList.songs))}>
                        <FaPlay size={25} />
                    </button>
                    <SelectOptionsPlaylist playList={playList} handlePlaylists={handlePlaylists} />
                </div>
                <section className="body_page_option_rcm">
                    {
                        playList.songs.map((song, index) => {
                            return (
                                <div key={index}>
                                    <SongLine
                                        song={song}
                                        check={1}
                                        playList={playList}
                                        handlePlaylists={handlePlaylists}
                                        showPlaylist={playlists}
                                    />
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