import React, { Fragment, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

interface ScrollProps {
  children: React.ReactNode;
}

function ScrollToTop({ children }: ScrollProps) {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <Fragment> {children} </Fragment>;
}

export default ScrollToTop;
