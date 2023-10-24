import { Link } from "react-router-dom"
import { FaHeadphonesAlt } from 'react-icons/fa'

const urlApiImg = import.meta.env.VITE_API_URL_IMG


const SongLine = ({ song, addToPlayingList, index }) => {

    function formatTime(timeInSeconds) {
        const minutes = Math.floor(timeInSeconds / 60)
        const seconds = Math.floor(timeInSeconds % 60)
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    }


    return (
        <div className="songsLine" onDoubleClick={() => addToPlayingList(song, index)}>
            <p className="songsIndex typeCenter">{index + 1}</p>
            <img className="songsThumb" src={`${urlApiImg + song.coverArt}`} />
            <div className="songsDetails">
                <Link to={`/songs/${song._id}`}><h3 className="songsTitle onelineText underLink" >{song.title}</h3></Link>
                <p className="songsAuthor underLink">{song.artist_name}</p>
            </div>
            <p className="songsCount typeCenter" style={{gap:'5px'}}>{song.views}<FaHeadphonesAlt size={14}/></p>
            <p className="songsTimer typeCenter">{formatTime(song.duration)}</p>
        </div>
    )
}

export default SongLine