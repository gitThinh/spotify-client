import { useState } from 'react';
import '../../assets/LogAndSign/FormRender.css'
import { isEmail, isMinLength, isNull } from './validation';
import InputRender from './InputRender';



const LoginFormRender = () => {
    const showErrorMessage = document.querySelector('.msg')
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    // showErrorMessage.innerHTML = isNull(username)
    // showErrorMessage.innerHTML = isMinLength(8, password)
    // showErrorMessage.innerHTML = isEmail(username)


    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(username, password)
        });
        if (response.status === 200) {
            const user = response.data;
            // Lưu trạng thái người dùng vào session
            // store.dispatch("setUser", user);
            router.push("/");
        } else {
            alert(response.statusText);
        }
    }


    return (
        <form className='loginForm'>
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
            <button type="submit" onClick={handleLogin}>Log In</button>
            <p className='msg'></p>
        </form>
    );
};

export default LoginFormRender;