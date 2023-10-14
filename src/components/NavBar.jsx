import { memo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import { HiHome, HiMagnifyingGlass } from 'react-icons/hi2'
import { AiOutlinePoweroff } from 'react-icons/ai'

const urlApiAudioServer = import.meta.env.VITE_API_URL_AUDIOSERVER
const apiKey = import.meta.env.VITE_API_API_KEY


const NavBar = ({ user, tokens, setUser, setTokens }) => {
    useEffect(() => {
        window.addEventListener('beforeunload', () => {
            Cookies.remove('User')
            Cookies.remove('Tokens')
        })
    }, [])
    console.log('rerender nav bar')

    const handleLogout = () => {
        user &&
            fetch(`${urlApiAudioServer}user/logout`, {
                method: 'POST',
                headers: {
                    'x-api-key': apiKey,
                    'Authorization': tokens.accessToken,
                    'x-client-id': user.userId
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.statusCode === 200) {
                        Cookies.remove('User')
                        Cookies.remove('Tokens')
                        setTokens('')
                        setUser('')
                    }
                })
    }



    return (
        <div className="navBar">
            {
                user !== '' ?
                    <div className="infoUser">
                        <img src="https://i.pinimg.com/1200x/63/f8/fb/63f8fbab7ef0b960dff3913c0c27a9e1.jpg" />
                        <h3 className='userName'>{user.userName}</h3>
                        <AiOutlinePoweroff onClick={handleLogout} size={20} style={{ cursor: 'pointer' }} />
                    </div>
                    :
                    <div className="loginSignin">
                        <a href="/login" className='navBtn'>
                            Log In
                        </a>
                        <a href="/signin" className='navBtn'>
                            Sign Up
                        </a>
                    </div>
            }

            <nav className="navBarOptions" >
                <Link to="/">
                    <HiHome size={24} />
                    Home
                </Link>
                <Link to="/search">
                    <HiMagnifyingGlass size={24} />
                    Search
                </Link>
            </nav>
            {/* components Library */}
            {/* <div className="navBarLibrary">
                <h3>Chưa Xong:</h3>
                <p>3. chỉnh lại random and repeat</p>
                <p>4. forgot pass</p>
                <p>5. Login with GG</p>
                <p>6. responsive</p>
            </div> */}
        </div>
    )
}

export default memo(NavBar)