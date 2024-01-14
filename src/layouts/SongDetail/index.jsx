import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"

import { PiDotOutlineFill } from 'react-icons/pi'
import { FaPlay } from 'react-icons/fa6'

import { urlApiAudioServer, urlApiImg, urlMLServer, apiKey } from '/src/constants/env'
import { SelectOptionsSong, SongLine } from "/src/constants/components"
import { LoadingPage, Page404 } from '/src/constants/layouts'
import { PlaySongContext, actions } from '/src/constants/stores'


import './style.css'



const SongDetail = ({ showPlaylist }) => {
    const [playingState, dispatch] = useContext(PlaySongContext)

    const id = useParams().id
    const [songDetail, setSongDetail] = useState()
    const [rcmList, setRcmList] = useState([])
    const [checkSong, setCheckSong] = useState(true)


    // get song details
    useEffect(() => {
        const handleLoadSong = async () => {
            const response = await fetch(`${urlApiAudioServer}songs/${id}`, {
                method: 'GET',
                headers: {
                    'x-api-key': apiKey
                }
            })
            const data = await response.json()
            data.statusCode === 200
                ? setSongDetail(data.metadata)
                : setCheckSong(false)
        }
        handleLoadSong()
    }, [id])

    // get rcm list
    useEffect(() => {
        setRcmList([])
        checkSong &&
        fetch(`${urlMLServer + id}`, {
            method: 'GET',
            headers: {
                'x-api-key': apiKey
            },
        })
            .then(response => response.json())
            .then(data => data.statusCode === 200 && setRcmList(data.metadata))
    }, [id])


    // -------------------------------------------- RENDER ------------------------------------------
    return (
        songDetail
            ? <div className="show_song">
                <div className="header_songpage"
                // style={{ background: `url('${urlApiImg + songDetail.coverArt}') left top/2000%`}}
                >
                    <div className="thumb_song noone_coppy">
                        <img src={urlApiImg + songDetail.coverArt} alt={songDetail.title} />
                    </div>
                    <div className="detail_song">
                        <p className="type_detail">Song</p>
                        <p className="title_song oneline_text">{songDetail.title || ''}</p>
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
                    <div className="body_page_option">
                        <button className="play_button" onClick={() => dispatch(actions.songsPlay(songDetail))}>
                            <FaPlay size={25} />
                        </button>
                        <SelectOptionsSong
                            song={songDetail}
                            showPlaylist={showPlaylist}
                        />
                    </div>
                    <section className="body_page_option_rcm">
                        {
                            rcmList.map((song, index) => {
                                return (
                                    index < 5 &&
                                    <div key={index}>
                                        <SongLine
                                            song={song}
                                            check={1}
                                            showPlaylist={showPlaylist}
                                        />
                                    </div>
                                )
                            })
                        }
                    </section>
                </div>
            </div>
            :
            checkSong
                ? <LoadingPage />
                : <Page404 />
    )
}

export default SongDetail