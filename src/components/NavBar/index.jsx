import { memo } from 'react'
import { Link } from 'react-router-dom'
import { HiHome, HiMagnifyingGlass } from 'react-icons/hi2'
import { FaCompass, FaPlus } from 'react-icons/fa6'


import { urlApiAudioServer, apiKey } from '/src/constants/env'
import handleGetPlaylists from '/src/utils/getPlayLists'

import './style.css'


const NavBar = ({ user, tokens, showPlaylist, setShowPlaylist }) => {


    const handleAddPlaylist = () => {
        fetch(`${urlApiAudioServer}user/createPlaylist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'Authorization': tokens.accessToken,
                'x-client-id': user.userId
            },
            body: JSON.stringify({ playListName: `My playlist #${showPlaylist.length}` })
        })
            .then(response => response.json())
            .then(data => {
                data.statusCode === 201 && handleGetPlaylists(tokens, user, setShowPlaylist)
            })
    }


    return (
        <div className="nav_bar noone_coppy">
            <nav className="nav_bar_options" >
                <Link to="/">
                    <HiHome className='nav_bar_options_icons' />
                    <p>Trang Chủ</p>
                </Link>
                <Link to="/search">
                    <HiMagnifyingGlass className='nav_bar_options_icons' />
                    <p>Tìm Kiếm</p>
                </Link>
                <Link to="/search">
                    <FaCompass className='nav_bar_options_icons' />
                    <p>Khám Phá</p>
                </Link>
            </nav>
            <span className='nav_bar_line'></span>
            {/* components Library */}
            <div className="nav_bar_library">
                <div className="nav_bar_library_header">
                    <div className="nav_bar_library_title">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" fill="none" className='nav_bar_options_icons'>
                            <path d="M12 0H0V2.71429H12V0ZM12 5.42857H0V8.14286H12V5.42857ZM0 13.5714H8V10.8571H0V13.5714ZM14 0V11.1014C13.69 10.9521 13.35 10.8571 13 10.8571C11.34 10.8571 10 12.6757 10 14.9286C10 17.1814 11.34 19 13 19C14.66 19 16 17.1814 16 14.9286V2.71429H19V0H14Z" fill="white" />
                        </svg>
                        <p>Thư viện</p>
                    </div>
                    <div className="nav_bar_library_addplaylist" onClick={() => user ? handleAddPlaylist : ''}><FaPlus /></div>
                </div>
                {
                    user &&
                    <div className="nav_bar_library_playlists have_scroll">
                        {
                            showPlaylist.length > 0 &&
                            showPlaylist.map((playlist, index) => {
                                return (
                                    user &&
                                    <Link to={`/playlist/${playlist._id}`} style={{ width: '100%' }} key={index}>
                                        <div className="nav_bar_library_playlist">
                                            <img src='https://nth-audio.site/images/avt.jpg' />
                                            <div className="nav_bar_library_playlist_details">
                                                <h3 className='oneline_text'>{playlist.playListName}</h3>
                                                <p className='oneline_text'>Playlist . {user.userName}</p>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                        {/* <div className="nav_bar_library_playlist">
                            <img src='https://nth-audio.site/images/avt.jpg' />
                            <div className="nav_bar_library_playlist_details">
                                <input type="text" placeholder='Nhập tên playlist' />
                            </div>
                        </div> */}
                    </div>
                }
                {
                    !user &&
                    <p style={{
                        color: '#888',
                        fontSize: '16px',
                        textAlign: 'center',
                        marginTop: '15px'
                    }}>
                        Vui lòng đăng nhập để sử dụng chức năng này
                    </p>
                }

            </div>
        </div>
    )
}

export default memo(NavBar)