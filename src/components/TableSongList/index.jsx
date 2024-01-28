import { IoMdTime } from "react-icons/io"

import { SongLine } from "/src/constants/components"

import './style.css'

const index = ({ arrSongs, showPlaylist }) => {
    return (
        <div className="bounder_table_song">
            <div className="header_table_song">
                <p>#</p>
                <p>Title</p>
                <div className="header_table_song_timer"><IoMdTime /></div>
            </div>
            <div className="body_table_song">
                {
                    arrSongs.length > 0 &&
                    arrSongs.map((song, index) => {
                        return index < 20 && (
                            <div key={index}>
                                <SongLine
                                    song={song}
                                    check={1}
                                    index={index}
                                    showPlaylist={showPlaylist}
                                />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default index