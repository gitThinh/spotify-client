import { useState } from "react";
import '../assets/LogAndSign/Layout1.css'
import InputRender from "../components/FormComponent/InputRender";
import { isEmail, isMinLength, isNull } from "../services/validation";

const SigninPage = () => {
    const showErrorMessage = document.querySelector('.msg')
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState("")
    const [cpass, setCpass] = useState("")
    const submitButton = document.querySelector('button[type="submit"]')
    // showErrorMessage.innerHTML = isNull(username)
    // showErrorMessage.innerHTML = isMinLength(8, password)
    // showErrorMessage.innerHTML = isEmail(email)


    // -------------------------------------- FUNCTION --------------------------------
    const activeSubmit = () => {
        const checkBox = document.querySelector('input[name="policy"]')
        if (checkBox.checked) {
            submitButton.classList.add('active')
        } else submitButton.classList.remove('active')
    }
    const fetchData = () => { }

    const handleSignin = async (e) => {
        showErrorMessage.innerHTML = ""
        e.preventDefault();
        if(submitButton.classList.value === 'active') {
            if (isNull(email) && isNull(username) && isNull(password) && isNull(cpass)) {
                alert('oke')  // xử lý fetch data
            }
            else {
                window.scrollTo(0, 150)
                showErrorMessage.innerHTML = 'Vui Lòng Nhập Đầy Đủ Thông Tin'
            }
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
                        <input type="checkbox" name="policy" onClick={activeSubmit} />
                        <span className="checkmark"></span>
                        <p>Bạn đã đồng ý với các điều khoản và điều kiện</p>
                    </div>
                    <button type="submit" onClick={handleSignin}>Đăng Ký</button>
                </form>
                <p className='msg'></p>
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

export default SigninPage;