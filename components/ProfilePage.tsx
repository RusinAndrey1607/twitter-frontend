import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { useAppSelector } from "../hooks/redux";
import ProfileActivity from "./ProfileActivity";
import { Context } from "./MyContainer";

type Props = {};

const monthList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const ProfilePage = (props: Props) => {
  const { openModal, setModal } = useContext(Context);
  const profile = useAppSelector((state) => state.profile.profile);
  const data = new Date(profile.createdAt);
  const joinedString = `Joined ${
    monthList[data.getMonth()]
  } ${data.getFullYear()}`;
  return (
    <div className='col-span-9 sm:col-span-7  md:col-span-7 lg:col-span-5 border-x"'>
      <div className="top flex items-center">
        <div className="mx-4">
          <Link href={"/home"}>
            <Image
              src={"/arrow.png"}
              alt="Arrow"
              width={20}
              height={20}
              className="hover:scale-110 transition-all ease-out duration-300 "
            />
          </Link>
        </div>

        <div className="info">
          <p className="font-bold text-xl text-fontColor">{profile.name}</p>
        </div>
      </div>
      <div className="relative">
        <div className="header">
            <Image
            src={profile.header ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/static/${profile.header}` :'/header.jpg' }
            alt="Header"
            objectFit="cover"
            width={600}
            height={200}
            className="h-24 sm:h-48 w-full object-cover"
          />

         
        </div>
        <div className="flex justify-between items-end mb-4">
          <div className="avatar group relative w-20 sm:w-36 -mt-10 sm:-mt-20 h-20 sm:h-36 cursor-pointer rounded-full ml-4">
            <Image
            src={profile.avatar ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/static/${profile.avatar}` : "/user.png"}
            alt="Avatar"
            objectFit="cover"
            width={150}
            height={150}
            className=" w-20 h-20 sm:w-36 sm:h-36 rounded-full object-cover"
          />
            <div className="absolute opacity-0 group-hover:opacity-30 duration-300 transition-all ease-out bg-black 0 top-0  bottom-0 left-o right-0 w-full rounded-full"></div>
          </div>
          <button
            onClick={() => {
              setModal("profile");
              openModal(true);
            }}
            className="outline-none border mt-2 mr-4 py-2 rounded-full font-bold  px-5 transition-all duration-300 hover:bg-gray-100 "
          >
            Set up profile
          </button>
        </div>
        <div className="info px-4 mb-5">
          <p className="font-bold text-2xl text-fontColor">{profile.name}</p>
          <p className="my-1 text-gray-400">@{profile.username}</p>
          <p className="my-1 text-gray-400">{profile.bio}</p>
          <p className="my-1 text-gray-500">{joinedString}</p>
          <div className="follow flex space-x-3">
            <Link href={"/profile/"}>
              <p className="my-1  hover:underline text-gray-500">
                <span className="text-fontColor font-bold">
                  {profile.subscribtions?.length || 0}{" "}
                </span>
                Following
              </p>
            </Link>
            <Link href={"/profile/"}>
              <p className="my-1 hover:underline text-gray-500">
                <span className="text-fontColor font-bold">
                  {profile.subscribers?.length || 0}{" "}
                </span>
                Followers
              </p>
            </Link>
          </div>
        </div>
        <ProfileActivity />
      </div>
    </div>
  );
};

export default ProfilePage;
