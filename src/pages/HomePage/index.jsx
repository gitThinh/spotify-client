import { useState, useEffect, useRef, useContext, createContext } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

import { FiLogOut } from "react-icons/fi"

import { NavBar, Playing, SearchBox, ShowList } from '/src/constants/components'
import { Page404, SongDetail, Queue, SearchPage, PlaylistPage, Alert } from '/src/constants/layouts'
import { urlMLServer, urlApiAudioServer, apiKey } from '/src/constants/env'
import handleGetPlaylists from '/src/utils/getPlayLists'

import { PlaySongContext, actions } from '/src/constants/stores'


import './style.css'

export const methodsHandlePlaylists = createContext()
export const methodsHandleAlert = createContext()


const HomePage = () => {
    const [playingState, dispatch] = useContext(PlaySongContext)
    const { playingSong, currentIndex, playingList, isNewPlaying } = playingState
    const [rcmList, setRcmList] = useState([])
    const [randomList, setRandomList] = useState([])
    const [resulfSearch, setResulfSearch] = useState([])
    const [isSearch, setIsSearch] = useState(false)
    const [showPlaylist, setShowPlaylist] = useState([])
    const [messageAlert, setMessageAlert] = useState('')


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
    // console.log(tokens.accessToken);
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


    // get rcm list
    useEffect(() => {
        playingSong !== '' & isNewPlaying
            && setRcmList([])
        playingSong !== '' & isNewPlaying
            && fetch(`${urlMLServer + playingSong._id}`, {
                method: 'GET',
                headers: {
                    'x-api-key': apiKey
                },
            })
                .then(response => response.json())
                .then(data => data.statusCode === 200 && setRcmList(data.metadata))
    }, [playingSong])


    // add song from rcm list
    const selectSongInRcm = (pList, index) => {
        dispatch(actions.addToQueue(pList))
        dispatch(actions.selectSongPlay(playingList.length))
        const newArray = [...rcmList]
        newArray.splice(index, 1)
        setRcmList(newArray)
    }

    // randomly select
    function generateRandomArray(length) {
        const result = []
        for (let i = 0; i < length; i++) {
            result.push(i)
        }
        // Fisher-Yates Shuffle
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]]
        }
        return result
    }

    // create a random list
    useEffect(() => {
        setRandomList(generateRandomArray(playingList.length))
    }, [playingList.length])

    // handle next and prev song
    const handleNextSong = (type) => {
        if (type === 1 & playingList.length > 1
        ) {
            randomList.length <= 1 && setRandomList(generateRandomArray(playingList.length))
            dispatch(actions.selectSongPlay(randomList.shift()))
        }
        else {
            if (currentIndex < playingList.length - 1) {
                dispatch(actions.nextSong())
            }
            else {
                if (rcmList.length > 0) {
                    let newList = [...rcmList]
                    let songCut = newList.shift()
                    dispatch(actions.addToQueue(songCut))
                    dispatch(actions.selectSongPlay(playingList.length))
                    setRcmList(newList)
                }
                else {
                    dispatch(actions.selectSongPlay(0))
                }
            }
        }
    }

    // change container width when show playing component 
    useEffect(() => {
        if (isNewPlaying) {
            let showControler = document.querySelector('.container')
            showControler.style.height = 'calc(100vh - var(--playing-height))'
        }
    }, [playingSong])


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
    const handlePlaylists = () => {
        const userTokens = tokens
        const userInfo = user
        handleGetPlaylists(userTokens, userInfo).then(response => {
            setShowPlaylist(response)
            Cookies.set('playlists', JSON.stringify(response))
        })
    }

    // handle show alerts
    const handleShowAlerts = (message) => {
        setMessageAlert(message)
    }
    useEffect(() => {
        let time
        if (messageAlert) {
            time = setTimeout(() => {
                setMessageAlert('')
            }, 2000)
        }
        return (() => clearTimeout(time))
    }, [messageAlert])


    useEffect(() => {
        //get playlist in the first render
        user &&
            handlePlaylists()
    }, [])


    // check selected user inform
    const checkTargetHeaderUser = (e) => {
        if (infoUser.current) {
            if (!infoUser.current.contains(e.target))
                infoUserTable.current.style.display = 'none'
        }
    }


    // -------------------------------------------- RENDER ------------------------------------------
    return (
        <methodsHandleAlert.Provider value={handleShowAlerts}>
            <methodsHandlePlaylists.Provider value={handlePlaylists}>
                <div className="home_container" onClick={checkTargetHeaderUser}>
                    <Alert message={messageAlert} />
                    <div className="container">
                        <NavBar user={user} tokens={tokens} showPlaylist={showPlaylist}/>
                        <div className="bounder_layout">
                            <div className="header_user">
                                <div>
                                    {
                                        <Routes>
                                            <Route path='/search'
                                                element={
                                                    <SearchBox
                                                        setResulfSearch={setResulfSearch}
                                                        setIsSearch={setIsSearch}
                                                        style={{ visibility: 'visible' }}
                                                    />
                                                }
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
                                <Route index
                                    element={
                                        <div className="home_layout">
                                            <ShowList
                                                link={`${urlApiAudioServer + 'songs/page/1'}`}
                                                title={'Trang 1'}
                                            />
                                            <ShowList
                                                link={`${urlApiAudioServer}songs/page/3`}
                                                title={'Trang 2'}
                                            />
                                        </div>
                                    }
                                />
                                <Route path='queue'
                                    element={
                                        <Queue
                                            rcmList={rcmList}
                                            selectSongInRcm={selectSongInRcm}
                                            showPlaylist={showPlaylist}
                                        />
                                    }
                                />
                                <Route path='/songs/:id'
                                    element={
                                        <SongDetail
                                            showPlaylist={showPlaylist}
                                        />
                                    }
                                />
                                <Route path='/playlists/:id'
                                    element={
                                        <PlaylistPage
                                            showPlaylist={showPlaylist}
                                            user={user}
                                            tokens={tokens}
                                        />
                                    }
                                />
                                <Route path='/search'
                                    element={
                                        <SearchPage
                                            resulfSearch={resulfSearch}
                                            isSearch={isSearch}
                                            showPlaylist={showPlaylist}
                                        />
                                    }
                                />
                                <Route path='*' element={<Page404 />} />
                            </Routes>
                        </div>
                    </div>
                    { //set playing controls is hidden
                        playingSong && <Playing
                            playingSong={playingSong}
                            handleNextSong={handleNextSong}
                            userid={user.userId}
                        />
                    }
                    {/* playlist setting */}
                    <div className="playlist_setting">
                        <div className="playlist_setting__header"></div>
                    </div>
                </div>
            </methodsHandlePlaylists.Provider>
        </methodsHandleAlert.Provider>
    )
}

export default HomePage