import React from "react";
import Container from "./Container";
import { backgroundImageDefaultStyle } from "../constant/constant";
import { Link } from "react-router-dom";

const ctaBg =
  "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const CTA = () => {
  return (
    <section className="py-14">
      <Container>
        <div
          className="w-full py-14 px-5 rounded-md shadow-2xl grid place-items-center"
          style={{
            background: `url('${ctaBg}')`,
            ...backgroundImageDefaultStyle,
          }}
        >
          <div className="flex flex-col justify-center items-center gap-5 w-full max-w-2xl p-5 rounded-md bg-white/5 backdrop-blur-md shadow-lg text-center">
            <h2 className="text-primaryColor font-bold text-4xl">
              Start A campaign for your pet!!!
            </h2>
            <p className="text-zinc-800 leading-relaxed">
              Calling all pet enthusiasts! 🐶❤️ Join our Pet Love Campaign and
              share the joy your furry friends bring to your life. Post a pic,
              tell a tale, and let's celebrate the extraordinary bonds we share
              with our pets. Together, we'll spread smiles and pawsitivity! 🐾💖
            </p>
            <Link
              to="/dashboard/addcampaign"
              className="text-base bg-primaryColor rounded-full text-white grid place-items-center py-2 px-4 cursor-pointer"
            >
              Create A campaign now
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CTA;
