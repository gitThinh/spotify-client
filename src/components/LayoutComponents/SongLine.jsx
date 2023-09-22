import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'



const SongLine = ({ song, index, updatePlayingSong, setIsReady }) => {
    const [imageUrl, setImageUrl] = useState('')

    const changeSong = () => {
        setIsReady(false)
        updatePlayingSong(index)
    }
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


    return (
        <SkeletonTheme baseColor="#444" highlightColor="#888">
            <div className="songsBox typeLine" key={index} onDoubleClick={changeSong}>
                <p className="songsNumber">{index + 1}</p>
                {imageUrl !== '' ? <img className="songsThumb" src={imageUrl} /> : <Skeleton height={155} />}
                <h3 className="songsTitle" style={{ textAlign: 'left' }}>{song.title}</h3>
                <p className="songsAuthor" style={{ textAlign: 'left' }}>{song.artist_name}</p>
                <p className="songsCount">lượt nghe</p>
                <p className="songsTimer">{Math.floor(song.duration / 60) + ':' + Math.ceil(song.duration % 60)}</p>
            </div>
        </SkeletonTheme>
    );
};

export default SongLine;