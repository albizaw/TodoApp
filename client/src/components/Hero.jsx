import React from 'react';
import Typical from 'react-typical';
const Hero = () => {
  return (
    <div className="w-full h-[calc(100vh-80px)] absolute flex flex-col items-center justify-center z-[-10]">
      <div className="text-center">
        <h1 className="md:text-7xl text-4xl font-bold font">
          It's a To-Do List to Organize
        </h1>
        <h2 className="p-7 md:text-6xl text-3xl">
          <Typical
            steps={['Your', 1400, 'Your Work&Life!', 1000]}
            loop={Infinity}
            wrapper="a"
          />
        </h2>
      </div>
    </div>
  );
};

export default Hero;
