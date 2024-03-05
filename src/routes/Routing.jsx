import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom'
import { ForgotPass, HomePage, LoginPage, SigninPage, ResetPass} from '/src/constants/pages'



const Routing = () => {
    return (
        <Router>
            <Routes>
                <Route path='/spotify-client/login' element={<LoginPage/>} />
                <Route path='/spotify-client/forgot' element={<ForgotPass/>} />
                <Route path='/spotify-client/repass' element={<ResetPass/>} />
                <Route path='/spotify-client/signin' element={<SigninPage/>} />
                <Route path='/spotify-client/*' element={<HomePage/>} />
            </Routes>
        </Router>
    )
}

export default Routing