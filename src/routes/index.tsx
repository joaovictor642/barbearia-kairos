import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Scissors, MapPin, Phone, Instagram, Clock, Award, Star, Sparkles, Crown, Quote } from "lucide-react";
import { FloatingNav } from "@/components/FloatingNav";
import { WhatsappFloat } from "@/components/WhatsappFloat";
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
      { name: "description", content: "Barbearia Kairos: cortes modernos, barba clássica e atendimento premium. Agende seu horário pelo WhatsApp." },
      { property: "og:title", content: "Barbearia Kairos" },
      { property: "og:description", content: "Cortes modernos, barba clássica e atendimento premium." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: Index,
});

const WHATSAPP_URL =
  "https://wa.me/5511947790902?text=Ol%C3%A1,%20encontrei%20o%20site%20da%20Barbearia%20Kairos%20e%20gostaria%20de%20agendar%20um%20hor%C3%A1rio";

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

const certs = [
  { title: "Barber School BR", year: "2018", desc: "Formação técnica avançada em barbearia clássica e moderna." },
  { title: "Wahl Academy", year: "2020", desc: "Especialização em técnicas de fade e cortes texturizados." },
  { title: "Master Barber Brasil", year: "2022", desc: "Workshop avançado em barba e navalha tradicional." },
  { title: "Congresso Barber Expo", year: "2024", desc: "Atualização contínua em tendências internacionais." },
];

const testimonials = [
  { name: "Lucas Andrade", text: "Melhor barbearia da cidade. Atendimento impecável e corte sempre perfeito.", rating: 5 },
  { name: "Rafael Costa", text: "O combo de barba com toalha quente é uma experiência única. Recomendo demais.", rating: 5 },
  { name: "Pedro Henrique", text: "Profissional de outro nível. Atenção aos detalhes faz toda a diferença.", rating: 5 },
];

function Index() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeServiceCategory, setActiveServiceCategory] = useState(serviceCategories[0].key);
  const activeCategory = serviceCategories.find((category) => category.key === activeServiceCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevLightboxImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + gallery.length - 1) % gallery.length);
  };
  const nextLightboxImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % gallery.length);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <FloatingNav />
      <WhatsappFloat />

      {/* HERO */}
      <section id="inicio" className="relative min-h-screen flex items-center justify-center pt-24">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Barbearia Kairos" className="w-full h-full object-cover" width={1600} height={1024} />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
          <div className="absolute inset-0" style={{ background: "var(--gradient-radial-gold)" }} />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl animate-fade-up">
          <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-[var(--whatsapp)] animate-pulse" />
            <span className="text-xs font-heading tracking-widest text-foreground/90">DESDE 2015 · TRADIÇÃO E ESTILO</span>
          </div>

          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] text-shadow-lg mb-6">
            BARBEARIA<br />
            <span className="gold-gradient">KAIROS</span>
          </h1>

          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-10 font-light">
            Onde cada corte é uma arte. Cortes modernos, barba clássica e atendimento premium em um ambiente sofisticado.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-gold text-primary-foreground px-8 py-4 rounded-full font-heading tracking-wider shadow-gold hover:scale-105 transition-all flex items-center gap-2"
            >
              AGENDAR HORÁRIO
              <Scissors className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            </a>
            <a
              href="#servicos"
              className="glass px-8 py-4 rounded-full font-heading tracking-wider hover:bg-secondary transition-all"
            >
              VER SERVIÇOS
            </a>
          </div>

          <div className="grid grid-cols-3 gap-4 md:gap-12 mt-16 max-w-2xl mx-auto">
            {[
              { n: "10+", l: "Anos de experiência" },
              { n: "5K+", l: "Clientes atendidos" },
              { n: "4.9★", l: "Avaliação Google" },
            ].map((s, index) => (
              <div key={s.l} className="text-center">
                <div className={`font-display text-3xl md:text-5xl font-bold ${index === 1 ? 'gold-highlight' : 'text-gradient-gold'}`}>{s.n}</div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="py-24 md:py-32 relative">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="card-3d">
            <div className="card-3d-inner relative">
              <div className="absolute -inset-4 bg-gradient-gold opacity-20 blur-2xl rounded-3xl" />
              <img
                src={barberImg}
                alt="Mestre Barbeiro Kairos"
                className="relative rounded-2xl shadow-3d w-full object-cover gold-ring"
                width={1024}
                height={1280}
                loading="lazy"
              />
              <div className="absolute -bottom-6 -right-6 glass rounded-2xl p-5 shadow-card">
                <Award className="w-8 h-8 text-gold mb-2" />
                <div className="font-display text-2xl font-bold">10+ Anos</div>
                <div className="text-xs text-muted-foreground">de maestria</div>
              </div>
            </div>
          </div>

          <div>
            <div className="font-heading text-sm tracking-[0.4em] text-gold mb-4">SOBRE O MESTRE</div>
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 leading-tight">
              A arte de transformar <span className="text-gradient-gold">presença</span>.
            </h2>
            <p className="text-foreground/80 text-lg leading-relaxed mb-4">
              Há mais de uma década dedicado ao ofício da barbearia, o mestre por trás da Kairos une técnica clássica, olhar contemporâneo e um cuidado obsessivo pelos detalhes.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Cada cliente recebe um atendimento personalizado, em um ambiente pensado para ser refúgio e ritual. Não cortamos cabelo esculpimos a sua melhor versão.
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
          <div className="text-center mb-12">
            <div className="font-heading text-sm tracking-[0.4em] text-gold mb-4">NOSSOS SERVIÇOS</div>
            <h2 className="font-display text-4xl md:text-6xl font-bold">
              Atendimentos <span className="text-gradient-gold-alt">masculinos</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              Explore nossos serviços masculinos em categorias claras, com o estilo premium e brilho que define a Kairos.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {serviceCategories.map((category) => {
              const CategoryIcon = category.icon;
              return (
                <button
                  key={category.key}
                  type="button"
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
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${
              activeCategory?.key === "penteados" ? "justify-items-center" : "xl:grid-cols-4"
            }`}
          >
            {activeCategory?.items.map((item) => {
              const CategoryIcon = activeCategory.icon;
              return (
                <div
                  key={item.title}
                  className={`card-3d card-3d-static ${
                    activeCategory?.key === "penteados" ? "w-full max-w-sm" : ""
                  }`}
                >
                  <div className="card-3d-inner glass rounded-2xl p-8 h-full shadow-card relative overflow-hidden">
                    <div className="absolute inset-0 rounded-3xl bg-gradient-gold/15 blur-3xl" />
                    <div className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none" />
                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold mb-5">
                        <CategoryIcon className="w-7 h-7 text-background" />
                      </div>
                      <h3 className="font-display text-2xl font-bold mb-6">{item.title}</h3>
                      <div className="flex items-end justify-between pt-4 border-t border-border">
                        <span className="text-xs text-muted-foreground">valor</span>
                        <span className="font-display text-2xl font-bold gold-highlight">{item.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* GALERIA */}
      <section id="galeria" className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="font-heading text-sm tracking-[0.4em] text-gold mb-4">PORTFÓLIO</div>
            <h2 className="font-display text-4xl md:text-6xl font-bold">
              Nosso <span className="text-gradient-gold-alt">trabalho</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">Uma seleção dos cortes e estilos que assinamos.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {gallery.map((src, i) => (
              <div
                key={i}
                onClick={() => openLightbox(i)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    openLightbox(i);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`Abrir imagem ${i + 1}`}
                className={`card-3d group relative overflow-hidden rounded-2xl cursor-zoom-in ${
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
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-4 left-4 right-4 translate-y-2 group-hover:translate-y-0 transition-transform">
                    <div className="font-heading text-xs tracking-widest text-gold">KAIROS</div>
                    <div className="font-display text-lg font-bold">Estilo #{i + 1}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {lightboxIndex !== null && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4 py-6 backdrop-blur-sm"
              onClick={closeLightbox}
            >
              <button
                type="button"
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
                className="relative max-h-[90vh] w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[900px]"
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

      {/* CERTIFICAÇÕES */}
      <section id="certificacoes" className="py-24 md:py-32 bg-card/30 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="font-heading text-sm tracking-[0.4em] text-gold mb-4">FORMAÇÃO</div>
            <h2 className="font-display text-4xl md:text-6xl font-bold">
              Credenciais & <span className="gold-streak">Certificações</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {certs.map((c) => (
              <div key={c.title} className="card-3d">
                <div className="card-3d-inner glass rounded-2xl p-6 flex gap-5 items-start shadow-card">
                  <div className="w-14 h-14 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold shrink-0">
                    <Award className="w-7 h-7 text-background" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between mb-1">
                      <h3 className="font-display text-xl font-bold">{c.title}</h3>
                      <span className="font-heading text-sm text-gold">{c.year}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="font-heading text-sm tracking-[0.4em] text-gold mb-4">DEPOIMENTOS</div>
            <h2 className="font-display text-4xl md:text-6xl font-bold">
              O que dizem os <span className="gold-highlight">clientes</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="card-3d card-3d-static">
                <div className="card-3d-inner glass rounded-2xl p-8 h-full shadow-card relative">
                  <Quote className="w-10 h-10 text-gold/30 mb-4" />
                  <p className="text-foreground/90 leading-relaxed mb-6 italic">"{t.text}"</p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="font-display font-bold">{t.name}</div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-gold" fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTATO / LOCALIZAÇÃO */}
      <section id="contato" className="py-24 md:py-32 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="font-heading text-sm tracking-[0.4em] text-gold mb-4">VISITE-NOS</div>
            <h2 className="font-display text-4xl md:text-6xl font-bold">
              Encontre a Barbearia <span className="gold-streak">Kairos</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="glass rounded-2xl p-8 shadow-card space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-background" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold mb-1">Endereço</h3>
                  <p className="text-muted-foreground">Av. São Bernardo, 357 - Jardim Uniao<br/>Diadema - SP, CEP 09981-010</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-background" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold mb-1">Horário</h3>
                  <p className="text-muted-foreground">Ter — Sáb: 10h às 20h<br />Dom — Seg: Fechado</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-background" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold mb-1">Contato</h3>
                <p className="text-muted-foreground">
                  Leandro - Barbearia Kairos<br />
                  (11) 94779-0902<br />
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

            <div className="rounded-2xl overflow-hidden shadow-card h-full min-h-[400px]">
                <iframe
                  title="Localização Barbearia Kairos"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d913.2535404988442!2d-46.6081538!3d-23.7111883!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce441358b4ef53%3A0xf5c87259400d84fd!2sBarbearia%20KAIROS!5e0!3m2!1spt-BR!2sbr!4v1780586517611!5m2!1spt-BR!2sbr"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
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
            <span className="font-display font-bold tracking-wider text-gold">BARBEARIA KAIROS</span>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} Barbearia Kairos · Tradição, estilo e precisão.
          </p>
        </div>
      </footer>
    </div>
  );
}
