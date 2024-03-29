import { useEffect, useRef, useContext } from "react"
import { Link } from "react-router-dom"
import Cookies from 'js-cookie'

import { RiArrowRightSFill } from "react-icons/ri"
import { HiDotsHorizontal } from "react-icons/hi"
import { FaPlus, FaMusic, FaUserPen, FaDeleteLeft } from "react-icons/fa6"
import { BiAddToQueue } from "react-icons/bi"

import { apiKey, urlApiAudioServer } from "/src/constants/env"
import { PlaySongContext, actions, methodsHandlePlaylists, methodsHandleAlert } from '/src/constants/stores'


import './style.css'

const SelectOptionsSong = ({ song, playList, showPlaylist }) => {
    const [playingState, dispatch] = useContext(PlaySongContext)
    const { playingList } = playingState
    const handlePlaylists = useContext(methodsHandlePlaylists)
    const handleShowAlerts = useContext(methodsHandleAlert)

    const moreOptionTable = useRef()
    const moreOption = useRef()


    // show table when selected
    const showOptionTable = (e) => {
        if (moreOptionTable.current.style.display !== 'block') {
            moreOptionTable.current.style.display = 'block'
        } else {
            moreOptionTable.current.style.display = 'none'
        }
        checkShowOptionTable(e)
    }

    // handle show table with position selected
    const checkShowOptionTable = (e) => {
        const mouseX = e.clientX
        const mouseY = e.clientY + 10
        const container = document.querySelector('.container')

        if (mouseX + moreOptionTable.current.offsetWidth > moreOption.current.parentNode.offsetWidth) {
            moreOptionTable.current.classList.add('right')
        } else {
            moreOptionTable.current.classList.remove('right')
        }
        if (mouseY + moreOptionTable.current.offsetHeight > container.offsetHeight) {
            moreOptionTable.current.classList.add('top')
        } else {
            moreOptionTable.current.classList.remove('top')
        }
    }

    // check click outside table
    const checkTarget = (e) => {
        if (!moreOption.current.contains(e.target))
            moreOptionTable.current.style.display = 'none'
    }
    useEffect(() => {
        window.addEventListener('click', checkTarget)
        return () => {
            window.removeEventListener('click', checkTarget)
        }
    }, [])

    const checkAvailableSong = (song, list) => {
        const check = list.some(item => {
            return item._id === song._id
        })
        return list.length ? !check : true
    }

    // add song into playlist
    const handleAddSongIntoPlaylist = (payload) => {
        const user = Cookies.get('User') !== undefined ? JSON.parse(Cookies.get('User')) : ''
        const tokens = Cookies.get('Tokens') !== undefined ? JSON.parse(Cookies.get('Tokens')) : ''
        const data = {
            "songId": song._id,
            "playListId": payload._id
        }
        checkAvailableSong(song, payload.songs) &&
            fetch(`${urlApiAudioServer}user/playList/addSong`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey,
                    'x-r-token': tokens.refreshToken,
                    'x-client-id': user.userId
                },
                body: JSON.stringify(data)
            })
                .then(respone => respone.json())
                .then(respone => {
                    if (respone.statusCode === 200) {
                        handlePlaylists()
                        handleShowAlerts('Thêm thành công!')
                    }
                    else {
                        handleShowAlerts(respone.message)
                    }
                })
    }


    // delete song from playlist
    const handleDeleteSongInPlaylist = () => {
        const user = Cookies.get('User') !== undefined ? JSON.parse(Cookies.get('User')) : ''
        const tokens = Cookies.get('Tokens') !== undefined ? JSON.parse(Cookies.get('Tokens')) : ''
        fetch(`${urlApiAudioServer}user/removeSongFromPlaylist?songId=${song._id}&playListId=${playList._id}`, {
            method: 'DELETE',
            headers: {
                'x-api-key': apiKey,
                'x-r-token': tokens.refreshToken,
                'x-client-id': user.userId
            }
        })
            .then(respone => respone.json())
            .then(respone => {
                if (respone.statusCode === 200) {
                    handlePlaylists()
                    handleShowAlerts('Xóa thành công!')
                }
                else {
                    handleShowAlerts(respone.message)
                }
            })
    }


    return (
        <div className='more_options content_center' ref={moreOption} >
            <HiDotsHorizontal onClick={(e) => { showOptionTable(e) }} />
            <div className="more_options_table top" ref={moreOptionTable}>
                <ul className="main_table">
                    <li>
                        <div className='more_options_table_option' >
                            <FaPlus className='more_options_table_icon' />
                            Thêm vào playlist
                            <RiArrowRightSFill className="more_options_table_arrow" />
                        </div>
                        {showPlaylist.length > 0 &&
                            <ul className="sub_table">
                                {
                                    showPlaylist.map((pl, index) => {
                                        return (
                                            <button
                                                className='more_options_table_option'
                                                key={index}
                                                onClick={() => { handleAddSongIntoPlaylist(pl) }}
                                            >
                                                <p className="oneline_text">{pl.playListName}</p>
                                            </button>
                                        )
                                    })
                                }
                            </ul>
                        }
                    </li>
                    {
                        playList &&
                        <li>
                            <button className='more_options_table_option' onClick={handleDeleteSongInPlaylist}>
                                <FaDeleteLeft className='more_options_table_icon' />
                                Xóa khỏi playlist
                            </button>
                        </li>
                    }
                    <li>
                        <button
                            className='more_options_table_option'
                            onClick={() => {
                                playingList.length ? dispatch(actions.addToQueue(song)) : dispatch(actions.songsPlay(song))
                                handleShowAlerts("Đã thêm vào hàng đợi!")
                            }}
                        >
                            <BiAddToQueue className='more_options_table_icon' />
                            Thêm vào hàng chờ
                        </button>
                    </li>
                    <li>
                        <Link to={`/songs/${song._id}`} className='more_options_table_option' >
                            <FaMusic className='more_options_table_icon' />
                            Thông tin bài hát
                        </Link>
                    </li>
                    <li>
                        <Link to='/' className='more_options_table_option' >
                            <FaUserPen className='more_options_table_icon' />
                            Thông tin nghệ sĩ
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SelectOptionsSong