import { Route, Routes } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'

import NavBar from "../components/NavBar"
import Playing from "../components/Playing"
import HomeLayout from '../components/LayoutComponents/HomeLayout'
import SongDetail from '../components/LayoutComponents/SongDetail'
import Queue from '../components/LayoutComponents/Queue'


import '../assets/Home/layout2.css'


const HomePage = () => {
    const [playingList, setPlayingList] = useState([
        // {
        //     _id: "64f8710cea1bf550c3029689",
        //     file_name: "A Great Big World - Say Something.mp3",
        //     title: "Say Something",
        //     artist_name: "A Great Big World",
        //     artist: [],
        //     album: "Say Something",
        //     genre: "",
        //     duration: 229.65,
        //     year: 2013,
        //     coverArt: "Say Something.jpg"
        // },
        // {
        //     _id: "64f8710cea1bf550c302968f",
        //     file_name: "Bruno Mars - 24K Magic.mp3",
        //     title: "24K Magic",
        //     artist_name: "Bruno Mars",
        //     artist: [],
        //     album: "24K Magic",
        //     genre: "",
        //     duration: 226.23,
        //     year: 2016,
        //     coverArt: "24K Magic.jpg"
        // }
    ])
    const [playingSong, setPlayingSong] = useState(playingList[0])
    const [currentIndex, setCurrentIndex] = useState(0)

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
    }, [playingList])


    // play and pause 
    const playSong = () => {
        audioRef.current.play()
    }
    const pauseSong = () => {
        audioRef.current.pause()
    }

    // next and prev song
    const nextSong = () => {
        const nextIndex = (currentIndex + 1) % playingList.length
        console.log(currentIndex, playingList.length, nextIndex)
        setCurrentIndex(nextIndex)
        setPlayingSong(playingList[nextIndex])
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
                    <Route path='/queue' element={<Queue playingList={playingList} updatePlayingList={updatePlayingList} />} />
                    <Route path='/songs/:id' element={<SongDetail updatePlayingList={updatePlayingList} />} />
                </Routes>
            </div>
            <Playing
                playingSong={playingSong}
                audioRef={audioRef}
                playSong={playSong}
                pauseSong={pauseSong}
                nextSong={nextSong}
                prevSong={prevSong}
            />
        </div>
    )
}

export default HomePage