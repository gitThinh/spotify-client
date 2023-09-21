
const SongLine = ({ song }) => {
    return (
        <SkeletonTheme baseColor="#444" highlightColor="#888">
            <div className="songsBox typeLine">
                {imageUrl !== '' ? <img className="songsThumb" src={imageUrl} /> : <Skeleton height={155} />}
                <div className="detailSong">
                    <h3 className="songsTitle">{song.title}</h3>
                    <p className="songsAuthor">{song.artist_name}</p>
                </div>
            </div>
        </SkeletonTheme>
    );
};

export default SongLine;