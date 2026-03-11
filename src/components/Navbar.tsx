import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "../context/ModalContext";

const navLinks = [
  { label: "About",     href: "#about" },
  { label: "Framework", href: "#framework" },
  { label: "Services",  href: "#services" },
  { label: "Work",      href: "#work" },
  { label: "Pricing",   href: "#pricing" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openModal } = useModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/*
        Outer nav: always fixed, full-width, zero height visually.
        Inner div: morphs from full-bleed bar → centered pill.
        This avoids Framer Motion fighting with layout properties.
      */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out"
        style={{ padding: scrolled ? "10px 20px 0" : "0" }}
      >
        <div
          className="mx-auto transition-all duration-500 ease-out"
          style={{
            maxWidth: scrolled ? "820px" : "100%",
            borderRadius: scrolled ? "12px" : "0px",
            background: scrolled
              ? "rgba(7, 55, 58, 0.52)"
              : "transparent",
            backdropFilter: scrolled ? "blur(28px) saturate(190%)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(28px) saturate(190%)" : "none",
            border: scrolled
              ? "1px solid rgba(239, 223, 187, 0.14)"
              : "1px solid transparent",
            boxShadow: scrolled
              ? "0 8px 40px rgba(0,0,0,0.30), inset 0 1px 0 rgba(239,223,187,0.09)"
              : "none",
          }}
        >
          <div className="flex h-[60px] items-center justify-between px-7 md:px-8">
            <a
              href="#"
              className="font-heading text-[22px] font-bold text-dutch-white"
              style={{ letterSpacing: "-0.03em" }}
            >
              revCap
            </a>

            <div className="hidden items-center gap-7 md:flex">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-body text-[15px] font-normal text-text-muted-dark transition-colors duration-200 hover:text-dutch-white"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <button
              onClick={openModal}
              className="btn-primary hidden px-5 py-[9px] text-[14px] md:inline-flex"
            >
              Get Your Audit
            </button>

            <button
              className="flex flex-col gap-[5px] md:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <span className="block h-[2px] w-6 bg-dutch-white" />
              <span className="block h-[2px] w-6 bg-dutch-white" />
              <span className="block h-[2px] w-6 bg-dutch-white" />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center"
            style={{ background: "var(--midnight-green)" }}
          >
            <button
              className="absolute top-6 right-6 font-heading text-2xl text-dutch-white"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.35 }}
                  className="font-heading text-[32px] font-bold text-dutch-white"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.35 }}
                onClick={() => { setMenuOpen(false); openModal(); }}
                className="btn-primary mt-4 px-8 py-3 text-[15px]"
              >
                Get Your Audit
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
