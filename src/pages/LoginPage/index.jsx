import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { BsFacebook, BsApple } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'

import { isNull } from '/src/utils/validation'
import { InputForm } from "/src/constants/components"

import './style.css'


const urlApiAudioServer = import.meta.env.VITE_API_URL_AUDIOSERVER
const apiKey = import.meta.env.VITE_API_API_KEY


const LoginPages = () => {
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
            .catch(err => new Error(err.message))
    }


    return (
        <div className='container_login noone_coppy'>
            <div className="content_login">
                <h2>Đăng Nhập</h2>
                <form>
                    <div className="group_input">
                        <InputForm
                            data={{
                                name: 'username',
                                text: 'Tên Đăng Nhập',
                                type: 'text',
                                getChange: function (e) { setUsername(e.target.value) }
                            }} />
                        <InputForm
                            data={{
                                name: 'password',
                                text: 'Mật Khẩu',
                                type: 'password',
                                getChange: function (e) { setPassword(e.target.value) }
                            }} />
                    </div>
                    <div className='remember_button'>
                        <div id="toggle_RB"
                            onClick={(e) => {
                                e.currentTarget.classList.toggle('active')
                            }}>
                            <span className="ball"></span>
                        </div>
                        <p style={{ fontSize: "16px" }}>Lưu mật khẩu</p>
                    </div>
                    <button className='active' type="submit" onClick={handleLogin}>Đăng Nhập</button>
                    <p className='msg'>{error}</p>
                </form>
                <Link to="/forgot" style={{ textDecoration: 'underline' }}>
                    Quên mật khẩu?
                </Link>
                <p>Chưa có tài khoản
                    <Link to="/signin" style={{
                        textDecoration: 'underline',
                        marginLeft: '8px'
                    }}>
                        Đăng ký ngay
                    </Link>
                </p>
                {/* -------------------------------------------------------------------------------------- */}
                <span className='line_cut'></span>
                <div className="group_options_login">
                    <a href="https://nth-audio.site/api/audio-server/user/auth/googleRedirect" className="option_login">
                        <FcGoogle size={22} />
                        <h4>Google</h4>
                    </a>
                    <div className="option_login">
                        <BsFacebook style={{ color: '#1877F2' }} size={22} />
                        <h4>Facebook</h4>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default LoginPages;