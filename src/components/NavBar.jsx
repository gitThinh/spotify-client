import { memo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HiHome, HiMagnifyingGlass } from 'react-icons/hi2'
import { FaCompass } from 'react-icons/fa6'



const NavBar = () => {
    console.log('rerender nav bar')



    return (
        <div className="navBar">
            <nav className="navBarOptions" >
                <Link to="/">
                    <HiHome size={24} />
                    Home
                </Link>
                <Link to="/search">
                    <HiMagnifyingGlass size={24} />
                    Search
                </Link>
                <Link to="/search">
                    <FaCompass size={22} />
                    Khám Phá
                </Link>
            </nav>
            {/* components Library */}
            <div className="navBarLibrary">
            </div>
        </div>
    )
}

export default memo(NavBar)