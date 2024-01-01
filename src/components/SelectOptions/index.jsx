import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { HiDotsHorizontal } from "react-icons/hi"
import { FaPlus, FaPlay, FaMusic, FaUserPen } from "react-icons/fa6"

import './style.css'

const SelectOptions = ({ song }) => {
    const moreOptionTable = useRef()
    const moreOption = useRef()

    const showOptionTable = (e) => {
        if (moreOptionTable.current.style.display !== 'block') {
            moreOptionTable.current.style.display = 'block'
        } else {
            moreOptionTable.current.style.display = 'none'
        }
        checkShowOptionTable(e)
    }

    const checkTarget = (e) => {
        if (!moreOption.current.contains(e.target))
            moreOptionTable.current.style.display = 'none'
    }

    const checkShowOptionTable = (e) => {
        const mouseX = e.clientX
        const mouseY = e.clientY
        const container =document.querySelector('.container')
        
        console.log(container.offsetHeight, mouseY + moreOptionTable.current.offsetHeight)
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

    useEffect(() => {
        moreOption.current.parentNode.addEventListener('click', (e) => { checkTarget(e) })
        moreOption.current.parentNode.addEventListener('mouseleave', () => { moreOptionTable.current.style.display = 'none' })
    }, [])

    return (
        <div className='more_options content_center' ref={moreOption} >
            <HiDotsHorizontal onClick={(e) => {showOptionTable(e)}} />
            <div className="more_options_table top " ref={moreOptionTable} >
                <ul>
                    <li>
                        <button className='more_options_table_option' >
                            <FaPlus className='more_options_table_icon' />
                            Add to playlist
                        </button>
                    </li>
                    <li>
                        <button className='more_options_table_option' >
                            <FaPlay className='more_options_table_icon' />
                            Playing song
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
            </div>
        </div>
    )
}

export default SelectOptions