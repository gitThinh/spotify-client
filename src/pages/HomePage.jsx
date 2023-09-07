import { Route, Routes } from 'react-router-dom'

import NavBar from "../components/NavBar"
import Playing from "../components/Playing"
import HomeLayout from '../components/LayoutComponents/HomeLayout'

import '../assets/Home/layout2.css'


const HomePage = () => {
    return (
        <div className="homeContainer">
            <div className="container">
                <NavBar />
                <Routes>
                    <Route path='/' element={<HomeLayout />} />
                </Routes>
            </div>
            <Playing />
        </div>
    );
};

export default HomePage;