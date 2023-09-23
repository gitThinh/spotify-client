import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'



const SongBox = (prop) => {
    const song = prop.data
    // Alan Walker - Faded.mp3
    

    // --------------------------------------- RENDER ------------------------------------

    return (
        <Link to={`/songs/${song._id}`}>
            <SkeletonTheme baseColor="#444" highlightColor="#888">
                <div className="songsBox">
                    {song !== '' ? <img className="songsThumb" src={`http://nth-audio.site/${song.coverArt}`} crossOrigin="anonymous"/> : <Skeleton height={155}/>}
                    <div className="detailSong">
                        <h3 className="songsTitle">{song.title}</h3>
                        <p className="songsAuthor">{song.artist_name}</p>
                    </div>
                </div>
            </SkeletonTheme>
        </Link>

    )

}

export default SongBox;