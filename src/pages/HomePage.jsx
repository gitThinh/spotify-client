import { Route, Routes } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'

import NavBar from "../components/NavBar"
import Playing from "../components/Playing"
import HomeLayout from '../components/LayoutComponents/HomeLayout'
import SongDetail from '../components/LayoutComponents/SongDetail'
import Queue from '../components/LayoutComponents/Queue'


import '../assets/Home/layout2.css'


const HomePage = () => {
    const [playingList, setPlayingList] = useState([])
    const [playingSong, setPlayingSong] = useState(playingList[0])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isReady, setIsReady] = useState(false)

    const audioRef = useRef()

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
    }, [playingList, currentIndex, isReady])



    //set playing song
    const updatePlayingSong = (index) => {
        setCurrentIndex(index)
    }


    // next and prev song
    const nextSong = () => {
        const nextIndex = (currentIndex + 1) % playingList.length
        console.log(nextIndex, currentIndex, playingList.length);
        setCurrentIndex(nextIndex)
        updatePlayingSong(nextIndex)
        audioRef.current.pause()
    }
    const prevSong = () => {
        const prevIndex = (currentIndex - 1 + playingList.length) % playingList.length
        setPlayingSong(playingList[prevIndex])
        setCurrentIndex(prevIndex)
        audioRef.current.pause()
    }

    // -------------------------------------------- RENDER ------------------------------------------
    return (
        <div className="homeContainer">
            <div className="container">
                <NavBar />
                <Routes>
                    <Route index element={<HomeLayout />} />
                    <Route path='/queue' element={<Queue
                        setIsReady={setIsReady}
                        playingList={playingList}
                        updatePlayingSong={updatePlayingSong} 
                        currentIndex={currentIndex}/>}
                    />
                    <Route path='/songs/:id' element={<SongDetail updatePlayingList={updatePlayingList} />} />
                </Routes>
            </div>
            <Playing
                playingSong={playingSong}
                audioRef={audioRef}
                isReady={isReady}
                setIsReady={setIsReady}
                nextSong={nextSong}
                prevSong={prevSong}
            />
        </div>
    )
}

export default HomePage