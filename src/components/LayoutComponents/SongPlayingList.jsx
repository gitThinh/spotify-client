import { Link } from "react-router-dom"

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
                        <i className="fa-solid fa-play"></i>
                    </div>
            }
            <img className="songsThumb" src={`${urlApiImg + song.coverArt}`} crossOrigin="anonymous" />
            <div className="songsDetails">
                <Link to={`/songs/${song._id}`}><h3 className="songsTitle onelineText underLink" >{song.title}</h3></Link>
                <p className="songsAuthor underLink">{song.artist_name}</p>
            </div>
            <p className="songsCount typeCenter">{song.views}</p>
            <p className="songsTimer typeCenter">{formatTime(song.duration)}</p>
        </div>
    )
}

export default SongPlayingList