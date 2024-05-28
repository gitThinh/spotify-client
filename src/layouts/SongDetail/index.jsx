import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import { PiDotOutlineFill } from "react-icons/pi";
import { FaPlay } from "react-icons/fa6";

import {
  urlApiAudioServer,
  urlApiImg,
  urlMLServer,
  apiKey,
} from "/src/constants/env";
import { SelectOptionsSong, SongLine } from "/src/constants/components";
import { LoadingPage, Page404 } from "/src/constants/layouts";
import { PlaySongContext, actions } from "/src/constants/stores";
import { SongBox } from "/src/constants/components";

import "./style.css";

const SongDetail = ({ showPlaylist }) => {
  const [playingState, dispatch] = useContext(PlaySongContext);

  const id = useParams().id;
  const [songDetail, setSongDetail] = useState();
  const [rcmList, setRcmList] = useState([]);
  const [checkSong, setCheckSong] = useState(true);

  // get song details
  useEffect(() => {
    setSongDetail("");
    const handleLoadSong = async () => {
      const response = await fetch(`${urlApiAudioServer}songs/${id}`, {
        method: "GET",
        headers: {
          "x-api-key": apiKey,
        },
      });
      const data = await response.json();
      data.statusCode === 200
        ? setSongDetail(data.metadata)
        : setCheckSong(false);
    };
    handleLoadSong();
  }, [id]);

  // get rcm list
  useEffect(() => {
    setRcmList([]);
    checkSong &&
      fetch(`${urlMLServer + id}`, {
        method: "GET",
        headers: {
          "x-api-key": apiKey,
        },
      })
        .then((response) => response.json())
        .then((data) => data.statusCode === 200 && setRcmList(data.metadata));
  }, [id]);

  // -------------------------------------------- RENDER ------------------------------------------
  return songDetail ? (
    <div className="show_song">
      <div
        className="header_songpage"
        // style={{ background: `url('${urlApiImg + songDetail.coverArt}') left top/2000%`}}
      >
        <div className="thumb_song noone_coppy">
          <img src={urlApiImg + songDetail.coverArt} alt={songDetail.title} />
        </div>
        <div className="detail_song">
          <p className="type_detail">Song</p>
          <p className="title_song oneline_text">{songDetail.title || ""}</p>
          <div className="artist_duration">
            <p className="artist">{songDetail.artist_name}</p>
            <PiDotOutlineFill />
            <p>{songDetail.year}</p>
            <PiDotOutlineFill />
            <p>{songDetail.views} lượt nghe</p>
            {/* <p className="duration">
                                {Math.floor(songDetail.duration / 60) + ' min ' + Math.ceil(songDetail.duration % 60) + ' sec'}
                            </p> */}
          </div>
        </div>
      </div>
      <div className="body_songpage">
        <div className="body_page_option">
          <button
            className="play_button"
            onClick={() => dispatch(actions.songsPlay(songDetail))}
          >
            <FaPlay color="black" />
          </button>
          <SelectOptionsSong song={songDetail} showPlaylist={showPlaylist} />
        </div>
        {rcmList.length > 0 && (
          <section className="body_page_sections body_page_section_rcm">
            <div className="header_section">
              <div className="inform_section">
                <div className="title_section">
                  <h3>Đề xuất:</h3>
                  <p>Dựa trên bài hát</p>
                </div>
              </div>
            </div>
            {rcmList.map((song, index) => {
              return (
                index < 5 && (
                  <div key={index}>
                    <SongLine
                      index={index}
                      song={song}
                      check={1}
                      showPlaylist={showPlaylist}
                    />
                  </div>
                )
              );
            })}
          </section>
        )}
        {songDetail?.fromSameAlbum?.length > 0 && (
          <section className="body_page_sections body_page_section_rcm">
            <div className="header_section">
              <div className="inform_section">
                <div className="title_section">
                  <h3>Cùng Album:</h3>
                </div>
              </div>
            </div>
            {songDetail?.fromSameAlbum.map((song, index) => {
              return (
                <div key={index}>
                  <SongLine
                    index={index}
                    song={song}
                    check={1}
                    showPlaylist={showPlaylist}
                  />
                </div>
              );
            })}
          </section>
        )}
        {songDetail?.fromSameArtist?.[0]?.songs?.length > 0 && (
          <section className="body_page_sections body_page_section_rcm">
            <div className="header_section">
              <div className="inform_section">
                <div className="title_section">
                  <h3>Cùng tác giả {songDetail?.fromSameArtist?.[0]?.artistName}:</h3>
                </div>
              </div>
            </div>
            <div className="bounder_showlist_grid_box">
              <div className="showlist_grid_box">
                {songDetail?.fromSameArtist[0].songs.map((song, index) => {
                  return (
                      <div key={index}>
                        <SongBox song={song} />
                      </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </div>
      <div className="same_artist"></div>
    </div>
  ) : checkSong ? (
    <LoadingPage />
  ) : (
    <Page404 />
  );
};

export default SongDetail;
