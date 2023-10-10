import { useEffect, useState, useRef } from 'react'
import '../assets/Playing.css'
import { Link } from 'react-router-dom'
import { ScaleLoader } from 'react-spinners'
import { FaPlay, FaRandom } from 'react-icons/fa'
import {
    FaForwardStep, FaBackwardStep, FaArrowRotateRight,
    FaVolumeXmark, FaVolumeLow, FaVolumeHigh
} from 'react-icons/fa6'
import { HiMiniPause, HiMiniMusicalNote } from 'react-icons/hi2'
import { PiListBold } from 'react-icons/pi'


const urlApiSong = import.meta.env.VITE_API_URL_SONG
const urlApiImg = import.meta.env.VITE_API_URL_IMG
const urlApiAudioServer = import.meta.env.VITE_API_URL_AUDIOSERVER


const Playing = ({ playingSong, nextSong, prevSong }) => {
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
        // chỉnh thanh chạy về đầu
        const progressBar = document.querySelector('.progress_bar')
        progressBar.style.width = '0%'
        // chỉnh thời gian chạy được về 0
        const currentTimeDisplay = document.querySelector('.startTime')
        currentTimeDisplay.innerHTML = playingSong ? '0:00' : '--:--' 
        const audioElement = document.getElementById('audioBox')

        while (audioElement.firstChild) {
            audioElement.removeChild(audioElement.firstChild)
        }

        const newAudioElement = document.createElement('audio')

        const newSourceElement = document.createElement('source')

        newSourceElement.src = playingSong ? `${urlApiSong + playingSong.file_name}` : ''

        newAudioElement.appendChild(newSourceElement)
        newAudioElement.crossOrigin = "anonymous"
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
        nextSong()
    }
    const handlePrevBtn = () => {
        prevSong()
    }

    useEffect(() => {
        isended && handleNextBtn()
        setIsended(false)
    }, [isended])

    // control progressBar
    function formatTime(timeInSeconds) {
        const minutes = Math.floor(timeInSeconds / 60)
        const seconds = Math.floor(timeInSeconds % 60)
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    }
    useEffect(() => {
        const progressBar = document.querySelector('.progress_bar')
        const progressContainer = document.querySelector('.progress_area')
        const currentTimeDisplay = document.querySelector('.startTime')
        const totalDurationDisplay = document.querySelector('.durationSong')


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
        const timerRefreshToken =
            playingSong &&
            setTimeout(() => {
                fetch(`${urlApiAudioServer}views/set`, {
                    method: 'POST',
                    headers: {
                        'x-api-key': '95ac0fd7e00b88716525d3167d12b245c472dafe5a8f529afb053590c099',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 'songId': playingSong._id })
                })
            }, 100 * 1000)

        return () => clearTimeout(timerRefreshToken)
    }, [playingSong, isplaying])


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



    // http://nth-audio.site/images/<Tên ảnh>
    // ------------------------------------------------ RENDER ----------------------------------------------------------------
    return (
        <div className="playingBlock">
            <div className="infoMusic">
                {playingSong &&
                    <div className='boxInfo'>
                        <img src={playingSong && `${urlApiImg + playingSong.coverArt}` || ''} crossOrigin="anonymous" alt="thumbnail" />
                        <div className="infoMusic_details">
                            <Link to={`/songs/${playingSong._id}`} className='underLink'>
                                <h3 className="onelineText">{playingSong.title || ''}</h3>
                            </Link>
                            <div className='underLink'>
                                <p className="details_singer">{playingSong.artist_name || ''}</p>
                            </div>
                        </div>
                        {/* tim với thêm vào playlist */}
                    </div>
                }
            </div>

            <div className="playingControl">
                <div className="btnPlayingControl">
                    <div className={"btn btn_random".concat(' ', israndom ? 'active' : '')} onClick={() => setIsrandom(!israndom)}>
                        <FaRandom size={20} />
                    </div>
                    <div className="btn btn_prev" onClick={audioRef.current ? handlePrevBtn : () => { }} >
                        <FaBackwardStep size={22} />
                    </div>
                    {
                        isloading ?
                            <ScaleLoader className='loadingSong' color='#fff' />
                            :
                            <div className="btn btn_toggle_play" onClick={audioRef.current ? handPlayPause : () => { }}>
                                {
                                    isplaying
                                    ? <HiMiniPause size={22} />
                                    : <FaPlay style={{ marginLeft: '4px' }} size={18} />
                                }
                            </div>
                    }
                    <div className="btn btn_next" onClick={audioRef.current ? handleNextBtn : () => { }}>
                        <FaForwardStep size={22} />
                    </div>
                    <div className={'btn btn_repeat'.concat(' ', isrepeat ? 'active' : '')} onClick={() => setIsreapet(!isrepeat)}>
                        <FaArrowRotateRight size={22} />
                    </div>
                </div>
                <div className="timeLine" >
                    <p className="startTime">--:--</p>
                    <div className="progress_area">
                        <div className="progress_bar"></div>
                    </div>
                    <p className="durationSong">
                        {
                            playingSong && formatTime(playingSong.duration) || '--:--'
                        }
                    </p>
                    <div id="audioBox">
                        <audio id="audio" ref={audioRef}></audio>
                    </div>
                </div>
            </div>
            <div className="toolMusic">
                <Link to='/queue'>
                    <div className="btn btn_list">
                        <PiListBold size={24} />
                    </div>
                </Link>
                <div className="btn btn_lyrics">
                    <HiMiniMusicalNote size={22} />
                </div>
                <div className="btn btn_volume_control">
                    {
                        volumes < 0.08
                            ? <FaVolumeXmark size={22} />
                            : (volumes > .4
                                ? <FaVolumeHigh size={22} />
                                : <FaVolumeLow size={22} />)
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