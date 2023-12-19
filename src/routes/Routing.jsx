import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom'
import LoginPages from '/src/pages/LoginPage'
import ForgotPass from '/src/pages/ForgotPass'
import SigninPage from '/src/pages/SigninPage'
import HomePage from '/src/pages/HomePage'
import ResetPass from '/src/pages/ResetPass'


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