import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./styles/site.css";
import Cursor from "./components/Cursor";
import Pill from "./components/Pill";
import { Footer } from "./components/Shell";
import PageTransition from "./lib/transition";
import { runIntro } from "./lib/intro";
import { startSmoothScroll } from "./lib/motion";

/** Layout for every public page: transition layer, cursor, pill and footer around the routed page. */
export default function Site() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("rc", "rc-js");
    const stopScroll = startSmoothScroll();
    runIntro();
    return () => {
      stopScroll();
      root.classList.remove("rc", "rc-js", "rc-in", "rc-pre", "rc-loading");
    };
  }, []);

  return (
    <PageTransition>
      <div className="rc-root" id="top">
        <a className="rc-skip" href="#main">
          Skip to content
        </a>
        <Outlet />
        <Footer />
        <Pill />
        <Cursor />
      </div>
    </PageTransition>
  );
}
