import { Link } from 'react-router-dom'
import '../assets/LogAndSign/Layout1.css'
import LoginFormRender from '../components/FormComponent/LoginFormRender';




const LoginPages = () => {
    window.scrollTo(0, 0)
    return (
        <div className='containerL1'>
            <div className="headerPage">
                <i className="fa-brands fa-spotify"></i>
                <h2>Spotify Clone</h2>
            </div>
            <div className="contentLogin">
                <h2>Log in to Spotify</h2>
                <div className="groupOptionsLogin">
                    <div className="optionLogin">
                        <i className="fa-brands fa-google"></i>
                        <h4>Continue with Google</h4>
                    </div>
                    <div className="optionLogin">
                        <i className="fa-brands fa-facebook" style={{ color: '#1877F2' }}></i>
                        <h4>Continue with Facebook</h4>
                    </div>
                    <div className="optionLogin">
                        <i className="fa-brands fa-apple"></i>
                        <h4>Continue with Apple</h4>
                    </div>
                    <div className="optionLogin">
                        <h4>Continue with phone number</h4>
                    </div>
                </div>

                {/* -------------------------------------------------------------------------------------- */}
                <span className='lineCut'></span>
                <LoginFormRender />
                <Link to="/forgot" style={{ textDecoration: 'underline' }}>
                    Forgot your password?
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