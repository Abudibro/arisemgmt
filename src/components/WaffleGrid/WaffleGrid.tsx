import { useEffect, useRef } from 'react';
import './WaffleGrid.css';

// Grid geometry
const CELL = 56;          // grid square size (px)
const SEG = 14;           // distance between sampled points along a line (px)
const LINE_ALPHA = 0.18;
const NODE_ALPHA = 0.45;
const GLOW = '212, 255, 58'; // --accent as RGB, for the lime light on the lines

// Waffle motion
const DRIFT = 6;          // px/s the whole grid slides diagonally
const WAVE = 10;          // peak wave displacement (px)

// Cursor bulge
const BULGE_RADIUS = 190;
const BULGE_STRENGTH = 34;

// Lime light: one follows the cursor, one roams on its own around ROAM_X/ROAM_Y
const CURSOR_GLOW_RADIUS = 240;
const ROAM_GLOW_RADIUS = 340;
const ROAM_X = 0.72;       // fractions of the canvas size
const ROAM_Y = 0.4;

/**
 * Animated wavy grid, drawn as one continuous canvas behind everything inside
 * its `.waffle-host` parent (the hero and how-we-work sections).
 */
export default function WaffleGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    const start = performance.now();

    // Cursor position eases toward its target, and the bulge fades in/out,
    // so entering or leaving the hero never snaps the grid.
    const mouse = { x: 0, y: 0, tx: 0, ty: 0, power: 0, target: 0 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduceMotion) draw(0);
    };

    const displace = (x: number, y: number, t: number): [number, number] => {
      let dx =
        WAVE * 0.7 * Math.sin(y * 0.011 + t * 0.55) +
        WAVE * 0.4 * Math.cos((x - y) * 0.008 + t * 0.8);
      let dy =
        WAVE * Math.sin(x * 0.009 + t * 0.65) +
        WAVE * 0.5 * Math.sin((x * 0.6 + y) * 0.013 - t * 0.9);

      if (mouse.power > 0.001) {
        const mx = x - mouse.x;
        const my = y - mouse.y;
        const dist = Math.hypot(mx, my);
        if (dist < BULGE_RADIUS && dist > 0.01) {
          const falloff = (1 - dist / BULGE_RADIUS) ** 2;
          const push = BULGE_STRENGTH * falloff * mouse.power;
          dx += (mx / dist) * push;
          dy += (my / dist) * push;
        }
      }
      return [x + dx, y + dy];
    };

    const glowPass = (path: Path2D, x: number, y: number, radius: number, alpha: number) => {
      if (alpha < 0.01) return;
      const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
      g.addColorStop(0, `rgba(${GLOW}, ${alpha})`);
      g.addColorStop(1, `rgba(${GLOW}, 0)`);
      ctx.strokeStyle = g;
      ctx.stroke(path);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);

      // Slide the grid origin; wrap within one cell so lines never run out.
      const shift = (t * DRIFT) % CELL;
      const pad = CELL * 2; // draw past the edges so waves never expose a gap

      const lines = new Path2D();
      for (let y = -pad + shift; y <= height + pad; y += CELL) {
        for (let x = -pad; x <= width + pad; x += SEG) {
          const [px, py] = displace(x, y, t);
          if (x === -pad) lines.moveTo(px, py);
          else lines.lineTo(px, py);
        }
      }
      for (let x = -pad + shift; x <= width + pad; x += CELL) {
        for (let y = -pad; y <= height + pad; y += SEG) {
          const [px, py] = displace(x, y, t);
          if (y === -pad) lines.moveTo(px, py);
          else lines.lineTo(px, py);
        }
      }

      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(250, 250, 250, ${LINE_ALPHA})`;
      ctx.stroke(lines);

      // Restroke the same lines in lime where the light falls on them.
      ctx.lineWidth = 1.4;
      const roamX = width * (ROAM_X + 0.14 * Math.sin(t * 0.23));
      const roamY = height * (ROAM_Y + 0.3 * Math.sin(t * 0.31 + 1.2));
      glowPass(lines, roamX, roamY, ROAM_GLOW_RADIUS, 0.4);
      glowPass(lines, mouse.x, mouse.y, CURSOR_GLOW_RADIUS, 0.85 * mouse.power);

      // Dots where the lines cross.
      ctx.fillStyle = `rgba(250, 250, 250, ${NODE_ALPHA})`;
      for (let y = -pad + shift; y <= height + pad; y += CELL) {
        for (let x = -pad + shift; x <= width + pad; x += CELL) {
          const [px, py] = displace(x, y, t);
          ctx.fillRect(px - 1, py - 1, 2, 2);
        }
      }
    };

    const tick = (now: number) => {
      mouse.x += (mouse.tx - mouse.x) * 0.12;
      mouse.y += (mouse.ty - mouse.y) * 0.12;
      mouse.power += (mouse.target - mouse.power) * 0.06;
      draw((now - start) / 1000);
      frame = requestAnimationFrame(tick);
    };

    const play = () => {
      if (!reduceMotion && visible && !frame) frame = requestAnimationFrame(tick);
    };
    const pause = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    // The canvas ignores pointer events (so hero buttons stay clickable),
    // so track the cursor on the window and map it into canvas space.
    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      if (inside && mouse.target === 0) {
        // Start the bulge where the cursor enters rather than sweeping in from the last spot.
        mouse.x = x;
        mouse.y = y;
      }
      mouse.tx = x;
      mouse.ty = y;
      mouse.target = inside ? 1 : 0;
    };
    const onPointerLeave = () => {
      mouse.target = 0;
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) play();
      else pause();
    });
    visibilityObserver.observe(canvas);

    resize();
    play();

    if (!reduceMotion) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      document.documentElement.addEventListener('pointerleave', onPointerLeave);
    }

    return () => {
      pause();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="waffle-grid" aria-hidden="true" />;
}
