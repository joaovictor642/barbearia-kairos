import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { h as heroImg } from "./router-BfeDENhg.mjs";
import { S as Scissors, a as Star, b as Sparkles, A as Award, C as Crown, c as Clock, Q as Quote, M as MapPin, P as Phone, I as Instagram, X, d as Menu, e as MessageCircle } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const links = [
  { href: "#inicio", label: "Início" },
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#galeria", label: "Galeria" },
  { href: "#certificacoes", label: "Certificações" },
  { href: "#contato", label: "Contato" }
];
function FloatingNav() {
  const [scrolled, setScrolled] = reactExports.useState(false);
  const [open, setOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "header",
    {
      className: `fixed left-1/2 z-50 -translate-x-1/2 transition-all duration-500 ${scrolled ? "top-3 w-[95%] max-w-5xl" : "top-6 w-[95%] max-w-6xl"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "glass rounded-full px-5 py-3 flex items-center justify-between shadow-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#inicio", className: "flex items-center gap-2 group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className: "w-4 h-4 text-background", strokeWidth: 2.5 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "leading-tight", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-sm font-bold tracking-wider text-gold", children: "KAIROS" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.3em] text-muted-foreground -mt-0.5", children: "BARBEARIA" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "hidden md:flex items-center gap-1", children: links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: l.href,
              className: "px-4 py-2 text-sm text-foreground/80 hover:text-gold transition-colors relative font-medium",
              children: l.label
            }
          ) }, l.href)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "#contato",
              className: "hidden md:inline-flex items-center gap-2 bg-gradient-gold text-primary-foreground px-5 py-2 rounded-full font-heading text-sm shadow-gold hover:scale-105 transition-transform",
              children: "Agendar"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              "aria-label": "Menu",
              className: "md:hidden w-10 h-10 rounded-full bg-secondary flex items-center justify-center",
              onClick: () => setOpen((v) => !v),
              children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5 text-gold" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "w-5 h-5 text-gold" })
            }
          )
        ] }),
        open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden mt-2 glass rounded-2xl p-4 animate-fade-up", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "flex flex-col gap-1", children: [
          links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: l.href,
              onClick: () => setOpen(false),
              className: "block px-4 py-3 rounded-lg text-foreground/90 hover:bg-secondary hover:text-gold transition-colors",
              children: l.label
            }
          ) }, l.href)),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "#contato",
              onClick: () => setOpen(false),
              className: "block mt-2 text-center bg-gradient-gold text-primary-foreground py-3 rounded-lg font-heading",
              children: "Agendar Horário"
            }
          ) })
        ] }) })
      ]
    }
  );
}
const WHATSAPP_URL$1 = "https://wa.me/5511947790902?text=Ol%C3%A1,%20encontrei%20o%20site%20da%20Barbearia%20Kairos%20e%20gostaria%20de%20agendar%20um%20hor%C3%A1rio";
function WhatsappFloat() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "a",
    {
      href: WHATSAPP_URL$1,
      target: "_blank",
      rel: "noopener noreferrer",
      "aria-label": "Abrir conversa direta no WhatsApp",
      className: "fixed bottom-6 right-6 z-50 group",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 rounded-full bg-[var(--whatsapp)] opacity-40 animate-ping" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-16 h-16 rounded-full bg-[var(--whatsapp)] flex items-center justify-center animate-float-pulse", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-7 h-7 text-white", fill: "white", strokeWidth: 0 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-20 top-1/2 -translate-y-1/2 whitespace-nowrap glass px-4 py-2 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none", children: "Agende seu horário 💈" })
      ] })
    }
  );
}
const hero2Img = "/assets/hero2-YbNE3OaH.jpg";
const barberImg = "/assets/barber-TmFOts15.jpg";
const work1 = "/assets/work1-Dndke-uD.jpg";
const work2 = "/assets/work2-G7hd14rX.jpg";
const work3 = "/assets/work3-Bqx0TZrB.jpg";
const work4 = "/assets/work4-BnpMheIm.jpg";
const work5 = "/assets/work5-aJk3u5HE.jpg";
const WHATSAPP_URL = "https://wa.me/5511947790902?text=Ol%C3%A1,%20encontrei%20o%20site%20da%20Barbearia%20Kairos%20e%20gostaria%20de%20agendar%20um%20hor%C3%A1rio";
const serviceCategories = [{
  key: "servicos",
  label: "Serviços",
  icon: Scissors,
  items: [{
    title: "Corte",
    price: "R$ 40,00"
  }, {
    title: "Corte Giletado",
    price: "R$ 45,00"
  }, {
    title: "Barba Simples",
    price: "R$ 30,00"
  }, {
    title: "Barba com Toalha Quente",
    price: "R$ 35,00"
  }, {
    title: "Sobrancelha",
    price: "R$ 15,00"
  }, {
    title: "Perfil / Pezinho",
    price: "R$ 15,00"
  }]
}, {
  key: "penteados",
  label: "Penteados",
  icon: Star,
  items: [{
    title: "Blindado",
    price: "R$ 20,00"
  }, {
    title: "Blindado Pigmentado",
    price: "R$ 25,00"
  }, {
    title: "Colorido",
    price: "R$ 30,00"
  }]
}, {
  key: "quimica",
  label: "Química",
  icon: Sparkles,
  items: [{
    title: "Progressiva",
    price: "R$ 75,00"
  }, {
    title: "Alisante",
    price: "R$ 45,00"
  }, {
    title: "Luzes",
    price: "R$ 65,00"
  }, {
    title: "Botox",
    price: "R$ 75,00"
  }, {
    title: "Hidratação",
    price: "R$ 40,00"
  }]
}];
const gallery = [work1, work2, work3, work4, work5, hero2Img];
const certs = [{
  title: "Barber School BR",
  year: "2018",
  desc: "Formação técnica avançada em barbearia clássica e moderna."
}, {
  title: "Wahl Academy",
  year: "2020",
  desc: "Especialização em técnicas de fade e cortes texturizados."
}, {
  title: "Master Barber Brasil",
  year: "2022",
  desc: "Workshop avançado em barba e navalha tradicional."
}, {
  title: "Congresso Barber Expo",
  year: "2024",
  desc: "Atualização contínua em tendências internacionais."
}];
const testimonials = [{
  name: "Lucas Andrade",
  text: "Melhor barbearia da cidade. Atendimento impecável e corte sempre perfeito.",
  rating: 5
}, {
  name: "Rafael Costa",
  text: "O combo de barba com toalha quente é uma experiência única. Recomendo demais.",
  rating: 5
}, {
  name: "Pedro Henrique",
  text: "Profissional de outro nível. Atenção aos detalhes faz toda a diferença.",
  rating: 5
}];
function Index() {
  const [lightboxIndex, setLightboxIndex] = reactExports.useState(null);
  const [activeServiceCategory, setActiveServiceCategory] = reactExports.useState(serviceCategories[0].key);
  const activeCategory = serviceCategories.find((category) => category.key === activeServiceCategory);
  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevLightboxImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + gallery.length - 1) % gallery.length);
  };
  const nextLightboxImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % gallery.length);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground overflow-x-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WhatsappFloat, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "inicio", className: "relative min-h-screen flex items-center justify-center pt-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroImg, alt: "Barbearia Kairos", className: "w-full h-full object-cover", width: 1600, height: 1024 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0", style: {
          background: "var(--gradient-radial-gold)"
        } })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 text-center px-6 max-w-5xl animate-fade-up", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-[var(--whatsapp)] animate-pulse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-heading tracking-widest text-foreground/90", children: "DESDE 2015 · TRADIÇÃO E ESTILO" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] text-shadow-lg mb-6", children: [
          "BARBEARIA",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gold-gradient", children: "KAIROS" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-10 font-light", children: "Onde cada corte é uma arte. Cortes modernos, barba clássica e atendimento premium em um ambiente sofisticado." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: WHATSAPP_URL, target: "_blank", rel: "noopener noreferrer", className: "group bg-gradient-gold text-primary-foreground px-8 py-4 rounded-full font-heading tracking-wider shadow-gold hover:scale-105 transition-all flex items-center gap-2", children: [
            "AGENDAR HORÁRIO",
            /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className: "w-4 h-4 group-hover:rotate-12 transition-transform" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#servicos", className: "glass px-8 py-4 rounded-full font-heading tracking-wider hover:bg-secondary transition-all", children: "VER SERVIÇOS" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-4 md:gap-12 mt-16 max-w-2xl mx-auto", children: [{
          n: "10+",
          l: "Anos de experiência"
        }, {
          n: "5K+",
          l: "Clientes atendidos"
        }, {
          n: "4.9★",
          l: "Avaliação Google"
        }].map((s, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `font-display text-3xl md:text-5xl font-bold ${index === 1 ? "gold-highlight" : "text-gradient-gold"}`, children: s.n }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs md:text-sm text-muted-foreground mt-1", children: s.l })
        ] }, s.l)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "sobre", className: "py-24 md:py-32 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6 grid md:grid-cols-2 gap-12 md:gap-20 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-3d", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-3d-inner relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-4 bg-gradient-gold opacity-20 blur-2xl rounded-3xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: barberImg, alt: "Mestre Barbeiro Kairos", className: "relative rounded-2xl shadow-3d w-full object-cover gold-ring", width: 1024, height: 1280, loading: "lazy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute -bottom-6 -right-6 glass rounded-2xl p-5 shadow-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-8 h-8 text-gold mb-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl font-bold", children: "10+ Anos" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "de maestria" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-heading text-sm tracking-[0.4em] text-gold mb-4", children: "SOBRE O MESTRE" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-4xl md:text-6xl font-bold mb-6 leading-tight", children: [
          "A arte de transformar ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-gold", children: "presença" }),
          "."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/80 text-lg leading-relaxed mb-4", children: "Há mais de uma década dedicado ao ofício da barbearia, o mestre por trás da Kairos une técnica clássica, olhar contemporâneo e um cuidado obsessivo pelos detalhes." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-8", children: "Cada cliente recebe um atendimento personalizado, em um ambiente pensado para ser refúgio e ritual. Não cortamos cabelo esculpimos a sua melhor versão." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4", children: [{
          i: Scissors,
          t: "Técnica refinada"
        }, {
          i: Crown,
          t: "Atendimento VIP"
        }, {
          i: Sparkles,
          t: "Produtos premium"
        }, {
          i: Clock,
          t: "Horário marcado"
        }].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 glass rounded-xl p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(f.i, { className: "w-5 h-5 text-background" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm", children: f.t })
        ] }, f.t)) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "servicos", className: "py-24 md:py-32 relative bg-card/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-heading text-sm tracking-[0.4em] text-gold mb-4", children: "NOSSOS SERVIÇOS" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-4xl md:text-6xl font-bold", children: [
          "Atendimentos ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-gold-alt", children: "masculinos" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-2xl mx-auto mt-4", children: "Explore nossos serviços masculinos em categorias claras, com o estilo premium e brilho que define a Kairos." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-3 mb-10", children: serviceCategories.map((category) => {
        const CategoryIcon = category.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: `rounded-full px-5 py-3 font-semibold inline-flex items-center gap-2 transition-all ${activeServiceCategory === category.key ? "bg-gradient-gold text-background shadow-gold" : "glass text-foreground hover:bg-white/10"}`, onClick: () => setActiveServiceCategory(category.key), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryIcon, { className: "w-4 h-4" }),
          category.label
        ] }, category.key);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${activeCategory?.key === "penteados" ? "justify-items-center" : "xl:grid-cols-4"}`, children: activeCategory?.items.map((item) => {
        const CategoryIcon = activeCategory.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `card-3d card-3d-static ${activeCategory?.key === "penteados" ? "w-full max-w-sm" : ""}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-3d-inner glass rounded-2xl p-8 h-full shadow-card relative overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-3xl bg-gradient-gold/15 blur-3xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-3xl border border-white/10 pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryIcon, { className: "w-7 h-7 text-background" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-bold mb-6", children: item.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between pt-4 border-t border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "valor" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl font-bold gold-highlight", children: item.price })
            ] })
          ] })
        ] }) }, item.title);
      }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "galeria", className: "py-24 md:py-32", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-heading text-sm tracking-[0.4em] text-gold mb-4", children: "PORTFÓLIO" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-4xl md:text-6xl font-bold", children: [
          "Nosso ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-gold-alt", children: "trabalho" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-4 max-w-xl mx-auto", children: "Uma seleção dos cortes e estilos que assinamos." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6", children: gallery.map((src, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: () => openLightbox(i), onKeyDown: (event) => {
        if (event.key === "Enter" || event.key === " ") {
          openLightbox(i);
        }
      }, role: "button", tabIndex: 0, "aria-label": `Abrir imagem ${i + 1}`, className: `card-3d group relative overflow-hidden rounded-2xl cursor-zoom-in ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-3d-inner relative aspect-square md:aspect-auto md:h-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src, alt: `Trabalho ${i + 1}`, className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110", width: 800, height: 1024, loading: "lazy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-4 left-4 right-4 translate-y-2 group-hover:translate-y-0 transition-transform", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-heading text-xs tracking-widest text-gold", children: "KAIROS" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-lg font-bold", children: [
            "Estilo #",
            i + 1
          ] })
        ] })
      ] }) }, i)) }),
      lightboxIndex !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4 py-6 backdrop-blur-sm", onClick: closeLightbox, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: (event) => {
          event.stopPropagation();
          closeLightbox();
        }, className: "absolute top-5 right-5 rounded-full bg-background/90 p-3 text-2xl text-foreground shadow-lg transition hover:bg-background", "aria-label": "Fechar imagem", children: "×" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: (event) => {
          event.stopPropagation();
          prevLightboxImage();
        }, className: "absolute left-5 top-1/2 -translate-y-1/2 rounded-full bg-background/90 p-3 text-3xl text-foreground shadow-lg transition hover:bg-background", "aria-label": "Imagem anterior", children: "‹" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative max-h-[90vh] w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[900px]", onClick: (event) => event.stopPropagation(), children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: gallery[lightboxIndex], alt: `Trabalho ${lightboxIndex + 1}`, className: "h-full w-full max-h-[90vh] max-w-full object-contain rounded-3xl shadow-2xl" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: (event) => {
          event.stopPropagation();
          nextLightboxImage();
        }, className: "absolute right-5 top-1/2 -translate-y-1/2 rounded-full bg-background/90 p-3 text-3xl text-foreground shadow-lg transition hover:bg-background", "aria-label": "Próxima imagem", children: "›" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "certificacoes", className: "py-24 md:py-32 bg-card/30 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-heading text-sm tracking-[0.4em] text-gold mb-4", children: "FORMAÇÃO" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-4xl md:text-6xl font-bold", children: [
          "Credenciais & ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gold-streak", children: "Certificações" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 gap-6 max-w-4xl mx-auto", children: certs.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-3d", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-3d-inner glass rounded-2xl p-6 flex gap-5 items-start shadow-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-7 h-7 text-background" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold", children: c.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-heading text-sm text-gold", children: c.year })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: c.desc })
        ] })
      ] }) }, c.title)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 md:py-32", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-heading text-sm tracking-[0.4em] text-gold mb-4", children: "DEPOIMENTOS" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-4xl md:text-6xl font-bold", children: [
          "O que dizem os ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gold-highlight", children: "clientes" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-6", children: testimonials.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-3d card-3d-static", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-3d-inner glass rounded-2xl p-8 h-full shadow-card relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: "w-10 h-10 text-gold/30 mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-foreground/90 leading-relaxed mb-6 italic", children: [
          '"',
          t.text,
          '"'
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-4 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold", children: t.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5", children: Array.from({
            length: t.rating
          }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 text-gold", fill: "currentColor" }, i)) })
        ] })
      ] }) }, t.name)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "contato", className: "py-24 md:py-32 bg-card/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-heading text-sm tracking-[0.4em] text-gold mb-4", children: "VISITE-NOS" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-4xl md:text-6xl font-bold", children: [
          "Encontre a Barbearia ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gold-streak", children: "Kairos" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-8 shadow-card space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-6 h-6 text-background" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold mb-1", children: "Endereço" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                "Av. São Bernardo, 357 - Jardim Uniao",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "Diadema - SP, CEP 09981-010"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-6 h-6 text-background" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold mb-1", children: "Horário" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                "Ter — Sáb: 10h às 20h",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "Dom — Seg: Fechado"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-6 h-6 text-background" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold mb-1", children: "Contato" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                "Leandro - Barbearia Kairos",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "(11) 94779-0902",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: WHATSAPP_URL, target: "_blank", rel: "noopener noreferrer", className: "text-gold hover:underline", children: "Conversar no WhatsApp" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 pt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: WHATSAPP_URL, target: "_blank", rel: "noopener noreferrer", className: "flex-1 bg-gradient-gold text-primary-foreground px-6 py-4 rounded-xl font-heading tracking-wider text-center shadow-gold hover:scale-105 transition-transform", children: "AGENDAR PELO WHATSAPP" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.instagram.com/kairos_barbershop.oficial/", target: "_blank", rel: "noopener noreferrer", "aria-label": "Instagram", className: "glass px-6 py-4 rounded-xl flex items-center justify-center hover:bg-secondary transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { className: "w-5 h-5 text-gold" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl overflow-hidden shadow-card h-full min-h-[400px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("iframe", { title: "Localização Barbearia Kairos", src: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d913.2535404988442!2d-46.6081538!3d-23.7111883!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce441358b4ef53%3A0xf5c87259400d84fd!2sBarbearia%20KAIROS!5e0!3m2!1spt-BR!2sbr!4v1780586517611!5m2!1spt-BR!2sbr", width: "600", height: "450", style: {
          border: 0
        }, allowFullScreen: true, loading: "lazy", referrerPolicy: "no-referrer-when-downgrade" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-border py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className: "w-4 h-4 text-background", strokeWidth: 2.5 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold tracking-wider text-gold", children: "BARBEARIA KAIROS" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-center", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Barbearia Kairos · Tradição, estilo e precisão."
      ] })
    ] }) })
  ] });
}
export {
  Index as component
};
