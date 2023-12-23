import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ScaleLoader } from 'react-spinners'
import { FaPlay, FaRandom } from 'react-icons/fa'
import {
    FaForwardStep, FaBackwardStep, FaArrowRotateRight,
    FaVolumeXmark, FaVolumeLow, FaVolumeHigh
} from 'react-icons/fa6'
import { HiMiniPause, HiMiniMusicalNote } from 'react-icons/hi2'
import { PiListBold } from 'react-icons/pi'


import formatTime from '/src/utils/formatTime'


import '/src/components/Playing/style.css'


const urlApiSong = import.meta.env.VITE_API_URL_SONG
const urlApiImg = import.meta.env.VITE_API_URL_IMG
const urlApiAudioServer = import.meta.env.VITE_API_URL_AUDIOSERVER
const apiKey = import.meta.env.VITE_API_API_KEY


const Playing = ({ playingSong, nextSong, prevSong, userid }) => {


    const [isplaying, setIsplaying] = useState(false)
    const [isended, setIsended] = useState(false)
    const [isloading, setIsLoading] = useState(false)
    const [israndom, setIsrandom] = useState(false)
    const [isrepeat, setIsreapet] = useState(false)
    const [volumes, setVolumes] = useState(1)

    const audioRef = useRef()

    // ------------------------------------------------ FUNCTIONS ----------------------------------------------------------------

    useEffect(() => {
        playingSong && setIsLoading(true)
        playingSong ? setIsplaying(true) : setIsplaying(false)
        // reset progress width
        const progressBar = document.querySelector('.progress_bar')
        progressBar.style.width = '0%'
        // reset current time
        const currentTimeDisplay = document.querySelector('.start_time')
        currentTimeDisplay.innerHTML = playingSong ? '0:00' : '--:--'
        const audioElement = document.getElementById('audio_box')

        while (audioElement.firstChild) {
            audioElement.removeChild(audioElement.firstChild)
        }

        const newAudioElement = document.createElement('audio')

        const newSourceElement = document.createElement('source')

        newSourceElement.src = playingSong ? `${urlApiSong + playingSong.file_name}` : ''

        newAudioElement.appendChild(newSourceElement)
        newAudioElement.autoplay = true
        newAudioElement.id = 'audio'
        audioRef.current = newAudioElement
        audioElement.appendChild(newAudioElement)
    }, [playingSong])



    // play and pause
    const handPlayPause = () => {
        setIsplaying(!isplaying)
        if (isplaying) {
            audioRef.current.pause()
        }
        else {
            audioRef.current.play()
        }
    }


    // next and prev btn
    const handleNextBtn = () => {
        israndom
            ? nextSong(1)
            : nextSong(0)
    }
    const handlePrevBtn = () => {
        prevSong()
    }

    useEffect(() => {
        if (isrepeat) {
            audioRef.current.currentTime = 0
            audioRef.current.play()
            setIsended(false)
            return
        }
        isended && handleNextBtn()
        setIsended(false)
    }, [isended])

    // control progressBar
    useEffect(() => {
        const progressBar = document.querySelector('.progress_bar')
        const progressContainer = document.querySelector('.progress_area')
        const currentTimeDisplay = document.querySelector('.start_time')
        const totalDurationDisplay = document.querySelector('.duration_song')


        function updateProgressFromMousePosition(event) {
            const containerWidth = progressContainer.clientWidth
            const clickX = event.clientX - progressContainer.getBoundingClientRect().left
            const progress = (clickX / containerWidth)

            progressBar.style.width = `${progress * 100}%`

            const newTime = progress * audioRef.current.duration
            audioRef.current.currentTime = newTime
        }

        progressContainer.addEventListener('dragover', (e) => {
            e.preventDefault()
        })

        progressContainer.addEventListener('drop', (e) => {
            e.preventDefault()

            const files = e.dataTransfer.files
            if (files.length > 0) {
                const file = files[0]
                if (file.type.includes('audio')) {
                    const reader = new FileReader()

                    reader.onload = (event) => {
                        audioRef.current.src = event.target.result
                        audioRef.current.load()
                        audioRef.current.play()

                        totalDurationDisplay.innerHTML = formatTime(audioRef.current.duration)
                    }
                    reader.readAsDataURL(file)
                }
            }
        })

        progressContainer.addEventListener('click', (e) => {
            updateProgressFromMousePosition(e)
        })

        progressContainer.addEventListener('mousemove', (e) => {
            if (e.buttons === 1) {
                updateProgressFromMousePosition(e)
            }
        })

        audioRef.current.addEventListener('timeupdate', () => {
            if (audioRef.current.ended) {
                currentTimeDisplay.innerHTML = '0:00'
                setIsended(true)
            }
            else {
                audioRef.current.currentTime > 0 && setIsLoading(false)
                currentTimeDisplay.innerHTML = formatTime(audioRef.current.currentTime)
                const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100
                progressBar.style.width = `${progress}%`
            }
        })
    }, [playingSong])


    // send views
    useEffect(() => {
        let headers =
            userid
                ?
                {
                    'x-api-key': apiKey,
                    'Content-Type': 'application/json',
                    'x-client-id': userid
                }
                :
                {
                    'x-api-key': apiKey,
                    'Content-Type': 'application/json'
                }
        let timerRefreshToken =
            playingSong !== '' &&
            setTimeout(() => {
                fetch(`${urlApiAudioServer}views/set`, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({ 'songId': playingSong._id })
                })
            }, 20 * 1000)
        return () => clearTimeout(timerRefreshToken)
    }, [playingSong])


    // volume control 
    useEffect(() => {
        const volumeBar = document.querySelector('.volume_bar')
        const volumeContainer = document.querySelector('.volume_area')
        audioRef.current.volume = volumes < 0.08 ? 0 : volumes

        let volumeControl = 1

        function updateVolumeFromMousePosition(event) {
            const volumeContainerWidth = volumeContainer.clientWidth
            const volumeClickX = event.clientX - volumeContainer.getBoundingClientRect().left
            volumeControl = (volumeClickX / volumeContainerWidth)
            setVolumes(volumeControl < 0 ? 0 : volumeControl)

            if (volumeClickX / volumeContainerWidth < .08) {
                audioRef.current.muted = true
                volumeBar.style.width = `0%`
            }
            else {
                audioRef.current.muted = false
                audioRef.current.volume = volumeControl
                volumeBar.style.width = `${volumeControl * 100}%`
            }
        }

        volumeContainer.addEventListener('click', (e) => {
            updateVolumeFromMousePosition(e)
        })

        volumeContainer.addEventListener('mousemove', (e) => {
            if (e.buttons === 1) {
                updateVolumeFromMousePosition(e)
            }
        })

        volumeBar.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', 'volume')
        })

        volumeContainer.addEventListener('dragover', (e) => {
            e.preventDefault()
        })

        volumeContainer.addEventListener('drop', (e) => {
            e.preventDefault()

            const offsetX = e.clientX - volumeContainer.getBoundingClientRect().left
            setVolumes(offsetX / volumeContainer.offsetWidth)

            audioRef.current.volume = Math.max(0, Math.min(1, volumes))

            volumeBar.style.width = `${volumes * 100}%`
        })
    }, [playingSong])



    // https://nth-audio.site/images/<Tên ảnh>
    // ------------------------------------------------ RENDER ----------------------------------------------------------------
    return (
        <div className="playing_block noone_coppy">
            <div className="info_music">
                {playingSong &&
                    <div className='box_info'>
                        <img src={playingSong && `${urlApiImg + playingSong.coverArt}` || ''} alt="thumbnail" />
                        <div className="info_music_details">
                            <Link to={`/songs/${playingSong._id}`} className='under_link'>
                                <h4 className="oneline_text">{playingSong.title || ''}</h4>
                            </Link>
                            <div className='under_link'>
                                <p className="details_author">{playingSong.artist_name || ''}</p>
                            </div>
                        </div>

                    </div>
                }
            </div>

            <div className="playing_control">
                <div className="btn_playing_control">
                    <div className={"btn btn_random".concat(' ', israndom ? 'active' : '')} onClick={() => setIsrandom(!israndom)}>
                        <FaRandom className='btn_random_icon' />
                    </div>
                    <div className="btn btn_prev" onClick={audioRef.current ? handlePrevBtn : () => { }} >
                        <FaBackwardStep className='btn_prev_icon' />
                    </div>
                    {
                        isloading ?
                            <ScaleLoader className='loading_song' />
                            :
                            <div className="btn btn_toggle_play" onClick={audioRef.current ? handPlayPause : () => { }}>
                                {
                                    isplaying
                                        ? <HiMiniPause lassName='btn_pause_icon' />
                                        : <FaPlay className='btn_play_icon' />
                                }
                            </div>
                    }
                    <div className="btn btn_next" onClick={audioRef.current ? handleNextBtn : () => { }}>
                        <FaForwardStep className="btn_next_icon" />
                    </div>
                    <div className={'btn btn_repeat'.concat(' ', isrepeat ? 'active' : '')} onClick={() => setIsreapet(!isrepeat)}>
                        <FaArrowRotateRight className='btn_repeat_icon' />
                    </div>
                </div>
                <div className="time_line" >
                    <p className="start_time">--:--</p>
                    <div className="progress_area">
                        <div className="progress_bar"></div>
                    </div>
                    <p className="duration_song">
                        {
                            playingSong && formatTime(playingSong.duration) || '--:--'
                        }
                    </p>
                    <div id="audio_box">
                        <audio id="audio" ref={audioRef}></audio>
                    </div>
                </div>
            </div>
            <div className="queue_and_volume">
                <Link to='/queue'>
                    <div className="content_center">
                        <PiListBold className='btn_list_icon' />
                    </div>
                </Link>
                <div className="content_center">
                    <HiMiniMusicalNote className='btn_lyrics_icon' />
                </div>
                <div className="btn_volume_control content_center">
                    {
                        volumes < 0.08
                            ? <FaVolumeXmark className='btn_mutevolume_icon' />
                            : (volumes > .4
                                ? <FaVolumeHigh className='btn_hightvolume_icon' />
                                : <FaVolumeLow className='btn_lowvolume_icon' />)
                    }
                </div>
                <div className="volume_area">
                    <div className="volume_bar"></div>
                </div>
            </div>
        </div>
    )
}

export default Playing