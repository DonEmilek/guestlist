import type { NextPage } from "next";
import Head from "next/head";
import Login from "../components/Login";
const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Guest Checker</title>
      </Head>
      <Login />
    </div>
  );
};

export default Home;
