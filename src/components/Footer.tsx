import { useModal } from "../context/ModalContext";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Framework", href: "#framework" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Pricing", href: "#pricing" },
];

const Footer = () => {
  const { openModal } = useModal();
  return (
  <footer className="bg-footer-bg px-6 pt-[72px] pb-10 md:px-10">
    <div className="mx-auto max-w-[1280px]">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
        <div>
          <p className="font-heading text-[22px] font-bold text-dutch-white">
            rev<span className="uppercase">C</span>ap
          </p>
          <p className="mt-2 font-body text-[13px] font-light uppercase tracking-[0.2em] text-text-muted-dark">
            Revenue Capture Agency
          </p>
          <p className="mt-1 font-body text-[13px] font-light text-text-muted-dark">
            Rooted in Marketing. Built for Sales.
          </p>
        </div>

        <div className="flex flex-col gap-3">
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

        <div className="flex flex-col gap-2">
          <p className="font-body text-[14px] font-light text-text-muted-dark">revenuecapture@gmail.com</p>
          <p className="font-body text-[14px] font-light text-text-muted-dark">+92 324 4244 914</p>
          <button
            onClick={openModal}
            className="mt-2 text-left font-body text-[14px] font-medium text-wine underline hover:text-dutch-white transition-colors duration-200"
          >
            Get in touch →
          </button>
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-dutch-white/[0.08] pt-6 md:flex-row">
        <p className="font-body text-[13px] font-light text-text-muted-dark">
          © 2026 revCap. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
