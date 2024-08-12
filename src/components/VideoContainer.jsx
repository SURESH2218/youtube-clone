import React, { useEffect, useState } from "react";
import { YOUTUBE_API_KEY } from "../utils/constants";
import VideoCard, { NewVideoCard } from "./VideoCard";
import { Link } from "react-router-dom";

const VideoContainer = () => {
  const [video, setVideos] = useState([]);
  useEffect(() => {
    getVideos();
  }, []);
  const getVideos = async () => {
    const data = await fetch(YOUTUBE_API_KEY);
    const json = await data.json();
    // console.log(json.items);
    setVideos(json.items);
  };
  return (
    <div className="flex flex-wrap">
      {/* {video[3] && <NewVideoCard info={video[5]} />} */}
      {video.map((videos, id) => (
        <Link key={id} to={"/watch?y=" + videos.id}>
          <VideoCard key={id} info={videos} />
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;
