import { useEffect, useRef, useState } from "react";
import { Rotate3D, Scissors } from "lucide-react";
import type { SculptureHandle } from "@/lib/kairos-sculpture";

export function HeroSculpture() {
  const hostRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<SculptureHandle | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let cancelled = false;
    const timer = window.setTimeout(async () => {
      try {
        const { createKairosSculpture } = await import("@/lib/kairos-sculpture");
        if (cancelled || !hostRef.current) return;
        sceneRef.current = createKairosSculpture(hostRef.current, () => setReady(false));
        setReady(true);
      } catch {
        /* The crafted static composition remains available without WebGL. */
      }
    }, 350);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, []);

  return (
    <div className={`hero-sculpture ${ready ? "sculpture-ready" : ""}`}>
      <div className="sculpture-glass">
        <div className="sculpture-heading">
          <span className="sculpture-monogram">K</span>
          <span>
            O TEMPO É SEU.
            <br />
            <strong>O ESTILO TAMBÉM.</strong>
          </span>
        </div>
        <div className="sculpture-fallback" aria-hidden="true">
          <span className="fallback-orbit" />
          <Scissors strokeWidth={0.8} />
          <span className="fallback-plinth" />
        </div>
        <div
          ref={hostRef}
          className="sculpture-canvas"
          role="img"
          aria-label="Escultura tridimensional de uma tesoura metálica da Kairos"
        />
        <div className="sculpture-foot">
          <span>
            TRADIÇÃO NA ESSÊNCIA.
            <br />
            <strong>PRECISÃO NA ASSINATURA.</strong>
          </span>
          {ready && (
            <button
              type="button"
              className="sculpture-turn"
              onClick={() => sceneRef.current?.turn()}
              aria-label="Girar a tesoura em 3D"
            >
              <Rotate3D size={20} />
              <span>Explorar</span>
            </button>
          )}
        </div>
      </div>
      <div className="sculpture-floating-note">
        <Scissors size={19} />
        <span>
          Seu estilo.
          <br />
          <strong>Em boas mãos.</strong>
        </span>
      </div>
    </div>
  );
}
