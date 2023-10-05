import { memo } from 'react'
import SongLine from "./SongLine.jsx"

const Queue = ({ playingSong, playingList, handleSetSong }) => {



    return (
        <div className="queueLayout">
            <div className="queuePage">
                <h1>Danh Sách Phát</h1>
                <div className="playingSongs" style={{ padding: '20px' }}>
                    <h3 style={{ marginBottom: '20px' }}>Bài đang phát:</h3>
                    {
                        playingSong ?
                            <div className="activeSong">
                                <SongLine song={playingSong} />
                            </div>
                            :
                            <div className="nononono">
                                <h3 className="alert">Chưa có bài hát nào</h3>
                            </div>
                    }
                </div>
                {
                    playingList.length > 0 &&
                    <div className="rcmList" style={{ padding: '20px' }}>
                        <h3 style={{ marginBottom: '20px' }}>Danh sách đề xuất:</h3>
                        {
                            playingList.map((song, index) => {
                                return (
                                    <div key={index}>
                                        <SongLine
                                            song={song}
                                            handleSetSong={handleSetSong}
                                            index={index}
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default memo(Queue)