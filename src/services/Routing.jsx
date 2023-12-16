import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom'
import LoginPages from '../pages/LoginPages'
import ForgotPass from '../pages/ForgotPass'
import SigninPage from '../pages/SigninPage'
import HomePage from '../pages/HomePage'
import ResetPass from '../pages/ResetPass'


const Routing = () => {
    return (
        <Router>
            <Routes>
                <Route path='/login' element={<LoginPages/>} />
                <Route path='/forgot' element={<ForgotPass/>} />
                <Route path='/repass' element={<ResetPass/>} />
                <Route path='/signin' element={<SigninPage/>} />
                <Route path='/*' element={<HomePage/>} />
            </Routes>
        </Router>
    )
}

export default Routing