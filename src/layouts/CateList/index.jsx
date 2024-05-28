import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Cookies from 'js-cookie'

import { FaMusic, FaPlay } from "react-icons/fa6";

import {
  apiKey,
  urlSongGenre
} from "/src/constants/env";
import { SongLine, SelectOptionsPlaylist } from "/src/constants/components";
import { LoadingPage, Page404 } from "/src/constants/layouts";
import { PlaySongContext, actions, methodsHandlePlaylists } from '/src/constants/stores'

import "../PlaylistPage/style.css";

const CateList = ({ showPlaylist }) => {
  const [playingState, dispatch] = useContext(PlaySongContext);
  const handlePlaylists = useContext(methodsHandlePlaylists)

  const slug = useParams().slug;
  const [songList, setSongList] = useState(true);
  const [checkList, setCheckList] = useState(true);

  // get cate list
  useEffect(() => {
    setSongList([]);
    const handleLoadSong = async () => {
      const response = await fetch(`${urlSongGenre}${slug}&page=1`, {
        method: "GET",
        headers: {
          "x-api-key": apiKey,
        },
      });
      const data = await response.json();
      data.statusCode === 200
        ? setSongList(data.metadata)
        : setCheckList(false)
    };
    handleLoadSong();
  }, [slug]);

  // -------------------------------------------- RENDER ------------------------------------------
  return songList.length > 0 ?  (
    <div className="show_playlist">
            <div className="header_playlistpage">
                <div className="thumb_playlist noone_coppy">
                    <FaMusic size={100}/>
                </div>
                <div className="detail_playlist">
                    <p className="type_detail">Playlist</p>
                    <p className="title_playlist oneline_text">{slug || ""}</p>
                    <div className="author_playlist">
                        {/* <img className="user_avt" src="https://nth-audio.site/images/avt.jpg" /> */}
                        {/* <p className="user_name">{user.userName}</p>
                        <PiDotOutlineFill />
                        <p>{playList.songs.length} bài hát</p> */}
                    </div>
                </div>
            </div>
            <div className="body_songpage">
                <div className="body_page_option">
                    <button className="play_button" onClick={() => songList.length > 0 && dispatch(actions.playlistPlay(songList))}>
                        <FaPlay size={25} color='black'/>
                    </button>
                    <SelectOptionsPlaylist playList={songList} handlePlaylists={handlePlaylists} />
                </div>
                <section className="body_page_option_rcm">
                    {
                        songList.map((song, index) => {
                            return (
                                <div key={index}>
                                    <SongLine
                                        index={index}
                                        song={song}
                                        check={1}
                                        showPlaylist={showPlaylist}
                                    />
                                </div>
                            )
                        })
                    }
                </section>
            </div>
        </div>
  ) : checkList ? (
    <LoadingPage />
  ) : (
    <Page404 />
  )
};

export default CateList;
