import { Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

import NavBar from "../components/NavBar"
import Playing from "../components/Playing"
import HomeLayout from '../components/LayoutComponents/HomeLayout'
import SongDetail from '../components/LayoutComponents/SongDetail'
import Queue from '../components/LayoutComponents/Queue'
import SearchPage from '../components/LayoutComponents/SearchPage'

import '../assets/Home/layout2.css'


const urlMLServer = import.meta.env.VITE_API_API_MLSERVER
const urlApiAudioServer = import.meta.env.VITE_API_URL_AUDIOSERVER
const apiKey = import.meta.env.VITE_API_API_KEY



const HomePage = () => {
    const [playingList, setPlayingList] = useState([])
    const [rcmList, setRcmList] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [playingSong, setPlayingSong] = useState('')
    const [isRcm, setIsRcm] = useState(false)
    const [showPlayer, setShowPlayer] = useState(false)

    //lấy dữ liệu user từ cookies
    const [user, setUser] = useState(Cookies.get('User') !== undefined ? JSON.parse(Cookies.get('User')) : '')
    const [tokens, setTokens] = useState(Cookies.get('Tokens') !== undefined ? JSON.parse(Cookies.get('Tokens')) : '')


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
        }, 30 * 60 * 1000)
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
                .then(data => setRcmList(data.metadata))
        setIsRcm(false)
    }, [playingSong])


    // chọn bài hát mới reset lại playinglist và rcm
    const changePlayingList = (pList) => {
        showPlayer === false && setShowPlayer(true)
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
    const nextSong = () => {
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
        }
    }
    const prevSong = () => {
        currentIndex &&
            setCurrentIndex(prev => prev === 0 ? prev : prev - 1)
        setPlayingSong(playingList[currentIndex !== 0 ? currentIndex - 1 : currentIndex])
    }

    
    useEffect(() => {
        if (playingList.length > 0){
            let showControler = document.querySelector('.container')
            showControler.style.height = 'calc(100vh - 120px)'
        }
    },[showPlayer])



    // -------------------------------------------- RENDER ------------------------------------------
    return (
        <div className="homeContainer">
            <div className="container">
                <NavBar user={user} tokens={tokens} setUser={setUser} setTokens={setTokens} />
                <Routes>
                    <Route index element={<HomeLayout changePlayingList={changePlayingList} />} />
                    <Route path='/queue'
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
                    <Route path='/search' element={<SearchPage changePlayingList={changePlayingList} />} />
                </Routes>
            </div>
            {
                showPlayer && <Playing
                    playingSong={playingSong}
                    nextSong={nextSong}
                    prevSong={prevSong}
                />
            }
        </div>
    )
}

export default HomePage