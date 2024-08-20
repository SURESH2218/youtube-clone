import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import CommentsContainer from "./commentsContainer";
import LiveChat from "./LiveChat";

const Watchpage = () => {
  const [searchParams] = useSearchParams();
  // console.log(searchParams.get("x"));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeMenu());
  }, []);
  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex w-full">
          <div>
            <iframe
              className="pl-2 pt-2 rounded-lg"
              width="950"
              height="500"
              src={"https://www.youtube.com/embed/" + searchParams.get("y")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div>
          <div className="w-full p-2">
            <LiveChat />
          </div>
        </div>
        <CommentsContainer />
      </div>
    </>
  );
};

export default Watchpage;
