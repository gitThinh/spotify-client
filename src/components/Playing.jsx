import { useEffect, useState, memo } from 'react'
import '../assets/Playing.css'
import ProgressLine from './ProgressLine'
import { Link } from 'react-router-dom'


const Playing = ({ playingSong, audioRef, isReady, setIsReady, nextSong, prevSong }) => {
    const [isplaying, setIsplaying] = useState(false)
    const [israndom, setIsrandom] = useState(false)
    const [isrepeat, setIsreapet] = useState(false)
    const [volumes, setVolumes] = useState(1)
    const [imageUrl, setImageUrl] = useState()
    const [urlSong, setUrlSong] = useState()

    // ------------------------------------------------ FUNCTIONS ----------------------------------------------------------------
    useEffect(() => {
        playingSong &&
            fetch(`http://nth-audio.site/api/resources/audio/${playingSong.file_name}`, {
                method: 'GET',
                headers: {
                    'x-api-key': 'c3ab8ff13720e8ad9047dd39466b3c8974e592c2fa383d4a3960714caef0c4f2'
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok')
                    }
                    return response.blob();
                })
                .then(blob => {
                    setUrlSong(URL.createObjectURL(blob))
                    setIsReady(true)
                })
    }, [playingSong])


    useEffect(() => {
        setIsplaying(false)
        setIsReady(false)
        const progressBar = document.querySelector('.progress_bar')
        progressBar.style.width = '0%'
        audioRef.current.currentTime = 0
        audioRef.current.pause()
    }, [playingSong])

    // get thumbnails song
    useEffect(() => {
        playingSong &&
            fetch(`http://nth-audio.site/${playingSong.coverArt}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok')
                    }
                    return response.blob();
                })
                .then(blob => {
                    setImageUrl(URL.createObjectURL(blob))
                })
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
        setIsplaying(false)
        const progressBar = document.querySelector('.progress_bar')
        progressBar.style.width = '0%'
        audioRef.current.currentTime = 0
        nextSong()
    }
    const handlePrevBtn = () => {
        setIsplaying(false)
        const progressBar = document.querySelector('.progress_bar')
        progressBar.style.width = '0%'
        audioRef.current.current = 0
        prevSong()
    }



    function formatTime(timeInSeconds) {
        const minutes = Math.floor(timeInSeconds / 60)
        const seconds = Math.floor(timeInSeconds % 60)
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    }
    // control progressBar
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
                setIsplaying(false)
                const progressBar = document.querySelector('.progress_bar')
                progressBar.style.width = '0%'
                audioRef.current.currentTime = 0
            } else {
                currentTimeDisplay.innerHTML = formatTime(audioRef.current.currentTime)
                const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100
                progressBar.style.width = `${progress}%`
            }
        })
    }, [])



    // volume control 
    useEffect(() => {
        const volumeBar = document.querySelector('.volume_bar')
        const volumeContainer = document.querySelector('.volume_area')
        let volumeControl = 1

        function updateVolumeFromMousePosition(event) {
            const volumeContainerWidth = volumeContainer.clientWidth
            const volumeClickX = event.clientX - volumeContainer.getBoundingClientRect().left
            volumeControl = (volumeClickX / volumeContainerWidth)
            setVolumes(volumeControl)

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
    }, [])




    // ------------------------------------------------ RENDER ----------------------------------------------------------------
    return (
        <div className="playingBlock">
            <div className="infoMusic">
                {playingSong &&
                    <div className='boxInfo'>
                        <img src={imageUrl} alt="thumbnail" />
                        <div className="infoMusic_details">
                            <Link to={`/songs/${playingSong._id}`} className='underLink'>
                                <h3 className="details_name">{playingSong.title || ''}</h3>
                            </Link>
                            <a href='' className='underLink'>
                                <p className="details_singer">{playingSong.artist_name || ''}</p>
                            </a>
                        </div>
                        {/* tim với thêm vào playlist */}
                    </div>
                }
            </div>

            <div className="playingControl">
                <div className="btnPlayingControl">
                    <div className={"btn btn_random".concat(' ', israndom ? 'active' : '')} onClick={() => setIsrandom(!israndom)} >
                        <i className="fas fa-random"></i>
                    </div>
                    <div className="btn btn_prev" onClick={isReady ? handlePrevBtn : () => { }} >
                        <i className="fas fa-step-backward"></i>
                    </div>
                    <div className="btn btn_toggle_play" onClick={isReady ? handPlayPause : () => { }}>
                        {isplaying
                            ? <i className="fas fa-pause icon-pause"></i>
                            : <i className="fas fa-play icon-play"></i>
                        }
                    </div>
                    <div className="btn btn_next" onClick={isReady ? handleNextBtn : () => { }}>
                        <i className="fas fa-step-forward"></i>
                    </div>
                    <div className={'btn btn_repeat'.concat(' ', isrepeat ? 'active' : '')} onClick={() => setIsreapet(!isrepeat)}>
                        <i className="fas fa-redo"></i>
                    </div>
                </div>
                <ProgressLine playingSong={playingSong} audioRef={audioRef} urlSong={urlSong} />
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