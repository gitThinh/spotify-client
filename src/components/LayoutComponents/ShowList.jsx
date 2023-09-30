import { useState, useEffect, memo} from "react"
import SongBox from "./SongBox";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const ShowList = ({ link, title, updatePlayingList }) => {
    const [songs, setSongs] = useState([])

    //------------------------------------------------- FUNCTIONS -------------------------------------------------
    useEffect(() => {
        const loadSongs = async () => {
            const response = await fetch(`http://nth-audio.site/api/audio-server/songs/page${link}`, {
                method: 'GET',
                headers: {
                    'x-api-key': 'c3ab8ff13720e8ad9047dd39466b3c8974e592c2fa383d4a3960714caef0c4f2',
                    
                },
            })
            const data = await response.json()
            setSongs(data.metadata.songs)
        }
        loadSongs()
    }, [link])


    //------------------------------------------------- RENDER -------------------------------------------------

    return (
        <SkeletonTheme baseColor="#444" highlightColor="#888">
            {
                songs.length > 0 ?
                    <div style={{ paddingTop: '20px' }}>
                        <h3 className='sectionTitle'>{title}</h3>
                        <div className="renderRows">
                            {
                                songs.map((song) => {
                                    return (
                                        <div key={song._id}>
                                            <SongBox song={song} updatePlayingList={updatePlayingList}/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    :
                    <div style={{ paddingTop: '40px' }}>
                        <Skeleton width={200} height={30} style={{ margin: '0 20px' }} />
                        <div className="renderRows" >
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
                        </div>
                    </div>
            }
        </SkeletonTheme >
    )
}

export default memo(ShowList)