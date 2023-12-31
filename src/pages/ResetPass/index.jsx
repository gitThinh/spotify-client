import { useState } from "react";

import { InputForm } from "/src/constants/components"
import { isNull, isPassword } from "/src/utils/validation";



const ResetPass = () => {
    const [password, setPassword] = useState('')
    const [cpass, setCpass] = useState('')
    const [error, setError] = useState('')


    // -------------------------------------- FUNCTIONS --------------------------------------
    const handleRePass = (e) => {
        e.preventDefault()
        if (!isNull(password) || !isNull(cpass)) {
            setError('Vui lòng nhập đầy đủ thông tin')
            return
        }
        if (!isPassword(password)) {
            setError('Mật khẩu phải có kí tự đặc biệt, số, in hoa và dài hơn 8 kí tự')
            return
        }
        if (password !== cpass) {
            setError("Mật khẩu xác nhận phải trùng với mật khẩu")
            return
        }
        // code fetch api 
    }



    // -------------------------------------- RENDER --------------------------------------
    return (
        <div className="container_reset_pass noone_coppy">
            <div className="header_page">
                <h2>Spotify Clone</h2>
            </div>
            <div className="content_repass">
                <h2>Reset Password</h2>
                <form
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '30px',
                    }}
                >
                    <div className="group_input">
                        <InputForm
                            data={{
                                name: 'password',
                                text: 'Mật khẩu mới',
                                type: 'password',
                                getChange: function (e) { setPassword(e.target.value) }
                            }}
                        />
                        <InputForm
                            data={{
                                name: 'checkPassword',
                                text: 'Nhập lại mật khẩu',
                                type: 'password',
                                getChange: function (e) { setCpass(e.target.value) }
                            }}
                        />
                    </div>
                    <button type="submit" className="active" onClick={handleRePass}>Đổi mật khẩu</button>
                </form>
                <p className='msg' style={{ width: '80%', margin: '0 auto' }}>
                    {error}
                </p>
            </div>
        </div>
    );
};

export default ResetPass;