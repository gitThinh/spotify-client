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
        setIsRcm(true)
        setPlayingList([pList])
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



    //chưa xong chuyển bài tới
    // next and prev song
    const nextSong = (type) => {
        setIsRcm(false)
        // 1 === random
        if (type === 1) {
            let nextIndex = Math.floor(Math.random() * rcmList.length)
            const newList = [...rcmList]
            newList.splice(nextIndex, 1)
            setRcmList(newList)
            return
        }
        setPlayingSong(rcmList[0])
        const newList = [...rcmList]
        newList.shift()
        setRcmList(newList)
    }
    const prevSong = () => {
        currentIndex !== 0 &&
            setCurrentIndex(prev => prev - 1)
            setPlayingSong(playingList[currentIndex - 1])
    }




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
            <Playing
                playingSong={playingSong}
                nextSong={nextSong}
                prevSong={prevSong}
            />
        </div>
    )
}

export default HomePage