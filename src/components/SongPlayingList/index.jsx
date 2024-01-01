import { useRef } from "react"
import { Link } from "react-router-dom"
import { FaHeadphonesAlt } from 'react-icons/fa'
import { FaPlay } from "react-icons/fa6"

import { SelectOptions } from "/src/constants/components"
import { urlApiImg } from '/src/constants/env'
import formatTime from '/src/utils/formatTime'


const SongPlayingList = ({ song, index, currentIndex, playSongInPL }) => {

    return (
        <div key={index}
            className={index === currentIndex ? 'active_song songs_line noone_coppy' : 'songs_line noone_coppy'}
            onDoubleClick={() => { playSongInPL(index) }}
        >
            {
                index !== currentIndex ?
                    <p className="content_center">{index + 1}</p>
                    :
                    <div className="content_center">
                        <FaPlay style={{ color: '#1ED760' }} size={15} />
                    </div>
            }
            <img className="songs_thumb" src={`${urlApiImg + song.coverArt}`} />
            <div className="songs_details">
                <Link to={`/songs/${song._id}`}><h3 className="songs_title oneline_text under_link" >{song.title}</h3></Link>
                <p className="songs_author under_link">{song.artist_name}</p>
            </div>
            <p className="songs_count content_center">{song.views}<FaHeadphonesAlt size={14} /></p>
            <p className="songs_timer content_center">{formatTime(song.duration)}</p>
            <SelectOptions song={song}/>
        </div>
    )
}

export default SongPlayingList