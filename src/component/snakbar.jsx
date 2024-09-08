import { useEffect } from "react";
import { RxCross1 } from "react-icons/rx";

const Snakbar = ({ setShowSnakbar, showSnakbar,state }) => {
  useEffect(() => {
    setTimeout(() => {
      setShowSnakbar(false);
    }, 3000); // 3 seconds delay
  }, [showSnakbar]);
  console.log(showSnakbar, "snak");
  return (
    <div className={`toast ${showSnakbar && "active"} absolute  ${state!="signIn" ? "left-6 top-4" : "right-8 top-6"} z-[9999]`}>
      <div className="toast-content">
        <div className="w-8 h-8 bg-p-primary rounded-full flex items-center justify-center">
          <RxCross1 className=" text-sm text-red-500 cursor-pointer" />
        </div>
        <div className="message">
          <span className="text text1">{showSnakbar}</span>
          <span className="text text2">Please try again...</span>
        </div>
      </div>
      <div
        className="cursor-pointer absolute top-2 right-2"
        onClick={() => setShowSnakbar(false)}
      >
        <RxCross1 className="text-xs" />
      </div>
      <div className={`progress ${showSnakbar && "active"}`}></div>
    </div>
  );
};

export default Snakbar;
