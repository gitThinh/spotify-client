import { useRef } from "react"
import { Link } from "react-router-dom"
import { FaHeadphonesAlt } from 'react-icons/fa'

import { SelectOptions } from "/src/constants/components"
import { urlApiImg } from '/src/constants/env'
import formatTime from '/src/utils/formatTime'


import '/src/components/SongLine/style.css'


const SongLine = ({ song, addToPlayingList, changePlayingList, index, check }) => {



    return (
        <div className={check === 1 ? "songs_line_search songs_line noone_coppy" : "songs_line noone_coppy"}
            onDoubleClick={() => check === 1 ? changePlayingList(song) : addToPlayingList(song, index)}
        >
            {!check && <p className="index_number content_center">{index + 1}</p>}
            <img className="songs_thumb" src={`${urlApiImg + song.coverArt}`} />
            <div className="songs_details">
                <div className="songs_title">
                    <Link to={`/songs/${song._id}`}>
                        <h3 className="songs_title oneline_text under_link" >{song.title}</h3>
                    </Link>
                </div>
                <p className="songs_author under_link">{song.artist_name}</p>
            </div>
            <p className="songs_count content_center">{song.views}<FaHeadphonesAlt className="songs_count_icon" /></p>
            <p className="songs_timer content_center">{formatTime(song.duration)}</p>
            <SelectOptions song={song} />
        </div>
    )
}

export default SongLine