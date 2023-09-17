import { useState } from 'react';
import '../../assets/LogAndSign/FormRender.css'
import { isEmail, isNull } from '../../services/validation.jsx'
import InputRender from './InputRender';




const LoginFormRender = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    // showErrorMessage.innerHTML = isNull(username)
    // showErrorMessage.innerHTML = isMinLength(8, password)
    // showErrorMessage.innerHTML = isEmail(username)


    // ------------------------------------------------- FUNCTIONS ----------------------------------------------------------------
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('')
        if (!isNull(username) || !isNull(password)) {
            setError("Vui Lòng Nhập Đầy Đủ Thông Tin")
            return
        }
        const response = await fetch('http://116.110.85.13:8080/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'c3ab8ff13720e8ad9047dd39466b3c8974e592c2fa383d4a3960714caef0c4f2'
            },
            body: JSON.stringify({ username, password })
        })
        response.json()
            .then(
                function (result) {
                    if (result.status === 200) {
                        console.log(result)
                        router.push("/home");
                    } else {
                        setError(result.message)
                    }
                }
            )
            .catch( err => console.log(err))
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
            <p className='msg' style={{ maxWidth: '350px', marginTop: '15px' }}>{error}</p>
        </form>
    );
};

export default LoginFormRender;