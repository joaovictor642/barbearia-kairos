import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { SVGRenderer } from "three/addons/renderers/SVGRenderer.js";

export type SculptureHandle = { dispose: () => void; turn: () => void };

/** Original procedural sculpture. No external models, textures, or network requests. */
export function createKairosSculpture(
  host: HTMLElement,
  onUnavailable: () => void,
): SculptureHandle {
  const canvas = document.createElement("canvas");
  let context: WebGL2RenderingContext | null = null;
  try {
    context = canvas.getContext("webgl2", {
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
  } catch {
    /* Use vector projection. */
  }
  const webgl = context
    ? new THREE.WebGLRenderer({ canvas, context, alpha: true, antialias: true })
    : null;
  const vector = webgl ? null : new SVGRenderer();
  const renderer = webgl ?? vector!;
  if (webgl) {
    webgl.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 700 ? 1.25 : 1.5));
    webgl.setClearColor(0x000000, 0);
    webgl.toneMapping = THREE.ACESFilmicToneMapping;
    webgl.toneMappingExposure = 1.35;
  } else {
    vector!.setQuality("high");
    vector!.setPrecision(2);
  }
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.setAttribute("aria-hidden", "true");
  host.dataset.renderer = webgl ? "webgl" : "vector";
  host.append(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(39, 1, 0.1, 50);
  camera.position.set(0, 0.8, 8.8);
  camera.lookAt(0, 0.1, 0);
  let environment: THREE.WebGLRenderTarget | null = null;
  if (webgl) {
    const pmrem = new THREE.PMREMGenerator(webgl);
    const room = new RoomEnvironment();
    environment = pmrem.fromScene(room, 0.04);
    scene.environment = environment.texture;
    room.dispose();
    pmrem.dispose();
  }

  const gold = new THREE.MeshStandardMaterial({
    color: webgl ? 0xd7ad6b : 0xb99461,
    metalness: 0.95,
    roughness: 0.21,
    envMapIntensity: 1.6,
  });
  const champagne = new THREE.MeshStandardMaterial({
    color: webgl ? 0xf1dfbd : 0xd1c2a3,
    metalness: 0.97,
    roughness: 0.18,
    envMapIntensity: 1.4,
  });
  const darkMetal = new THREE.MeshStandardMaterial({
    color: 0x171c19,
    metalness: 0.8,
    roughness: 0.3,
  });
  const innerGrip = new THREE.MeshStandardMaterial({
    color: 0x20231e,
    metalness: 0.3,
    roughness: 0.55,
  });
  const ringMaterial = new THREE.MeshBasicMaterial({
    color: 0xd8b57c,
    transparent: true,
    opacity: 0.28,
  });
  scene.add(new THREE.HemisphereLight(0xffe5b7, 0x111a15, 2));
  if (!webgl) scene.add(new THREE.AmbientLight(0xffe9cb, 0.55));
  const keyLight = new THREE.DirectionalLight(0xffe7c4, webgl ? 5 : 0.9);
  keyLight.position.set(-3, 4, 5);
  scene.add(keyLight);
  const rimLight = new THREE.DirectionalLight(0xb9d0dc, webgl ? 3 : 0.45);
  rimLight.position.set(4, 1, -2);
  scene.add(rimLight);
  const warmLight = new THREE.PointLight(0xffc571, webgl ? 24 : 0.25, 15);
  warmLight.position.set(2, -1, 3);
  scene.add(warmLight);

  const sculpture = new THREE.Group();
  sculpture.position.y = 0.25;
  scene.add(sculpture);
  const mesh = (
    geometry: THREE.BufferGeometry,
    material: THREE.Material,
    group: THREE.Group,
    x = 0,
    y = 0,
    z = 0,
  ) => {
    const object = new THREE.Mesh(geometry, material);
    object.position.set(x, y, z);
    group.add(object);
    return object;
  };
  const bar = (
    start: THREE.Vector3,
    end: THREE.Vector3,
    radius: number,
    material: THREE.Material,
    group: THREE.Group,
  ) => {
    const direction = new THREE.Vector3().subVectors(end, start);
    const object = mesh(
      new THREE.CylinderGeometry(radius, radius, direction.length(), webgl ? 16 : 8),
      material,
      group,
    );
    object.position.copy(start).add(end).multiplyScalar(0.5);
    object.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
    return object;
  };
  const arms: THREE.Group[] = [];
  for (let i = 0; i < 2; i++) {
    const arm = new THREE.Group();
    arm.position.z = i === 0 ? 0.09 : -0.09;
    sculpture.add(arm);
    arms.push(arm);
    const blade = new THREE.Shape();
    blade.moveTo(-0.13, -0.12);
    blade.bezierCurveTo(-0.25, 0.2, -0.17, 0.8, -0.11, 1.45);
    blade.lineTo(0.025, 2.7);
    blade.bezierCurveTo(0.27, 2.45, 0.31, 1.4, 0.24, 0.55);
    blade.quadraticCurveTo(0.23, 0.05, 0.13, -0.14);
    blade.closePath();
    const bladeGeometry = new THREE.ExtrudeGeometry(blade, {
      depth: 0.07,
      bevelEnabled: true,
      bevelSize: 0.026,
      bevelThickness: 0.018,
      bevelSegments: webgl ? 3 : 1,
      steps: 1,
      curveSegments: webgl ? 24 : 8,
    });
    mesh(bladeGeometry, i === 0 ? champagne : gold, arm);
    bar(new THREE.Vector3(0, -0.08, 0), new THREE.Vector3(0, -1.05, 0), 0.095, gold, arm);
    const handle = mesh(
      new THREE.TorusGeometry(0.43, 0.085, webgl ? 16 : 8, webgl ? 64 : 24),
      gold,
      arm,
      0,
      -1.49,
    );
    handle.scale.set(0.88, 1.14, 1);
    const grip = mesh(
      new THREE.TorusGeometry(0.335, 0.027, webgl ? 10 : 6, webgl ? 64 : 24),
      innerGrip,
      arm,
      0,
      -1.49,
      0.02,
    );
    grip.scale.set(0.88, 1.18, 1);
    // A fine edge catches the studio light along the blade.
    bar(
      new THREE.Vector3(0.11, 0.42, 0.09),
      new THREE.Vector3(0.065, 2.36, 0.09),
      0.012,
      champagne,
      arm,
    );
  }
  bar(
    new THREE.Vector3(-0.25, -1.4, 0.09),
    new THREE.Vector3(-0.58, -1.85, 0.09),
    0.065,
    gold,
    arms[0],
  );
  const pivot = mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.25, 48), gold, sculpture, 0, 0, 0.1);
  pivot.rotation.x = Math.PI / 2;
  mesh(new THREE.TorusGeometry(0.135, 0.014, 8, 48), champagne, sculpture, 0, 0, 0.238);
  const screw = mesh(new THREE.BoxGeometry(0.15, 0.018, 0.013), darkMetal, sculpture, 0, 0, 0.245);
  screw.rotation.z = -0.6;
  const orbits = new THREE.Group();
  orbits.visible = !!webgl;
  orbits.position.set(0, 0.35, -0.9);
  scene.add(orbits);
  const orbit = mesh(new THREE.TorusGeometry(2.45, 0.008, 6, 120), ringMaterial, orbits);
  orbit.rotation.set(0.35, 0.3, 0.3);
  const orbit2 = mesh(new THREE.TorusGeometry(2.45, 0.006, 6, 120), ringMaterial, orbits);
  orbit2.rotation.set(-0.5, -0.5, -0.3);
  const pearl = mesh(new THREE.SphereGeometry(0.065, 16, 12), gold, orbits, 2.3, 0.8, 0);
  const pedestal = mesh(
    new THREE.CylinderGeometry(1.6, 1.72, 0.17, webgl ? 64 : 24),
    darkMetal,
    new THREE.Group(),
  );
  pedestal.position.y = -2.4;
  scene.add(pedestal);
  const baseRing = new THREE.Mesh(
    new THREE.TorusGeometry(1.61, 0.018, webgl ? 8 : 4, webgl ? 100 : 32),
    gold,
  );
  baseRing.rotation.x = Math.PI / 2;
  baseRing.position.y = -2.31;
  scene.add(baseRing);

  let frame = 0;
  let lastTime = 0;
  let elapsed = 0;
  let visible = true;
  let disposed = false;
  let contextLost = false;
  let pointerX = 0;
  let pointerY = 0;
  let extraTurn = 0;
  let currentTurn = 0;
  let dragging = false;
  let startX = 0;
  let startTurn = 0;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const paused = () =>
    reduced.matches || document.documentElement.classList.contains("effects-paused");
  const render = (time: number) => {
    frame = 0;
    if (disposed || contextLost || !visible || document.hidden) {
      lastTime = 0;
      return;
    }
    if (!paused() && lastTime && time - lastTime < (webgl ? 32 : 80)) {
      frame = requestAnimationFrame(render);
      return;
    }
    const dt = lastTime ? Math.min((time - lastTime) / 1000, 0.06) : 0;
    lastTime = time;
    if (!paused() && webgl) elapsed += dt;
    currentTurn += (extraTurn - currentTurn) * 0.09;
    sculpture.rotation.set(
      paused() ? -0.12 : -0.12 + pointerY * 0.12,
      -0.35 + currentTurn + (paused() ? 0 : Math.sin(elapsed * 0.35) * 0.2 + pointerX * 0.35),
      -0.36,
    );
    sculpture.position.y = 0.25 + (paused() ? 0 : Math.sin(elapsed * 1.1) * 0.09);
    const opening = 0.24 + (paused() ? 0.07 : (Math.sin(elapsed * 0.65) + 1) * 0.055);
    arms[0].rotation.z = -opening;
    arms[1].rotation.z = opening;
    orbits.rotation.z = elapsed * 0.025;
    pearl.position.y = 0.8 + Math.sin(elapsed * 0.8) * 0.05;
    renderer.render(scene, camera);
    if ((!paused() && webgl) || Math.abs(extraTurn - currentTurn) > 0.002)
      frame = requestAnimationFrame(render);
  };
  const resume = () => {
    if (!frame && !disposed && !contextLost) frame = requestAnimationFrame(render);
  };
  const resize = () => {
    const width = host.clientWidth;
    const height = host.clientHeight;
    if (!width || !height) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    resume();
  };
  const onMove = (event: PointerEvent) => {
    if (paused()) return;
    const box = host.getBoundingClientRect();
    if (dragging) extraTurn = startTurn + (event.clientX - startX) * 0.008;
    else if (event.pointerType === "mouse") {
      pointerX = (event.clientX - box.left) / box.width - 0.5;
      pointerY = (event.clientY - box.top) / box.height - 0.5;
    }
    resume();
  };
  const onDown = (event: PointerEvent) => {
    if (paused()) return;
    dragging = true;
    startX = event.clientX;
    startTurn = extraTurn;
  };
  const onUp = () => {
    dragging = false;
    pointerX = 0;
    pointerY = 0;
  };
  const onContextLost = (event: Event) => {
    event.preventDefault();
    contextLost = true;
    cancelAnimationFrame(frame);
    frame = 0;
    onUnavailable();
  };
  host.addEventListener("pointermove", onMove, { passive: true });
  host.addEventListener("pointerdown", onDown);
  host.addEventListener("pointerleave", onUp);
  window.addEventListener("pointerup", onUp);
  host.addEventListener("pointercancel", onUp);
  renderer.domElement.addEventListener("webglcontextlost", onContextLost);
  document.addEventListener("visibilitychange", resume);
  reduced.addEventListener("change", resume);
  const visibility = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    resume();
  });
  visibility.observe(host);
  const resizer = new ResizeObserver(resize);
  resizer.observe(host);
  const state = new MutationObserver(resume);
  state.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  resize();
  return {
    turn: () => {
      extraTurn += Math.PI / 2;
      if (paused()) currentTurn = extraTurn;
      resume();
    },
    dispose: () => {
      disposed = true;
      cancelAnimationFrame(frame);
      visibility.disconnect();
      resizer.disconnect();
      state.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerdown", onDown);
      host.removeEventListener("pointerleave", onUp);
      host.removeEventListener("pointercancel", onUp);
      window.removeEventListener("pointerup", onUp);
      renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
      document.removeEventListener("visibilitychange", resume);
      reduced.removeEventListener("change", resume);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) object.geometry.dispose();
      });
      [gold, champagne, darkMetal, innerGrip, ringMaterial].forEach((material) =>
        material.dispose(),
      );
      environment?.dispose();
      webgl?.dispose();
      webgl?.forceContextLoss();
      vector?.clear();
      renderer.domElement.remove();
    },
  };
}
