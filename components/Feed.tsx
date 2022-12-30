import React from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import TweetBox from "./TweetBox";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import Tweets from "./Tweets";
import { loadTweetsThunk } from "../redux/slices/TweetSlice";
import Loader from "./Loader";
import Image from "next/image";
type Props = {};

const Feed = (props: Props) => {
  const isLoading = useAppSelector((state) => state.tweet.isLoading);
  const dispatch = useAppDispatch();
  const handleRefresh = () => {
    dispatch(loadTweetsThunk({ limit: 20, offset: 0 }));
  };

  return (
    <div className="col-span-9 sm:col-span-7  md:col-span-7 lg:col-span-5 border-x">
      <div className="flex justify-between items-center ">
        <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
        <ArrowPathIcon
          onClick={handleRefresh}
          className="w-8 h-8 cursor-pointer text-twitterColor mr-5 mt-5 transition-all duration-500 ease-out hover:rotate-180 active:scale-125"
        />
      </div>
      <div className="sm:block hidden">
        <TweetBox />
        {isLoading ? (
          <div className="flex items-center mt-5 flex-col">
            <Image src={"/loading.svg"} alt="loader" width={80} height={80} className=" h-20 w-20 " />
            <p className="text-lg font-bold text-twitterColor">Loading ...</p>
          </div>
        ) : (
          <Tweets />
        )}
      </div>
    </div>
  );
};

export default Feed;
