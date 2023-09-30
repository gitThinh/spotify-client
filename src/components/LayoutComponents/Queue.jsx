import { memo } from 'react'
import SongLine from "./SongLine.jsx"

const Queue = ({ playingList, updatePlayingSong, currentIndex }) => {
    return (
        <div className="queueLayout">
            <div className="queuePage">
                <h1>Danh Sách Phát</h1>
                <div className="playingSongs" style={{padding:'20px'}}>
                    <h3 style={{marginBottom:'20px'}}>Danh sách phát:</h3>
                    {
                        playingList.length === 0 ?
                            <div className="nononono">
                                <h3 className="alert">Chưa có bài nào trong danh sách phát</h3>
                            </div>
                            :
                            playingList.map(((song, index) => {
                                return (
                                    <div key={index} className={index === currentIndex ? 'activeSong' : ''}>
                                        <SongLine song={song} updatePlayingSong={updatePlayingSong} index={index}/>
                                    </div>
                                )
                            }))
                    }
                </div>
                <div className="recommendSongs" style={{padding:'20px'}}>
                    <h3 style={{marginBottom:'20px'}}>Đề Xuất:</h3>
                </div>
            </div>
        </div>
    );
};

export default memo(Queue)