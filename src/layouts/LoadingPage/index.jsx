import { BeatLoader } from 'react-spinners'

import './style.css'

const index = () => {
    return (
        <div className='loading_page'>
            <BeatLoader className='loading_animation' color='#ddd'/>
        </div>
    );
};

export default index