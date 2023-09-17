import { useEffect } from "react";


const ProgressLine = ({ currentTrack, audioRef }) => {

    return (
        <div className="timeLine" >
            <p className="startTime">--:--</p>
            <div className="progress_area">
                <div className="progress_bar"></div>
            </div>  
            <p className="durationSong">
                {
                    (currentTrack && 
                    (Math.floor((currentTrack.timer / 60))
                    + ':' +
                    (Math.ceil(currentTrack.timer % 60))))
                    || '--:--'
                }
            </p>
            <audio id="audio" src={currentTrack && currentTrack.src || ''} ref={audioRef}></audio>
        </div>
    );
};

export default ProgressLine;