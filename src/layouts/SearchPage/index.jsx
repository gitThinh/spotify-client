import { Link } from "react-router-dom"
import { FaCircleXmark } from "react-icons/fa6"
import { FaPlay } from "react-icons/fa"
import { FaHeadphonesAlt } from 'react-icons/fa'

import { ShowList } from "/src/constants/components"
import formatTime from '/src/utils/formatTime'
import { urlApiImg, urlApiAudioServer } from '/src/constants/env'

import './style.css'


const SearchPage = ({ changePlayingList, resulfSearch, isSearch }) => {

    return (
        <div className="search_layout">
            {
                resulfSearch.length > 0 ?
                    <div className="show_result">
                        <div className="top_result">
                            <h3 className="section_title">Kết quả tìm kiếm hàng đầu</h3>
                            <Link to={`/songs/${resulfSearch[0]._id}`}>
                                <div className="top_result_box">
                                    <img src={`${urlApiImg + resulfSearch[0].coverArt}`} className="img_top_result" />
                                    <h2 className="title_top_result oneline_text">{resulfSearch[0].title}</h2>
                                    <h4 className="artist_top_result">{resulfSearch[0].artist_name}</h4>
                                    <button className="start_song"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            changePlayingList(resulfSearch[0], 1)
                                        }}
                                    >
                                        <FaPlay size={22} />
                                    </button>
                                </div>
                            </Link>
                        </div>
                        <div className="list_result">
                            <h3 className="section_title">Bài hát</h3>
                            {
                                resulfSearch.map((result, index) => {
                                    return (
                                        index < 5 &&
                                        <div key={index} onDoubleClick={() => changePlayingList(result)}>
                                            <div className="songs_line_search songs_line">
                                                <img className="songs_thumb" src={`${urlApiImg + result.coverArt}`} />
                                                <div className="songs_details">
                                                    <Link to={`/songs/${result._id}`} style={{ width: '100%', maxWidth: 'max-content' }}>
                                                        <h3 className="songs_title oneline_text" >{result.title}</h3>
                                                    </Link>
                                                    <p className="songs_author under_link">{result.artist_name}</p>
                                                </div>
                                                <p className="songs_count content_center" style={{ gap: '5px' }}>{result.views}<FaHeadphonesAlt size={14} /></p>
                                                <p className="songs_timer content_center">{formatTime(result.duration)}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    :
                    isSearch &&
                    <div className="not_found_result">
                        <FaCircleXmark size={70} />
                        <h2>Không tìm thấy kết quả</h2>
                    </div>
            }

            <ShowList link={`${urlApiAudioServer}songs/page/2`} title={'Có thể bạn thích:'} changePlayingList={changePlayingList} />
        </div>
    )
}

export default SearchPage