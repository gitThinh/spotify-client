import { memo } from 'react'
import SongLine from "./SongLine.jsx"

const Queue = ({ playingList, updatePlayingSong, currentIndex }) => {
    return (
        <div className="queueLayout">
            <div className="queuePage">
                <h1>Danh Sách Phát</h1>
                <div className="playingSongs groupSongsLine">
                    <h3>Danh sách phát:</h3>
                    {
                        playingList.length === 0 ?
                            <div className="nononono">
                                <h3 className="alert">Chưa có bài nào trong danh sách phát</h3>
                            </div>
                            :
                            playingList.map(((song, index) => {
                                return (
                                    <div key={index} className={index === currentIndex ? 'activeSong' : ''}>
                                        <SongLine song={song} index={index} updatePlayingSong={updatePlayingSong} />
                                    </div>
                                )
                            }))
                    }
                </div>
                <div className="recommendSongs groupSongsLine">
                    <h3>Đề Xuất:</h3>
                </div>
            </div>
        </div>
    );
};

export default memo(Queue)