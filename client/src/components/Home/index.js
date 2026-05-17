import React from "react";
import MainPhoto from "./MainPhoto";
import Slider1 from "./Slider1";
import Featured from "./Featured";
import Slider2 from "./Slider2";
import Spotlight from "./Spotlight";

const Home = () => {
  return (
    <div>
      <MainPhoto />
      <Featured />
      <Slider1 />
      <Slider2 />
      <Spotlight />
    </div>
  );
};

export default Home;
