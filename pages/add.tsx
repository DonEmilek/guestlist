import Head from "next/head";
import React from "react";
import Add from "../components/Add";

type Props = {};

function add({}: Props) {
  return (
    <div>
      <Head>
        <title>Add guest</title>
      </Head>
      <Add />
    </div>
  );
}

export default add;
