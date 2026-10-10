// Hands over from the inline loader in index.html to the page.
// The loader runs its own counter before this bundle arrives. Here we wait for
// the counter and the fonts, slide the panel up, then let the hero rise.

declare global {
  interface Window {
    __rcCount?: boolean;
    __rcSkip?: boolean;
  }
}

export function runIntro() {
  const root = document.documentElement;
  const loader = document.getElementById("rc-loader");
  let revealed = false;

  const reveal = () => {
    if (revealed) return;
    revealed = true;
    root.classList.remove("rc-pre", "rc-loading");
    root.classList.add("rc-in");
    loader?.remove();
    try {
      sessionStorage.setItem("rc-seen", "1");
    } catch {
      /* private mode: the loader simply plays again next time */
    }
  };

  if (!loader || !root.classList.contains("rc-loading")) {
    // Returning visit or reduced motion: no loader, a short rise only.
    requestAnimationFrame(() => requestAnimationFrame(reveal));
    return;
  }

  let exiting = false;
  const exit = () => {
    if (exiting) return;
    exiting = true;
    loader.classList.add("is-exit");
    const panel = loader.querySelector(".rcl-panel");
    panel?.addEventListener("transitionend", reveal, { once: true });
    window.setTimeout(reveal, 750);
  };

  const fonts: Promise<unknown> = document.fonts?.ready ?? Promise.resolve();
  const fontsOrTimeout = Promise.race([fonts, new Promise((r) => window.setTimeout(r, 1200))]);
  const counted = new Promise<void>((resolve) => {
    if (window.__rcCount) resolve();
    else window.addEventListener("rc:count", () => resolve(), { once: true });
  });

  Promise.all([fontsOrTimeout, counted]).then(exit);
  window.addEventListener("rc:skip", exit, { once: true });
  if (window.__rcSkip) exit();
}
