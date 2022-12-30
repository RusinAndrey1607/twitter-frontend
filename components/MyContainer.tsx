import React, { Dispatch, SetStateAction, createContext, useState } from "react";
import Sidebar from "./Sidebar";
import Widgets from "./Widgets";
import Head from "next/head";
import Lowbar from "./Lowbar";
import Image from "next/image";
import TweetModal from "./TweetModal";
import ProfileModal from "./ProfileModal";

type Props = {
  children: React.ReactNode;
  title?: string;
};

interface IContext {
 openModal: Dispatch<SetStateAction<boolean>>
  setModal: Dispatch<SetStateAction<string>>
}

// @ts-ignore
export const Context = createContext<IContext>(null);
const MyContainer = ({ children, title }: Props) => {
  const [modalIsOpen, openModal] = useState(false);
  const [modal, setModal] = useState("profile");

  const currentModal =
    modal == "tweet" ? (
      <TweetModal/>
    ) : modal == "profile" ? (
      <ProfileModal />
    ) : null;

  return (
    <Context.Provider
      value={{
        setModal,
        openModal,
      }}
    >
      <div className="relative h-screen overflow-y-scroll">
        {modalIsOpen ? currentModal : null}
        <div className="lg:max-w-6xl mx-auto max-h-screen   relative">
          <Head>
            <title>{title || "Twittre-clone"}</title>
            <link rel="icon" href="twitter-logo.svg" />
          </Head>

          <main className="grid grid-cols-9 relative">
            <Sidebar />
            {children}
            <Widgets />
          </main>
          <Lowbar />
        </div>
        <div
          onClick={() => {
            openModal(true);
            setModal("tweet");
          }}
          className="bg-twitterColor cursor-pointer transition-all duration-300 active:scale-125 p-4 rounded-full absolute bottom-24 right-8 sm:hidden "
        >
          <Image
            src="/feather.png"
            width={24}
            height={24}
            className="w-6 h-6 md:hidden "
            alt="feather"
          />
        </div>
      </div>
    </Context.Provider>
  );
};

export default MyContainer;
