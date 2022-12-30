import React, { useContext } from "react";
import Image from "next/image";
import ProfileForm from "./ProfileForm";
import { Context } from "./MyContainer";
import { updateProfileThunk } from "../redux/slices/ProfileSlice";

type Props = {
};

const ProfileModal = (props: Props) => {
  const {openModal} = useContext(Context)

  return (
    <div onClick={() => openModal(false)} className="absolute z-10 w-full top-0 left-0 bottom-0 h-full bg-white md:bg-black md:bg-opacity-50 ">
      <div className="flex justify-center items-center  w-full h-full opacity-100">
        <div onClick={(e:any ) => {
        e.stopPropagation()
      }} className="bg-white md:mt-12 rounded-2xl w-full h-full py-4 md:py-8 md:px-12 opacity-100" style={{maxHeight:"600px", maxWidth:"600px"}}>
          <ProfileForm submitHandler={updateProfileThunk} update={true}  openModal={openModal}/>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
