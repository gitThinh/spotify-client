import { useEffect, useState } from "react";
import getSongCate from "/src/utils/getSongCate";
import { CateBox } from "/src/constants/components";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const titleMap = {
  Vietnamese: "Nhạc Việt",
  World: "Nhạc quốc tế",
  Chill: "Thư giãn",
};

const index = () => {
  const [listCate, setListCate] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getSongCate();
      if (data.length > 0) {
        setListCate(data);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="home_layout">
      <SkeletonTheme baseColor="#444" highlightColor="#888">
        {listCate.length > 0 ? (
          listCate.map((list, index) => (
            <div key={index}>
              <CateBox
                title={list.key}
                data={list.values}
              />
            </div>
          ))
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
    </div>
  );
};

export default index;
