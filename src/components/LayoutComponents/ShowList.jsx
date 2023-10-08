import { useState, useEffect, memo} from "react"
import SongBox from "./SongBox";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";



const apiKey = import.meta.env.VITE_API_API_KEY

const ShowList = ({ link, title, changePlayingList }) => {
    const [listSongs, setListSongs] = useState([])

    //------------------------------------------------- FUNCTIONS -------------------------------------------------
    useEffect(() => {
        const loadSongs = async () => {
            const response = await fetch(`${link}`, {
                method: 'GET',
                headers: {
                    'x-api-key': apiKey
                },
            })
            const data = await response.json()
            setListSongs(data.metadata.songs)
        }
        loadSongs()
    }, [link])


    //------------------------------------------------- RENDER -------------------------------------------------

    return (
        <SkeletonTheme baseColor="#444" highlightColor="#888">
            {
                listSongs.length > 0 ?
                    <div style={{ paddingTop: '20px' }}>
                        <h3 className='sectionTitle'>{title}</h3>
                        <div className="renderRows">
                            {
                                listSongs.map((song) => {
                                    return (
                                        <div key={song._id}>
                                            <SongBox song={song} changePlayingList={changePlayingList}/>
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