import { useState } from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Landingpage = () => {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  function navigateAfterSec(){
    navigate('/auth')
  }
  function navigateToHomePage(){
    setActive(!active);
   setTimeout(()=>{
    navigateAfterSec()
   },1000)
  }
  return (
    <div className="relative h-screen  overflow-hidden dark:bg-white">
      <Card />
      <div className="min-w-fit absolute xl:top-80 lg:top-80 md:top-72 left-20  min-h-fit ">
        <div className="space-y-4">
          <div className="w-[580px]">
            <h1 className="text-8xl text-black ">
              Your <span className="text-p-primary">"Notes"</span> is our
              privacy
            </h1>
          </div>
          <div className="min-w-fit text-black/75 ">
            <p className="text-md tracking-widest">
              If You Aren't Taking Notes, You Aren't Learning.
            </p>
          </div>
        </div>
        <div className="absolute top-0 md:-right-80 xl:-right-80">
          <div className={` ${!active && "getStartedback-card"}`}></div>
          <div
            className={`getStarted-card rounded-2xl  ${active ? "active before:w-full before:h-[300px] transition-all" : "before:w-0 before:h-0 "}`}
          >
            <p
              className={`text-md ml-6  pt-16 ${active ? "text-white" : "text-black"} `}
            >
              Things to Do
            </p>
          </div>
          <button
            className="btn text-xs rounded-lg absolute -bottom-4 left-6 cursor-pointer"
            onClick={navigateToHomePage}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landingpage;
