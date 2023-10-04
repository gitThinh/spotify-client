import { Link } from "react-router-dom"

const urlApiImg = import.meta.env.VITE_API_URL_IMG


const SongLine = ({ song, updatePlayingSong, index, deletePlayingList }) => {

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
        <div className="songsLine" key={index} onDoubleClick={(changeSong)}>
            <p className="songsIndex typeCenter">{index >= 0 ? index + 1 : ''}</p>
            <img className="songsThumb" src={`${urlApiImg + song.coverArt}`} crossOrigin="anonymous" />
            <div className="songsDetails">
                <Link to={`/songs/${song._id}`}><h3 className="songsTitle onelineText underLink" >{song.title}</h3></Link>
                <p className="songsAuthor underLink">{song.artist_name}</p>
            </div>
            <p className="songsCount typeCenter">{song.views}</p>
            <p className="songsTimer typeCenter">{formatTime(song.duration)}</p>
            <button className="songsRemove typeCenter"
                onClick={() => {
                    deletePlayingList &&
                    deletePlayingList(index)
                }}>
                <i className="fa-solid fa-xmark"></i>
            </button>
        </div>
    )
}

export default SongLine