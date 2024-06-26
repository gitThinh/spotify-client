import { useContext } from "react"
import { Link } from "react-router-dom"
import { FaHeadphonesAlt } from 'react-icons/fa'

import { SelectOptionsSong } from "/src/constants/components"
import { urlApiImg } from '/src/constants/env'
import { PlaySongContext, actions, methodsHandlePlaylists } from '/src/constants/stores'
import formatTime from '/src/utils/formatTime'


import '/src/components/SongLine/style.css'


const SongLine = ({ song, selectSongInRcm, index, check, showPlaylist, playList }) => {

    const [playingState, dispatch] = useContext(PlaySongContext)
    const handlePlaylists = useContext(methodsHandlePlaylists)


    return (
        <div
            className="songs_line noone_coppy"
            onDoubleClick={() =>
                check === 1
                    ? dispatch(actions.songsPlay(song))
                    : selectSongInRcm(song, index)
            }
        >
            <p className="index_number content_center">{index + 1}</p>
            <img className="songs_thumb" src={`${urlApiImg + song.coverArt}`} />
            <div className="songs_details">
                <div className="songs_title">
                    <Link to={`/songs/${song._id}`}>
                        <h3 className="songs_title oneline_text under_link" >{song.title}</h3>
                    </Link>
                </div>
                <p className="songs_author under_link">{song.artist_name}</p>
            </div>
            <div className="songs_view">
                <p className="songs_count content_center">{song.views || 0}<FaHeadphonesAlt className="songs_count_icon" /></p>
                <p className="songs_timer content_center">{formatTime(song.duration)}</p>
                <SelectOptionsSong song={song} showPlaylist={showPlaylist} playList={playList} />
            </div>
        </div>
    )
}

export default SongLine