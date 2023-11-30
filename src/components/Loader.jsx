import React from "react";
import LoaderGif from "../assets/loader.gif";

const Loader = () => {
  return (
    <section className="fixed top-0 left-0 w-full h-full bg-white/70 z-50 p-5 grid place-items-center select-none">
      <div className="max-w-md w-full flex flex-col gap-5">
        <img src={LoaderGif} alt="" className="w-full object-cover" />
        <h3 className="text-xl shadow-2xl bg-primaryColor rounded-full text-white grid place-items-center py-2 px-4 select-none animate-bounce">
          Loading...
        </h3>
      </div>
    </section>
  );
};

export default Loader;
