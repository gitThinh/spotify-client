import { useState, useEffect } from "react"
import SongLine from "./SongLine";
import ShowList from "./ShowList";
import SongBox from "./SongBox";



const SearchPage = () => {
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])




    const handleSearch = async (e) => {
        e.preventDefault()
        const response = await fetch(`http://nth-audio.site/api/search?keyword=${search}`,
            {
                headers: {
                    'x-api-key': 'c3ab8ff13720e8ad9047dd39466b3c8974e592c2fa383d4a3960714caef0c4f2'
                }
            });
        const data = await response.json()
        setResults(data.metadata)
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
                    />
                </div>
            </div>
            {
                results.length > 0 &&
                <div className="showResult">
                    <div className="topResult">
                        <h3 className="sectionTitle">Top Result</h3>
                        <div className="topResultBox">
                            <SongBox data={results[0]}/>

                        </div>
                    </div>
                    <div className="listResult">
                        <h3 className="sectionTitle">Songs</h3>
                        {
                            results.map((result, index) => {
                                return (
                                    index < 4 &&
                                    <div key={index}>
                                        <SongLine song={result} index={index} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }

            <ShowList link={'/2'} title={'Có thể bạn thích:'} />
        </div>
    );
};

export default SearchPage;