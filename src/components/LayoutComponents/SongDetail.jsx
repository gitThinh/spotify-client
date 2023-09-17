import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'



const SongDetail = () => {
    const id = useParams().id
    const [imageUrl, setImageUrl] = useState()
    const [songDetail, setSongDetail] = useState({})


    useEffect(() => {
        const handleLoadSong = async () => {
            const response = await fetch(`http://nth-audio.site/api/songs/${id}`, {
                method: 'GET',
                headers: {
                    'x-api-key': 'c3ab8ff13720e8ad9047dd39466b3c8974e592c2fa383d4a3960714caef0c4f2'
                }
            })
            const data = await response.json()
            setSongDetail(data.metadata)
        }
        handleLoadSong()
    }, [songDetail._id])

    useEffect(() => {
        fetch(`http://nth-audio.site/${songDetail.coverArt}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.blob();
            })
            .then(blob => {
                setImageUrl(URL.createObjectURL(blob))
            })
    }, [songDetail.coverArt])

    return (
        <div className="showSong">
            <div className="headerSongPage">
                <SkeletonTheme baseColor="#202020" highlightColor="#444">
                    <div className="thumbSong">
                        <img src={imageUrl} alt={songDetail.title} />
                    </div>
                    <div className="detailSong">
                        <h1 className="titleSong">{songDetail.title || <Skeleton />}</h1>
                        <div className="artistDuration">
                            <p className="actist">{songDetail.artist_name}</p>
                            <p>{songDetail.year}</p>
                            {/* <p className="duration">{Math.floor(songDetail.duration / 60) + ' min ' + Math.ceil(songDetail.duration % 60) + ' sec'}</p> */}
                        </div>
                    </div>
                </SkeletonTheme>
            </div>
            <div className="bodySongPage">
                <button className="addPlaylist">
                    <i className="fa-solid fa-play"></i>
                </button>
            </div>
        </div>
    );
};

export default SongDetail;