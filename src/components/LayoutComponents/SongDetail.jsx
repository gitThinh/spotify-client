import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'



const SongDetail = ({ updatePlayingList }) => {
    const id = useParams().id
    const [imageUrl, setImageUrl] = useState()
    const [songDetail, setSongDetail] = useState({})


    useEffect(() => {
        const handleLoadSong = async () => {
            const response = await fetch(`http://nth-audio.site/api/audio-server/songs/${id}`, {
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
                        <h1 className="titleSong onelineText">{songDetail.title || ''}</h1>
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
                    <button className="startSong" onClick={() => updatePlayingList(songDetail, 1)}>
                        <i className="fa-solid fa-play"></i>
                    </button>
                    <button className="addPlaylist" onClick={() => updatePlayingList(songDetail, 0)}>
                        <i className="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SongDetail;