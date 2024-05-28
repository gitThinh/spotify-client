import { Link } from "react-router-dom";

import "./style.css";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import { SongBox } from "/src/constants/components";
import { memo } from "react";

const CateBox = ({ title, data }) => {

  const titleMap = {
    Vietnamese: "Nhạc Việt",
    World: "Nhạc quốc tế",
    Chill: "Thư giãn",
  };
  //------------------------------------------------- RENDER -------------------------------------------------

  return (
    <SkeletonTheme baseColor="#444" highlightColor="#888">
      {data ? (
        <div className="showlist_box">
          <div className="header_section">
            <div className="inform_section">
              <div className="title_section">{title && <h3>{titleMap[title] || title}</h3>}</div>
            </div>
            <div className="header_section_btn">
              <Link to={`cate/${title}`}>Xem thêm</Link>
            </div>
          </div>
          <div className="bounder_showlist_grid_box">
            <div className="showlist_grid_box">
              {data.map((song, index) => {
                return (
                  <div key={index}>
                    <SongBox song={song} />
                  </div>
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

export default memo(CateBox);
