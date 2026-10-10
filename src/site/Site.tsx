import { useEffect } from "react";
import "./styles/site.css";
import Cursor from "./components/Cursor";
import Hero from "./components/Hero";
import Proof from "./components/Proof";
import Problem from "./components/Problem";
import Framework from "./components/Framework";
import Ask, { Footer } from "./components/Ask";
import Pill from "./components/Pill";
import { runIntro } from "./lib/intro";
import { scrollToId, startSmoothScroll, watchReveals } from "./lib/motion";

export default function Site() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("rc", "rc-js");

    const stopScroll = startSmoothScroll();
    const stopReveals = watchReveals();
    runIntro();

    // In-page links glide instead of jumping.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute("href")!.slice(1);
      if (!id) return;
      e.preventDefault();
      scrollToId(id);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      stopReveals();
      stopScroll();
      root.classList.remove("rc", "rc-js", "rc-in", "rc-pre", "rc-loading");
    };
  }, []);

  return (
    <div className="rc-root" id="top">
      <a className="rc-skip" href="#main">
        Skip to content
      </a>
      <Hero />
      <main id="main">
        <Proof />
        <Problem />
        <Framework />
        <Ask />
      </main>
      <Footer />
      <Pill />
      <Cursor />
    </div>
  );
}
