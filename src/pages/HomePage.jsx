import { Route, Routes } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
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
    const [isReady, setIsReady] = useState(false)


    //lấy dữ liệu user từ cookies
    const [user, setUser] = Cookies.get('User') !== undefined ? useState(JSON.parse(Cookies.get('User'))) : useState('')
    const tokens = Cookies.get('Tokens') !== undefined && JSON.parse(Cookies.get('Tokens'))


    // -------------------------------------------- FUNCTION ------------------------------------------
    const updatePlayingList = (pList) => {
        setPlayingList(prev => {
            const check = prev.some(song => JSON.stringify(song) === JSON.stringify(pList))
            if (check) {
                return prev
            } else
                return [...prev, pList]
        })
    }



    //rerender when add playing list
    useEffect(() => {
        setPlayingSong(playingList[currentIndex])
    }, [playingList, currentIndex, isReady, playingSong])



    //set playing song
    const updatePlayingSong = (index) => {
        setCurrentIndex(index)
    }

    // next and prev song
    const nextSong = (type) => {
        // random
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
        setPlayingSong(playingList[prevIndex])
        setCurrentIndex(prevIndex)
    }

    // -------------------------------------------- RENDER ------------------------------------------
    return (
        <div className="homeContainer">
            <div className="container">
                <NavBar user={user} tokens={tokens} setUser={setUser} />
                <Routes>
                    <Route index element={<HomeLayout />} />
                    <Route path='/queue' element={<Queue
                        playingList={playingList}
                        updatePlayingSong={updatePlayingSong}
                        currentIndex={currentIndex} />}
                    />
                    <Route path='/songs/:id' element={<SongDetail updatePlayingList={updatePlayingList} />} />
                    <Route path='/search' element={<SearchPage />} />
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