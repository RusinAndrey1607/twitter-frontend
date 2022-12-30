import React, { useContext } from "react";
import TweetBox from "./TweetBox";
import Image from "next/image";
import { Context } from "./MyContainer";

type Props = {
};

const TweetModal = (props: Props) => {
  const {openModal,setModal} = useContext(Context)
  return (
    <div onClick={() => openModal(false)} className="absolute z-10 w-full top-0 left-0 bottom-0 h-full bg-white md:bg-black md:bg-opacity-50 ">
      <div className="flex justify-center  w-full h-full opacity-100">
        <div onClick={(e:any ) => {
        e.stopPropagation()
      }} className="bg-white md:mt-12 max-w-2xl w-full py-4 h-fit md:py-8 md:px-12 opacity-100">
          <div className="mt-2 ml-2" onClick={() => openModal(false)}>
              <Image
                src={"/arrow.png"}
                alt="Arrow"
                width={20}
                height={20}
                className="hover:scale-110 transition-all ease-out duration-300 "
              />
          </div>

          <TweetBox closeModel={openModal} />
        </div>
      </div>
    </div>
  );
};

export default TweetModal;
