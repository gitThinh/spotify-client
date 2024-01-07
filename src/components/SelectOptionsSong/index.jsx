import { useEffect, useRef } from "react"
import { Link, useNavigate, Route, Routes, useParams } from "react-router-dom"
import Cookies from 'js-cookie'

import { HiDotsHorizontal, HiPencil } from "react-icons/hi"
import { FaPlus, FaMusic, FaUserPen, FaDeleteLeft, FaShare } from "react-icons/fa6"
import { BiAddToQueue } from "react-icons/bi"

import { apiKey, urlApiAudioServer } from "/src/constants/env"

import './style.css'

const SelectOptionsSong = ({ song, playList, handlePlaylists }) => {
    const moreOptionTable = useRef()
    const moreOption = useRef()

    const locationWeb = useNavigate()

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
        const mouseY = e.clientY
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


    const handleDeletePlaylist = () => {
        console.log(playList._id)
        const user = Cookies.get('User') !== undefined ? JSON.parse(Cookies.get('User')) : ''
        const tokens = Cookies.get('Tokens') !== undefined ? JSON.parse(Cookies.get('Tokens')) : ''
        fetch(`${urlApiAudioServer}user/removePlaylist?id=${id}`, {
            method: 'DELETE',
            headers: {
                'x-api-key': apiKey,
                'x-r-token': tokens.refreshToken,
                'x-client-id': user.userId
            }
        })
            .then(respone => respone.json())
            .then(respone => {
                respone.statusCode === 200
                    && handlePlaylists()
            })
        locationWeb('/')
    }


    return (
        <div className='more_options content_center' ref={moreOption} >
            <HiDotsHorizontal onClick={(e) => { showOptionTable(e) }} />
            <div className="more_options_table top " ref={moreOptionTable}>
                {
                    song
                        ? <ul>
                            <li>
                                <button className='more_options_table_option' >
                                    <FaPlus className='more_options_table_icon' />
                                    Add to playlist
                                </button>
                            </li>
                            <li>
                                <button className='more_options_table_option' >
                                    <BiAddToQueue className='more_options_table_icon' />
                                    Add to queue
                                </button>
                            </li>
                            <li>
                                <Link to={`/songs/${song._id}`} className='more_options_table_option' >
                                    <FaMusic className='more_options_table_icon' />
                                    Go to song page
                                </Link>
                            </li>
                            <li>
                                <Link to='/' className='more_options_table_option' >
                                    <FaUserPen className='more_options_table_icon' />
                                    Go to artist page
                                </Link>
                            </li>
                        </ul>
                        :
                        <ul>
                            <li>
                                <button className='more_options_table_option' >
                                    <BiAddToQueue className='more_options_table_icon' />
                                    Add to queue
                                </button>
                            </li>
                            <li>
                                <button className='more_options_table_option' >
                                    <HiPencil className='more_options_table_icon' />
                                    Edit details
                                </button>
                            </li>
                            <li>
                                <button className='more_options_table_option' onClick={handleDeletePlaylist}>
                                    <FaDeleteLeft className='more_options_table_icon' />
                                    Delete
                                </button>
                            </li>
                            <li>
                                <button className='more_options_table_option' >
                                    <FaShare className='more_options_table_icon' />
                                    Share
                                </button>
                            </li>
                        </ul>
                }
            </div>
        </div>
    )
}

export default SelectOptionsSong