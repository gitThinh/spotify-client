import { useState } from 'react';
import '../assets/LogAndSign/LoginPages.css'
import LoginFormRender from '../components/FormComponent/LoginFormRender';




const LoginPages = () => {
    return (
        <div className='containerLogin'>
            <div className="haederLogin">
                <i className="fa-brands fa-spotify"></i>
                <h2>Spotify</h2>
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
                <a href="#" style={{ textDecoration: 'underline' }}>
                    Forgot your password?
                </a>
                {/* -------------------------------------------------------------------------------------- */}
                <span className='lineCut'></span>
                <p>Don't have an account?
                    <a href="#" style={{
                        textDecoration: 'underline',
                        marginLeft: '8px'
                    }}>
                        Sign up for Spotify
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginPages;