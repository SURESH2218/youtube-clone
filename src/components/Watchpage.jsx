import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";

const Watchpage = () => {
  const [searchParams] = useSearchParams();
  // console.log(searchParams.get("x"));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeMenu());
  }, []);
  return (
    <div>
      <iframe
        className="pl-2 pt-2 rounded-lg"
        width="1000"
        height="540"
        src={"https://www.youtube.com/embed/" + searchParams.get("x")}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        
      ></iframe>
    </div>
  );
};

export default Watchpage;
