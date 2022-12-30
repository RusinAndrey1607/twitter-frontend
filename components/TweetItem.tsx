import React from "react";
import { ITweet } from "../interfaces/ITweet";
import Image from "next/image";
import TimeAgo from "react-timeago";
import Link from "next/link";

type Props = {
  tweet: ITweet;
};

const TweetItem = ({ tweet }: Props) => {
  return (
    <div className="">
      <div className="flex my-3">
        <div className="avatar">
          <Image
            src={
              tweet.avatar
                ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/static/${tweet.avatar}`
                : "/user.png"
            }
            alt="avatar"
            width={48}
            height={48}
            className="w-12 h-12 rounded-full object-cover mx-3"
          />
        </div>
        <div className="tweetBody max-w-lg">
          <div className="tweetAuthor">
            <Link href={`/profile`}>
              <span className="font-bold text-fontColor mr-3 trasition-all duration-300 hover:underline">
                {tweet.author}
              </span>

              <span className="text-grayColor mr-1">
                @{tweet.author_username} .
              </span>
            </Link>

            <span className="text-grayColor">
              <TimeAgo date={tweet.createdAt} />
            </span>
          </div>
          <div className="tweetText mb-6">{tweet.text}</div>
          {tweet.image  ? <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/static/${tweet.image}`} alt=""  className="tweetImage rounded-xl w-full"/> : null}
          
        </div>
      </div>
    </div>
  );
};

export default TweetItem;
