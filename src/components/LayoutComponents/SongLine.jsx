import { SkeletonTheme } from 'react-loading-skeleton'



const SongLine = ({ song, index, updatePlayingSong, setIsReady }) => {

    const changeSong = () => {
        setIsReady(false)
        updatePlayingSong(index)
    }

    return (
        <SkeletonTheme baseColor="#444" highlightColor="#888">
            <div className="songsBox typeLine" key={index} onDoubleClick={changeSong}>
                <p className="songsNumber">{index + 1}</p>
                <img className="songsThumb" src={`http://nth-audio.site/${song.coverArt}`} crossorigin="anonymous" />
                <h3 className="songsTitle" style={{ textAlign: 'left' }}>{song.title}</h3>
                <p className="songsAuthor" style={{ textAlign: 'left' }}>{song.artist_name}</p>
                <p className="songsCount">lượt nghe</p>
                <p className="songsTimer">{Math.floor(song.duration / 60) + ':' + Math.ceil(song.duration % 60)}</p>
            </div>
        </SkeletonTheme>
    );
};

export default SongLine;