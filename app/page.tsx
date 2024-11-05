import React from "react";
import FernCanvas from "./components/FernCanvas";

const page = () => {
  return (
    <>
      <main className="flex flex-col min-h-screen justify-center items-center w-full">
        Barnsley Fern Fractals
        <FernCanvas />
      </main>
    </>
  );
};

export default page;
