import { useState, useEffect, memo } from "react";
import { Link } from "react-router-dom";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import { SongBox } from "/src/constants/components";
import { apiKey } from "/src/constants/env";

import "./style.css";

const ShowList = ({ link, range = 100, more = false, ...header }) => {
  const [listSongs, setListSongs] = useState([]);

  //------------------------------------------------- FUNCTIONS -------------------------------------------------
  useEffect(() => {
    const loadSongs = async () => {
      const response = await fetch(`${link}`, {
        method: "GET",
        headers: {
          "x-api-key": apiKey,
        },
      });
      const data = await response.json();
      setListSongs(data.metadata.songs ?? data.metadata);
    };
    loadSongs();
  }, []);

  //------------------------------------------------- RENDER -------------------------------------------------

  return (
    <SkeletonTheme baseColor="#444" highlightColor="#888">
      {listSongs.length > 0 ? (
        <div className="showlist_box">
          <div className="header_section">
            <div className="inform_section">
              {header.thumb && (
                <div className="thumb_section">
                  <img src={header.thumb} alt="" />
                </div>
              )}
              <div className="title_section">
                {header.title && <h3>{header.title}</h3>}
                {header.desc && <p>{header.desc}</p>}
              </div>
            </div>
            <div className="header_section_btn">
              {more && <Link to="">Xem thêm</Link>}
            </div>
          </div>
          <div className="bounder_showlist_grid_box">
            <div className="showlist_grid_box">
              {listSongs.map((song, index) => {
                return (
                  index < range && (
                    <div key={index}>
                      <SongBox song={song} />
                    </div>
                  )
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="loading_box">
          <Skeleton width={200} height={30} className="header_section" />
          <div className="loading_grid_box">
            <div className="box_skeleton">
              <Skeleton className="box_skeleton_thumb" />
              <Skeleton className="box_skeleton_text" count={2} />
            </div>
            <div className="box_skeleton">
              <Skeleton className="box_skeleton_thumb" />
              <Skeleton className="box_skeleton_text" count={2} />
            </div>
            <div className="box_skeleton">
              <Skeleton className="box_skeleton_thumb" />
              <Skeleton className="box_skeleton_text" count={2} />
            </div>
            <div className="box_skeleton">
              <Skeleton className="box_skeleton_thumb" />
              <Skeleton className="box_skeleton_text" count={2} />
            </div>
            <div className="box_skeleton">
              <Skeleton className="box_skeleton_thumb" />
              <Skeleton className="box_skeleton_text" count={2} />
            </div>
            <div className="box_skeleton">
              <Skeleton className="box_skeleton_thumb" />
              <Skeleton className="box_skeleton_text" count={2} />
            </div>
          </div>
        </div>
      )}
    </SkeletonTheme>
  );
};

export default memo(ShowList);
