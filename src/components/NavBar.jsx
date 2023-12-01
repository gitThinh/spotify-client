import { memo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HiHome, HiMagnifyingGlass } from 'react-icons/hi2'
import { FaCompass } from 'react-icons/fa6'



const NavBar = ({ user }) => {



    return (
        <div className="navBar">
            <nav className="navBarOptions" >
                <Link to="/">
                    <HiHome className='navBarOptions__icons' />
                    Trang Chủ
                </Link>
                <Link to="/search">
                    <HiMagnifyingGlass className='navBarOptions__icons' />
                    Tìm Kiếm
                </Link>
                <Link to="/search">
                    <FaCompass className='navBarOptions__icons' />
                    Khám Phá
                </Link>
            </nav>
            <span className='navBarLine'></span>
            {/* components Library */}
            <div className="navBarLibrary">
                <div className="navBarLibrary__title">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" fill="none" className='navBarOptions__icons'>
                        <path d="M12 0H0V2.71429H12V0ZM12 5.42857H0V8.14286H12V5.42857ZM0 13.5714H8V10.8571H0V13.5714ZM14 0V11.1014C13.69 10.9521 13.35 10.8571 13 10.8571C11.34 10.8571 10 12.6757 10 14.9286C10 17.1814 11.34 19 13 19C14.66 19 16 17.1814 16 14.9286V2.71429H19V0H14Z" fill="white" />
                    </svg>
                    Danh sách phát
                </div>
                {
                    user ?
                        <button className="navBarLibrary__addPlaylist" >Thêm danh sách phát</button>
                        :
                        <p style={{
                            color: '#888',
                            fontSize: '16px',
                            textAlign: 'center',
                            marginTop: '15px'
                        }}>
                            Vui lòng đăng nhập để sử dụng chức năng này
                        </p>
                }
            </div>
        </div>
    )
}

export default memo(NavBar)