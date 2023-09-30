import { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'



const NavBar = ({ user, tokens, setUser}) => {

    const handleLogout = () => {
        fetch('http://nth-audio.site/api/audio-server/user/logout', {
            method: 'POST',
            headers: {
                'x-api-key': 'c3ab8ff13720e8ad9047dd39466b3c8974e592c2fa383d4a3960714caef0c4f2',
                'Authorization': tokens.accessToken,
                'x-client-id': user.userId
            }
        })
            .then(response => response.json())
            .then(data => {
                if(data.statusCode === 200) {
                    Cookies.remove('User')
                    Cookies.remove('Tokens')
                    setUser('')
                }
            })
    }



    return (
        <div className="navBar">
            {
                user !== '' ?
                    <div className="infoUser">
                        <img src="https://khoinguonsangtao.vn/wp-content/uploads/2022/11/hinh-anh-nguoi-dep-chup-goc-nghieng.jpg" />
                        <h3 className='userName'>{user.userName}</h3>
                        <i className="fa-solid fa-power-off" onClick={handleLogout}></i>
                    </div>
                    :
                    <div className="loginSignin">
                        <a href="/login" className='navBtn'>
                            Log In
                        </a>
                        <a href="/signin" className='navBtn'>
                            Sign In
                        </a>
                    </div>
            }

            <nav className="navBar_options">
                <Link to="/">
                    <i className="fa-solid fa-house"></i>
                    Home
                </Link>
                <Link to="/search">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    Search
                </Link>
            </nav>
            {/* components Library */}
        </div>
    )
}

export default memo(NavBar)