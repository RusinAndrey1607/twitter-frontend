import Image from "next/image";
import React, { Dispatch, SetStateAction, useContext } from "react";
import SidebarRow from "./SidebarRow";
import {
  HomeIcon,
  HashtagIcon,
  BellIcon,
  HeartIcon,
  BookmarkIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Context } from "./MyContainer";
type Props = {};

const Sidebar = (props: Props) => {
  const { openModal, setModal } = useContext(Context);

  return (
    <div className="hidden col-span-2 sm:flex flex-col items-center px-4 md:items-start ">
      <Image
        src={"/twitter-logo.svg"}
        width={32}
        height={32}
        className="h-8 w-8 m-3 hidden sm:block "
        alt="Icon"
      />

      <SidebarRow href="/home" Icon={HomeIcon} title="Home" />
      <SidebarRow href="/search" Icon={HashtagIcon} title="Explore" />
      <SidebarRow href="/" Icon={BellIcon} title="Notifications" />
      <SidebarRow href="/" Icon={BookmarkIcon} title="Bookmarks" />
      <SidebarRow href="/likes" Icon={HeartIcon} title="Likes" />
      <SidebarRow href="/profile" Icon={UserIcon} title="Profile" />
      <div
        onClick={() => {
          setModal("tweet")
          openModal(true);
        }}
        className="active:scale-125 md:active:scale-100 group cursor-pointer bg-twitterColor p-4 rounded-full md:py-2 md:text-center md:w-full mt-2 border hover:text-twitterColor border-twitterColor md:hover:bg-transparent transition-all duration-300 "
      >
        <p className="hidden md:block font-bold text-lg text-white group-hover:text-twitterColor">
          Tweet
        </p>
        <Image
          src="/feather.png"
          width={24}
          height={24}
          className="w-6 h-6 md:hidden"
          alt="feather"
        />
      </div>
    </div>
  );
};

export default Sidebar;
