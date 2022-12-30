import { NextPage } from "next";
import { withAuth } from "../hoc/WithAuth";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useEffect } from "react";
import { loadProfileThunk } from "../redux/slices/ProfileSlice";
import MyContainer from "../components/MyContainer";
import Loader from "../components/Loader";
import ProfilePage from "../components/ProfilePage";

const Profile: NextPage = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.users);
  useEffect(() => {
    if (isAuth) {
      dispatch(loadProfileThunk());
    }
  }, [isAuth]);

  const loading = useAppSelector((state) => state.users.isLoading);
  if (loading) {
    return <Loader />;
  }
  return (
    <MyContainer>
      <ProfilePage />
    </MyContainer>
  );
};

export default withAuth(Profile);
