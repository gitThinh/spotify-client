import { memo, useEffect, useState } from 'react'
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import SongLine from "./SongLine.jsx"
import SongBox from './SongBox.jsx'

const apiKey = import.meta.env.VITE_API_API_KEY
const urlMLServer = import.meta.env.VITE_API_API_MLSERVER

const Queue = ({ playingList, updatePlayingSong, currentIndex, deletePlayingList, updatePlayingList }) => {
    const [rcm, setRcm] = useState([])

    // handle fetch RCM 
    useEffect(() => {
        playingList.length > 0 &&
            fetch(`${urlMLServer + playingList[currentIndex]._id}`, {
                method: 'GET',
                headers: {
                    'x-api-key': apiKey
                },
            })
                .then(response => response.json())
                .then(data => setRcm(data.metadata))
    }, [])



    return (
        <div className="queueLayout">
            <div className="queuePage">
                <h1>Danh Sách Phát</h1>
                <div className="playingSongs" style={{ padding: '20px' }}>
                    <h3 style={{ marginBottom: '20px' }}>Danh sách phát:</h3>
                    {
                        playingList.length === 0 ?
                            <div className="nononono">
                                <h3 className="alert">Chưa có bài nào trong danh sách phát</h3>
                            </div>
                            :
                            playingList.map(((song, index) => {
                                return (
                                    <div key={index} className={index === currentIndex ? 'activeSong' : ''}>
                                        <SongLine
                                            song={song}
                                            updatePlayingSong={updatePlayingSong}
                                            index={index}
                                            deletePlayingList={deletePlayingList}
                                        />
                                    </div>
                                )
                            }))
                    }
                </div>
                <div className="recommendSongs">
                    <h3 className='sectionTitle'>Đề Xuất:</h3>
                    <div className="renderRows">
                        {
                            rcm.length > 0 ?
                                rcm.map((song, index) => {
                                    return (
                                        <div key={index}>
                                            <SongBox song={song} updatePlayingList={updatePlayingList} />
                                        </div>
                                    )
                                })
                                :
                                playingList.length > 0 &&
                                <SkeletonTheme baseColor="#444" highlightColor="#888">
                                    <div className="songsBox">
                                        <Skeleton height={150} />
                                        <Skeleton height={22} />
                                        <Skeleton height={22} />
                                    </div>
                                    <div className="songsBox">
                                        <Skeleton height={150} />
                                        <Skeleton height={22} />
                                        <Skeleton height={22} />
                                    </div>
                                    <div className="songsBox">
                                        <Skeleton height={150} />
                                        <Skeleton height={22} />
                                        <Skeleton height={18} />
                                    </div>
                                    <div className="songsBox">
                                        <Skeleton height={150} />
                                        <Skeleton height={22} />
                                        <Skeleton height={22} />
                                    </div>
                                    <div className="songsBox">
                                        <Skeleton height={150} />
                                        <Skeleton height={22} />
                                        <Skeleton height={22} />
                                    </div>
                                    <div className="songsBox">
                                        <Skeleton height={150} />
                                        <Skeleton height={22} />
                                        <Skeleton height={22} />
                                    </div>
                                </SkeletonTheme>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Queue)