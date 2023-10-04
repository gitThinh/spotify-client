import { useState } from "react"
import { Link } from "react-router-dom"
import ShowList from "./ShowList"
import SongLineSearch from "./SongLineSearch"

const urlApiImg = import.meta.env.VITE_API_URL_IMG
const urlApiAudioServer = import.meta.env.VITE_API_URL_AUDIOSERVER
const apiKey = import.meta.env.VITE_API_API_KEY

const SearchPage = ({ updatePlayingList }) => {
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])
    const [isSearch, setIsSearch] = useState(false)


    const handleSearch = async (e) => {
        setIsSearch(true)
        e.preventDefault()
        const response = await fetch(`${urlApiAudioServer}search?keyword=${search}`,
            {
                headers: {
                    'x-api-key': apiKey
                }
            })
        const data = await response.json()
        setResults(data.metadata)
    }

    const handleSentInput = (e) => {
        if (e.key === 'Enter' & search !== '') {
            handleSearch(e)
        }
    }

    return (
        <div className="searchLayout">
            <div className="searchPage">
                <div className="searchBox">
                    <i className="fa-solid fa-magnifying-glass" onClick={search !== '' ? handleSearch : () => { }}></i>
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
                results.length > 0 ?
                    <div className="showResult">
                        <div className="topResult">
                            <h3 className="sectionTitle">Top Result</h3>
                            <Link to={`/songs/${results[0]._id}`}>
                                <div className="topResultBox">
                                    <img src={`${urlApiImg + results[0].coverArt}`} className="imgTopResult" />
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
                            </Link>
                        </div>
                        <div className="listResult">
                            <h3 className="sectionTitle">Songs</h3>
                            {
                                results.map((result, index) => {
                                    return (
                                        index < 5 &&
                                        <div key={index} onDoubleClick={() => updatePlayingList(result, 1)}>
                                            <SongLineSearch song={result} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    :
                    isSearch &&
                    <div className="notFoundResult">
                        <i className="fa-solid fa-circle-xmark" style={{fontSize:'72px'}}></i>
                        <h2>Không tìm thấy kết quả</h2>
                    </div>
            }

            <ShowList link={`${urlApiAudioServer}songs/page/2`} title={'Có thể bạn thích:'} updatePlayingList={updatePlayingList} />
        </div>
    )
}

export default SearchPage