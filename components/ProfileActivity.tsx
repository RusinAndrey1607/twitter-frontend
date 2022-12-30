import React, { useState } from "react";

type Props = {};

const ProfileActivity = (props: Props) => {
  const [section, setSection] = useState("tweets");
  const handleChange = (name: string) => {
    setSection(name);
  };
  return (
    <div>
      <div className="buttons grid grid-cols-3 items-center justify-between">
        <div  onClick={() => handleChange("tweets")} className={`after:bg-twitterColor after:left-0 after:bottom-0 after:absolute ${section == "tweets" ? 'after:content-[""] text-fontColor' : 'after:content-none '} after:h-1 after:w-full  relative tweets py-4 text-grayColor cursor-pointer  hover:bg-gray-200 hover:text-fontColor font-bold text-center`}>
          Your Tweets
        </div>
        <div  onClick={() => handleChange("media")} className={`after:bg-twitterColor after:left-0 after:bottom-0 after:absolute ${section == "media" ? 'after:content-[""] text-fontColor ' : 'after:content-none '} after:h-1 after:w-full  relative tweets py-4 text-grayColor cursor-pointer  hover:bg-gray-200 hover:text-fontColor font-bold text-center`}>
          Media
        </div>
        <div  onClick={() => handleChange("likes")} className={`after:bg-twitterColor after:left-0 after:bottom-0 after:absolute ${section == "likes" ? 'after:content-[""] text-fontColor ' : 'after:content-none '} after:h-1 after:w-full  relative tweets py-4 text-grayColor cursor-pointer  hover:bg-gray-200 hover:text-fontColor font-bold text-center`}>
          Likes
        </div>
      </div>
    </div>
  );
};

export default ProfileActivity;
