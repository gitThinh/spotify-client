import { useState } from "react"
import { Link } from 'react-router-dom'

import { isEmail, isNull } from "/src/utils/validation"
import InputRender from "/src/components/InputForm"

// const urlApiAudioServer = import.meta.env.VITE_API_URL_AUDIOSERVER
// const apiKey = import.meta.env.VITE_API_API_KEY

const ForgotPass = () => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')


    // -------------------------------------------------- FUNCTIONS ----------------------------------------------------
    const handleForgotPass = (e) => {
        e.preventDefault();
        if (!isNull(email)) {
            setError('Vui Lòng Nhập Email')
            return
        }
        if (!isEmail(email)) {
            setError('Email bị sai định dạng')
            return
        }
        setError('Vui lòng kiểm tra Email của bạn để lấy lại mật khẩu')
    }

    // -------------------------------------------------- RENDER ----------------------------------------------------
    return (
        <div className="container_forgot_pass noone_coppy">
            <div className="content_forgot_pass">
                <h2>Quên Mật Khẩu</h2>
                <form
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '30px',
                    }}
                >
                    <div className="group_input">
                        <InputRender
                            data={{
                                name: 'email',
                                text: 'Email',
                                type: 'email',
                                getChange: function (e) { setEmail(e.target.value); }
                            }}
                        />
                    </div>
                    <button type="submit" className="active" onClick={handleForgotPass}>Quên Mật Khẩu</button>
                </form>
                <p className='msg' style={{ width: '80%', margin: '0 auto' }}>
                    {error}
                </p>
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

export default ForgotPass;