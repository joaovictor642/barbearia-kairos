import { useEffect, useRef, useState } from "react";
import { Scissors, Menu, X } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/links";

const links = [
  { href: "#inicio", label: "Início" },
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#galeria", label: "Galeria" },
  { href: "#contato", label: "Contato" },
];

export function FloatingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuButtonRef.current?.focus();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header
      className={`fixed left-1/2 z-50 -translate-x-1/2 transition-all duration-500 ${
        scrolled ? "top-3 w-[95%] max-w-5xl" : "top-6 w-[95%] max-w-6xl"
      }`}
    >
      <nav
        aria-label="Navegação principal"
        className="glass rounded-full px-4 sm:px-5 py-3 flex items-center justify-between shadow-card"
      >
        <a href="#inicio" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
            <Scissors className="w-4 h-4 text-background" strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <div className="font-display text-sm font-bold tracking-wider text-gold">KAIROS</div>
            <div className="text-[10px] tracking-[0.3em] text-muted-foreground -mt-0.5">
              BARBEARIA
            </div>
          </div>
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="px-4 py-2 text-sm text-foreground/80 hover:text-gold transition-colors relative font-medium"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 bg-gradient-gold text-primary-foreground px-5 py-2 rounded-full font-heading text-sm shadow-gold hover:-translate-y-0.5 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Agendar
        </a>

        <button
          ref={menuButtonRef}
          aria-label={open ? "Fechar menu de navegação" : "Abrir menu de navegação"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          type="button"
          className="md:hidden w-10 h-10 rounded-full bg-secondary flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="w-5 h-5 text-gold" /> : <Menu className="w-5 h-5 text-gold" />}
        </button>
      </nav>

      <div
        id="mobile-navigation"
        className={`${open ? "mt-2 glass rounded-2xl p-4 animate-fade-up" : "hidden"} md:hidden`}
      >
        <ul className="flex flex-col gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-lg text-foreground/90 hover:bg-secondary hover:text-gold transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="block mt-2 text-center bg-gradient-gold text-primary-foreground py-3 rounded-lg font-heading"
            >
              Agendar Horário
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
