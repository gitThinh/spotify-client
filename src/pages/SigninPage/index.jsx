import { useState } from "react"
import { Link, useNavigate} from 'react-router-dom'

import { isEmail, isPassword, isNull } from "/src/utils/validation"
import { InputForm } from "/src/constants/components"
import { urlApiAudioServer, apiKey } from '/src/constants/env'

import '/src/assets/LogAndSign/Layout1.css'

const SigninPage = () => {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState("")
    const [cpass, setCpass] = useState("")
    const [error, setError] = useState("")
    const [isChecked, setIsChecked] = useState(false)

    const history = useNavigate()
    // -------------------------------------- FUNCTION --------------------------------
    const handleSignin = async (e) => {
        e.preventDefault()
        setError('')
        if (isChecked) {
            if (!isNull(email) || !isNull(username) || !isNull(password) || !isNull(cpass)) {
                setError('Vui Lòng Nhập Đủ Thông Tin')
                return
            }
            if (!isEmail(email)) {
                setError('Email sai định dạng')
                return
            }
            if (!isPassword(password)) {
                setError('Mật khẩu phải có kí tự số, in hoa, kí tự đặc biệt và dài hơn 8 kí tự')
                return
            }
            if (password !== cpass) {
                setError('Mật khẩu xác nhận phải giống với mật khẩu đã nhập')
                return
            }
            const data = {
                username,
                email,
                password
            }
            const response = await fetch(`${urlApiAudioServer}user/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey
                },
                body: JSON.stringify(data)
            })
            await response.json()
                .then(result => {
                    if (result.statusCode === 200) {
                        if (confirm("Đăng kí thành Công chuyển sang trang Đăng nhập ngay") == true)
                            history("/login")
                    } else {
                        setError(result.message)
                    }
                }
                )
        }
    }



    // -------------------------------------- Render --------------------------------
    return (
        <div className="container_signin noone_coppy">
            <div className="content_signin">
                <h2>Đăng Ký</h2>
                <form>
                    <div className="group_input">
                        <InputForm
                            data={{
                                name: 'email',
                                text: 'Email',
                                type: 'email',
                                getChange: function (e) { setEmail(e.target.value) }
                            }} />
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
                        <InputForm
                            data={{
                                name: 'checkPassword',
                                text: 'Nhập Lại Mật Khẩu',
                                type: 'password',
                                getChange: function (e) { setCpass(e.target.value) }
                            }} />
                    </div>
                    <div className="policy">
                        <input type="checkbox" name="policy" onClick={() => setIsChecked(!isChecked)} />
                        <span className="checkmark"></span>
                        <p>Bạn đã đồng ý với các điều khoản và điều kiện</p>
                    </div>
                    <button type="submit" className={isChecked ? 'active' : ''} id='submit_signin' onClick={handleSignin}>Đăng Ký</button>
                </form>
                <p className='msg'>{error}</p>
                {/* -------------------------------------------------------------------------------------- */}
                <span className='line_cut'></span>
                <p>Bạn đã có tài khoản
                    <Link to="/login" style={{
                        textDecoration: 'underline',
                        marginLeft: '8px'
                    }}>
                        Đăng nhập
                    </Link>
                </p>

            </div>
        </div>
    );


};

export default SigninPage;