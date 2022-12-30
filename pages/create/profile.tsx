import { NextPage } from "next";
import Head from "next/head";
import ProfileForm from "../../components/ProfileForm";
import { useRouter } from "next/router";
import { createProfileThunk } from "../../redux/slices/ProfileSlice";

const CreateProfile: NextPage = () => {
  const router = useRouter();
  return (
    <div className="sm:bg-twitterColor max-h-screen h-screen">
      <Head>
        <title>Create Profile</title>
        <link rel="icon" href="/twitter-logo.svg" />
      </Head>
      <div className="lg:max-w-6xl mx-auto  overflow-hidden">
        <div className="flex  items-center justify-center h-screen ">
          <ProfileForm submitHandler={createProfileThunk} />
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
