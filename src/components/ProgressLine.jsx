const ProgressLine = ({ playingSong, audioRef }) => {

    return (
        <div className="timeLine" >
            <p className="startTime">--:--</p>
            <div className="progress_area">
                <div className="progress_bar"></div>
            </div>
            <p className="durationSong">
                {
                    playingSong && Math.floor(playingSong.duration / 60) + ':' + Math.ceil(playingSong.duration % 60) || '--:--'
                }
            </p>
            <audio id="audio" src={playingSong && `http://nth-audio.site/api/resources/audio/${playingSong.file_name}`} ref={audioRef} >
            </audio>
        </div>
    )
}

export default ProgressLine