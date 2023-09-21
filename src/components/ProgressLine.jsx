import { useEffect, useState } from "react";


const ProgressLine = ({ playingSong, audioRef, urlSong }) => {
    const [duration, setDuration] = useState()
    

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
            <audio id="audio" src={playingSong && urlSong || ''} ref={audioRef}></audio>
        </div>
    );
};

export default ProgressLine;