import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ArrowUpRight, ChevronDown } from 'lucide-react';

interface VanteRibbonHeroProps {
  onExploreProjects?: () => void;
  onMeetTeam?: () => void;
}

interface GridSlot {
  x: number;
  y: number;
  w: number;
  h: number;
  vw: number;
  vh: number;
  c: number;
  r: number;
}

interface CardItem {
  i: number;
  title: string;
  category: string;
  v: HTMLVideoElement;
  tex: THREE.VideoTexture;
  geo: THREE.PlaneGeometry;
  mat: THREE.ShaderMaterial;
  mesh: THREE.Mesh;
  rect: GridSlot | null;
}

const R2 = 'https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/';

const WORK_ITEMS = [
  { title: 'Fauji Foundation School // Institutional Portal', src: 'designs/roadster-3d-car-landing.mp4', category: 'INSTITUTIONAL' },
  { title: 'f0undr Order Atelier // Bespoke Commission Gateway', src: 'designs/helion-dispatch-landing.mp4', category: 'COMMISSION' },
  { title: 'f0undr Themes APK // Native Android SDK 35', src: 'aaaf/oraciteslArea.mp4', category: 'NATIVE APK' },
  { title: 'f0undr Game: 1st — Brain Test // Cognitive Architecture', src: 'aaaf/living-portrait-hero.mp4', category: 'COGNITIVE GAME' },
];

const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => t * t * (3 - 2 * t);
const out = (t: number) => 1 - Math.pow(1 - t, 3);
const span = (p: number, a: number, b: number) => clamp((p - a) / (b - a));

const FOV = 35;
const SAMPLES = 1200;
const PH0 = -1.5;
const PH1 = Math.PI * 2 + 1.35;
const CARD_W = 2.1;
const CARD_H = 1.32;
const GAP = 0.03;
const STEP = CARD_W + GAP;
const NX = 28;
const NY = 3;
const GZ = 8;
const RIB_B = 0.63;

const vs = `varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const fs = `uniform sampler2D map;
uniform vec2 cover;
uniform float aspect;
uniform float ready;
uniform float radius;
varying vec2 vUv;

void main() {
  vec2 q = (abs(vUv - 0.5) - 0.5) * vec2(aspect, 1.0) + radius;
  float d = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - radius;
  float px = fwidth(d);
  float a = 1.0 - smoothstep(-px, px, d);
  if (a < 0.01) discard;
  vec2 uv = vUv;
  if (!gl_FrontFacing) uv.x = 1.0 - uv.x;
  vec3 c = mix(vec3(0.075), texture2D(map, (uv - 0.5) * cover + 0.5).rgb, ready);
  float edge = smoothstep(-0.012 - px, -0.012, d);
  gl_FragColor = vec4(mix(c, vec3(1.0), edge * 0.1), a);
}`;

export function VanteRibbonHero({ onExploreProjects, onMeetTeam }: VanteRibbonHeroProps) {
  const ORDER_URL = 'https://order.f0undrteam.site/#';
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const l1Ref = useRef<HTMLDivElement>(null);
  const l2Ref = useRef<HTMLDivElement>(null);
  const capRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const crossRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    const track = trackRef.current;
    if (!canvas || !stage || !track) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100);

    let PATH_L = 1;
    const pathP: THREE.Vector3[] = [];
    const pathT: THREE.Vector3[] = [];

    const buildPath = () => {
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 160; i++) {
        const t = i / 160;
        const ph = mix(PH0, PH1, t);
        const cs = Math.cos(ph);
        const u = 2 * t - 1;
        const depth = cs > 0 ? 7.6 + 16.4 * Math.pow(cs, 0.9) : 7.6 + 2.2 * cs;
        const edge = 0.84 + 0.5 * span(0.14 - t, 0, 0.14) + 0.8 * span(t, 0.84, 1);
        pts.push(
          new THREE.Vector3(
            edge * Math.sin(ph) * depth * 0.561,
            0.5 * Math.sign(u) * Math.pow(Math.abs(u), 1.4) * depth * 0.63,
            -depth
          )
        );
      }
      const path = new THREE.CatmullRomCurve3(pts, false, 'centripetal');
      path.arcLengthDivisions = 1500;
      PATH_L = path.getLength();
      pathP.length = 0;
      pathT.length = 0;
      for (let i = 0; i <= SAMPLES; i++) {
        const u = i / SAMPLES;
        pathP.push(path.getPointAt(u));
        pathT.push(path.getTangentAt(u));
      }
    };

    const at = (s: number, op: THREE.Vector3, ot: THREE.Vector3) => {
      const f = clamp(s / PATH_L) * SAMPLES;
      const i = Math.min(SAMPLES - 1, Math.floor(f));
      const k = f - i;
      op.lerpVectors(pathP[i], pathP[i + 1], k);
      ot.lerpVectors(pathT[i], pathT[i + 1], k).normalize();
    };

    const cards: CardItem[] = WORK_ITEMS.map((item, i) => {
      const v = document.createElement('video');
      v.crossOrigin = 'anonymous';
      v.muted = true;
      v.loop = true;
      v.playsInline = true;
      v.preload = 'auto';
      v.src = R2 + item.src;
      v.setAttribute('playsinline', '');
      v.setAttribute('webkit-playsinline', '');

      const tex = new THREE.VideoTexture(v);
      tex.colorSpace = THREE.NoColorSpace;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;

      const geo = new THREE.PlaneGeometry(1, 1, NX, NY);
      const mat = new THREE.ShaderMaterial({
        vertexShader: vs,
        fragmentShader: fs,
        transparent: true,
        side: THREE.DoubleSide,
        uniforms: {
          map: { value: tex },
          cover: { value: new THREE.Vector2(1, 1) },
          aspect: { value: CARD_W / CARD_H },
          ready: { value: 0 },
          radius: { value: 0.018 },
        },
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.frustumCulled = false;
      scene.add(mesh);

      const onLoadedData = () => {
        const va = v.videoWidth / v.videoHeight;
        const ca = CARD_W / CARD_H;
        mat.uniforms.cover.value.set(va > ca ? ca / va : 1, va > ca ? 1 : va / ca);
        mat.uniforms.ready.value = 1;
      };
      v.addEventListener('loadeddata', onLoadedData);

      return {
        i,
        title: item.title,
        category: item.category,
        v,
        tex,
        geo,
        mat,
        mesh,
        rect: null,
      };
    });

    let W = 1;
    let H = 1;
    let asp = 1;
    let cols = 3;
    let rows = 2;
    let tanH = 0.3153;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      asp = W / H;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(W, H, false);
      camera.aspect = asp;
      camera.fov = asp < 16 / 9 ? (Math.atan(0.561 / asp) * 360) / Math.PI : FOV;
      camera.updateProjectionMatrix();
      tanH = Math.tan((camera.fov * Math.PI) / 360);
      cols = asp < 0.9 ? 2 : 3;
      rows = asp < 0.9 ? 3 : 2;
    };

    window.addEventListener('resize', resize);
    resize();
    buildPath();

    const getGridSlot = (i: number): GridSlot => {
      const vh = 2 * GZ * tanH;
      const vw = vh * asp;
      const gw = vw * (cols === 3 ? 0.74 : 0.88);
      const gap = gw * 0.017;
      const cw = (gw - gap * (cols - 1)) / cols;
      const ch = cw / (CARD_W / CARD_H);
      const gh = ch * rows + gap * 1.6 * (rows - 1);
      const c = i % cols;
      const r = Math.floor(i / cols);
      return {
        x: -gw / 2 + cw / 2 + c * (cw + gap),
        y: gh / 2 - ch / 2 - r * (ch + gap * 1.6),
        w: cw,
        h: ch,
        vw,
        vh,
        c,
        r,
      };
    };

    let target = 0;
    let p = 0;

    const readScroll = () => {
      const rect = track.getBoundingClientRect();
      const maxScroll = track.offsetHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      const currentScroll = -rect.top;
      target = clamp(currentScroll / maxScroll);
    };

    window.addEventListener('scroll', readScroll, { passive: true });
    readScroll();

    const op = new THREE.Vector3();
    const ot = new THREE.Vector3();
    const up = new THREE.Vector3();
    const Y = new THREE.Vector3(0, 1, 0);
    const vp = new THREE.Vector3();

    const poseRibbon = (c: CardItem, head: number) => {
      const pos = c.geo.attributes.position as THREE.BufferAttribute;
      const centre = head - c.i * STEP;
      for (let iy = 0; iy <= NY; iy++) {
        for (let ix = 0; ix <= NX; ix++) {
          const k = iy * (NX + 1) + ix;
          const lu = ix / NX - 0.5;
          const lv = 0.5 - iy / NY;
          at(centre + lu * CARD_W, op, ot);
          up.copy(Y).addScaledVector(ot, -Y.dot(ot)).normalize();
          vp.copy(op).addScaledVector(up, lv * CARD_H);
          pos.setXYZ(k, vp.x, vp.y, vp.z);
        }
      }
      pos.needsUpdate = true;
    };

    const poseGrid = (c: CardItem, q: number) => {
      const g = getGridSlot(c.i);
      const pos = c.geo.attributes.position as THREE.BufferAttribute;
      const dx = (g.c - (cols - 1) / 2) * 1.2;
      const dy = g.r < rows / 2 ? 1 : -1;
      const ox = dx * g.vw * 0.62 * (1 - q);
      const oy = dy * g.vh * (g.c === 1 ? 0.95 : 0.34) * (1 - q);
      const tilt = (1 - q) * 0.22 * (g.c - 1 || 0.5) * dy;
      const cs = Math.cos(tilt);
      const sn = Math.sin(tilt);
      for (let iy = 0; iy <= NY; iy++) {
        for (let ix = 0; ix <= NX; ix++) {
          const k = iy * (NX + 1) + ix;
          const x = (ix / NX - 0.5) * g.w;
          const y = (0.5 - iy / NY) * g.h;
          pos.setXYZ(
            k,
            g.x + ox + x * cs - y * sn,
            g.y + oy + x * sn + y * cs,
            -GZ - (1 - q) * 0.6 * Math.sin((ix / NX) * Math.PI)
          );
        }
      }
      pos.needsUpdate = true;
      c.rect = g;
    };

    const render = () => {
      const pp = p;
      const slideOut = mix(0, 52, out(span(pp, 0, 0.45)));

      if (l1Ref.current) {
        l1Ref.current.style.transform = `translate3d(${-slideOut}vw, 0, 0)`;
        l1Ref.current.style.opacity = `${1 - span(pp, 0.45, 0.62)}`;
      }
      if (l2Ref.current) {
        l2Ref.current.style.transform = `translate3d(${slideOut}vw, 0, 0)`;
        l2Ref.current.style.opacity = `${1 - span(pp, 0.45, 0.62)}`;
      }
      if (capRef.current) {
        capRef.current.style.opacity = `${1 - span(pp, 0.38, 0.55)}`;
        capRef.current.style.transform = `translate(-50%, -50%) scale(${1 - span(pp, 0.38, 0.55) * 0.15})`;
      }

      const intro = 1 - span(pp, 0, 0.05);
      if (hintRef.current) hintRef.current.style.opacity = `${intro}`;
      if (crossRef.current) crossRef.current.style.opacity = `${intro}`;
      if (glowRef.current) glowRef.current.style.opacity = `${intro}`;

      if (ruleRef.current) {
        ruleRef.current.style.transform = `scaleX(${ease(span(pp, 0.72, 0.86))})`;
      }

      const pr = span(pp, 0, RIB_B);
      const head = mix(CARD_W * 2.8, PATH_L + cards.length * STEP, pr);

      for (const c of cards) {
        const s = head - c.i * STEP;
        const end = PATH_L - CARD_W;
        if (s < end) {
          c.mesh.visible = s > CARD_W * 0.4;
          c.rect = null;
          if (c.mesh.visible) poseRibbon(c, head);
        } else if (c.i < cols * rows) {
          const st = mix(0, RIB_B, (end + c.i * STEP) / (PATH_L + cards.length * STEP));
          const q = out(span(pp, st, st + 0.13));
          c.mesh.visible = q > 0.001;
          if (c.mesh.visible) poseGrid(c, q);
        } else {
          c.mesh.visible = false;
          c.rect = null;
        }
      }

      renderer.render(scene, camera);
    };

    let animationFrameId = 0;
    const loop = () => {
      p += (target - p) * 0.09;
      if (Math.abs(target - p) < 0.00005) {
        p = target;
      }
      for (const c of cards) {
        if (c.mesh.visible && c.v.paused) {
          c.v.play().catch(() => {});
        } else if (!c.mesh.visible && !c.v.paused) {
          c.v.pause();
        }
      }
      render();
      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', readScroll);

      for (const c of cards) {
        c.v.pause();
        c.v.src = '';
        c.tex.dispose();
        c.geo.dispose();
        c.mat.dispose();
      }
      renderer.dispose();
    };
  }, []);

  const scrollToNext = () => {
    if (trackRef.current) {
      const bottom = trackRef.current.offsetTop + trackRef.current.offsetHeight;
      window.scrollTo({ top: bottom - 20, behavior: 'smooth' });
    }
  };

  return (
    <div id="track" ref={trackRef} className="relative h-[480vh] w-full max-w-full bg-[#0a0a0b] text-[#f4f1ea]">
      <main id="stage" ref={stageRef} className="sticky top-0 h-screen h-[100svh] w-full max-w-full overflow-hidden bg-[#0a0a0b] select-none">
        <div className="hidden md:block pointer-events-none">
          <div
            id="l1"
            ref={l1Ref}
            className="absolute left-6 lg:left-14 top-1/2 -translate-y-1/2 font-normal text-[clamp(44px,7.2vw,120px)] leading-none tracking-[-0.055em] whitespace-nowrap text-[#f4f1ea] will-change-transform z-10"
          >
            CRAFT IN
          </div>

          <div
            id="l2"
            ref={l2Ref}
            className="absolute right-6 lg:right-14 top-1/2 -translate-y-1/2 font-normal text-[clamp(44px,7.2vw,120px)] leading-none tracking-[-0.055em] whitespace-nowrap text-[#f4f1ea] will-change-transform z-10"
          >
            MOTION
          </div>
        </div>

        <div className="md:hidden pointer-events-none">
          <div
            className="absolute top-[26%] left-1/2 -translate-x-1/2 font-normal text-3xl sm:text-4xl tracking-[-0.05em] text-[#f4f1ea] whitespace-nowrap z-10"
          >
            CRAFT IN
          </div>
          <div
            className="absolute bottom-[26%] left-1/2 -translate-x-1/2 font-normal text-3xl sm:text-4xl tracking-[-0.05em] text-[#f4f1ea] whitespace-nowrap z-10"
          >
            MOTION
          </div>
        </div>

        <div
          id="cap"
          ref={capRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,26em)] text-center text-[clamp(10px,0.8vw,13px)] font-medium leading-[1.4] tracking-[0.04em] uppercase text-[#f4f1ea] pointer-events-none z-10 will-change-transform"
        >
          <div>Digital craftsmanship in continuous fluid motion.</div>
          <div className="text-[10px] sm:text-[11px] tracking-[0.14em] text-[#8d8b86] mt-2 font-mono font-normal normal-case">
            Autonomous AI &bull; Native Android Systems &bull; Directed by <span className="text-[#f4f1ea] font-medium">Muhammad Huzaifa Zahid (Founder)</span>
          </div>
        </div>

        <div
          id="glow"
          ref={glowRef}
          className="absolute left-0 right-0 top-0 h-[42%] bg-gradient-to-b from-[rgba(244,241,234,0.08)] to-transparent pointer-events-none"
        />

        <div
          id="cross"
          ref={crossRef}
          className="absolute left-4 sm:left-8 right-4 sm:right-8 top-[37.5%] h-[1px] bg-[rgba(244,241,234,0.14)] pointer-events-none"
        >
          <i className="absolute left-1/2 -top-[0.62em] -ml-[0.3em] font-mono text-[13px] text-[#8d8b86] bg-[#0a0a0b] px-[0.3em] leading-[1.2] not-italic">
            +
          </i>
        </div>

        <div
          id="rule"
          ref={ruleRef}
          className="absolute left-[3.5vw] right-[3.5vw] top-1/2 h-[1px] bg-[rgba(244,241,234,0.14)] origin-left scale-x-0 pointer-events-none"
        />

        <canvas id="gl" ref={canvasRef} className="absolute inset-0 w-full h-full block" />

        <div
          id="hint"
          ref={hintRef}
          className="hidden sm:block absolute left-1/2 top-8 -translate-x-1/2 font-mono text-[11.5px] tracking-[0.08em] text-[#f4f1ea] pb-1.5 border-b border-[rgba(244,241,234,0.14)] pointer-events-auto"
        >
          <a
            href={ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5"
          >
            START A PROJECT &nbsp;&rarr;
          </a>
        </div>

        <header className="absolute left-4 sm:left-8 right-4 sm:right-8 top-6 flex items-center justify-between pointer-events-none z-20">
          <div className="flex items-center gap-2.5 text-lg sm:text-xl font-semibold tracking-[0.09em] text-[#f4f1ea] pointer-events-auto">
            <div className="w-7 h-7 rounded-full bg-[#16161a] border border-[rgba(244,241,234,0.25)] flex items-center justify-center font-mono font-bold text-[#f4f1ea] text-xs">
              f0
            </div>
            <span>f0undr</span>
          </div>

          <nav className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
            <a
              href={ORDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 h-8 px-3 sm:px-4 border border-[rgba(244,241,234,0.55)] rounded-full text-[#f4f1ea] text-xs font-medium tracking-[0.06em] hover:bg-[#f4f1ea] hover:text-[#0a0a0b] transition-all"
            >
              <i className="w-1.5 h-1.5 rounded-full bg-emerald-400 not-italic" />
              <span>LET&apos;S TALK</span>
            </a>
            <button
              type="button"
              onClick={scrollToNext}
              className="flex items-center gap-1.5 h-8 px-3 border border-[rgba(244,241,234,0.25)] rounded-full text-[#8d8b86] text-xs font-mono hover:text-[#f4f1ea] hover:border-[rgba(244,241,234,0.6)] transition-all cursor-pointer"
            >
              <span>EXPLORE</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </nav>
        </header>

        <footer className="absolute left-4 sm:left-8 right-4 sm:right-8 bottom-6 grid grid-cols-1 sm:grid-cols-3 items-end text-xs leading-[1.35] pointer-events-none z-20 gap-3">
          <p className="text-[#8d8b86] max-w-[22em] text-[11px] sm:text-xs">
            Autonomous AI, Sovereign Cloud Vaults &amp; Native Android 15 Systems by f0undr.
          </p>
          <div className="hidden sm:block text-center font-mono text-[11.5px] tracking-[0.06em] text-[#8d8b86]">
            AI <span className="text-[#8d8b86]/40 mx-2">/</span> NATIVE <span className="text-[#8d8b86]/40 mx-2">/</span> VAULT <span className="text-[#8d8b86]/40 mx-2">/</span> ATELIER
          </div>
          <div className="justify-self-start sm:justify-self-end pointer-events-auto">
            <button
              type="button"
              onClick={scrollToNext}
              className="flex items-center gap-3 font-mono text-[11.5px] tracking-[0.06em] text-[#f4f1ea] hover:text-emerald-300 transition-colors group cursor-pointer"
            >
              <span>VIEW ARCHITECTURE</span>
              <span className="w-5 h-[1px] bg-[#f4f1ea] group-hover:w-7 transition-all" />
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}
