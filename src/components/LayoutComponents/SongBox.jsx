import { Link } from 'react-router-dom'

const urlApiImg = import.meta.env.VITE_API_URL_IMG

const SongBox = ({ song, addToPlayingList}) => {

    // --------------------------------------- RENDER ------------------------------------

    return (
        <Link to={`/songs/${song._id}`}>
                <div className="songsBox">
                    <img className="songsThumb" src={`${urlApiImg + song.coverArt}`} crossOrigin="anonymous" />
                    <div className="detailSong">
                        <h3 className="songsTitle onelineText">{song.title}</h3>
                        <p className="songsAuthor onelineText">{song.artist_name}</p>
                    </div>
                    <button className="startSong"
                        onClick={(e) => {
                            e.preventDefault()
                            addToPlayingList(song)
                        }}
                    >
                        <i className="fa-solid fa-play" style={{fontSize:'16px'}}></i>
                    </button>
                </div>
        </Link>
    )

}

export default SongBox;