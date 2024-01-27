import React from "react";

const VideoCard = ({ info }) => {
  //   console.log(info);
  const { snippet } = info;
  const { channelTitle, thumbnails, title } = snippet;
//   const { commentCount, viewCount } = statistics;

  return (
    <div className="p-2 m-2 shadow-lg rounded-lg cursor-pointer w-72 mx-auto">
      <img
        src={thumbnails.medium.url}
        className="rounded-lg w- h-36 object-cover"
        alt="thumbnail"
      />
      <h1 className="font-bold py-2">{channelTitle}</h1>
      <h1>{title}</h1>
    </div>
  );
};

export default VideoCard;
