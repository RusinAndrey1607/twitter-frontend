import React from "react";


const Loader = () => {
  return (
    <div className="flex items-center h-screen justify-center bg-twitterColor">
      <div className="">
        <img src={"/loading-white.svg"} alt="Logo" className=" h-20 w-20 " />
        <h2 className="text-xl text-center mt-3 text-white">Loading . . .</h2>
      </div>
    </div>
  );
};

export default Loader;
