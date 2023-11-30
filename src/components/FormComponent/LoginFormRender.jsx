import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import Cookies from 'js-cookie'
import '../../assets/LogAndSign/FormRender.css'
import { isNull } from '../../services/validation.jsx'
import InputRender from './InputRender'


const urlApiAudioServer = import.meta.env.VITE_API_URL_AUDIOSERVER
const apiKey = import.meta.env.VITE_API_API_KEY


const LoginFormRender = () => {
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


    // ------------------------------------------------- RENDER ----------------------------------------------------------------
    return (
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
                <p style={{fontSize: "16px"}}>Lưu mật khẩu</p>
            </div>
            <button className='active' type="submit" onClick={handleLogin}>Đăng Nhập</button>
            <p className='msg' style={{ maxWidth: '350px', marginTop: '15px' }}>{error}</p>
        </form>
    )
}

export default LoginFormRender