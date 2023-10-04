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


const urlApiAudioServer = import.meta.env.VITE_API_URL_AUDIOSERVER
const apiKey = import.meta.env.VITE_API_API_KEY



const HomePage = () => {
    const [playingList, setPlayingList] = useState([])
    const [playingSong, setPlayingSong] = useState(playingList[0])
    const [currentIndex, setCurrentIndex] = useState(0)

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


    // thêm vào danh sách phát
    const updatePlayingList = (pList, type) => {
        // type = 0 thì chỉ add vào 
        // type = 1 thì add xong cho chạy lun
        let getIndex
        setPlayingList(prev => {
            // const check = prev.some(song => JSON.stringify(song) === JSON.stringify(pList))
            getIndex = prev.findIndex(song => song._id === pList._id)
            type === 1 & getIndex >= 0 && setCurrentIndex(getIndex)
            if (getIndex >= 0) {
                return prev
            } else
                return [...prev, pList]
        })
        type === 1 & getIndex === -1 && setCurrentIndex(playingList.length)
    }


    // xóa khỏi danh sách phát
    const deletePlayingList = (index) => {
        const newList = [...playingList];
        newList.splice(index, 1)
        setPlayingList(newList)
    }


    //rerender when playing list is changed
    useEffect(() => {
        if (currentIndex < playingList.length)
            setPlayingSong(playingList[currentIndex])
        else
            setPlayingSong(playingList[playingList.length - 1])
    }, [playingList, currentIndex])


    //đặt lại bài đang phát theo số thứ tự
    const updatePlayingSong = (index) => {
        setCurrentIndex(index)
    }


    // next and prev song
    const nextSong = (type) => {
        // 1 === random
        if (type === 1) {
            let nextIndex = Math.floor(Math.random() * playingList.length)
            while (nextIndex === currentIndex) nextIndex = Math.floor(Math.random() * playingList.length)
            setCurrentIndex(nextIndex)
            updatePlayingSong(nextIndex)
            return;
        }
        const nextIndex = (currentIndex + 1) % playingList.length
        setCurrentIndex(nextIndex)
        updatePlayingSong(nextIndex)
    }
    const prevSong = () => {
        const prevIndex = (currentIndex - 1 + playingList.length) % playingList.length
        setCurrentIndex(prevIndex)
        updatePlayingSong(prevIndex)
    }

    // -------------------------------------------- RENDER ------------------------------------------
    return (
        <div className="homeContainer">
            <div className="container">
                <NavBar user={user} tokens={tokens} setUser={setUser} setTokens={setTokens} />
                <Routes>
                    <Route index element={<HomeLayout updatePlayingList={updatePlayingList} />} />
                    <Route path='/queue' element={<Queue
                        playingList={playingList}
                        updatePlayingSong={updatePlayingSong}
                        currentIndex={currentIndex}
                        deletePlayingList={deletePlayingList}
                        updatePlayingList={updatePlayingList}
                    />}
                    />
                    <Route path='/songs/:id' element={
                        <SongDetail
                            updatePlayingList={updatePlayingList}
                        />
                    } />
                    <Route path='/search' element={<SearchPage updatePlayingList={updatePlayingList} />} />
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