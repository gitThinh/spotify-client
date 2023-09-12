import { useEffect, useState } from "react";
import SongBox from "./SongBox";
import '../../assets/Home/HomeLayout.css'



const HomeLayout = () => {
    const [songs, setSongs] = useState([])


    // ------------------------------------------------ FUNCTION ----------------------------------------------------------------
    useEffect(() => {
        const loadSongs = async () => {
            const response = await fetch('http://116.110.85.13:8080/api/songs/page/1', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'c3ab8ff13720e8ad9047dd39466b3c8974e592c2fa383d4a3960714caef0c4f2'
                },
            })
            const data = await response.json()
            setSongs(data.metadata.songs)
        }
        loadSongs()
    }, [])



    // ------------------------------------------------ RENDER ----------------------------------------------------------------
    return (
        <div className="homeLayout">
            <h2 className="titlePages">Songs</h2>
            <div className="renderPages">
                {
                    songs.map((song) => {
                        return (
                            <div key={song._id}>
                                <SongBox data={song} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default HomeLayout