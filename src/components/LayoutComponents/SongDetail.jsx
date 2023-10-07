import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const urlApiAudioServer = import.meta.env.VITE_API_URL_AUDIOSERVER
const apiKey = import.meta.env.VITE_API_API_KEY

const SongDetail = ({ addToPlayingList }) => {
    const id = useParams().id
    const [songDetail, setSongDetail] = useState({})


    useEffect(() => {
        const handleLoadSong = async () => {
            const response = await fetch(`${urlApiAudioServer}songs/${id}`, {
                method: 'GET',
                headers: {
                    'x-api-key': apiKey
                }
            })
            const data = await response.json()
            setSongDetail(data.metadata)
        }
        handleLoadSong()
    }, [songDetail._id])


    // -------------------------------------------- RENDER ------------------------------------------
    return (
        <div className="showSong">
            <div className="headerSongPage">
                <SkeletonTheme baseColor="#202020" highlightColor="#444">
                    <div className="thumbSong">
                        {
                            songDetail ?
                                <img src={`http://nth-audio.site/images/${songDetail.coverArt}`} alt={songDetail.title} />
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
                            <i className="fa-solid fa-circle" style={{ fontSize: '8px' }}></i>
                            <p>{songDetail.views} lượt nghe</p>
                            {/* <p className="duration">
                                {Math.floor(songDetail.duration / 60) + ' min ' + Math.ceil(songDetail.duration % 60) + ' sec'}
                            </p> */}
                        </div>
                    </div>
                </SkeletonTheme>
            </div>
            <div className="bodySongPage">
                <div className="detailPageOption">
                    <button className="startSong" onClick={() => addToPlayingList(songDetail)}>
                        <i className="fa-solid fa-play"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SongDetail;