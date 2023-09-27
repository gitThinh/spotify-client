import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'



const SongBox = (prop) => {
    const song = prop.data

    // --------------------------------------- RENDER ------------------------------------

    return (
        <Link to={`/songs/${song._id}`}>
            <SkeletonTheme baseColor="#444" highlightColor="#888">
                <div className="songsBox">
                    <img className="songsThumb" src={`http://nth-audio.site/${song.coverArt}`} crossOrigin="anonymous"/>
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