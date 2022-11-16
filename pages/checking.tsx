import Head from "next/head";
import React from "react";
import Check from "../components/Check";

type Props = {};

function checking({}: Props) {
  return (
    <div>
      <Head>
        <title>List</title>
      </Head>
      <Check />
    </div>
  );
}

export default checking;
