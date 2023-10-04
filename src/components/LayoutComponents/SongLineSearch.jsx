import { Link } from "react-router-dom"

const urlApiImg = import.meta.env.VITE_API_URL_IMG


const SongLineSearch = ({ song, updatePlayingSong, index }) => {

    const changeSong = () => {
        updatePlayingSong &&
            updatePlayingSong(index)
    }

    function formatTime(timeInSeconds) {
        const minutes = Math.floor(timeInSeconds / 60)
        const seconds = Math.floor(timeInSeconds % 60)
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    }
    return (
        <div className="songsLineSearch" key={index} onDoubleClick={(changeSong)}>
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

export default SongLineSearch