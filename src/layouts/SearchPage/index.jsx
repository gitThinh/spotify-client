import { useContext } from "react"
import { Link } from "react-router-dom"
import { FaCircleXmark } from "react-icons/fa6"
import { FaPlay } from "react-icons/fa6"

import { ShowList, SongLine } from "/src/constants/components"
import { urlApiImg, urlApiAudioServer } from '/src/constants/env'
import { PlaySongContext, actions } from '/src/constants/stores'

import './style.css'


const SearchPage = ({ resulfSearch, isSearch, showPlaylist }) => {

    const [playingState, dispatch] = useContext(PlaySongContext)

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
                                            dispatch(actions.songsPlay(resulfSearch[0]))
                                        }}
                                    >
                                        <FaPlay />
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
                                        <div key={index}>
                                            <SongLine
                                                song={result}
                                                check={1}
                                                showPlaylist={showPlaylist}
                                            />
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
            <ShowList
                link={`${urlApiAudioServer}songs/page/2`}
                title={'Có thể bạn thích:'}
            />
        </div>
    )
}

export default SearchPage