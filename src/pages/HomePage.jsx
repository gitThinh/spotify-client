import { Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

import NavBar from "../components/NavBar"
import Playing from "../components/Playing"
import HomeLayout from '../components/LayoutComponents/HomeLayout'
import SongDetail from '../components/LayoutComponents/SongDetail'
import Queue from '../components/LayoutComponents/Queue'


import '../assets/Home/layout2.css'
import SearchPage from '../components/LayoutComponents/SearchPage'


const HomePage = () => {
    const [playingList, setPlayingList] = useState([])
    const [playingSong, setPlayingSong] = useState(playingList[0])
    const [currentIndex, setCurrentIndex] = useState(0)

    //lấy dữ liệu user từ cookies
    const [user, setUser] = Cookies.get('User') !== undefined ? useState(JSON.parse(Cookies.get('User'))) : useState('')
    const tokens = Cookies.get('Tokens') !== undefined && JSON.parse(Cookies.get('Tokens'))

    
    // -------------------------------------------- FUNCTION ------------------------------------------
    // refreshToken
    // tokens && (
    //     useEffect(() => {
    //         const timerRefreshToken = tokens.accessToken setTimeout(() => {
    //             console.log('send refresh token')
    //         }, 5 * 1000)
    
    //         return () => clearTimeout(timerRefreshToken)
    //     }, [tokens.accessToken])
    // )



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

    //rerender when add playing list
    useEffect(() => {
        if (currentIndex < playingList.length)
            setPlayingSong(playingList[currentIndex])
        else
            setPlayingSong(playingList[playingList.length - 1])
    }, [playingList, currentIndex, playingSong])


    //set playing song
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
                <NavBar user={user} tokens={tokens} setUser={setUser} />
                <Routes>
                    <Route index element={<HomeLayout updatePlayingList={updatePlayingList} />} />
                    <Route path='/queue' element={<Queue
                        playingList={playingList}
                        updatePlayingSong={updatePlayingSong}
                        currentIndex={currentIndex} />}
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