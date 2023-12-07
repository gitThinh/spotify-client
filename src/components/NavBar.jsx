import { memo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HiHome, HiMagnifyingGlass } from 'react-icons/hi2'
import { FaCompass } from 'react-icons/fa6'

import '../assets/NavBar.css'

const urlApiAudioServer = import.meta.env.VITE_API_URL_AUDIOSERVER
const apiKey = import.meta.env.VITE_API_API_KEY



const NavBar = ({ user, tokens, showPlaylist, handleGetPlaylists }) => {

    const handleAddPlaylist = () => {
        fetch(`${urlApiAudioServer}user/createPlaylist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'Authorization': tokens.accessToken,
                'x-client-id': user.userId
            },
            body: JSON.stringify({playListName : `My playlist #${showPlaylist.length}`})
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                data.statusCode === 201 && handleGetPlaylists()
            })
    }


    return (
        <div className="navBar">
            <nav className="navBarOptions" >
                <Link to="/">
                    <HiHome className='navBarOptions__icons' />
                    Trang Chủ
                </Link>
                <Link to="/search">
                    <HiMagnifyingGlass className='navBarOptions__icons' />
                    Tìm Kiếm
                </Link>
                <Link to="/search">
                    <FaCompass className='navBarOptions__icons' />
                    Khám Phá
                </Link>
            </nav>
            <span className='navBarLine'></span>
            {/* components Library */}
            <div className="navBarLibrary">
                <div className="navBarLibrary__title">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" fill="none" className='navBarOptions__icons'>
                        <path d="M12 0H0V2.71429H12V0ZM12 5.42857H0V8.14286H12V5.42857ZM0 13.5714H8V10.8571H0V13.5714ZM14 0V11.1014C13.69 10.9521 13.35 10.8571 13 10.8571C11.34 10.8571 10 12.6757 10 14.9286C10 17.1814 11.34 19 13 19C14.66 19 16 17.1814 16 14.9286V2.71429H19V0H14Z" fill="white" />
                    </svg>
                    Danh sách phát
                </div>
                {
                    user &&
                    <div className="navBarLibrary__playlists haveScroll">
                        {
                            showPlaylist.length > 0 &&
                            showPlaylist.map((playlist, index) => {
                                return (
                                    user &&
                                    <Link to={`/playlist/${playlist._id}`} style={{width:'100%'}}  key={index}>
                                        <div className="navBarLibrary__playlist">
                                            <img src='https://nth-audio.site/images/avt.jpg' />
                                            <div className="navBarLibrary__playlist__details">
                                                <h3 className='onelineText'>{playlist.playListName}</h3>
                                                <p className='onelineText'>Playlist . {user.userName}</p>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                }
                {
                    user ?
                        <button className="navBarLibrary__addPlaylist" onClick={handleAddPlaylist}>Thêm danh sách phát</button>
                        :
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