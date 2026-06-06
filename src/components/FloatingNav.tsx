import { useEffect, useState } from "react";
import { Scissors, Menu, X } from "lucide-react";

const links = [
  { href: "#inicio", label: "Início" },
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#galeria", label: "Galeria" },
  { href: "#certificacoes", label: "Certificações" },
  { href: "#contato", label: "Contato" },
];

export function FloatingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-1/2 z-50 -translate-x-1/2 transition-all duration-500 ${
        scrolled ? "top-3 w-[95%] max-w-5xl" : "top-6 w-[95%] max-w-6xl"
      }`}
    >
      <nav className="glass rounded-full px-5 py-3 flex items-center justify-between shadow-card">
        <a href="#inicio" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
            <Scissors className="w-4 h-4 text-background" strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <div className="font-display text-sm font-bold tracking-wider text-gold">KAIROS</div>
            <div className="text-[10px] tracking-[0.3em] text-muted-foreground -mt-0.5">BARBEARIA</div>
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
          href="#contato"
          className="hidden md:inline-flex items-center gap-2 bg-gradient-gold text-primary-foreground px-5 py-2 rounded-full font-heading text-sm shadow-gold hover:scale-105 transition-transform"
        >
          Agendar
        </a>

        <button
          aria-label="Menu"
          className="md:hidden w-10 h-10 rounded-full bg-secondary flex items-center justify-center"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="w-5 h-5 text-gold" /> : <Menu className="w-5 h-5 text-gold" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden mt-2 glass rounded-2xl p-4 animate-fade-up">
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
                href="#contato"
                onClick={() => setOpen(false)}
                className="block mt-2 text-center bg-gradient-gold text-primary-foreground py-3 rounded-lg font-heading"
              >
                Agendar Horário
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
