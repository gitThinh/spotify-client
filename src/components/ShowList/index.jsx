import { useState, useEffect, memo} from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import {SongBox} from "/src/constants/components"
import { apiKey } from '/src/constants/env'

import '/src/components/ShowList/style.css'



const ShowList = ({ link, title, changePlayingList, range = 100 }) => {
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
                    <div className="showlist_box">
                        <h2>{title}</h2>
                        <div className="showlist_grid_box">
                            {
                                listSongs.map((song, index) => {
                                    return (
                                        index < range &&
                                        <div key={song._id}>
                                            <SongBox song={song} changePlayingList={changePlayingList}/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    :
                    <div className="showlist_box">
                        <Skeleton width={200} height={30} style={{ margin: '0 20px' }} />
                        <div className="showlist_grid_box" >
                            <div className="box_skeleton">
                                <Skeleton height={150} />
                                <Skeleton height={22} />
                                <Skeleton height={18} />
                            </div>
                            <div className="box_skeleton">
                                <Skeleton height={150} />
                                <Skeleton height={22} />
                                <Skeleton height={22} />
                            </div>
                            <div className="box_skeleton">
                                <Skeleton height={150} />
                                <Skeleton height={22} />
                                <Skeleton height={22} />
                            </div>
                            <div className="box_skeleton">
                                <Skeleton height={150} />
                                <Skeleton height={22} />
                                <Skeleton height={22} />
                            </div>
                            <div className="box_skeleton">
                                <Skeleton height={150} />
                                <Skeleton height={22} />
                                <Skeleton height={22} />
                            </div>
                            <div className="box_skeleton">
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