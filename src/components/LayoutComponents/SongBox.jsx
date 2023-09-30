import { Link } from 'react-router-dom'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'



const SongBox = ({ song, updatePlayingList}) => {

    // --------------------------------------- RENDER ------------------------------------

    return (
        <Link to={`/songs/${song._id}`}>
            <SkeletonTheme baseColor="#444" highlightColor="#888">
                <div className="songsBox">
                    <img className="songsThumb" src={`http://nth-audio.site/api/audio-server/${song.coverArt}`} crossOrigin="anonymous" />
                    <div className="detailSong">
                        <h3 className="songsTitle onelineText">{song.title}</h3>
                        <p className="songsAuthor">{song.artist_name}</p>
                    </div>
                    <button className="startSong"
                        onClick={(e) => {
                            e.preventDefault()
                            updatePlayingList(song, 1)
                        }}
                    >
                        <i className="fa-solid fa-play" style={{fontSize:'16px'}}></i>
                    </button>
                </div>
            </SkeletonTheme>
        </Link>
    )

}

export default SongBox;