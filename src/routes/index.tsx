import { useEffect, useRef, useState, type CSSProperties } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Scissors,
  MapPin,
  Phone,
  Instagram,
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X,
  Plus,
} from "lucide-react";
import { FloatingNav } from "@/components/FloatingNav";
import { WhatsappFloat } from "@/components/WhatsappFloat";
import { ExperienceEffects, HeroAtmosphere } from "@/components/ExperienceEffects";
import { HeroSculpture } from "@/components/HeroSculpture";
import { GOOGLE_MAPS_URL, WHATSAPP_URL } from "@/lib/links";
import heroImg from "@/assets/kairos-cinematic-banner.webp";
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
      { title: "Barbearia Kairos — Seu estilo. No tempo certo." },
      {
        name: "description",
        content:
          "Corte, barba e cuidado com os detalhes em Diadema. Conheça os serviços da Barbearia Kairos e agende seu horário pelo WhatsApp.",
      },
      { property: "og:title", content: "Barbearia Kairos — Seu estilo. No tempo certo." },
      {
        property: "og:description",
        content: "Tradição, estilo e precisão em Diadema. Agende pelo WhatsApp.",
      },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: Index,
});

const serviceCategories = [
  {
    key: "servicos",
    label: "Corte & barba",
    image: work2,
    description: "Do primeiro contorno ao último detalhe.",
    items: [
      { title: "Corte", price: "R$ 45,00" },
      { title: "Corte Giletado", price: "R$ 50,00" },
      { title: "Corte Infantil", price: "R$ 35,00" },
      { title: "Barba Simples", price: "R$ 35,00" },
      { title: "Barba com Toalha Quente", price: "R$ 40,00" },
      { title: "Sobrancelha", price: "R$ 20,00" },
      { title: "Perfil / Pezinho", price: "R$ 20,00" },
    ],
  },
  {
    key: "penteados",
    label: "Penteados",
    image: hero2Img,
    description: "Personalidade em cada finalização.",
    items: [
      { title: "Blindado", price: "R$ 20,00" },
      { title: "Blindado Pigmentado", price: "R$ 25,00" },
      { title: "Colorido", price: "R$ 30,00" },
    ],
  },
  {
    key: "quimica",
    label: "Química",
    image: work4,
    description: "Um novo visual começa com cuidado.",
    items: [
      { title: "Progressiva", price: "R$ 75,00" },
      { title: "Alisante", price: "R$ 45,00" },
      { title: "Luzes", price: "R$ 65,00" },
      { title: "Botox", price: "R$ 75,00" },
      { title: "Hidratação", price: "R$ 40,00" },
    ],
  },
];
const gallery = [work2, work3, work4, work5, hero2Img, work1];
const INSTAGRAM_URL = "https://www.instagram.com/kairos_barbershop.oficial/";
const MAP_ZOOM = 16;
const mapX = ((-46.60781124931023 + 180) / 360) * 2 ** MAP_ZOOM;
const mapY =
  ((1 - Math.asinh(Math.tan((-23.7112639026494 * Math.PI) / 180)) / Math.PI) / 2) * 2 ** MAP_ZOOM;
const mapTiles = Array.from({ length: 9 }, (_, i) => ({
  x: Math.floor(mapX) + (i % 3) - 1,
  y: Math.floor(mapY) + Math.floor(i / 3) - 1,
}));

function Index() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const category = serviceCategories[activeCategoryIndex];
  const isLightboxOpen = lightboxIndex !== null;
  const changeImage = (direction: number) =>
    setLightboxIndex((i) =>
      i === null ? null : (i + direction + gallery.length) % gallery.length,
    );

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    document
      .querySelectorAll<HTMLElement>("[data-reveal]")
      .forEach((target) => observer.observe(target));
    document.documentElement.classList.add("motion-ready");
    const onMotionChange = () => {
      if (motion.matches) {
        document.documentElement.classList.remove("motion-ready");
        heroRef.current?.style.setProperty("--hero-shift", "0px");
      }
    };
    motion.addEventListener("change", onMotionChange);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", onMotionChange);
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!isLightboxOpen) {
      if (dialog.open) dialog.close();
      return;
    }
    if (!dialog.open) dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isLightboxOpen]);

  return (
    <div className="kairos-site">
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <FloatingNav />
      <WhatsappFloat />
      <ExperienceEffects />
      <main id="conteudo">
        <section id="inicio" className="hero" ref={heroRef} aria-labelledby="hero-title">
          <div className="hero-visual" aria-hidden="true">
            <img src={heroImg} alt="" width={1672} height={941} fetchPriority="high" />
          </div>
          <div className="hero-grid" aria-hidden="true" />
          <HeroAtmosphere />
          <div className="hero-content page-width">
            <p className="eyebrow hero-enter">
              Barbearia Kairos <span>/</span> Diadema, SP
            </p>
            <h1 id="hero-title" aria-label="Seu estilo. No tempo certo.">
              <span className="hero-line">
                <span aria-hidden="true">
                  {"SEU ESTILO.".split("").map((letter, i) => (
                    <span
                      className="hero-letter"
                      key={i}
                      style={{ "--letter-delay": `${i * 38 + 200}ms` } as CSSProperties}
                    >
                      {letter === " " ? "\u00a0" : letter}
                    </span>
                  ))}
                </span>
              </span>
              <span className="hero-line">
                <span aria-hidden="true">
                  {"NO TEMPO".split("").map((letter, i) => (
                    <span
                      className="hero-letter"
                      key={i}
                      style={{ "--letter-delay": `${i * 38 + 430}ms` } as CSSProperties}
                    >
                      {letter === " " ? "\u00a0" : letter}
                    </span>
                  ))}
                </span>
              </span>
              <span className="hero-line hero-line-gold">
                <span aria-hidden="true">
                  {"CERTO.".split("").map((letter, i) => (
                    <span
                      className="hero-letter"
                      key={i}
                      style={{ "--letter-delay": `${i * 52 + 660}ms` } as CSSProperties}
                    >
                      {letter}
                    </span>
                  ))}
                </span>
              </span>
            </h1>
            <div className="hero-bottom hero-enter">
              <p>
                O corte valoriza. O detalhe define.
                <br />
                Reserve um tempo para a sua melhor versão.
              </p>
              <div className="hero-actions">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button-gold"
                >
                  <Scissors size={18} /> Agendar meu horário
                </a>
                <a href="#servicos" className="text-link">
                  Conhecer os serviços
                </a>
              </div>
            </div>
          </div>
          <HeroSculpture />
          <div className="hero-caption" aria-hidden="true">
            <span>Tradição no cuidado.</span>
            <span>Precisão no detalhe.</span>
          </div>
          <div className="hero-foot page-width">
            <span>
              <Clock size={15} /> Ter — Sáb, 10h às 20h
            </span>
            <a href="#sobre" className="scroll-cue">
              <span className="scroll-track" aria-hidden="true" /> Explore a Kairos
            </a>
            <span className="hero-foot-location">Jardim União · Diadema</span>
          </div>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {Array.from({ length: 4 }, (_, i) => (
              <span className="marquee-group" key={i}>
                CORTE <Scissors /> BARBA <Scissors /> IDENTIDADE <Scissors /> KAIROS <Scissors />
              </span>
            ))}
          </div>
        </div>

        <section
          id="sobre"
          className="about section-space page-width"
          aria-labelledby="about-title"
        >
          <div className="about-photo" data-reveal>
            <div className="photo-crop">
              <img
                src={barberImg}
                alt="Leandro, barbeiro da Kairos"
                width={1254}
                height={1254}
                loading="lazy"
              />
            </div>
            <div className="photo-signature">
              <span>Leandro</span>
              <small>À frente da Kairos</small>
              <Scissors size={25} />
            </div>
            <span className="photo-side" aria-hidden="true">
              TÉCNICA. CUIDADO. PRESENÇA.
            </span>
          </div>
          <div className="about-copy" data-reveal>
            <p className="eyebrow">A essência Kairos</p>
            <h2 id="about-title">
              MAIS QUE UM CORTE.
              <br />
              <span>UM TEMPO SEU.</span>
            </h2>
            <p>
              Sentar na cadeira, desacelerar e cuidar de você. Na Kairos, a técnica clássica
              encontra o estilo de hoje, com atenção ao que faz o seu visual ser único.
            </p>
            <p>
              Leandro está à frente desse cuidado: do acabamento ao atendimento, cada detalhe faz
              parte da experiência.
            </p>
            <div className="about-details">
              <span>
                <Scissors size={20} /> Técnica e precisão
              </span>
              <span>
                <Clock size={20} /> Horário marcado
              </span>
              <span>
                <Sparkles size={20} /> Cuidado nos detalhes
              </span>
            </div>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-link">
              Seu próximo corte começa aqui
            </a>
          </div>
        </section>

        <section id="servicos" className="services section-space" aria-labelledby="services-title">
          <div className="page-width">
            <div className="section-heading" data-reveal>
              <div>
                <p className="eyebrow">Escolha o seu ritual</p>
                <h2 id="services-title">
                  ESTILO EM
                  <br />
                  <span>CADA DETALHE.</span>
                </h2>
              </div>
              <p>
                Do clássico ao seu próximo visual.
                <br />
                Encontre o cuidado que combina com você.
              </p>
            </div>
            <div className="service-layout" data-reveal>
              <div className="service-picture">
                <img
                  key={category.image}
                  src={category.image}
                  alt="Detalhes de um trabalho da Barbearia Kairos"
                  width={800}
                  height={1024}
                  loading="lazy"
                />
                <div className="service-picture-caption">
                  <Scissors size={28} />
                  <p>
                    FEITO COM TÉCNICA.
                    <br />
                    <span>FINALIZADO COM CUIDADO.</span>
                  </p>
                </div>
              </div>
              <div className="service-menu">
                <div className="service-tabs" role="group" aria-label="Categoria de serviços">
                  {serviceCategories.map((item, index) => (
                    <button
                      key={item.key}
                      type="button"
                      aria-pressed={activeCategoryIndex === index}
                      onClick={() => setActiveCategoryIndex(index)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                <p className="service-description">{category.description}</p>
                <div
                  className="service-list"
                  key={category.key}
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {category.items.map((item, i) => (
                    <a
                      key={item.title}
                      className="service-row"
                      style={{ "--item-delay": `${i * 45}ms` } as CSSProperties}
                      href={`https://wa.me/5511947790902?text=${encodeURIComponent(`Olá! Encontrei o site da Kairos e gostaria de agendar: ${item.title}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Agendar ${item.title}, ${item.price}, pelo WhatsApp`}
                    >
                      <span>{item.title}</span>
                      <span className="service-row-price">
                        {item.price}
                        <Plus size={17} aria-hidden="true" />
                      </span>
                    </a>
                  ))}
                </div>
                <p className="service-note">
                  <Scissors size={16} /> Toque em um serviço para conversar sobre o agendamento.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="galeria"
          className="gallery-section section-space page-width"
          aria-labelledby="gallery-title"
        >
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow">O detalhe fala por si</p>
              <h2 id="gallery-title">
                ASSINATURA
                <br />
                <span>KAIROS.</span>
              </h2>
            </div>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link instagram-link"
            >
              <Instagram size={18} /> Mais no Instagram
            </a>
          </div>
          <div className="gallery-grid">
            {gallery.map((src, i) => (
              <button
                className={`gallery-item gallery-item-${i + 1}`}
                data-reveal
                type="button"
                key={src}
                onClick={() => setLightboxIndex(i)}
                aria-label={`Ampliar trabalho ${i + 1} da Kairos`}
              >
                <img
                  src={src}
                  alt={`Trabalho ${i + 1} da Barbearia Kairos`}
                  width={800}
                  height={1024}
                  loading="lazy"
                />
                <span className="gallery-caption">
                  <span>O ESTILO ESTÁ NOS DETALHES</span>
                  <span className="gallery-expand">
                    <Plus size={22} />
                  </span>
                </span>
              </button>
            ))}
          </div>
        </section>

        <div className="style-ribbon" aria-hidden="true">
          <div className="style-ribbon-line">
            <span>PRECISÃO.</span>
            <span className="outline-word">PRESENÇA.</span>
            <Scissors />
            <span>IDENTIDADE.</span>
            <span className="outline-word">KAIROS.</span>
          </div>
        </div>

        <section className="booking-banner" aria-labelledby="booking-title">
          <img src={heroImg} alt="" width={1672} height={941} loading="lazy" aria-hidden="true" />
          <div className="page-width booking-content" data-reveal>
            <p className="eyebrow">Sua próxima versão começa aqui</p>
            <h2 id="booking-title">
              TIRE UM TEMPO.
              <br />
              <span>MARQUE SEU ESTILO.</span>
            </h2>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-gold"
            >
              <Scissors size={18} /> Agendar pelo WhatsApp
            </a>
          </div>
        </section>

        <section
          id="contato"
          className="contact section-space page-width"
          aria-labelledby="contact-title"
        >
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow">A cadeira está te esperando</p>
              <h2 id="contact-title">
                SEU PONTO
                <br />
                <span>DE ESTILO.</span>
              </h2>
            </div>
            <p>
              Jardim União, Diadema.
              <br />
              Pertinho de você. No seu tempo.
            </p>
          </div>
          <div className="contact-grid">
            <div className="contact-info" data-reveal>
              <div className="contact-detail">
                <MapPin />
                <div>
                  <h3>Chegue mais</h3>
                  <p>
                    Av. São Bernardo, 357 — Jardim União
                    <br />
                    Diadema — SP, CEP 09981-010
                  </p>
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link"
                  >
                    Ver no Google Maps
                  </a>
                </div>
              </div>
              <div className="contact-detail">
                <Clock />
                <div>
                  <h3>No seu tempo</h3>
                  <p>
                    Terça a sábado, das 10h às 20h
                    <br />
                    Domingo e segunda: fechado
                  </p>
                </div>
              </div>
              <div className="contact-detail">
                <Phone />
                <div>
                  <h3>Fale com o Leandro</h3>
                  <a className="contact-phone" href="tel:+5511947790902">
                    (11) 94779-0902
                  </a>
                  <p>Agende seu horário pelo WhatsApp.</p>
                </div>
              </div>
              <div className="contact-actions">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button-gold"
                >
                  Conversar no WhatsApp
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button-outline"
                  aria-label="Instagram da Barbearia Kairos"
                >
                  <Instagram size={20} />
                </a>
              </div>
            </div>
            <div className="contact-map" data-reveal>
              <div
                className="map-canvas"
                role="group"
                aria-label="Mapa da região da Barbearia Kairos"
              >
                <div
                  className="map-tiles"
                  aria-hidden="true"
                  style={{
                    left: `calc(50% - ${256 + (mapX % 1) * 256}px)`,
                    top: `calc(50% - ${256 + (mapY % 1) * 256}px)`,
                  }}
                >
                  {mapTiles.map((tile) => (
                    <img
                      key={`${tile.x}-${tile.y}`}
                      src={`https://tile.openstreetmap.org/${MAP_ZOOM}/${tile.x}/${tile.y}.png`}
                      alt=""
                      width={256}
                      height={256}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                    />
                  ))}
                </div>
                <span className="map-pin">
                  <Scissors size={22} />
                  <span>KAIROS</span>
                </span>
                <a
                  className="map-attribution"
                  href="https://www.openstreetmap.org/copyright"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  © OpenStreetMap contributors
                </a>
              </div>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="map-link"
              >
                <MapPin size={18} /> Explore a região no Google Maps
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="page-width">
          <div className="footer-top">
            <a href="#inicio" className="brand">
              <Scissors size={25} />
              <span>
                KAIROS<small>BARBEARIA</small>
              </span>
            </a>
            <p>Tradição no cuidado. Precisão no detalhe.</p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visite o Instagram da Kairos"
            >
              <Instagram size={21} />
            </a>
          </div>
          <div className="footer-wordmark" aria-hidden="true">
            KAIROS
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Barbearia Kairos.</p>
            <span>Diadema, São Paulo</span>
            <a href="#inicio">Voltar ao início</a>
          </div>
        </div>
      </footer>
      <dialog
        ref={dialogRef}
        className="gallery-dialog"
        aria-labelledby="lightbox-title"
        onCancel={() => setLightboxIndex(null)}
        onClose={() => setLightboxIndex(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setLightboxIndex(null);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            changeImage(-1);
          }
          if (e.key === "ArrowRight") {
            e.preventDefault();
            changeImage(1);
          }
        }}
        onTouchStart={(e) => {
          touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }}
        onTouchEnd={(e) => {
          const start = touchStart.current;
          touchStart.current = null;
          if (!start) return;
          const dx = e.changedTouches[0].clientX - start.x;
          const dy = e.changedTouches[0].clientY - start.y;
          if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) changeImage(dx < 0 ? 1 : -1);
        }}
      >
        <div className="lightbox-top">
          <p id="lightbox-title">
            Assinatura Kairos{" "}
            <span aria-live="polite">
              {(lightboxIndex ?? 0) + 1} / {gallery.length}
            </span>
          </p>
          <button
            type="button"
            className="icon-button"
            onClick={() => setLightboxIndex(null)}
            aria-label="Fechar imagem"
            autoFocus
          >
            <X />
          </button>
        </div>
        <div className="lightbox-stage">
          <button
            type="button"
            className="icon-button lightbox-prev"
            onClick={() => changeImage(-1)}
            aria-label="Imagem anterior"
          >
            <ChevronLeft />
          </button>
          {lightboxIndex !== null && (
            <img
              src={gallery[lightboxIndex]}
              alt={`Trabalho ${lightboxIndex + 1} da Barbearia Kairos ampliado`}
            />
          )}
          <button
            type="button"
            className="icon-button lightbox-next"
            onClick={() => changeImage(1)}
            aria-label="Próxima imagem"
          >
            <ChevronRight />
          </button>
        </div>
        <p className="lightbox-hint">Use as setas ou deslize para explorar.</p>
      </dialog>
    </div>
  );
}
