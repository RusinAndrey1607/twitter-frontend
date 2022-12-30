import type { NextPage } from "next";
import Feed from "../components/Feed";
import { useAppSelector } from "../hooks/redux";
import { withAuth } from "../hoc/WithAuth";
import MyContainer from "../components/MyContainer";
import Loader from "../components/Loader";

const Home: NextPage = () => {
  const loading = useAppSelector((state) => state.users.isLoading);
  
  if (loading) {
    return <Loader />;
  }

  return (
    <MyContainer title="Home">
      <Feed />
    </MyContainer>
  );
};

export default withAuth(Home);
