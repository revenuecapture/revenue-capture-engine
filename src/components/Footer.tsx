import { useModal } from "../context/ModalContext";

const navLinks = [
  { label: "About",     href: "#about" },
  { label: "Framework", href: "#framework" },
  { label: "Services",  href: "#services" },
  { label: "Work",      href: "#work" },
  { label: "Pricing",   href: "#pricing" },
];

const Footer = () => {
  const { openModal } = useModal();
  return (
    <footer
      className="px-6 pt-[80px] pb-12 md:px-12"
      style={{ background: "var(--footer-bg)" }}
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <p
              className="font-heading text-[24px] font-bold text-dutch-white"
              style={{ letterSpacing: "-0.03em" }}
            >
              revCap
            </p>
            <p className="mt-2 font-body text-[13px] font-light uppercase tracking-[0.2em] text-text-muted-dark">
              Revenue Capture Agency
            </p>
            <p className="mt-1 font-body text-[14px] font-light text-text-muted-dark">
              Rooted in Marketing. Built for Sales.
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-3">
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

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <p className="font-body text-[15px] font-light text-text-muted-dark">sarmad@revcap.xyz</p>
            <p className="font-body text-[15px] font-light text-text-muted-dark">badr@revcap.xyz</p>
            <button
              onClick={openModal}
              className="mt-1 text-left font-body text-[15px] font-medium transition-colors duration-200 hover:opacity-80"
              style={{ color: "var(--wine)" }}
            >
              Get in touch →
            </button>
          </div>
        </div>

        <div
          className="mt-14 flex flex-col items-center justify-between gap-4 border-t pt-6 md:flex-row"
          style={{ borderColor: "rgba(239,223,187,0.07)" }}
        >
          <p className="font-body text-[13px] font-light text-text-muted-dark">
            © 2026 revCap. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
