import { Link } from "react-router-dom"
import { FaHeadphonesAlt } from 'react-icons/fa'

import formatTime from '/src/utils/formatTime'

import '/src/components/SongLine/style.css'

const urlApiImg = import.meta.env.VITE_API_URL_IMG


const SongLine = ({ song, addToPlayingList, index }) => {
    return (
        <div className="songs_line noone_coppy " onDoubleClick={() => addToPlayingList(song, index)}>
            <p className="content_center">{index + 1}</p>
            <img className="songs_thumb" src={`${urlApiImg + song.coverArt}`} />
            <div className="songs_details">
                <Link to={`/songs/${song._id}`}><h3 className="songs_title oneline_text under_link" >{song.title}</h3></Link>
                <p className="songs_author under_link">{song.artist_name}</p>
            </div>
            <p className="songs_count content_center">{song.views}<FaHeadphonesAlt className="songs_count_icon"/></p>
            <p className="songs_timer content_center">{formatTime(song.duration)}</p>
        </div>
    )
}

export default SongLine