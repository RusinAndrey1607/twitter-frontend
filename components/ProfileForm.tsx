import { CameraIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDebounce } from "../hooks/debounce";
import { profileService } from "../axios/ProfileService";
import { useAppDispatch } from "../hooks/redux";
import { useRouter } from "next/router";
import DragAndDrop from "./DragAndDrop";

type Props = {
  submitHandler: any;
  update?: boolean;
  openModal?: Dispatch<SetStateAction<boolean>>;
};

type PageType = {
  title: string;
  text: string;
  inputType: string;
  handleChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  handleInputChange?: (e: any) => void;
  handleFile?: SetStateAction<any>;
  children?: React.ReactNode;
  placeholder?: string;
  inputValue?: string;
  page?: string;
  required: boolean;
};

const ProfileFileForm = (props: { page: PageType }) => {
  return (
    <>
      <DragAndDrop
        setFile={props.page.handleFile}
        handleInputChange={props.page.handleInputChange}
      >
        {props.page.children}
      </DragAndDrop>
    </>
  );
};

const ProfileTextForm = ({
  page,
  usernameIsFree,
}: {
  page: PageType;
  usernameIsFree: string | null;
}) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={page.placeholder}
        // @ts-ignore
        onChange={page.handleChange}
        value={page.inputValue}
        className="border-2 rounded-lg w-full text-gray-400 text-lg font-semibold  focus:border-twitterColor outline-none pt-5 pb-10 px-2"
      />
      {page.page == "username" && (
        <p className="absolute text-lg mt-2 text-twitterColor opacity-80">
          {usernameIsFree}
        </p>
      )}
    </div>
  );
};
const ProfileForm = (props: Props) => {
  const [counter, setCounter] = useState(0);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [username, setUserName] = useState("");
  const [avatar, setAvatarFile] = useState(null);
  const [header, setHeaderFile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [headerUrl, setHeaderUrl] = useState("");
  const [isUserNameUsed, setIsUserNameUsed] = useState(false);

  const debouncedUserNameTerm = useDebounce(username, 1000);
  const router = useRouter();

  useEffect(() => {
    if (debouncedUserNameTerm && !props.update) {
      profileService.checkUsername(debouncedUserNameTerm).then((res) => {
        setIsUserNameUsed(res);
      });
    }
  }, [debouncedUserNameTerm]);

  const handleSkip = () => {
    if (counter < pages.length - 1) {
      setCounter(counter + 1);
    }
  };
  const handleBack = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };

  const dispatch = useAppDispatch();
  const handleSubmit = async () => {
    const formData = new FormData();
    name && formData.append("name", name);
    username && formData.append("username", username);
    avatar && formData.append("avatar", avatar);
    header && formData.append("header", header);
    bio && formData.append("bio", bio);

    if (name || username || avatar || header || bio) {
      dispatch(props.submitHandler(formData));
    }
    props.openModal && props.openModal(false);
    router.push("/profile");
  };
  const pages: Array<PageType> = [
    {
      title: "Write your name",
      text: "Write your real or fictitious name",
      inputType: "text",
      placeholder: "Your Name",
      handleChange: (e: React.FormEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value);
      },
      inputValue: name,
      required: props.update ? false : true,
    },
    {
      title: "Write your username",
      text: "By this username, users can find you. Therefore, it must be unique.",
      inputType: "text",
      placeholder: "Your Username",
      handleChange: (e: React.FormEvent<HTMLInputElement>) => {
        setUserName(e.currentTarget.value);
      },
      inputValue: username,
      page: "username",
      required: props.update ? false : true,
    },
    {
      title: "Pick a profile picture",
      text: "Have a favorite selfie? Upload it now.",
      inputType: "file",
      handleFile: setAvatarFile,
      handleInputChange: (e: any) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
          setAvatarFile(e.target.files[0]);
          const src = URL.createObjectURL(e.target.files[0]);
          setAvatarUrl(src);
        }
      },
      required: false,
      children: (
        <Image
          src={avatarUrl ? avatarUrl : "/user.png"}
          width={180}
          height={180}
          alt="UserIcon"
          className="mx-auto hover:opacity-80 w-44 h-44 rounded-full object-cover trasition-all duration-300"
        />
      ),
    },
    {
      title: "Describe yourself",
      text: "What makes you special? Don't think too hard, just have fun with it.",
      inputType: "text",
      placeholder: "Your bio",
      handleChange: (e: React.FormEvent<HTMLInputElement>) => {
        setBio(e.currentTarget.value);
      },
      inputValue: bio,
      required: false,
    },
    {
      title: "Pick a header",
      text: "People who visit your profile will see it. Show your style.",
      inputType: "file",
      children: headerUrl ? (
        <Image
          src={headerUrl}
          width={160}
          height={160}
          alt="UserIcon"
          className="w-full h-40 "
        />
      ) : (
        <div className="flex items-center justify-center text-white w-full h-40 opacity-90 bg-gray-400">
          <CameraIcon className="w-12 h-12 cursor-pointer transition-all duration-300 ease-out hover:bg-opacity-40 bg-black bg-opacity-70 rounded-full p-3" />
        </div>
      ),
      handleFile: setHeaderFile,
      handleInputChange: (e: any) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
          setAvatarFile(e.target.files[0]);
          const src = URL.createObjectURL(e.target.files[0]);
          setHeaderUrl(src);
        }
      },
      required: false,
    },
  ];

  return (
    <div className="profileForm w-full h-full bg-white px-10 sm:px-20 sm:rounded-xl  flex flex-col justify-around">
      <div className="relative">
        <Image
          src={"/arrow.png"}
          alt="Arrow"
          width={20}
          height={20}
          className="hover:scale-110 transition-all ease-out duration-300 absolute left-0 "
          onClick={handleBack}
        />
        <Image
          src={"/twitter-logo.svg"}
          width={32}
          height={32}
          className="h-8 w-8 mx-auto "
          alt="Icon"
        />
        <h2 className="text-center sm:text-left text-xl sm:text-3xl font-bold text-fontColor  my-4 ">
          {pages[counter].title}
        </h2>
        <p className="text-gray-500 text-center sm:text-left text-sm sm:text-lg">
          {pages[counter].text}
        </p>
      </div>

      <div className="relative">
        {pages[counter].inputType == "file" && (
          <ProfileFileForm page={pages[counter]} />
        )}
        {pages[counter].inputType == "text" && (
          <ProfileTextForm
            page={pages[counter]}
            usernameIsFree={
              username
                ? isUserNameUsed
                  ? "Username is used"
                  : "Username Is Free"
                : null
            }
          />
        )}
      </div>
      {pages.length - 1 == counter ? (
        <button
          onClick={handleSubmit}
          disabled={
            (pages[counter].required && !pages[counter].inputValue) ||
            isUserNameUsed
          }
          className="border disabled:opacity-70 hover:bg-gray-100 cursor-pointer transition-all duration-300 rounded-full text-center py-3  text-sm sm:text-lg font-bold  mx-auto w-full"
        >
          Submit
        </button>
      ) : (
        <button
          disabled={
            (pages[counter].required && !pages[counter].inputValue) ||
            isUserNameUsed
          }
          onClick={handleSkip}
          className="border disabled:opacity-70 hover:bg-gray-100 cursor-pointer transition-all duration-300 rounded-full text-center py-3  text-sm sm:text-lg font-bold  mx-auto w-full"
        >
          Continue
        </button>
      )}
    </div>
  );
};

export default ProfileForm;
