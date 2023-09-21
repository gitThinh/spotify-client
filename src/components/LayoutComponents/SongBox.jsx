import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'



const SongBox = (prop) => {
    const [imageUrl, setImageUrl] = useState('')
    const song = prop.data
    // Alan Walker - Faded.mp3
    useEffect(() => {
        fetch(`http://nth-audio.site/${song.coverArt}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.blob();
            })
            .then(blob => {
                setImageUrl(URL.createObjectURL(blob))
            })
    }, [])

    // --------------------------------------- RENDER ------------------------------------

    return (
        <Link to={`/songs/${song._id}`}>
            <SkeletonTheme baseColor="#444" highlightColor="#888">
                <div className="songsBox">
                    {imageUrl !== '' ? <img className="songsThumb" src={imageUrl} /> : <Skeleton height={155}/>}
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