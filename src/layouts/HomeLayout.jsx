import ShowList from "/src/components/ShowList"

import '/src/assets/Home/HomeLayout.css'

const urlApiAudioServer = import.meta.env.VITE_API_URL_AUDIOSERVER

const HomeLayout = ({ changePlayingList }) => {
    // ------------------------------------------------ RENDER --------------------------------------------------------
    return (
        <div className="homeLayout">
            <ShowList link={`${urlApiAudioServer + 'songs/page/1'}`} title={'Trang 1'} changePlayingList={changePlayingList}/>
            <ShowList link={`${urlApiAudioServer}songs/page/3`} title={'Trang 2'} changePlayingList={changePlayingList}/>
        </div>
    );
};

export default HomeLayout