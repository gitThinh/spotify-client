import { useState, useEffect } from "react"
import SongLine from "./SongLine"
import ShowList from "./ShowList"



const SearchPage = ({ updatePlayingList }) => {
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])
    const [isSearch, setIsSearch] = useState(false)



    const handleSearch = async (e) => {
        e.preventDefault()
        const response = await fetch(`http://nth-audio.site/api/audio-server/search?keyword=${search}`,
            {
                headers: {
                    'x-api-key': 'c3ab8ff13720e8ad9047dd39466b3c8974e592c2fa383d4a3960714caef0c4f2'
                }
            })
        const data = await response.json()
        setResults(data.metadata)
    }

    const handleSentInput = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e)
        }
      }


    return (
        <div className="searchLayout">
            <div className="searchPage">
                <div className="searchBox">
                    <i className="fa-solid fa-magnifying-glass" onClick={handleSearch}></i>
                    <input type="text"
                        className="textSearch"
                        placeholder="Nhập thông tin muốn tìm"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        onKeyDown={handleSentInput}
                    />
                </div>
            </div>
            {
                results.length > 0 &&
                <div className="showResult">
                    <div className="topResult">
                        <h3 className="sectionTitle">Top Result</h3>
                        <div className="topResultBox">
                            <img src={`http://nth-audio.site/${results[0].coverArt}`} className="imgTopResult" />
                            <h2 className="titleTopResult onelineText">{results[0].title}</h2>
                            <h4 className="artistTopResult">{results[0].artist_name}</h4>
                            <button className="startSong"
                                onClick={(e) => {
                                    e.preventDefault()
                                    updatePlayingList(results[0], 1)
                                }}
                            >
                                <i className="fa-solid fa-play"></i>
                            </button>
                        </div>
                    </div>
                    <div className="listResult">
                        <h3 className="sectionTitle">Songs</h3>
                        {
                            results.map((result, index) => {
                                return (
                                    index < 5 &&
                                    <div key={index} onDoubleClick={() => updatePlayingList(result, 1)}>
                                        <SongLine song={result}  />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }

            <ShowList link={'/2'} title={'Có thể bạn thích:'} updatePlayingList={updatePlayingList} />
        </div>
    )
}

export default SearchPage