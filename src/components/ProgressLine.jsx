import { useEffect, useState } from "react";


const ProgressLine = ({ playingSong, audioRef }) => {
    const [duration, setDuration] = useState()
    const [urlSong, setUrlSong] = useState()

    useEffect(() => {
        playingSong && (
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
                })
        )
    }, [playingSong])


    // add song onto audio 
    useEffect(() => {
        if (audioRef.current.querySelector('source')) {
            audioRef.current.removeChild("source");
        }
        var source = document.createElement('source')
        source.src = urlSong // Thay đổi đường dẫn thành tệp âm thanh thực tế
        source.type = 'audio/mpeg'

        audioRef.current.appendChild(source);
    },[playingSong])


    useEffect(() => {
        playingSong ?
            setDuration(Math.floor(playingSong.duration / 60) + ':' + Math.ceil(playingSong.duration % 60))
            :
            setDuration('--:--')
    }, [playingSong])



    return (
        <div className="timeLine" >
            <p className="startTime">--:--</p>
            <div className="progress_area">
                <div className="progress_bar"></div>
            </div>
            <p className="durationSong">
                {
                    duration
                }
            </p>
            <audio id="audio" ref={audioRef}></audio>
        </div>
    );
};

export default ProgressLine;