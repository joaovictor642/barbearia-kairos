import { useEffect, useRef, useState } from "react";
import { Scissors, Menu, X } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/links";

const links = [
  { href: "#inicio", label: "Início" },
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#galeria", label: "Trabalhos" },
  { href: "#contato", label: "Encontre-nos" },
];

export function FloatingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#inicio");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    if (!("IntersectionObserver" in window))
      return () => window.removeEventListener("scroll", onScroll);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-15% 0px -60% 0px", threshold: 0 },
    );
    links.forEach((link) => {
      const target = document.querySelector(link.href);
      if (target) observer.observe(target);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 900) setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header
      ref={navRef}
      className={`site-header ${scrolled ? "is-scrolled" : ""} ${open ? "menu-is-open" : ""}`}
    >
      <nav className="header-inner page-width" aria-label="Navegação principal">
        <a
          href="#inicio"
          className="brand"
          onClick={() => setOpen(false)}
          aria-label="Kairos Barbearia, início"
        >
          <Scissors size={27} strokeWidth={1.5} />
          <span>
            KAIROS<small>BARBEARIA</small>
          </span>
        </a>
        <ul className="desktop-links">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} aria-current={active === link.href ? "location" : undefined}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="header-book button button-outline"
        >
          Agendar horário
        </a>
        <button
          ref={menuButtonRef}
          type="button"
          className="menu-toggle icon-button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Fechar menu de navegação" : "Abrir menu de navegação"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      <div id="mobile-navigation" className="mobile-navigation" hidden={!open}>
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={active === link.href ? "location" : undefined}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="button button-gold"
          onClick={() => setOpen(false)}
        >
          Agendar pelo WhatsApp
        </a>
      </div>
    </header>
  );
}
