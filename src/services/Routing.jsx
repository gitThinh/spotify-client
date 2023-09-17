import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPages from '../pages/LoginPages';
import ForgotPass from '../pages/ForgotPass';
import Page404 from '../pages/Page404';
import SigninPage from '../pages/SigninPage';
import HomePage from '../pages/HomePage';
import ResetPass from '../pages/ResetPass';
import HomeLayout from '../components/LayoutComponents/HomeLayout';


const Routing = () => {
    return (
        <Router>
            <Routes>
                <Route path='*' element={<Page404/>} />
                <Route path='/home/*' element={<HomePage/>} />
                <Route path='/login' element={<LoginPages/>} />
                <Route path='/forgot' element={<ForgotPass/>} />
                <Route path='/repass' element={<ResetPass/>} />
                <Route path='/signin' element={<SigninPage/>} />
                <Route path='/home/home' element={<HomeLayout/>} />
            </Routes>
        </Router>
    );
};

export default Routing;