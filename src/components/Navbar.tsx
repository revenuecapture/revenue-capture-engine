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
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Pill nav wrapper — animates from full-width flush to narrow floating pill */}
      <div
        className="fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-out"
        style={{ padding: scrolled ? "14px 0" : "0" }}
      >
        <nav
          className="w-full transition-all duration-500 ease-out"
          style={
            scrolled
              ? {
                  maxWidth: "720px",
                  borderRadius: "999px",
                  background: "rgba(7, 55, 58, 0.52)",
                  backdropFilter: "blur(28px) saturate(200%)",
                  WebkitBackdropFilter: "blur(28px) saturate(200%)",
                  border: "1px solid rgba(239, 223, 187, 0.15)",
                  boxShadow:
                    "0 8px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(239,223,187,0.1), inset 0 -1px 0 rgba(0,0,0,0.15)",
                }
              : {
                  maxWidth: "100%",
                  borderRadius: "0",
                  background: "transparent",
                  backdropFilter: "none",
                  border: "1px solid transparent",
                  boxShadow: "none",
                }
          }
        >
          <div
            className="flex items-center justify-between transition-all duration-500"
            style={{
              height: scrolled ? "52px" : "68px",
              padding: scrolled ? "0 24px" : "0 40px",
              maxWidth: scrolled ? "none" : "1280px",
              margin: scrolled ? "0" : "0 auto",
            }}
          >
            <a
              href="#"
              className="font-heading font-bold text-dutch-white"
              style={{ fontSize: scrolled ? "20px" : "22px", letterSpacing: "-0.03em", transition: "font-size 0.4s ease" }}
            >
              revCap
            </a>

            <div className="hidden items-center gap-6 md:flex">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-body text-[14px] font-normal text-text-muted-dark transition-colors duration-200 hover:text-dutch-white"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <button onClick={openModal} className="btn-primary hidden md:inline-flex" style={{ padding: "8px 20px", fontSize: "13px" }}>
              Get Your Audit
            </button>

            <button className="flex flex-col gap-[5px] md:hidden" onClick={() => setMenuOpen(true)} aria-label="Open menu">
              <span className="block h-[2px] w-6 bg-dutch-white" />
              <span className="block h-[2px] w-6 bg-dutch-white" />
              <span className="block h-[2px] w-6 bg-dutch-white" />
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center"
            style={{ background: "rgba(5,40,43,0.97)", backdropFilter: "blur(20px)" }}
          >
            <button className="absolute top-6 right-6 font-heading text-2xl text-dutch-white" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="font-heading text-[32px] font-bold text-dutch-white hover:text-wine transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <button onClick={() => { setMenuOpen(false); openModal(); }} className="btn-primary mt-4" style={{ padding: "12px 32px" }}>
                Get Your Audit
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
