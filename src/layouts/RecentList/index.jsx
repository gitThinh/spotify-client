import { useEffect, useState, useContext } from "react";

import { PiDotOutlineFill } from "react-icons/pi";
import { FaPlay, FaMusic } from "react-icons/fa6";

import { urlApiAudioServer, apiKey } from "/src/constants/env";
import { LoadingPage } from "/src/constants/layouts";
import {
  SelectOptionsPlaylist,
  TableSongList,
} from "/src/constants/components";
import {
  PlaySongContext,
  actions,
  methodsHandlePlaylists,
} from "/src/constants/stores";

const index = ({ user, tokens, showPlaylist }) => {
  const [playingState, dispatch] = useContext(PlaySongContext);
  const handlePlaylists = useContext(methodsHandlePlaylists);

  const [arrSongs, setArrSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${urlApiAudioServer}user/playLists/recent`, {
      headers: {
        "x-api-key": apiKey,
        Authorization: tokens.accessToken,
        "x-client-id": user.userId,
      },
    })
      .then((respone) => respone.json())
      .then((data) => {
        setIsLoading(false);
        setArrSongs(data.metadata);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, []);

  return !isLoading ? (
    <div style={{ paddingTop: "10px" }}>
      {/* <h1 style={{ textAlign: 'center' }}>Nghe gần đây</h1> */}
      <div className="header_playlistpage">
        <div className="thumb_playlist noone_coppy">
          <FaMusic size={100} />
        </div>
        <div className="detail_playlist">
          <p className="type_detail">Playlist</p>
          <p className="title_playlist oneline_text">Nghe gần đây</p>
          <div className="author_playlist">
            <img
              className="user_avt"
              src="https://nth-audio.site/images/avt.jpg"
            />
            <p className="user_name">{user.userName}</p>
            <PiDotOutlineFill />
            <p>{arrSongs.length > 20 ? 20 : arrSongs.length} bài hát</p>
          </div>
        </div>
      </div>
      <div className="body_songpage">
        <div className="body_page_option">
          <button
            className="play_button"
            onClick={() =>
              arrSongs.length > 0 && dispatch(actions.playlistPlay(arrSongs))
            }
          >
            <FaPlay size={25} color="black" />
          </button>
        </div>
      </div>
      {arrSongs.length > 0 ? (
        <TableSongList arrSongs={arrSongs} showPlaylist={showPlaylist} />
      ) : (
        <div style={{fontSize: '24px', fontWeight: '700', margin: '0 auto', width: "max-content"}}>Bạn chưa nghe bài hát nào trên hệ thống</div>
      )}
    </div>
  ):
  <LoadingPage />
};

export default index;
