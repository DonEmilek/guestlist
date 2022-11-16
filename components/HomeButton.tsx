import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  name: string;
  href: string;
};

function HomeButton({ name, href }: Props) {
  const router = useRouter();
  return (
    <button
      className="text-2xl py-5 m-2 border shadow-lg shadow-indigo-500/40"
      onClick={() => router.push(`/${href}`)}
    >
      {name}
    </button>
  );
}

export default HomeButton;
