import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import AuthForm from "../components/AuthForm";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { loginThunk } from "../redux/slices/AuthSlice";
import { useEffect } from "react";
import { withAuth } from "../hoc/WithAuth";

const Login: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { user, isAuth } = useAppSelector((state) => state.users);
  const loginError = useAppSelector((state) => state.users.error);
  const handleSubmit = async (email: string, password: string) => {
    dispatch(
      loginThunk({
        email,
        password,
      })
    );
  };

  useEffect(() => {
    if (user && isAuth){
      router.push("/home")
    }
  }, [user, isAuth]);
  return (
    <>
      <Head>
        <title>Login</title>
        <link rel="icon" href="twitter-logo.svg" />
      </Head>
      {loginError ? (
        <div className="text-red-500 absolute left-0 right-0 mx-auto mt-2   bg-twitterColor  text-center ">
          {loginError}
        </div>
      ) : null}
      <div className="flex items-center justify-center w-full h-screen bg-twitterColor">
        <AuthForm
          title="Login"
          submitHandler={handleSubmit}
          isLoginForm={true}
        />
      </div>
    </>
  );
};

export default withAuth(Login);
