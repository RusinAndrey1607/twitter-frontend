import { NextPage } from "next";
import Head from "next/head";
import AuthForm from "../components/AuthForm";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { registrationThunk } from "../redux/slices/AuthSlice";
import { useRouter } from "next/router";

const Registration: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter()
  const registrationError = useAppSelector((state) => state.users.error);

  const handleSubmit = async (email: string, password: string) => {
    dispatch(
      registrationThunk({
        email,
        password,
      })
    ).then(() =>{
      router.push("/create/profile")
    })
  };

  return (
    <>
      <Head>
        <title>Registration</title>
        <link rel="icon" href="twitter-logo.svg" />
      </Head>
      {registrationError ? (
        <div className="text-red-500 absolute left-0 right-0 mx-auto mt-2   bg-twitterColor  text-center ">
          {registrationError}
        </div>
      ) : null}
      <div className="flex items-center justify-center w-full h-screen bg-twitterColor">
        <AuthForm
          title="Registration"
          submitHandler={handleSubmit}
          isRegForm={true}
        />
      </div>
    </>
  );
};

export default Registration;
