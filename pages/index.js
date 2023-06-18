import React from "react";
import dynamic from "next/dynamic";

// Components
const Homepage = dynamic(() =>
  import("@/components/page/home/homepage.component")
);

export default function Home() {
  return <Homepage />;
}
