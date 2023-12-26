import { useRef } from "react"
import { Link } from "react-router-dom"
import { FaHeadphonesAlt } from 'react-icons/fa'
import { HiDotsHorizontal } from "react-icons/hi"
import { FaPlus, FaPlay, FaMusic, FaUserPen } from "react-icons/fa6"

import { urlApiImg } from '/src/constants/env'
import formatTime from '/src/utils/formatTime'


import '/src/components/SongLine/style.css'


const SongLine = ({ song, addToPlayingList, index }) => {

    const moreOptionTable = useRef()
    const moreOption = useRef()


    const showOptionTable = () => {
        if (moreOptionTable.current.style.display !== 'block') {
            moreOptionTable.current.style.display = 'block'
        } else {
            moreOptionTable.current.style.display = 'none'
        }
    }

    const handleClick = (e) => {
        if (!moreOption.current.contains(e.target))
            moreOptionTable.current.style.display = 'none'
    }


    return (
        <div className="songs_line noone_coppy"
            onDoubleClick={() => addToPlayingList(song, index)}
            onClick={(e) => handleClick(e)}
            onMouseLeave={() => moreOptionTable.current.style.display = 'none'}
        >
            <p className="content_center">{index + 1}</p>
            <img className="songs_thumb" src={`${urlApiImg + song.coverArt}`} />
            <div className="songs_details">
                <Link to={`/songs/${song._id}`}><h3 className="songs_title oneline_text under_link" >{song.title}</h3></Link>
                <p className="songs_author under_link">{song.artist_name}</p>
            </div>
            <p className="songs_count content_center">{song.views}<FaHeadphonesAlt className="songs_count_icon" /></p>
            <p className="songs_timer content_center">{formatTime(song.duration)}</p>
            <div className="more_options content_center" ref={moreOption}>
                <HiDotsHorizontal onClick={showOptionTable} />
                <div className="more_options_table" ref={moreOptionTable} >
                    <ul>
                        <li>
                            <button className='more_options_table_option' ><FaPlus className='more_options_table_icon' /> Add to playlist</button>
                        </li>
                        <li>
                            <button className='more_options_table_option' ><FaPlay className='more_options_table_icon' /> Playing song</button>
                        </li>
                        <li>
                            <a href='/' className='more_options_table_option' ><FaMusic className='more_options_table_icon' /> Go to song page</a>
                        </li>
                        <li>
                            <a href='/' className='more_options_table_option' ><FaUserPen className='more_options_table_icon' /> Go to artist page</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SongLine