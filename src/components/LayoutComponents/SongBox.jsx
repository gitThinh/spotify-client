import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'



const SongBox = (prop) => {
    const [imageUrl, setImageUrl] = useState('')
    const song = prop.data

    useEffect(() => {
        fetch(`http://116.110.85.13:8080/${song.coverArt}`)
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



    return (
        <div className="songsBox">
            <img className="songsThumb" src={imageUrl} />
            <div className="detailSong">
                <h3 className="songsTitle">{song.title}</h3>
                <p className="songsAuthor">{song.artist_name}</p>
            </div>
        </div>
    )

}

export default SongBox;