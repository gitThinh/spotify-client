import { useContext } from "react";
import { Link } from "react-router-dom";

import { FaPlay } from "react-icons/fa";

import { PlaySongContext, actions } from "/src/constants/stores";
import { urlApiImg } from "/src/constants/env";

import "./style.css";

const SongBox = ({ song }) => {
  const [playingState, dispatch] = useContext(PlaySongContext);
  // --------------------------------------- RENDER ------------------------------------
  return (
    <Link to={`/songs/${song._id}`}>
      <div className="songs_box noone_coppy">
        <img className="songs_thumb" src={`${urlApiImg + song.coverArt}`} />
        <div className="songs_inform">
          <h3 className="songs_title oneline_text">{song.title}</h3>
          <p className="songs_author under_link oneline_text">
            {song.artist_name}
          </p>
        </div>
        <button
          className="play_button"
          onClick={(e) => {
            e.preventDefault();
            dispatch(actions.songsPlay(song));
          }}
        >
          <FaPlay className="play_button_icon" />
        </button>
      </div>
    </Link>
  );
};

export default SongBox;
