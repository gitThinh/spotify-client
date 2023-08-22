import { useState } from "react";
import InputRender from "../components/FormComponent/InputRender";
import { isEmail, isNull } from "../services/validation";

const ForgotPass = () => {
    const showErrorMessage = document.querySelector('.msg')
    const [email, setEmail] = useState('')


    // -------------------------------------------------- FUNCTIONS ----------------------------------------------------
    // showErrorMessage.innerHTML = isEmail(email)
    // showErrorMessage.innerHTML = isNull(email)
    const handleForgotPass = (e) => {
        showErrorMessage.innerHTML = ""
        e.preventDefault();
        if (isNull(email) === true) {
            if (isEmail(email) === true) {
                showErrorMessage.innerHTML =
                    'Chúng tôi đã gửi một email đến email của bạn. Vui lòng kiểm tra để lấy lại mật khẩu'
            }
            else showErrorMessage.innerHTML = 'Email không đúng định dạng'
        }
        else showErrorMessage.innerHTML = 'Vui Lòng Nhập Email'
    }

    // -------------------------------------------------- RENDER ----------------------------------------------------
    return (
        <div className="containerL1">
            <div className="headerPage">
                <i className="fa-brands fa-spotify"></i>
                <h2>Spotify Clone</h2>
            </div>
            <div className="contentForgotPass">
                <h2>Forgot Password</h2>
                <form
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '30px',
                    }}
                >
                    <div className="groupInput">
                        <InputRender
                            data={{
                                name: 'email',
                                text: 'email',
                                type: 'email',
                                getChange: function (e) { setEmail(e.target.value); }
                            }}
                        />
                    </div>
                    <button type="submit" className="active" onClick={handleForgotPass}>Quên Mật Khẩu</button>
                </form>
                <p className='msg'
                    style={{
                        width: '80%',
                        margin: '0 auto'

                    }}
                >
                </p>
                {/* -------------------------------------------------------------------------------------- */}
                <span className='lineCut'></span>
                <p>Bạn đã có tài khoản
                    <a href="#" style={{
                        textDecoration: 'underline',
                        marginLeft: '8px'
                    }}>
                        Đăng nhập
                    </a>
                </p>
            </div>
        </div>
    );
};

export default ForgotPass;