import { useEffect, useRef, useContext } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from 'js-cookie'

import { HiDotsHorizontal, HiPencil } from "react-icons/hi"
import { FaDeleteLeft, FaShare } from "react-icons/fa6"
import { BiAddToQueue } from "react-icons/bi"

import { apiKey, urlApiAudioServer } from "/src/constants/env"
import { PlaySongContext, actions, methodsHandlePlaylists, methodsHandleAlert } from '/src/constants/stores'


const SelectOptionsPlaylist = ({ playList }) => {

    const [playingState, dispatch] = useContext(PlaySongContext)
    const handlePlaylists = useContext(methodsHandlePlaylists)
    const handleShowAlert = useContext(methodsHandleAlert)

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


    // delete playlist 
    const handleDeletePlaylist = async () => {
        const user = Cookies.get('User') !== undefined ? JSON.parse(Cookies.get('User')) : ''
        const tokens = Cookies.get('Tokens') !== undefined ? JSON.parse(Cookies.get('Tokens')) : ''
        fetch(`${urlApiAudioServer}user/removePlaylist?id=${playList._id}`, {
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
                    handleShowAlert("Xóa playlist thành công!")
                }
                else {
                    handleShowAlert(respone.message)
                }
            })
        locationWeb('/')
    }


    return (
        <div className='more_options content_center' ref={moreOption} >
            <HiDotsHorizontal onClick={(e) => { showOptionTable(e) }} />
            <div className="more_options_table top " ref={moreOptionTable}>
                <ul>
                    <li>
                        <button className='more_options_table_option'
                            onClick={() => {
                                playList.songs.length && dispatch(actions.addToQueue(playList.songs))
                            }}
                        >
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
            </div>
        </div>
    )
}

export default SelectOptionsPlaylist