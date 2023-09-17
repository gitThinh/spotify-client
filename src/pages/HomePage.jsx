import { Route, Routes } from 'react-router-dom'

import NavBar from "../components/NavBar"
import Playing from "../components/Playing"
import HomeLayout from '../components/LayoutComponents/HomeLayout'
import SongDetail from '../components/LayoutComponents/SongDetail'
import Queue from '../components/LayoutComponents/Queue'


import '../assets/Home/layout2.css'


const HomePage = () => {
    return (
        <div className="homeContainer">
            <div className="container">
                <NavBar />
                <Routes>
                    <Route index element={<HomeLayout />} />
                    <Route path='/queue' element={<Queue />} />
                    <Route path='/songs/:id' element={<SongDetail />} />
                </Routes>
            </div>
            <Playing />
        </div>
    );
};

export default HomePage;