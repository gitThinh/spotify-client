import { memo } from 'react'

import { SongLine, SongPlayingList } from '/src/constants/components'

import './style.css'


const Queue = ({ playingList, currentIndex, rcmList, addToPlayingList, playSongInPL, showPlaylist }) => {
    return (
        <div className="queue_layout noone_coppy">
            <div style={{ padding: '20px 35px' }}>
                <div className="playingSongs">
                    <h3 style={{ marginBottom: '20px' }}>Bài đang phát:</h3>
                    {
                        playingList.length > 0 ?
                            playingList.map((song, index) => {
                                return (
                                    <div key={index}>
                                        <SongPlayingList song={song} currentIndex={currentIndex} index={index} playSongInPL={playSongInPL} showPlaylist={showPlaylist}/>
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
                    rcmList.length > 0 ?
                        <div style={{ marginTop: '30px' }}>
                            <h3 style={{ marginBottom: '20px' }}>Danh sách đề xuất:</h3>
                            {
                                rcmList.map((song, index) => {
                                    return (
                                        <div key={index}>
                                            <SongLine
                                                song={song}
                                                addToPlayingList={addToPlayingList}
                                                index={index}
                                                showPlaylist={showPlaylist}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        :
                        <div className="rcmList" style={{ marginTop: '30px' }}>
                            <h3 style={{ marginBottom: '20px' }}>Danh sách đề xuất:</h3>
                            <h2 style={{ textAlign: 'center' }}>Danh sách đề xuất trống</h2>
                        </div>
                }
            </div>
        </div>
    )
}

export default memo(Queue)