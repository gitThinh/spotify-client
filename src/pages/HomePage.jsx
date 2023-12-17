import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { FiLogOut } from "react-icons/fi";

import Page404 from '/src/pages/Page404'
import NavBar from "/src/components/NavBar"
import Playing from "/src/components/Playing"
import HomeLayout from '/src/layouts/HomeLayout'
import SongDetail from '/src/layouts/SongDetail'
import Queue from '/src/layouts/Queue'
import SearchPage from '/src/layouts/SearchPage'
import SearchBox from '/src/layouts/SearchBox'

import '/src/assets/Home/layout2.css'


const urlMLServer = import.meta.env.VITE_API_API_MLSERVER
const urlApiAudioServer = import.meta.env.VITE_API_URL_AUDIOSERVER
const apiKey = import.meta.env.VITE_API_API_KEY



const HomePage = () => {
    //danh sách phat
    const [playingList, setPlayingList] = useState([])
    //danh sách đề xuất
    const [rcmList, setRcmList] = useState([])
    //stt bài đang phát
    const [currentIndex, setCurrentIndex] = useState(0)
    //bài đang phát
    const [playingSong, setPlayingSong] = useState('')
    //xác nhận là có đã đề xuất chưa
    const [isRcm, setIsRcm] = useState(false)
    //sửa thanh chạy không hiện khi chưa chọn bài
    const [showPlayer, setShowPlayer] = useState(false)
    //kết quả tìm kiếm
    const [resulfSearch, setResulfSearch] = useState([])
    //xác nhận là có đã tìm kiếm chưa
    const [isSearch, setIsSearch] = useState(false)
    //danh sách playlist
    const [showPlaylist, setShowPlaylist] = useState([])



    //lấy dữ liệu user từ cookies
    const [user, setUser] = useState(Cookies.get('User') !== undefined ? JSON.parse(Cookies.get('User')) : '')
    const [tokens, setTokens] = useState(Cookies.get('Tokens') !== undefined ? JSON.parse(Cookies.get('Tokens')) : '')


    // lấy thông tin khi đăng nhập bằng gg
    const history = useNavigate()
    const location = useLocation()
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        const userId = searchParams.get('userId')
        const userName = searchParams.get('userName')
        const accessToken = searchParams.get('accessToken')
        const refreshToken = searchParams.get('refreshToken')
        if (userId && userName && accessToken && refreshToken !== false) {
            Cookies.set('Tokens', JSON.stringify({ accessToken, refreshToken }))
            Cookies.set('User', JSON.stringify({ userId, userName }))
            history('/')
            setUser({ userId, userName })
            setTokens({ accessToken, refreshToken })
        }
    }, [])





    // -------------------------------------------- FUNCTION ------------------------------------------
    // refreshToken
    useEffect(() => {
        const timerRefreshToken = tokens && setTimeout(() => {
            fetch(`${urlApiAudioServer}user/refreshToken`, {
                method: 'GET',
                headers: {
                    'x-api-key': apiKey,
                    'x-r-token': tokens.refreshToken,
                    'x-client-id': user.userId
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.metadata) {
                        Cookies.set('Tokens', JSON.stringify(data.metadata.tokens))
                        Cookies.set('User', JSON.stringify(data.metadata.user))
                        setTokens(JSON.parse(Cookies.get('Tokens')))
                    }
                })
        }, 29 * 60 * 1000)
        return () => clearTimeout(timerRefreshToken)
    }, [tokens])


    //lấy rcm list
    useEffect(() => {
        playingSong !== '' & isRcm &&
            fetch(`${urlMLServer + playingSong._id}`, {
                method: 'GET',
                headers: {
                    'x-api-key': apiKey
                },
            })
                .then(response => response.json())
                .then(data => data.statusCode === 200 ? setRcmList(data.metadata) : setRcmList([]))
        setIsRcm(false)
    }, [playingSong])


    // chọn bài hát mới reset lại playinglist và rcm
    const changePlayingList = (pList) => {
        showPlayer === false && setShowPlayer(true) //sửa thanh chạy không hiện khi chưa chọn bài
        setPlayingList([pList])
        setIsRcm(true)
    }

    // thêm vào danh sách bài hát đang phát ở rcm list
    const addToPlayingList = (pList, index) => {
        setPlayingList(prev => [...prev, pList])
        const newArray = [...rcmList]
        newArray.splice(index, 1)
        setRcmList(newArray)
    }

    // cập nhật current index và playing song khi playing list thay đổi
    useEffect(() => {
        playingList.length > 0 &&
            setCurrentIndex(playingList.length - 1)
        playingList.length > 0 &&
            setPlayingSong(playingList[playingList.length - 1])
    }, [playingList])

    // chọn bài hát khi ở trên playing list
    const playSongInPL = (index) => {
        setIsRcm(false)
        setPlayingSong(playingList[index])
        setCurrentIndex(index)
    }


    // next and prev song
    const nextSong = (type) => {
        if (type === 1 & playingList.length > 1
        ) {
            let randomIndex = Math.floor(Math.random() * playingList.length)
            while (randomIndex === currentIndex) {
                randomIndex = Math.floor(Math.random() * playingList.length)
            }
            setCurrentIndex(randomIndex)
            setPlayingSong(playingList[randomIndex])
            return
        }
        if (currentIndex < playingList.length - 1) {
            setCurrentIndex(prev => prev + 1)
            setPlayingSong(playingList[currentIndex + 1])
        }
        else {
            if (rcmList.length > 0) {
                setPlayingSong(rcmList[0])
                let newList = [...rcmList]
                let songCut = newList.shift()
                setPlayingList(prev => [...prev, songCut])
                setRcmList(newList)
            }
            else {
                setCurrentIndex(0)
                setPlayingSong(playingList[0])
            }
        }
    }
    const prevSong = () => {
        currentIndex &&
            setCurrentIndex(prev => prev === 0 ? prev : prev - 1)
        setPlayingSong(playingList[currentIndex !== 0 ? currentIndex - 1 : currentIndex])
    }


    //sửa thanh chạy không hiện khi chưa chọn bài
    useEffect(() => {
        if (playingList.length > 0) {
            let showControler = document.querySelector('.container')
            showControler.style.height = 'calc(100vh - 90px)'
        }
    }, [showPlayer])


    // handle logout
    const handleLogout = () => {
        user &&
            fetch(`${urlApiAudioServer}user/logout`, {
                method: 'POST',
                headers: {
                    'x-api-key': apiKey,
                    'Authorization': tokens.accessToken,
                    'x-client-id': user.userId
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.statusCode === 200) {
                        Cookies.remove('User')
                        Cookies.remove('Tokens')
                        setTokens('')
                        setUser('')
                    }
                })
    }

    //playlists
    const handleGetPlaylists = () => {
        fetch(`${urlApiAudioServer}user/playLists`, {
            headers: {
                'x-api-key': apiKey,
                'Authorization': tokens.accessToken,
                'x-client-id': user.userId
            }
        })
            .then(response => response.json())
            .then(data => {
                data.statusCode === 200 &&
                    setShowPlaylist(prev => prev !== data.metadata.playLists && data.metadata.playLists)
            })
    }
    useEffect(() => {
        user && handleGetPlaylists()
    }, [])



    // -------------------------------------------- RENDER ------------------------------------------
    return (
        <div className="homeContainer">
            <div className="container">
                <NavBar user={user} tokens={tokens} showPlaylist={showPlaylist} handleGetPlaylists={handleGetPlaylists} />
                <div className="bounderChildLayout haveScroll">
                    <div className="headerUser">
                        <div>
                            {
                                <Routes>
                                    <Route path='/search'
                                        element={<SearchBox
                                            setResulfSearch={setResulfSearch}
                                            setIsSearch={setIsSearch}
                                            style={{ visibility: 'visible' }}
                                        />}
                                    />
                                </Routes>
                            }
                        </div>
                        {
                            user !== '' ?
                                <div className="infoUser">
                                    <img src='https://nth-audio.site/images/avt.jpg'
                                        onClick={() => {
                                            const detailsUser = document.querySelector('.infoUserTable')
                                            detailsUser.style.display === 'none'
                                                ? detailsUser.style.display = 'block'
                                                : detailsUser.style.display = 'none'
                                        }}
                                    />
                                    <div className="infoUserTable" style={{ display: 'none' }}>
                                        <h3 className='userName detailsUser onelineText'>{user.userName}</h3>
                                        <button onClick={handleLogout} className='infoUserTable__options' ><FiLogOut size={20} />Đăng xuất</button>
                                    </div>
                                </div>
                                :
                                <div className="loginSignin infoUser">
                                    <a href="/signin" className='navBtn'>
                                        Đăng Ký
                                    </a>
                                    <a href="/login" className='navBtn'>
                                        Đăng Nhập
                                    </a>
                                </div>
                        }
                    </div>
                    <Routes>
                        <Route path='/' element={<HomeLayout changePlayingList={changePlayingList} />} />
                        <Route path='queue'
                            element={
                                <Queue
                                    playingList={playingList}
                                    currentIndex={currentIndex}
                                    rcmList={rcmList}
                                    addToPlayingList={addToPlayingList}
                                    playSongInPL={playSongInPL}
                                />
                            }
                        />
                        <Route path='/songs/:id' element={
                            <SongDetail changePlayingList={changePlayingList} />
                        } />
                        <Route path='/search'
                            element={<SearchPage changePlayingList={changePlayingList} resulfSearch={resulfSearch} isSearch={isSearch} />}
                        />
                        <Route path='*' element={<Page404 />} />
                    </Routes>
                </div>
            </div>
            { //sửa thanh chạy không hiện khi chưa chọn bài
                showPlayer && <Playing
                    playingSong={playingSong}
                    nextSong={nextSong}
                    prevSong={prevSong}
                    userid={user.userId}
                />
            }
            {/* playlist setting */}
            <div className="playlistSetting">
                <div className="playlistSetting__header"> </div>
            </div>
        </div>
    )
}

export default HomePage