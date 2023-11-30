import { Link } from 'react-router-dom'
import '../assets/LogAndSign/Layout1.css'
import LoginFormRender from '../components/FormComponent/LoginFormRender';

import { FcGoogle } from 'react-icons/fc'
import { BsFacebook, BsApple } from 'react-icons/bs'




const LoginPages = () => {
    window.scrollTo(0, 0)
    return (
        <div className='containerL1'>
            <div className="headerPage">
                <h2>Spotify Clone</h2>
            </div>
            <div className="contentLogin">
                <h2>Đăng Nhập</h2>
                <div className="groupOptionsLogin">
                    <a href="https://nth-audio.site/api/audio-server/user/auth/googleRedirect" className="optionLogin">
                        <FcGoogle size={22} />
                        <h4>Đăng nhập với Google</h4>
                    </a>
                    <div className="optionLogin">
                        <BsFacebook style={{ color: '#1877F2' }} size={22}/>
                        <h4>Đăng nhập với Facebook</h4>
                    </div>
                    <div className="optionLogin">
                        <BsApple size={22}/>
                        <h4>Đăng nhập với Apple</h4>
                    </div>
                    <div className="optionLogin">
                        <h4>Đăng nhập với số điện thoại</h4>
                    </div>
                </div>

                {/* -------------------------------------------------------------------------------------- */}
                <span className='lineCut'></span>
                <LoginFormRender />
                <Link to="/forgot" style={{ textDecoration: 'underline' }}>
                    Quên mật khẩu?
                </Link>
                {/* -------------------------------------------------------------------------------------- */}
                <span className='lineCut'></span>
                <p>Chưa có tài khoản
                    <Link to="/signin" style={{
                        textDecoration: 'underline',
                        marginLeft: '8px'
                    }}>
                        Đăng ký ngay
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPages;