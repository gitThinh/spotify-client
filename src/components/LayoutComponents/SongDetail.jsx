import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'



const SongDetail = ({ updatePlayingList }) => {
    const id = useParams().id
    const [imageUrl, setImageUrl] = useState()
    const [songDetail, setSongDetail] = useState({})

    const addPlayingList = () =>{
        updatePlayingList(songDetail)
    }

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
        songDetail.coverArt &&
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
                        {
                            imageUrl ?
                                <img src={imageUrl} alt={songDetail.title} />
                                :
                                <Skeleton className="thumbSong" />
                        }
                    </div>
                    <div className="detailSong">
                        <h1 className="titleSong">{songDetail.title || ''}</h1>
                        <div className="artistDuration">
                            <p className="actist">{songDetail.artist_name}</p>
                            <i className="fa-solid fa-circle" style={{ fontSize: '8px' }}></i>
                            <p>{songDetail.year}</p>
                            {/* <p className="duration">
                                {Math.floor(songDetail.duration / 60) + ' min ' + Math.ceil(songDetail.duration % 60) + ' sec'}
                            </p> */}
                        </div>
                    </div>
                </SkeletonTheme>
            </div>
            <div className="bodySongPage">
                <div className="detailPageOption">
                    <button className="startSong">
                        <i className="fa-solid fa-play"></i>
                    </button>
                    <button className="addPlaylist" onClick={addPlayingList}>
                        <i className="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SongDetail;