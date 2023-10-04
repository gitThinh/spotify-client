import { useEffect, useState, useRef, memo } from 'react'
import '../assets/Playing.css'
import { Link } from 'react-router-dom'

const urlApiSong = import.meta.env.VITE_API_URL_SONG 
const urlApiAudioServer = import.meta.env.VITE_API_URL_AUDIOSERVER


const Playing = ({ playingSong, nextSong, prevSong }) => {
    const [isplaying, setIsplaying] = useState(false)
    const [israndom, setIsrandom] = useState(false)
    const [isrepeat, setIsreapet] = useState(false)
    const [volumes, setVolumes] = useState(1)

    const audioRef = useRef()

    
    // ------------------------------------------------ FUNCTIONS ----------------------------------------------------------------

    useEffect(() => {
        playingSong ? setIsplaying(true) : setIsplaying(false)
        const audioElement = document.getElementById('audioBox')

        while (audioElement.firstChild) {
            audioElement.removeChild(audioElement.firstChild);
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
        const progressBar = document.querySelector('.progress_bar')
        progressBar.style.width = '0%'
        if (israndom) {
            nextSong(1)
            return
        }
        nextSong()
    }
    const handlePrevBtn = () => {
        const progressBar = document.querySelector('.progress_bar')
        progressBar.style.width = '0%'
        if (israndom) {
            nextSong(1)
            return
        }
        prevSong()
    }


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
                isrepeat === true ? audioRef.current.play() : handleNextBtn()
            } else {
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
                        <img src={playingSong && `http://nth-audio.site/images/${playingSong.coverArt}` || ''} crossOrigin="anonymous" alt="thumbnail" />
                        <div className="infoMusic_details">
                            <Link to={`/songs/${playingSong._id}`} className='underLink'>
                                <h3 className="onelineText">{playingSong.title || ''}</h3>
                            </Link>
                            <p className='underLink'>
                                <p className="details_singer">{playingSong.artist_name || ''}</p>
                            </p>
                        </div>
                        {/* tim với thêm vào playlist */}
                    </div>
                }
            </div>

            <div className="playingControl">
                <div className="btnPlayingControl">
                    <div className={"btn btn_random".concat(' ', israndom ? 'active' : '')} onClick={() => setIsrandom(!israndom)}>
                        <i className="fas fa-random"></i>
                    </div>
                    <div className="btn btn_prev" onClick={audioRef.current ? handlePrevBtn : () => { }} >
                        <i className="fas fa-step-backward"></i>
                    </div>
                    <div className="btn btn_toggle_play" onClick={audioRef.current ? handPlayPause : () => { }}>
                        {isplaying
                            ? <i className="fas fa-pause icon-pause"></i>
                            : <i className="fas fa-play icon-play"></i>
                        }
                    </div>
                    <div className="btn btn_next" onClick={audioRef.current ? handleNextBtn : () => { }}>
                        <i className="fas fa-step-forward"></i>
                    </div>
                    <div className={'btn btn_repeat'.concat(' ', isrepeat ? 'active' : '')} onClick={() => setIsreapet(!isrepeat)}>
                        <i className="fas fa-redo"></i>
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
                        <i className="fas fa-list"></i>
                    </div>
                </Link>
                <div className="btn btn_lyrics">
                    <i className="fas fa-music"></i>
                </div>
                <div className="btn btn_volume_control">
                    {
                        volumes < 0.08
                            ? <i className="fas fa-volume-xmark"></i>
                            : (volumes > .4
                                ? <i className="fas fa-volume-high"></i>
                                : <i className="fas fa-volume-low"></i>)
                    }
                </div>
                <div className="volume_area">
                    <div className="volume_bar"></div>
                </div>
            </div>
        </div>
    )
}

export default memo(Playing)