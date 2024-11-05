import React from "react";
import FernCanvas from "./components/FernCanvas";

const page = () => {
  return (
    <>
      <main className="flex flex-col min-h-screen justify-start items-center w-full">
        <h1 className="text-2xl font-semibold mt-20 mb-20 antialiased">
          Barnsley Fern Fractals
        </h1>
        <FernCanvas />
      </main>
    </>
  );
};

export default page;
