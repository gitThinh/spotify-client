import { useEffect, useRef, useState } from 'react'
import '../assets/Playing.css'
import ProgressLine from './ProgressLine'


const Playing = (props) => {
    const [tracks, setTracks] = useState([
        // {
        //     name: '3107 - 4',
        //     img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREMtwq5iPsJ0bw8cO7ZVoBQV0q2QvNxTO-A4hGLaMDKw&s',
        //     thumbnail: 'https://tailieumoi.vn/storage/uploads/images/post/banner/17-1659434564.png',
        //     author: 'W/N ft Erik',
        //     timer: 162, // seconds
        //     src: 'src/assets/thegirl.mp3'
        // },
        // {
        //     name: '3107',
        //     img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREMtwq5iPsJ0bw8cO7ZVoBQV0q2QvNxTO-A4hGLaMDKw&s',
        //     thumbnail: 'https://tailieumoi.vn/storage/uploads/images/post/banner/17-1659434564.png',
        //     author: 'W/N ft Erik',
        //     timer: 162, // seconds
        //     src: 'src/assets/girls.mp3'
        // }
    ])
    const [isplaying, setIsplaying] = useState(false)
    const [israndom, setIsrandom] = useState(false)
    const [isrepeat, setIsreapet] = useState(false)
    const [volumes, setVolumes] = useState(1)
    const [indexTrack, setIndexTrack] = useState(0)
    const [currentTrack, setCurrentTrack] =
        useState(tracks[indexTrack])

    const audioRef = useRef()
    // ------------------------------------------------ FUNCTIONS ----------------------------------------------------------------




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
        console.log(audioRef.current);
        audioRef.current.currentTime = 0
        progressBar.style.width = '0%'
        if (indexTrack === tracks.length - 1) {
            setIndexTrack(0)
            setCurrentTrack(tracks[indexTrack])
        }
        else {
            setIndexTrack(prev => prev + 1)
            setCurrentTrack(tracks[indexTrack])
        }
    }
    const handlePrevBtn = () => {
        const progressBar = document.querySelector('.progress_bar')
        progressBar.style.width = '0%'
        setIsplaying(false)
        audioRef.current.current = 0
        if (indexTrack === 0) {
            setIndexTrack(tracks.length - 1)
            setCurrentTrack(tracks[indexTrack])
        }
        else {
            setIndexTrack(prev => prev - 1)
            setCurrentTrack(tracks[indexTrack])
        }
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
                currentTimeDisplay.innerHTML = formatTime(0)
                progressBar.style.width = '0%'
                setIsplaying(false)
            } else {
                currentTimeDisplay.innerHTML = formatTime(audioRef.current.currentTime)
                const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100
                progressBar.style.width = `${progress}%`
            }
        })

        function formatTime(timeInSeconds) {
            const minutes = Math.floor(timeInSeconds / 60)
            const seconds = Math.floor(timeInSeconds % 60)
            return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
        }
    }, [])


    // volume control 
    useEffect(() => {
        const volumeBar = document.querySelector('.volume_bar')
        const volumeContainer = document.querySelector('.volume_area')
        const volumeBtn = document.querySelector('.btn_volume_control')
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
                {tracks.length > 0 &&
                    <div className='boxInfo'>
                        <img src={currentTrack.thumbnail} alt="thumbnail" />
                        <div className="infoMusic_details">
                            <a href='' className='underLink'>
                                <h3 className="details_name">{currentTrack.name || ''}</h3>
                            </a>
                            <a href='' className='underLink'>
                                <p className="details_singer">{currentTrack.author || ''}</p>
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
                    <div className="btn btn_prev" onClick={tracks.length > 0 ? handlePrevBtn : ()=>{}} >
                        <i className="fas fa-step-backward"></i>
                    </div>
                    <div className="btn btn_toggle_play" onClick={tracks.length > 0 ? handPlayPause : ()=>{}}>
                        {isplaying
                            ? <i className="fas fa-pause icon-pause"></i>
                            : <i className="fas fa-play icon-play"></i>
                        }
                    </div>
                    <div className="btn btn_next" onClick={tracks.length > 0 ? handleNextBtn : ()=>{}}>
                        <i className="fas fa-step-forward"></i>
                    </div>
                    <div className={'btn btn_repeat'.concat(' ', isrepeat ? 'active' : '')} onClick={() => setIsreapet(!isrepeat)}>
                        <i className="fas fa-redo"></i>
                    </div>
                </div>
                <ProgressLine currentTrack={currentTrack} audioRef={audioRef} />
            </div>
            <div className="toolMusic">
                <div className="btn btn_list">
                    <i className="fas fa-list"></i>
                </div>
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

export default Playing