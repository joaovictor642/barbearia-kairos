import { useEffect, useRef, useState } from "react";
import { Pause, Play, Sparkles } from "lucide-react";

/** Decorative motion stays out of React's render loop and pauses offscreen. */
export function ExperienceEffects() {
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const enabled = !paused && !reduced;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(preference.matches);
    sync();
    try {
      setPaused(localStorage.getItem("kairos-motion-paused") === "true");
    } catch {
      /* Storage is optional. */
    }
    preference.addEventListener("change", sync);
    return () => preference.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("effects-paused", !enabled);
    if (!enabled) return () => document.documentElement.classList.remove("effects-paused");

    const hero = document.querySelector<HTMLElement>(".hero");
    const banner = document.querySelector<HTMLElement>(".booking-banner");
    const ribbon = document.querySelector<HTMLElement>(".style-ribbon");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0;
    let pointerFrame = 0;
    let activeCard: HTMLElement | null = null;
    let activeButton: HTMLElement | null = null;
    let cursorX = -100;
    let cursorY = -100;
    let pointerX = -100;
    let pointerY = -100;

    const reset = () => {
      activeCard?.style.setProperty("--tilt-x", "0deg");
      activeCard?.style.setProperty("--tilt-y", "0deg");
      activeButton?.style.setProperty("--magnet-x", "0px");
      activeButton?.style.setProperty("--magnet-y", "0px");
      activeCard = null;
      activeButton = null;
    };
    const updateScroll = () => {
      frame = 0;
      const y = window.scrollY;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      progressRef.current?.style.setProperty(
        "--page-progress",
        `${scrollable > 0 ? y / scrollable : 0}`,
      );
      if (hero) {
        const p = Math.min(y / hero.offsetHeight, 1);
        hero.style.setProperty("--hero-shift", `${p * 130}px`);
        hero.style.setProperty("--hero-copy-shift", `${p * -42}px`);
        hero.style.setProperty("--hero-zoom", `${1.12 + p * 0.08}`);
      }
      if (banner) {
        const box = banner.getBoundingClientRect();
        if (box.top < window.innerHeight && box.bottom > 0) {
          const p = (window.innerHeight - box.top) / (window.innerHeight + box.height);
          banner.style.setProperty("--banner-shift", `${(p - 0.5) * 90}px`);
        }
      }
      if (ribbon) {
        const box = ribbon.getBoundingClientRect();
        if (box.top < window.innerHeight && box.bottom > 0) {
          ribbon.style.setProperty(
            "--ribbon-shift",
            `${(box.top / window.innerHeight - 0.5) * -100}px`,
          );
        }
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateScroll);
    };
    const animateCursor = () => {
      cursorX += (pointerX - cursorX) * 0.17;
      cursorY += (pointerY - cursorY) * 0.17;
      const cursor = cursorRef.current;
      if (cursor) cursor.style.transform = `translate3d(${cursorX}px,${cursorY}px,0)`;
      if (Math.abs(pointerX - cursorX) + Math.abs(pointerY - cursorY) > 0.4) {
        pointerFrame = requestAnimationFrame(animateCursor);
      } else pointerFrame = 0;
    };
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !finePointer.matches) return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!pointerFrame) pointerFrame = requestAnimationFrame(animateCursor);
      cursorRef.current?.classList.add("cursor-visible");
      const target = event.target instanceof Element ? event.target : null;
      const card =
        target?.closest<HTMLElement>(".gallery-item, .about-photo, .service-picture") ?? null;
      const button = target?.closest<HTMLElement>(".button") ?? null;
      if (card !== activeCard || button !== activeButton) reset();
      activeCard = card;
      activeButton = button;
      cursorRef.current?.classList.toggle("cursor-interactive", !!target?.closest("a,button"));
      if (card) {
        const box = card.getBoundingClientRect();
        const x = event.clientX - box.left;
        const y = event.clientY - box.top;
        card.style.setProperty("--spot-x", `${x}px`);
        card.style.setProperty("--spot-y", `${y}px`);
        card.style.setProperty("--tilt-x", `${(0.5 - y / box.height) * 5}deg`);
        card.style.setProperty("--tilt-y", `${(x / box.width - 0.5) * 6}deg`);
      }
      if (button) {
        const box = button.getBoundingClientRect();
        button.style.setProperty(
          "--magnet-x",
          `${(event.clientX - box.left - box.width / 2) * 0.13}px`,
        );
        button.style.setProperty(
          "--magnet-y",
          `${(event.clientY - box.top - box.height / 2) * 0.2}px`,
        );
      }
      if (hero && event.clientY < hero.getBoundingClientRect().bottom) {
        hero.style.setProperty("--light-x", `${(event.clientX / window.innerWidth) * 100}%`);
        hero.style.setProperty("--light-y", `${(event.clientY / hero.offsetHeight) * 100}%`);
      }
    };
    const onLeave = () => {
      reset();
      cursorRef.current?.classList.remove("cursor-visible");
    };
    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    return () => {
      reset();
      cancelAnimationFrame(frame);
      cancelAnimationFrame(pointerFrame);
      cursorRef.current?.classList.remove("cursor-visible");
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      document.documentElement.classList.remove("effects-paused");
    };
  }, [enabled]);

  const toggle = () => {
    const next = !paused;
    setPaused(next);
    try {
      localStorage.setItem("kairos-motion-paused", String(next));
    } catch {
      /* Storage is optional. */
    }
  };
  return (
    <>
      <div ref={progressRef} className="reading-progress" aria-hidden="true" />
      <div ref={cursorRef} className="cursor-aura" aria-hidden="true">
        <span />
      </div>
      <button
        type="button"
        className="motion-control"
        onClick={toggle}
        disabled={reduced}
        aria-pressed={!enabled}
        aria-label={
          reduced
            ? "Movimento reduzido pelo sistema"
            : enabled
              ? "Pausar efeitos visuais"
              : "Ativar efeitos visuais"
        }
      >
        {reduced ? <Sparkles size={15} /> : enabled ? <Pause size={14} /> : <Play size={14} />}
        <span>
          {reduced ? "Movimento reduzido" : enabled ? "Pausar efeitos" : "Ativar efeitos"}
        </span>
      </button>
    </>
  );
}

export function HeroAtmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!("IntersectionObserver" in window) || !("ResizeObserver" in window)) return;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let frame = 0;
    let lastTime = 0;
    let visible = true;
    let seed = 1763;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    const particles = Array.from({ length: 34 }, () => ({
      x: random(),
      y: random(),
      r: 0.5 + random() * 1.2,
      speed: 0.006 + random() * 0.016,
      phase: random() * Math.PI * 2,
    }));
    const resize = () => {
      const box = canvas.getBoundingClientRect();
      width = box.width;
      height = box.height;
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const canAnimate = () =>
      visible &&
      !document.hidden &&
      !motion.matches &&
      !document.documentElement.classList.contains("effects-paused");
    const draw = (time: number) => {
      frame = 0;
      if (!canAnimate()) {
        lastTime = 0;
        return;
      }
      if (time - lastTime < 32) {
        frame = requestAnimationFrame(draw);
        return;
      }
      const dt = lastTime ? Math.min((time - lastTime) / 1000, 0.06) : 0;
      lastTime = time;
      context.clearRect(0, 0, width, height);
      particles.forEach((p, i) => {
        if (width < 640 && i > 17) return;
        p.y -= p.speed * dt;
        if (p.y < -0.02) p.y = 1.02;
        const x = p.x * width + Math.sin(time * 0.00022 + p.phase) * 28;
        context.beginPath();
        context.fillStyle = `rgba(224,190,132,${0.13 + (Math.sin(time * 0.0008 + p.phase) + 1) * 0.16})`;
        context.arc(x, p.y * height, p.r, 0, Math.PI * 2);
        context.fill();
      });
      frame = requestAnimationFrame(draw);
    };
    const resume = () => {
      if (canAnimate() && !frame) frame = requestAnimationFrame(draw);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      resume();
    });
    observer.observe(canvas);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const stateObserver = new MutationObserver(resume);
    stateObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    document.addEventListener("visibilitychange", resume);
    motion.addEventListener("change", resume);
    resize();
    resume();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      stateObserver.disconnect();
      document.removeEventListener("visibilitychange", resume);
      motion.removeEventListener("change", resume);
    };
  }, []);
  return (
    <div className="hero-atmosphere" aria-hidden="true">
      <div className="hero-light-beam" />
      <div className="hero-light-beam beam-secondary" />
      <canvas ref={canvasRef} />
      <div className="cinema-grain" />
      <span className="cinema-corner corner-top" />
      <span className="cinema-corner corner-bottom" />
    </div>
  );
}
