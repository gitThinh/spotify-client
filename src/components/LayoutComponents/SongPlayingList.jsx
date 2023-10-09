import { Link } from "react-router-dom"
import { FaPlay, FaHeadphonesAlt } from 'react-icons/fa'

const urlApiImg = import.meta.env.VITE_API_URL_IMG


const SongPlayingList = ({ song, index, currentIndex, playSongInPL}) => {

    function formatTime(timeInSeconds) {
        const minutes = Math.floor(timeInSeconds / 60)
        const seconds = Math.floor(timeInSeconds % 60)
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    }


    return (
        <div key={index} className={index === currentIndex ? 'activeSong songsLine' : 'songsLine'} onDoubleClick={() => { playSongInPL(index) }}>
            {
                index !== currentIndex ?
                    <p className="songsIndex typeCenter">{index + 1}</p>
                    :
                    <div className="typeCenter">
                        <FaPlay style={{color:'#1ED760'}} size={15}/>
                    </div>
            }
            <img className="songsThumb" src={`${urlApiImg + song.coverArt}`} crossOrigin="anonymous" />
            <div className="songsDetails">
                <Link to={`/songs/${song._id}`}><h3 className="songsTitle onelineText underLink" >{song.title}</h3></Link>
                <p className="songsAuthor underLink">{song.artist_name}</p>
            </div>
            <p className="songsCount typeCenter" style={{gap:'5px'}}>{song.views}<FaHeadphonesAlt size={14}/></p>
            <p className="songsTimer typeCenter">{formatTime(song.duration)}</p>
        </div>
    )
}

export default SongPlayingList