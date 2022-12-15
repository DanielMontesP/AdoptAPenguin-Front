import React, { MouseEvent, useEffect, useState } from "react";
import { FaAngleUp } from "react-icons/fa";

const ScrollToTop = (): JSX.Element => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);
  const goToTop = (event: MouseEvent<SVGElement>) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="scroll-top-container" title="scroll-top-container">
      {showTopBtn && (
        <FaAngleUp
          className="icon-position icon-style"
          onClick={goToTop}
          title="bt-totop"
        />
      )}
    </div>
  );
};
export default ScrollToTop;
