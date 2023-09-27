import { useState, useEffect, useHistory } from "react";
import { Link } from 'react-router-dom'

import '../assets/LogAndSign/Layout1.css'

import { isEmail, isPassword, isNull } from "../services/validation";
import InputRender from "../components/FormComponent/InputRender";



const SigninPage = () => {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState("")
    const [cpass, setCpass] = useState("")
    const [error, setError] = useState("")
    const [isChecked, setIsChecked] = useState(false)

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
            const response = await fetch('http://nth-audio.site/api/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'c3ab8ff13720e8ad9047dd39466b3c8974e592c2fa383d4a3960714caef0c4f2'
                },
                body: JSON.stringify(data)
            })
            await response.json()
                .then(result => {
                    console.log(result)
                    if (result.statusCode === 200) {
                        if (confirm("Đăng kí thành Công chuyển sang trang Đăng nhập ngay") == true)
                            route.push("/login")
                    } else {
                        setError(result.message)
                    }
                }
                )
        }
    }



    // -------------------------------------- Render --------------------------------
    return (
        <div className="containerL1">
            <div className="headerPage">
                <i className="fa-brands fa-spotify"></i>
                <h2>Spotify Clone</h2>
            </div>
            <div className="contentSignin">
                <h2>Sign In</h2>
                <form>
                    <div className="groupInput">
                        <InputRender
                            data={{
                                name: 'email',
                                text: 'Email',
                                type: 'email',
                                getChange: function (e) { setEmail(e.target.value) }
                            }} />
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
                        <InputRender
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
                    <button type="submit" className={isChecked ? 'active' : ''} id='submitSignin' onClick={handleSignin}>Đăng Ký</button>
                </form>
                <p className='msg'>{error}</p>
                {/* -------------------------------------------------------------------------------------- */}
                <span className='lineCut'></span>
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