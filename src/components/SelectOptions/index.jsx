import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { HiDotsHorizontal } from "react-icons/hi"
import { FaPlus, FaPlay, FaMusic, FaUserPen } from "react-icons/fa6"

import './style.css'

const SelectOptions = ({ song }) => {
    const moreOptionTable = useRef()
    const moreOption = useRef()


    const showOptionTable = () => {
        if (moreOptionTable.current.style.display !== 'block') {
            moreOptionTable.current.style.display = 'block'
        } else {
            moreOptionTable.current.style.display = 'none'
        }
    }

    const checkTarget = (e) => {
        if (!moreOption.current.contains(e.target))
            moreOptionTable.current.style.display = 'none'
    }

    useEffect(() => {
        moreOption.current.parentNode.addEventListener('click', (e) => { checkTarget(e) })
        moreOption.current.parentNode.addEventListener('mouseleave', () => { moreOptionTable.current.style.display = 'none'} )
    }, [])

    return (
        <div className='more_options content_center' ref={moreOption} >
            <HiDotsHorizontal onClick={showOptionTable} />
            <div className="more_options_table" ref={moreOptionTable} >
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