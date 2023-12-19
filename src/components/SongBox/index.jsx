import { Link } from 'react-router-dom'
import { FaPlay } from 'react-icons/fa'


import '/src/components/SongBox/style.css'

const urlApiImg = import.meta.env.VITE_API_URL_IMG


const SongBox = ({ song, changePlayingList }) => {
    // --------------------------------------- RENDER ------------------------------------
    return (
        <Link to={`/songs/${song._id}`}>
            <div className="songs_box noone_coppy">
                <img className="songs_thumb" src={`${urlApiImg + song.coverArt}`} />
                <div className="songs_inform">
                    <h3 className="songs_title oneline_text">{song.title}</h3>
                    <p className="songs_author under_link oneline_text">{song.artist_name}</p>
                </div>
                <button className="play_button"
                    onClick={(e) => {
                        e.preventDefault()
                        changePlayingList(song)
                    }}
                >
                    <FaPlay className='play_button_icon' />
                </button>
            </div>
        </Link>
    )

}

export default SongBox;