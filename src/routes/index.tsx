import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Scissors,
  MapPin,
  Phone,
  Instagram,
  Clock,
  Star,
  Sparkles,
  Crown,
  ExternalLink,
} from "lucide-react";
import { FloatingNav } from "@/components/FloatingNav";
import { WhatsappFloat } from "@/components/WhatsappFloat";
import { GOOGLE_MAPS_URL, WHATSAPP_URL } from "@/lib/links";
import heroImg from "@/assets/hero.jpg";
import hero2Img from "@/assets/hero2.jpg";
import barberImg from "@/assets/barber.jpg";
import work1 from "@/assets/work1.jpg";
import work2 from "@/assets/work2.jpg";
import work3 from "@/assets/work3.jpg";
import work4 from "@/assets/work4.jpg";
import work5 from "@/assets/work5.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Barbearia Kairos — Estilo, Tradição e Precisão" },
      {
        name: "description",
        content:
          "Barbearia Kairos: cortes modernos, barba clássica e atendimento premium. Agende seu horário pelo WhatsApp.",
      },
      { property: "og:title", content: "Barbearia Kairos" },
      {
        property: "og:description",
        content: "Cortes modernos, barba clássica e atendimento premium.",
      },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: Index,
});

const serviceCategories = [
  {
    key: "servicos",
    label: "Serviços",
    icon: Scissors,
    items: [
      { title: "Corte", price: "R$ 40,00" },
      { title: "Corte Giletado", price: "R$ 45,00" },
      { title: "Barba Simples", price: "R$ 30,00" },
      { title: "Barba com Toalha Quente", price: "R$ 35,00" },
      { title: "Sobrancelha", price: "R$ 15,00" },
      { title: "Perfil / Pezinho", price: "R$ 15,00" },
    ],
  },
  {
    key: "penteados",
    label: "Penteados",
    icon: Star,
    items: [
      { title: "Blindado", price: "R$ 20,00" },
      { title: "Blindado Pigmentado", price: "R$ 25,00" },
      { title: "Colorido", price: "R$ 30,00" },
    ],
  },
  {
    key: "quimica",
    label: "Química",
    icon: Sparkles,
    items: [
      { title: "Progressiva", price: "R$ 75,00" },
      { title: "Alisante", price: "R$ 45,00" },
      { title: "Luzes", price: "R$ 65,00" },
      { title: "Botox", price: "R$ 75,00" },
      { title: "Hidratação", price: "R$ 40,00" },
    ],
  },
];

const gallery = [work1, work2, work3, work4, work5, hero2Img];

const MAP_LATITUDE = -23.7112639026494;
const MAP_LONGITUDE = -46.60781124931023;
const MAP_ZOOM = 16;
const MAP_TILE_SIZE = 256;
const MAP_TILE_SCALE = 2 ** MAP_ZOOM;
const MAP_TILE_X_POSITION = ((MAP_LONGITUDE + 180) / 360) * MAP_TILE_SCALE;
const MAP_TILE_Y_POSITION =
  ((1 - Math.asinh(Math.tan((MAP_LATITUDE * Math.PI) / 180)) / Math.PI) / 2) * MAP_TILE_SCALE;
const MAP_TILE_X = Math.floor(MAP_TILE_X_POSITION);
const MAP_TILE_Y = Math.floor(MAP_TILE_Y_POSITION);
const MAP_PIXEL_X = (MAP_TILE_X_POSITION - MAP_TILE_X) * MAP_TILE_SIZE;
const MAP_PIXEL_Y = (MAP_TILE_Y_POSITION - MAP_TILE_Y) * MAP_TILE_SIZE;
const MAP_TILES = Array.from({ length: 9 }, (_, index) => ({
  x: MAP_TILE_X + (index % 3) - 1,
  y: MAP_TILE_Y + Math.floor(index / 3) - 1,
}));

function Index() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeServiceCategory, setActiveServiceCategory] = useState(serviceCategories[0].key);
  const lightboxTriggerRef = useRef<HTMLButtonElement | null>(null);
  const lightboxCloseButtonRef = useRef<HTMLButtonElement | null>(null);
  const lightboxRef = useRef<HTMLDivElement | null>(null);
  const activeCategory = serviceCategories.find(
    (category) => category.key === activeServiceCategory,
  );
  const isLightboxOpen = lightboxIndex !== null;

  const openLightbox = (index: number, trigger: HTMLButtonElement) => {
    lightboxTriggerRef.current = trigger;
    setLightboxIndex(index);
  };
  const closeLightbox = () => setLightboxIndex(null);
  const prevLightboxImage = () =>
    setLightboxIndex((index) =>
      index === null ? null : (index + gallery.length - 1) % gallery.length,
    );
  const nextLightboxImage = () =>
    setLightboxIndex((index) => (index === null ? null : (index + 1) % gallery.length));

  useEffect(() => {
    const revealTargets = document.querySelectorAll<HTMLElement>("[data-scroll-reveal]");
    if (
      revealTargets.length === 0 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -32px 0px" },
    );

    revealTargets.forEach((target) => observer.observe(target));
    document.documentElement.classList.add("has-scroll-reveal");

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("has-scroll-reveal");
    };
  }, []);

  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxIndex(null);
      } else if (event.key === "ArrowLeft") {
        setLightboxIndex((index) =>
          index === null ? null : (index + gallery.length - 1) % gallery.length,
        );
      } else if (event.key === "ArrowRight") {
        setLightboxIndex((index) => (index === null ? null : (index + 1) % gallery.length));
      } else if (event.key === "Tab") {
        const focusableElements =
          lightboxRef.current?.querySelectorAll<HTMLElement>("button:not(:disabled)");
        if (!focusableElements?.length) return;
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    lightboxCloseButtonRef.current?.focus();
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (lightboxTriggerRef.current?.isConnected) lightboxTriggerRef.current.focus();
    };
  }, [isLightboxOpen]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <FloatingNav />
      <WhatsappFloat />

      {/* HERO */}
      <section
        id="inicio"
        className="relative min-h-[90svh] flex items-center justify-center pt-24 pb-12"
      >
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Barbearia Kairos"
            className="w-full h-full object-cover"
            width={1600}
            height={1024}
          />
          <div className="absolute inset-0 bg-linear-to-b from-background/80 via-background/60 to-background" />
          <div className="absolute inset-0" style={{ background: "var(--gradient-radial-gold)" }} />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl animate-fade-up">
          <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-7">
            <span className="w-2 h-2 rounded-full bg-gold" />
            <span className="text-xs font-heading tracking-widest text-foreground">
              TRADIÇÃO E ESTILO
            </span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] text-shadow-lg mb-6">
            BARBEARIA
            <br />
            <span className="gold-gradient">KAIROS</span>
          </h1>

          <p className="text-base md:text-lg text-foreground/90 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
            Onde cada corte é uma arte. Cortes modernos, barba clássica e atendimento premium em um
            ambiente sofisticado.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-gold text-primary-foreground px-8 py-4 rounded-full font-heading tracking-wider shadow-gold hover:-translate-y-0.5 hover:brightness-105 transition-all duration-200 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              AGENDAR HORÁRIO
              <Scissors className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            </a>
            <a
              href="#servicos"
              className="glass px-8 py-4 rounded-full font-heading tracking-wider hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              VER SERVIÇOS
            </a>
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="py-24 md:py-32 relative">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="card-3d">
            <div className="card-3d-inner relative" data-scroll-reveal>
              <div className="absolute -inset-4 bg-gradient-gold opacity-10 blur-xl rounded-3xl" />
              <img
                src={barberImg}
                alt="Mestre Barbeiro Kairos"
                className="relative rounded-2xl shadow-3d w-full object-cover gold-ring"
                width={1024}
                height={1280}
                loading="lazy"
              />
            </div>
          </div>

          <div data-scroll-reveal>
            <div className="font-heading text-sm tracking-[0.4em] text-gold mb-4">
              SOBRE O MESTRE
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 leading-tight">
              A arte de transformar <span className="text-gradient-gold">presença</span>.
            </h2>
            <p className="text-foreground/80 text-lg leading-relaxed mb-4">
              O mestre por trás da Kairos une técnica clássica, olhar contemporâneo e cuidado aos
              detalhes.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Cada cliente recebe um atendimento personalizado, em um ambiente pensado para ser
              refúgio e ritual. Mais do que cortar cabelo, esculpimos a sua melhor versão.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { i: Scissors, t: "Técnica refinada" },
                { i: Crown, t: "Atendimento VIP" },
                { i: Sparkles, t: "Produtos premium" },
                { i: Clock, t: "Horário marcado" },
              ].map((f) => (
                <div key={f.t} className="flex items-center gap-3 glass rounded-xl p-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center shrink-0">
                    <f.i className="w-5 h-5 text-background" />
                  </div>
                  <span className="font-medium text-sm">{f.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos" className="py-24 md:py-32 relative bg-card/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12" data-scroll-reveal>
            <div className="font-heading text-sm tracking-[0.4em] text-gold mb-4">
              NOSSOS SERVIÇOS
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-bold">
              Atendimentos <span className="text-gradient-gold-alt">masculinos</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4 leading-relaxed">
              Explore os serviços disponíveis na Barbearia Kairos.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-10" data-scroll-reveal>
            {serviceCategories.map((category) => {
              const CategoryIcon = category.icon;
              return (
                <button
                  key={category.key}
                  type="button"
                  aria-pressed={activeServiceCategory === category.key}
                  className={`rounded-full px-5 py-3 font-semibold inline-flex items-center gap-2 transition-all ${
                    activeServiceCategory === category.key
                      ? "bg-gradient-gold text-background shadow-gold"
                      : "glass text-foreground hover:bg-white/10"
                  }`}
                  onClick={() => setActiveServiceCategory(category.key)}
                >
                  <CategoryIcon className="w-4 h-4" />
                  {category.label}
                </button>
              );
            })}
          </div>

          <div
            key={activeCategory?.key}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 animate-category-in"
          >
            {activeCategory?.items.map((item, index) => {
              const CategoryIcon = activeCategory.icon;
              return (
                <article key={item.title} className="card-3d card-3d-static">
                  <div
                    className="card-3d-inner service-card-enter glass rounded-xl p-6 md:p-7 h-full min-h-52 shadow-card relative overflow-hidden"
                    style={{ animationDelay: `${index * 55}ms` }}
                  >
                    <div className="absolute inset-0 bg-gold/5 pointer-events-none" />
                    <div className="relative z-10 flex h-full flex-col">
                      <div className="w-12 h-12 rounded-lg bg-gradient-gold flex items-center justify-center mb-4">
                        <CategoryIcon className="w-7 h-7 text-background" />
                      </div>
                      <h3 className="font-display text-xl md:text-2xl font-bold mb-5 min-h-12">
                        {item.title}
                      </h3>
                      <div className="mt-auto flex items-center justify-between gap-3 pt-4 border-t border-border">
                        <span className="text-sm text-muted-foreground">Valor</span>
                        <span className="font-display text-xl md:text-2xl font-bold text-gold tabular-nums">
                          {item.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* GALERIA */}
      <section id="galeria" className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16" data-scroll-reveal>
            <div className="font-heading text-sm tracking-[0.4em] text-gold mb-4">PORTFÓLIO</div>
            <h2 className="font-display text-4xl md:text-6xl font-bold">
              Nosso <span className="text-gradient-gold-alt">trabalho</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Uma seleção dos cortes e estilos que assinamos.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6" data-scroll-reveal>
            {gallery.map((src, i) => (
              <button
                type="button"
                key={i}
                onClick={(event) => openLightbox(i, event.currentTarget)}
                aria-label={`Abrir imagem ${i + 1}`}
                className={`card-3d group relative overflow-hidden rounded-xl cursor-zoom-in border-0 bg-transparent p-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  i === 0 ? "md:col-span-2 md:row-span-2" : ""
                }`}
              >
                <div className="card-3d-inner relative aspect-square md:aspect-auto md:h-full">
                  <img
                    src={src}
                    alt={`Trabalho ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    width={800}
                    height={1024}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-4 left-4 right-4 translate-y-2 group-hover:translate-y-0 transition-transform">
                    <div className="font-heading text-xs tracking-widest text-gold">KAIROS</div>
                    <div className="font-display text-lg font-bold">Estilo #{i + 1}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          {lightboxIndex !== null && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4 py-6 backdrop-blur-sm"
              onClick={closeLightbox}
              role="dialog"
              aria-modal="true"
              aria-label="Galeria de imagens"
              ref={lightboxRef}
            >
              <button
                type="button"
                ref={lightboxCloseButtonRef}
                onClick={(event) => {
                  event.stopPropagation();
                  closeLightbox();
                }}
                className="absolute top-5 right-5 rounded-full bg-background/90 p-3 text-2xl text-foreground shadow-lg transition hover:bg-background"
                aria-label="Fechar imagem"
              >
                ×
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  prevLightboxImage();
                }}
                className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full bg-background/90 p-3 text-3xl text-foreground shadow-lg transition hover:bg-background"
                aria-label="Imagem anterior"
              >
                ‹
              </button>
              <div
                className="relative max-h-[90vh] w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-225"
                onClick={(event) => event.stopPropagation()}
              >
                <img
                  src={gallery[lightboxIndex]}
                  alt={`Trabalho ${lightboxIndex + 1}`}
                  className="h-full w-full max-h-[90vh] max-w-full object-contain rounded-3xl shadow-2xl"
                />
              </div>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  nextLightboxImage();
                }}
                className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full bg-background/90 p-3 text-3xl text-foreground shadow-lg transition hover:bg-background"
                aria-label="Próxima imagem"
              >
                ›
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CONTATO / LOCALIZAÇÃO */}
      <section id="contato" className="py-24 md:py-32 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16" data-scroll-reveal>
            <div className="font-heading text-sm tracking-[0.4em] text-gold mb-4">VISITE-NOS</div>
            <h2 className="font-display text-4xl md:text-6xl font-bold">
              Encontre a Barbearia <span className="gold-streak">Kairos</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="glass rounded-2xl p-8 shadow-card space-y-6" data-scroll-reveal>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-background" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold mb-1">Endereço</h3>
                  <p className="text-muted-foreground">
                    Av. São Bernardo, 357 - Jardim Uniao
                    <br />
                    Diadema - SP, CEP 09981-010
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-background" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold mb-1">Horário</h3>
                  <p className="text-muted-foreground">
                    Ter — Sáb: 10h às 20h
                    <br />
                    Dom — Seg: Fechado
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-background" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold mb-1">Contato</h3>
                  <p className="text-muted-foreground">
                    Leandro - Barbearia Kairos
                    <br />
                    (11) 94779-0902
                    <br />
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold hover:underline"
                    >
                      Conversar no WhatsApp
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-gold text-primary-foreground px-6 py-4 rounded-xl font-heading tracking-wider text-center shadow-gold hover:scale-105 transition-transform"
                >
                  AGENDAR PELO WHATSAPP
                </a>
                <a
                  href="https://www.instagram.com/kairos_barbershop.oficial/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="glass px-6 py-4 rounded-xl flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <Instagram className="w-5 h-5 text-gold" />
                </a>
              </div>
            </div>

            <div className="space-y-3" data-scroll-reveal>
              <div
                className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-[#e8e6dc] shadow-card"
                role="group"
                aria-label="Mapa da região da Barbearia Kairos"
              >
                <div
                  aria-hidden="true"
                  className="absolute grid h-192 w-3xl grid-cols-3"
                  style={{
                    left: `calc(50% - ${MAP_TILE_SIZE + MAP_PIXEL_X}px)`,
                    top: `calc(50% - ${MAP_TILE_SIZE + MAP_PIXEL_Y}px)`,
                  }}
                >
                  {MAP_TILES.map((tile) => (
                    <img
                      key={`${tile.x}-${tile.y}`}
                      src={`https://tile.openstreetmap.org/${MAP_ZOOM}/${tile.x}/${tile.y}.png`}
                      alt=""
                      width={MAP_TILE_SIZE}
                      height={MAP_TILE_SIZE}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                    />
                  ))}
                </div>
                <MapPin
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 z-10 h-10 w-10 -translate-x-1/2 -translate-y-full text-background drop-shadow-lg"
                  fill="var(--gold)"
                />
                <a
                  href="https://www.openstreetmap.org/copyright"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-2 right-2 z-20 rounded bg-background/90 px-2 py-1 text-[10px] text-foreground"
                >
                  © OpenStreetMap contributors
                </a>
              </div>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-secondary px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                Abrir panorama no Google Maps
                <ExternalLink aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center">
              <Scissors className="w-4 h-4 text-background" strokeWidth={2.5} />
            </div>
            <span className="font-display font-bold tracking-wider text-gold">
              BARBEARIA KAIROS
            </span>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} Barbearia Kairos · Tradição, estilo e precisão.
          </p>
        </div>
      </footer>
    </div>
  );
}
