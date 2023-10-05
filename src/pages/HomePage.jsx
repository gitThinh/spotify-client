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
    const [playingSong, setPlayingSong] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isRcm, setIsRcm] = useState(true)

    //lấy dữ liệu user từ cookies
    const [user, setUser] = useState(Cookies.get('User') !== undefined ? JSON.parse(Cookies.get('User')) : '')
    const [tokens, setTokens] = useState(Cookies.get('Tokens') !== undefined ? JSON.parse(Cookies.get('Tokens')) : '')


    // -------------------------------------------- FUNCTION ------------------------------------------
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
                .then(data => setPlayingList(data.metadata))
    }, [playingSong])

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

    const updatePlayingSong = (index) => {
        setPlayingSong(playingList[index])
    }

    const handleSetSong = (song) => {
        setIsRcm(true)
        setPlayingSong(song)
    }


    const deletePlayingList = () => {
        const newList = [...playingList]
        newList.shift()
        setPlayingList(newList)
    }
    // next and prev song
    const nextSong = (type) => {
        setIsRcm(false)
        // 1 === random
        if (type === 1) {
            let nextIndex = Math.floor(Math.random() * playingList.length)
            const newList = [...playingList]
            newList.splice(nextIndex,1)
            setPlayingList(newList)
            updatePlayingSong(nextIndex)
            return
        }
        setPlayingSong(playingList[0])
        const newList = [...playingList]
        newList.shift()
        setPlayingList(newList)
    }
    const prevSong = () => {
        setIsRcm(false)
    }

    // -------------------------------------------- RENDER ------------------------------------------
    return (
        <div className="homeContainer">
            <div className="container">
                <NavBar user={user} tokens={tokens} setUser={setUser} setTokens={setTokens} />
                <Routes>
                    <Route index element={<HomeLayout handleSetSong={handleSetSong} />} />
                    <Route path='/queue'
                        element={
                            <Queue
                                playingSong={playingSong}
                                playingList={playingList}
                                handleSetSong={handleSetSong}
                            />
                        }
                    />
                    <Route path='/songs/:id' element={
                        <SongDetail handleSetSong={handleSetSong} />
                    } />
                    <Route path='/search' element={<SearchPage handleSetSong={handleSetSong} />} />
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