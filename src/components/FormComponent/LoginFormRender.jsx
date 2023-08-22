import { useState } from 'react';
import '../../assets/LogAndSign/FormRender.css'
import { isEmail, isMinLength, isNull } from '../../services/validation.jsx'
import InputRender from './InputRender';



const LoginFormRender = () => {
    const showErrorMessage = document.querySelector('.msg')
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    // showErrorMessage.innerHTML = isNull(username)
    // showErrorMessage.innerHTML = isMinLength(8, password)
    // showErrorMessage.innerHTML = isEmail(username)


    // ------------------------------------------------- FUNCTIONS ----------------------------------------------------------------
    const handleLogin = async (e) => {
        showErrorMessage.innerHTML = ""
        e.preventDefault();
        if (isNull(username) && isNull(password)) {
            // const response = await fetch('/login', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(username, password)
            // });
            // if (response.status === 200) {
            //     const user = response.data;
            //     router.push("/");
            // } else {
            //     alert(response.statusText);
            // }
        }
        else showErrorMessage.innerHTML = "Vui Lòng Nhập Đầy Đủ Thông Tin"

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
                        e.currentTarget.classList.toggle('active');
                    }}>
                    <span className="ball"></span>
                </div>
                <p>Remember me</p>
            </div>
            <button className='active' type="submit" onClick={handleLogin}>Đăng Nhập</button>
            <p className='msg' style={{ maxWidth: '350px', marginTop: '15px' }}></p>
        </form>
    );
};

export default LoginFormRender;