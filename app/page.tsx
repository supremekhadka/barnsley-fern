import React from "react";
import FernCanvas from "./components/FernCanvas";

const page = () => {
  return (
    <>
      <main className="flex flex-col min-h-screen justify-center items-center w-full">
        <h1 className="text-2xl font-semibold my-10 antialiased">
          Barnsley Fern Fractals
        </h1>
        <FernCanvas />
      </main>
    </>
  );
};

export default page;
