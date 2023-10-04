import '../../assets/Home/HomeLayout.css'
import ShowList from "./ShowList";

const urlApiAudioServer = import.meta.env.VITE_API_URL_AUDIOSERVER

const HomeLayout = ({ updatePlayingList }) => {

    // ------------------------------------------------ RENDER --------------------------------------------------------
    return (
        <div className="homeLayout">
            <h2 className="titlePages">Songs</h2>
            <ShowList link={`${urlApiAudioServer}songs/page/1`} title={'page 1'} updatePlayingList={updatePlayingList}/>
            <ShowList link={`${urlApiAudioServer}songs/page/3`} title={'page 2'} updatePlayingList={updatePlayingList}/>
        </div>
    );
};

export default HomeLayout