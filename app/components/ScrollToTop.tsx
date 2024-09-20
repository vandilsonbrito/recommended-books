"use client";

import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { TbSquareRoundedArrowUp } from "react-icons/tb";

const ScrollToTop = () => {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Link to="/top" href="" smooth={true} duration={500} className={`${scrollY > 570 ? 'visible' : 'hidden'}`}>
        <TbSquareRoundedArrowUp className="hidden xl:block fixed bottom-12 right-6 text-4xl text-[#000000e5] dark:text-white cursor-pointer"/>
      </Link>
    </>
  );
};

export default ScrollToTop;
