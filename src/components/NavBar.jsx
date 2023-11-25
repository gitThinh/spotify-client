import { memo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HiHome, HiMagnifyingGlass } from 'react-icons/hi2'
import { FaCompass } from 'react-icons/fa6'



const NavBar = () => {



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
                <div className="navBarLibrary__title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                        <path d="M12 0H0V2.71429H12V0ZM12 5.42857H0V8.14286H12V5.42857ZM0 13.5714H8V10.8571H0V13.5714ZM14 0V11.1014C13.69 10.9521 13.35 10.8571 13 10.8571C11.34 10.8571 10 12.6757 10 14.9286C10 17.1814 11.34 19 13 19C14.66 19 16 17.1814 16 14.9286V2.71429H19V0H14Z" fill="white" />
                    </svg>
                    Danh sách phát
                </div>
                <button className="navBarLibrary__addPlaylist" >Thêm danh sách phát</button>
            </div>
        </div>
    )
}

export default memo(NavBar)