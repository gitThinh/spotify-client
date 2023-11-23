import { memo } from 'react'
import SongLine from "./SongLine.jsx"
import SongPlayingList from './SongPlayingList.jsx'

const Queue = ({ playingList, currentIndex, rcmList, addToPlayingList, playSongInPL }) => {



    return (
        <div className="queueLayout">
            <div className="queuePage">
                <div className="playingSongs" style={{ padding: '20px' }}>
                    <h3 style={{ marginBottom: '20px' }}>Bài đang phát:</h3>
                    {
                        playingList.length > 0 ?
                            playingList.map((song, index) => {
                                return (
                                    <div key={index}>
                                        <SongPlayingList song={song} currentIndex={currentIndex} index={index} playSongInPL={playSongInPL} />
                                    </div>
                                )
                            })

                            :
                            <div className="nononono">
                                <h3 className="alert">Chưa có bài hát nào</h3>
                            </div>
                    }
                </div>
                {
                    rcmList.length > 0 &&
                    <div className="rcmList" style={{ padding: '20px' }}>
                        <h3 style={{ marginBottom: '20px' }}>Danh sách đề xuất:</h3>
                        {
                            rcmList.map((song, index) => {
                                return (
                                    <div key={index}>
                                        <SongLine
                                            song={song}
                                            addToPlayingList={addToPlayingList}
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