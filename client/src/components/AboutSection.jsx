import React from "react";
import Container from "./Container";
import Heading from "./Heading";
import { aboutCardList } from "../constant/constant";
const aboutImg =
  "https://images.unsplash.com/photo-1626602411112-10742f9a3ab8?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const AboutSection = () => {
  return (
    <section className="py-14">
      <Container>
        <div className="w-full grid md:grid-cols-2 gap-5">
          <div className="w-full h-full overflow-hidden rounded-md shadow-xl">
            <img src={aboutImg} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col gap-5">
            <Heading
              heading="About Us"
              description={`Driven by an unwavering belief in the transformative power of love, we embark on a mission to connect deserving pets with loving homes, orchestrating a harmonious melody of joy, companionship, and unconditional affection. Through our comprehensive adoption platform, we transcend the barriers of species, weaving a tapestry of shared experiences and unbreakable bonds. Together, we embark on a journey of compassion, enriching the lives of countless animals and fostering enduring connections that stand the test of time.`}
              className="p-5 rounded-md shadow-xl justify-center items-start !text-left"
            />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 h-full">
              {aboutCardList.map((item, i) => (
                <div
                  key={i}
                  className="w-full h-full overflow-hidden rounded-md shadow-xl"
                >
                  <img
                    src={item}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutSection;
