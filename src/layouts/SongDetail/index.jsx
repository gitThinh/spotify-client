import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { PiDotOutlineFill } from 'react-icons/pi'
import { FaPlay } from 'react-icons/fa'

import { urlApiAudioServer, urlApiImg, apiKey } from '/src/constants/env'

import './style.css'


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
        <div className="show_song">
            <div className="header_songpage" 
                // style={{ background: `url('${urlApiImg + songDetail.coverArt}') left top/2000%`}}
            >
                <div className="thumb_song noone_coppy">
                    <img src={urlApiImg + songDetail.coverArt} alt={songDetail.title} />
                </div>
                <div className="detail_song">
                    <div className="detail_page_option">
                        <button className="play_button" onClick={() => changePlayingList(songDetail)}>
                            <FaPlay size={25} />
                        </button>
                    </div>
                    <h1 className="title_song oneline_text">{songDetail.title || ''}</h1>
                    <div className="artist_duration">
                        <p className="artist">{songDetail.artist_name}</p>
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
            <div className="body_songpage">
                
            </div>
        </div>
    );
};

export default SongDetail;