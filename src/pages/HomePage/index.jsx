import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import Cookies from 'js-cookie'
import { FiLogOut } from "react-icons/fi"


import { NavBar, Playing, SearchBox, ShowList } from '/src/constants/components'
import { Page404, SongDetail, Queue, SearchPage } from '/src/constants/layouts'
import { urlMLServer, urlApiAudioServer, apiKey } from '/src/constants/env'
import handleGetPlaylists from '/src/utils/getPlayLists'


import './style.css'


const HomePage = () => {
    const [playingList, setPlayingList] = useState([])
    const [rcmList, setRcmList] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [playingSong, setPlayingSong] = useState('')
    const [isRcm, setIsRcm] = useState(false)
    const [showPlayer, setShowPlayer] = useState(false)
    const [resulfSearch, setResulfSearch] = useState([])
    const [isSearch, setIsSearch] = useState(false)
    const [showPlaylist, setShowPlaylist] = useState([])

    const infoUser = useRef()
    const infoUserTable = useRef()


    //get data user from cookies
    const [user, setUser] = useState(Cookies.get('User') !== undefined ? JSON.parse(Cookies.get('User')) : '')
    const [tokens, setTokens] = useState(Cookies.get('Tokens') !== undefined ? JSON.parse(Cookies.get('Tokens')) : '')


    // get inform when login with gg
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


    //get rcm list
    useEffect(() => {
        playingSong !== '' & isRcm &&
            fetch(`${urlMLServer + playingSong._id}`, {
                method: 'GET',
                headers: {
                    'x-api-key': apiKey
                },
            })
                .then(response => response.json())
                .then(data => data.statusCode === 200 && setRcmList(data.metadata))
        setIsRcm(false)
    }, [playingSong])


    // select new song, reset playinglist and rcm
    const changePlayingList = (pList) => {
        showPlayer === false && setShowPlayer(true)
        setPlayingList([pList])
        setIsRcm(true)
    }

    // add song into playinglist
    const addToPlayingList = (pList, index) => {
        setPlayingList(prev => [...prev, pList])
        const newArray = [...rcmList]
        newArray.splice(index, 1)
        setRcmList(newArray)
    }

    // update current index and playing song when add new song into playinglist
    useEffect(() => {
        playingList.length > 0 &&
            setCurrentIndex(playingList.length - 1)
        playingList.length > 0 &&
            setPlayingSong(playingList[playingList.length - 1])
    }, [playingList])

    // select song at playing list
    const playSongInPL = (index) => {
        setIsRcm(false)
        setPlayingSong(playingList[index])
        setCurrentIndex(index)
    }

    // handle next and prev song
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


    // change container width when show playing component 
    useEffect(() => {
        if (playingList.length > 0) {
            let showControler = document.querySelector('.container')
            showControler.style.height = 'calc(100vh - var(--playing-height))'
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

    // get playlists
    useEffect(() => {
        user && handleGetPlaylists(tokens, user, setShowPlaylist)
    }, [])


    const checkTargetHeaderUser = (e) => {
        if (infoUser.current) {
            if (!infoUser.current.contains(e.target))
                infoUserTable.current.style.display = 'none'
        }
    }


    // -------------------------------------------- RENDER ------------------------------------------
    return (
        <div className="home_container have_scroll" onClick={checkTargetHeaderUser}>
            <div className="container">
                <NavBar user={user} tokens={tokens} showPlaylist={showPlaylist} setShowPlaylist={setShowPlaylist} />
                <div className="bounder_layout have_scroll">
                    <div className="header_user">
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
                                <div className="info_user noone_coppy" ref={infoUser}>
                                    <img src='https://nth-audio.site/images/avt.jpg'
                                        onClick={() => {
                                            const detailsUser = document.querySelector('.info_user_table')
                                            detailsUser.style.display === 'none'
                                                ? detailsUser.style.display = 'block'
                                                : detailsUser.style.display = 'none'
                                        }}
                                    />
                                    <div className="info_user_table" style={{ display: 'none' }} ref={infoUserTable}>
                                        <ul>
                                            <li>
                                                <button className='info_user_table_option' >Profile</button>
                                            </li>
                                            <li>
                                                <button className='info_user_table_option' >Contact</button>
                                            </li>
                                            <li>
                                                <a href='/' className='info_user_table_option' >Support</a>
                                            </li>
                                            <li>
                                                <button className='info_user_table_option' onClick={handleLogout}>
                                                    Đăng xuất
                                                    <FiLogOut className='info_user_table_icon' />
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                :
                                <div className="login_signin info_user noone_coppy">
                                    <a href="/signin" className='signin_btn login_signin_btn'>
                                        Đăng Ký
                                    </a>
                                    <a href="/login" className='login_btn login_signin_btn'>
                                        Đăng Nhập
                                    </a>
                                </div>
                        }
                    </div>
                    <Routes>
                        <Route path='/' element={
                            <div className="home_layout">
                                <ShowList link={`${urlApiAudioServer + 'songs/page/1'}`} title={'Trang 1'} changePlayingList={changePlayingList} />
                                <ShowList link={`${urlApiAudioServer}songs/page/3`} title={'Trang 2'} changePlayingList={changePlayingList} />
                            </div>
                        }
                        />
                        <Route path='queue'
                            element={
                                <Queue
                                    playingList={playingList}
                                    currentIndex={currentIndex}
                                    rcmList={rcmList}
                                    addToPlayingList={addToPlayingList}
                                    playSongInPL={playSongInPL}
                                    showPlaylist={showPlaylist}
                                />
                            }
                        />
                        <Route path='/songs/:id' element={
                            <SongDetail changePlayingList={changePlayingList} showPlaylist={showPlaylist} />
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
            <div className="playlist_setting">
                <div className="playlist_setting__header"></div>
            </div>
        </div>
    )
}

export default HomePage