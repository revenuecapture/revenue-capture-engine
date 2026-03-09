import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "../context/ModalContext";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Framework", href: "#framework" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Pricing", href: "#pricing" },
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
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-[400ms] ease-out"
        style={{
          background: scrolled ? "rgba(7, 55, 58, 0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(239, 223, 187, 0.1)" : "1px solid transparent",
        }}
      >
        <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-6 md:px-10">
          <a href="#" className="font-heading text-[22px] font-bold text-dutch-white">
            rev<span className="uppercase">C</span>ap
          </a>

          <div className="hidden items-center gap-8 md:flex">
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
            className="hidden rounded-[4px] bg-wine px-6 py-2.5 font-heading text-[14px] font-semibold text-dutch-white transition-colors duration-200 hover:bg-accent-hover md:block"
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
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-midnight-green"
          >
            <button
              className="absolute top-6 right-6 font-heading text-2xl text-dutch-white"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-heading text-[32px] font-bold text-dutch-white"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => { setMenuOpen(false); openModal(); }}
                className="mt-4 rounded-[4px] bg-wine px-8 py-3 font-heading text-[15px] font-semibold text-dutch-white"
              >
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
