import React, { MouseEvent } from "react";
import { FaAngleUp } from "react-icons/fa";

const ScrollToTop = () => {
  const goToTop = (event: MouseEvent<HTMLDivElement>) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div 
      className="scroll-top-container" 
      title="scroll-top-container"
      onClick={goToTop}
    >
      <FaAngleUp
        className="icon-position icon-style"
        title="bt-totop"
      />
    </div>
  );
};
export default ScrollToTop;
