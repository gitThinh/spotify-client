import { memo, useContext } from 'react'

import { SongLine, SongPlayingList } from '/src/constants/components'
import { PlaySongContext } from '/src/constants/stores'

import './style.css'


const Queue = ({ rcmList, selectSongInRcm, showPlaylist }) => {
    const [playingState, dispatch] = useContext(PlaySongContext)
    const { playingList } = playingState

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
                                        <SongPlayingList
                                            song={song}
                                            index={index}
                                            showPlaylist={showPlaylist}
                                        />
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
                                                selectSongInRcm={selectSongInRcm}
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