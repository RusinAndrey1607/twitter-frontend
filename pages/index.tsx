import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";

const Home: NextPage = () => {
  return (
    <div className="lg:max-w-6xl mx-auto max-h-screen overflow-hidden">
      <Head>
        <title>Twitter-Clone</title>
        <link rel="icon" href="twitter-logo.svg" />
      </Head>

      <main className="grid grid-cols-9">
        Main Page
        {/* <Sidebar />
        
        <Feed />
        
        <Widgets /> */}
      </main>
    </div>
  );
};

export default Home;
