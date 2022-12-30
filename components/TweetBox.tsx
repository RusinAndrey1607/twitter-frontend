import Image from "next/image";
import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import {
  PhotoIcon,
  CalendarIcon,
  MapPinIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useAppDispatch } from "../hooks/redux";
import { addTweetThunk } from "../redux/slices/TweetSlice";
import { Context } from "./MyContainer";
type Props = {};

const TweetBox = (props: Props) => {
  const [value, setValue] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState("");
  const dispatch = useAppDispatch();

  const { openModal } = useContext(Context);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("text", value);
    formData.append("image", image);
    dispatch(addTweetThunk(formData));
    openModal(false);
    setImage("")
    setValue("")
    setImageUrl("")
  };
  const handleRemove = () =>{
    setImageUrl("");
    setImage("");
  }

  const handleChange = (e: any) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      const src = URL.createObjectURL(e.target.files[0]);
      setImageUrl(src);
    }
  };
  return (
    <div className="flex space-x-2 p5 mt-4">
      <Link href="/profile">
        <Image
          src="/user.png"
          className="rounded-full h-12 w-12 object-cover mx-3 cursor-pointer"
          width={48}
          height={48}
          alt="user"
        />
      </Link>

      <div className="flex flex-1 items-center px-2">
        <form className="flex flex-1 flex-col" onSubmit={handleSubmit}>
          <input
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            type="text"
            placeholder="What's happening?"
            className="outline-none h-24 w-full text-xl text-grayColor  placeholder:text-xl"
          />
          {imageUrl && (
            <div className="relative">
              <img src={imageUrl} alt="" className="tweetImage rounded-xl mb-4" />
              <div onClick={handleRemove} className="close absolute cursor-pointer top-1 left-1 rounded-full bg-black bg-opacity-50 w-8 h-8"></div>
            </div>
          )}

          <div className="flex items-center just">
            <div className="flex flex-1  text-twitterColor space-x-2">
              <input
                onChange={handleChange}
                value={""}
                type="file"
                name="image"
                id="image"
                className="hidden"
              />
              <label htmlFor="image">
                <PhotoIcon className="w-5 h-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150 " />
              </label>
              <FaceSmileIcon className="w-5 h-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
              <CalendarIcon className="w-5 h-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
              <MapPinIcon className="w-5 h-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
            </div>

            <button
              disabled={!value}
              className="disabled:opacity-50 rounded-full text-white bg-twitterColor px-5 py-2 font-bold"
            >
              Tweet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TweetBox;
