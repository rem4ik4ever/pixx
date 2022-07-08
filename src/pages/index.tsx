import type { NextPage } from "next";
import Head from "next/head";
import { Landing } from "../components/Landing";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  return (
    <Landing />
  );
};

export default Home;
