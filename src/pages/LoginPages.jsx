import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { BsFacebook, BsApple } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'

import { isNull } from '/src/utils/validation.jsx'
import InputRender from '/src/components/InputRender'

import '/src/assets/LogAndSign/Layout1.css'
import '/src/assets/LogAndSign/FormRender.css'


const urlApiAudioServer = import.meta.env.VITE_API_URL_AUDIOSERVER
const apiKey = import.meta.env.VITE_API_API_KEY


const LoginPages = () => {
    window.scrollTo(0, 0)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const history = useNavigate()
    // ------------------------------------------------- FUNCTIONS ----------------------------------------------------------------
    const handleLogin = async (e) => {
        e.preventDefault()
        setError('')
        if (!isNull(username) || !isNull(password)) {
            setError("Vui Lòng Nhập Đầy Đủ Thông Tin")
            return
        }
        const response = await fetch(`${urlApiAudioServer}user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey
            },
            body: JSON.stringify({ username, password })
        })
        response.json()
            .then(
                function (result) {
                    if (result.statusCode === 200) {
                        Cookies.set('Tokens', JSON.stringify(result.metadata.tokens))
                        Cookies.set('User', JSON.stringify(result.metadata.user))
                        history('/')
                    } else {
                        setError(result.message)
                    }
                }
            )
            .catch(err => console.log(err))
    }


    return (
        <div className='containerL1'>
            <div className="headerPage">
                <h2>Spotify Clone</h2>
            </div>
            <div className="contentLogin">
                <h2>Đăng Nhập</h2>
                <div className="groupOptionsLogin">
                    <a href="https://nth-audio.site/api/audio-server/user/auth/googleRedirect" className="optionLogin">
                        <FcGoogle size={22} />
                        <h4>Đăng nhập với Google</h4>
                    </a>
                    <div className="optionLogin">
                        <BsFacebook style={{ color: '#1877F2' }} size={22} />
                        <h4>Đăng nhập với Facebook</h4>
                    </div>
                    <div className="optionLogin">
                        <BsApple size={22} />
                        <h4>Đăng nhập với Apple</h4>
                    </div>
                    <div className="optionLogin">
                        <h4>Đăng nhập với số điện thoại</h4>
                    </div>
                </div>

                {/* -------------------------------------------------------------------------------------- */}
                <span className='lineCut'></span>
                <form>
                    <div className="groupInput">
                        <InputRender
                            data={{
                                name: 'username',
                                text: 'Tên Đăng Nhập',
                                type: 'text',
                                getChange: function (e) { setUsername(e.target.value) }
                            }} />
                        <InputRender
                            data={{
                                name: 'password',
                                text: 'Mật Khẩu',
                                type: 'password',
                                getChange: function (e) { setPassword(e.target.value) }
                            }} />
                    </div>
                    <div className='rememberMe'>
                        <div id="toggleRM"
                            onClick={(e) => {
                                e.currentTarget.classList.toggle('active')
                            }}>
                            <span className="ball"></span>
                        </div>
                        <p style={{ fontSize: "16px" }}>Lưu mật khẩu</p>
                    </div>
                    <button className='active' type="submit" onClick={handleLogin}>Đăng Nhập</button>
                    <p className='msg' style={{ maxWidth: '350px', marginTop: '15px' }}>{error}</p>
                </form>
                <Link to="/forgot" style={{ textDecoration: 'underline' }}>
                    Quên mật khẩu?
                </Link>
                {/* -------------------------------------------------------------------------------------- */}
                <span className='lineCut'></span>
                <p>Chưa có tài khoản
                    <Link to="/signin" style={{
                        textDecoration: 'underline',
                        marginLeft: '8px'
                    }}>
                        Đăng ký ngay
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPages;