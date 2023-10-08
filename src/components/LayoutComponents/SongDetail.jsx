import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { PiDotOutlineFill } from 'react-icons/pi'
import { FaPlay } from 'react-icons/fa'

const urlApiAudioServer = import.meta.env.VITE_API_URL_AUDIOSERVER
const apiKey = import.meta.env.VITE_API_API_KEY

const SongDetail = ({ changePlayingList }) => {
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
                <div className="thumbSong">
                    <img src={`http://nth-audio.site/images/${songDetail.coverArt}`} alt={songDetail.title} />
                </div>
                <div className="detailSong">
                    <h1 className="titleSong onelineText">{songDetail.title || ''}</h1>
                    <div className="artistDuration">
                        <p className="actist">{songDetail.artist_name}</p>
                        <PiDotOutlineFill />
                        <p>{songDetail.year}</p>
                        <PiDotOutlineFill />
                        <p>{songDetail.views} lượt nghe</p>
                        {/* <p className="duration">
                                {Math.floor(songDetail.duration / 60) + ' min ' + Math.ceil(songDetail.duration % 60) + ' sec'}
                            </p> */}
                    </div>
                </div>
            </div>
            <div className="bodySongPage">
                <div className="detailPageOption">
                    <button className="startSong" onClick={() => changePlayingList(songDetail)}>
                        <FaPlay size={22}/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SongDetail;