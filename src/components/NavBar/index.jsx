import { memo, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { HiHome, HiMagnifyingGlass } from "react-icons/hi2";
import { FaCompass, FaPlus, FaMusic } from "react-icons/fa6";

import { urlApiAudioServer, apiKey } from "/src/constants/env";
import {
  methodsHandleAlert,
  methodsHandlePlaylists,
} from "/src/constants/stores";

import "./style.css";

const NavBar = ({ user, tokens, showPlaylist }) => {
  const handleShowAlerts = useContext(methodsHandleAlert);
  const handlePlaylists = useContext(methodsHandlePlaylists);

  // console.log(tokens.accessToken)
  // create a new SongList custom
  const handleAddPlaylist = () => {
    fetch(`${urlApiAudioServer}user/createPlaylist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        Authorization: tokens.accessToken,
        "x-client-id": user.userId,
      },
      body: JSON.stringify({
        playListName: `My playlist #${showPlaylist.length}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode === 201) {
          handlePlaylists();
          handleShowAlerts("Tạo playlist thành công!");
        } else {
          handleShowAlerts(data.message);
        }
      });
  };

  return (
    <div className="nav_bar noone_coppy">
      <nav className="nav_bar_options">
        <Link to="/">
          <HiHome className="nav_bar_options_icons" />
          <p>Trang Chủ</p>
        </Link>
        <Link to="/search">
          <HiMagnifyingGlass className="nav_bar_options_icons" />
          <p>Tìm Kiếm</p>
        </Link>
        <Link to="/khampha">
          <FaCompass className="nav_bar_options_icons" />
          <p>Khám Phá</p>
        </Link>
      </nav>
      <span className="nav_bar_line"></span>
      {/* components Library */}
      <div className="nav_bar_library">
        <div className="nav_bar_library_header">
          <div className="nav_bar_library_title">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 19 19"
              fill="none"
              className="nav_bar_options_icons"
            >
              <path
                d="M12 0H0V2.71429H12V0ZM12 5.42857H0V8.14286H12V5.42857ZM0 13.5714H8V10.8571H0V13.5714ZM14 0V11.1014C13.69 10.9521 13.35 10.8571 13 10.8571C11.34 10.8571 10 12.6757 10 14.9286C10 17.1814 11.34 19 13 19C14.66 19 16 17.1814 16 14.9286V2.71429H19V0H14Z"
                fill="white"
              />
            </svg>
            <p>Danh Sách Phát</p>
          </div>
          <div
            className="nav_bar_library_addplaylist"
            onClick={() => (user ? handleAddPlaylist() : "")}
          >
            <FaPlus />
          </div>
        </div>
        {user && (
          <div className="nav_bar_library_playlists">
            {user && (
              <Link to="/playlists/recent" style={{ width: "100%" }}>
                <div className="nav_bar_library_playlist">
                  <div className="nav_bar_library_playlist_thumb">
                    <FaMusic />
                  </div>
                  <div className="nav_bar_library_playlist_details">
                    <h3 className="oneline_text">Nghe gần đây</h3>
                    <p className="oneline_text">Playlist . {user.userName}</p>
                  </div>
                </div>
              </Link>
            )}
            {showPlaylist.length > 0 ? (
              showPlaylist.map((playlist, index) => {
                return (
                  <Link
                    to={`/playlists/${playlist._id}`}
                    style={{ width: "100%" }}
                    key={index}
                  >
                    <div className="nav_bar_library_playlist">
                      <div className="nav_bar_library_playlist_thumb">
                        <FaMusic />
                      </div>
                      <div className="nav_bar_library_playlist_details">
                        <h3 className="oneline_text">
                          {playlist.playListName}
                        </h3>
                        <p className="oneline_text">
                          Playlist . {user.userName}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <p className="show_alert">Bạn chưa có playlist nào</p>
            )}
            {/* <div className="nav_bar_library_playlist">
                            <img src='https://nth-audio.site/images/avt.jpg' />
                            <div className="nav_bar_library_playlist_details">
                                <input type="text" placeholder='Nhập tên playlist' />
                            </div>
                        </div> */}
          </div>
        )}
        {!user && (
          <p className="show_alert">
            Vui lòng đăng nhập để sử dụng chức năng này
          </p>
        )}
      </div>
    </div>
  );
};

export default memo(NavBar);
