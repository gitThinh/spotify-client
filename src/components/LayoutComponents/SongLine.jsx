

const SongLine = ({ song, updatePlayingSong, index, }) => {

    const changeSong = () => {
        updatePlayingSong(index)
    }

    return (
        <div className="songsLine" key={index} onDoubleClick={(changeSong)}>
            <p className="songsIndex typeCenter">{index >= 0 ? index + 1 : ''}</p>
            <img className="songsThumb" src={`http://nth-audio.site/${song.coverArt}`} crossOrigin="anonymous" />
            <div className="songsDetails">
                <h3 className="songsTitle onelineText" >{song.title}</h3>
                <p className="songsAuthor">{song.artist_name}</p>
            </div>
            <p className="songsCount typeCenter">lượt nghe</p>
            <p className="songsTimer typeCenter">{Math.floor(song.duration / 60) + ':' + Math.ceil(song.duration % 60)}</p>
        </div>
    )
}

export default SongLine