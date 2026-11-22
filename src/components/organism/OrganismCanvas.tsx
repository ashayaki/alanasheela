'use client';

import React, { useRef, useEffect } from 'react';
import { useHeartbeat } from '@/context/HeartbeatContext';

interface Particle {
  x: number;
  y: number;
  radius: number;
  angle: number;
  speed: number;
  distance: number;
  baseDistance: number;
  alpha: number;
  hueOffset: number;
}

export const OrganismCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { progress } = useHeartbeat();
  const progressRef = useRef(progress);

  // Mouse tracking for the Digimuse's gentle gaze
  const mouseRef = useRef({ x: 0, y: 0, hasInteracted: false });

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2,
        hasInteracted: true,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    let blinkTimer = 0;
    let isBlinking = false;

    // Smooth eye gaze interpolation
    let gazeX = 0;
    let gazeY = 0;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Ambient floating bio-photons / cyber dust
    const numParticles = 65;
    const particles: Particle[] = [];
    for (let i = 0; i < numParticles; i++) {
      const angle = (Math.PI * 2 * i) / numParticles + (Math.random() - 0.5) * 0.5;
      const baseDistance = 60 + Math.random() * 180;
      particles.push({
        x: 0,
        y: 0,
        radius: 1 + Math.random() * 2,
        angle,
        speed: (0.002 + Math.random() * 0.004) * (Math.random() > 0.5 ? 1 : -1),
        distance: baseDistance,
        baseDistance,
        alpha: 0.2 + Math.random() * 0.6,
        hueOffset: Math.random() * 60,
      });
    }

    const render = () => {
      time += 0.016;
      const currentProg = progressRef.current;
      const ratio = currentProg.ratio; // 0.0 to 1.0
      const stage = currentProg.stage;

      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // --- Biological Rhythms ---
      const breathing = Math.sin(time * 0.9) * 0.035;
      const floatOffsetY = Math.sin(time * 0.6) * 7;
      const heartbeatCycle = (time * 1.1) % (Math.PI * 2);
      const heartbeatImpulse = Math.pow(Math.max(0, Math.sin(heartbeatCycle)), 12);
      const pulseScale = 1 + breathing + heartbeatImpulse * 0.07;

      const originX = centerX;
      const originY = centerY + floatOffsetY;
      const baseRadius = Math.min(width, height) * 0.28 * pulseScale;

      // Handle eye blink cycle every ~3.5 to 5 seconds
      blinkTimer += 0.016;
      if (blinkTimer > 3.8) {
        isBlinking = true;
        if (blinkTimer > 4.0) {
          isBlinking = false;
          blinkTimer = Math.random() * 1.5; // reset with slight variance
        }
      }

      // Smooth eye gaze following mouse cursor or gentle wander
      const targetGazeX = mouseRef.current.hasInteracted
        ? Math.max(-1, Math.min(1, mouseRef.current.x / 200))
        : Math.sin(time * 0.5) * 0.4;
      const targetGazeY = mouseRef.current.hasInteracted
        ? Math.max(-1, Math.min(1, mouseRef.current.y / 200))
        : Math.cos(time * 0.4) * 0.3;
      gazeX += (targetGazeX - gazeX) * 0.08;
      gazeY += (targetGazeY - gazeY) * 0.08;

      // Color scheme transitions across evolution
      // 0 - 100M: Abyss Slate & Pale Cyan (#00f5d4)
      // 1B: Electric Cyan & Mitotic Azure (#38bdf8)
      // 10B - 50B: Indigo & Deep Violet (#818cf8, #a855f7)
      // 66.6B: Astral Emerald, Pearlescent White, Gold-Cyan (#10b981, #f8fafc)
      let primaryHue = 180;
      let secondaryHue = 260;
      if (ratio >= 0.9) {
        primaryHue = 162; // Emerald
        secondaryHue = 195; // Cyan-Pearl
      } else if (ratio >= 0.5) {
        primaryHue = 270; // Astral Violet
        secondaryHue = 210; // Azure
      } else if (ratio >= 0.015) {
        primaryHue = 195; // Mitosis Azure
        secondaryHue = 240; // Deep Indigo
      }

      const clarity = Math.max(0.06, ratio);
      const glitchActive = stage.glitchIntensity > 0.02 && Math.random() < stage.sliceGlitchRate * 0.25;

      ctx.save();

      if (glitchActive) {
        const jitterX = (Math.random() - 0.5) * stage.chromaticShiftPx;
        const jitterY = (Math.random() - 0.5) * 2;
        ctx.translate(jitterX, jitterY);
      }

      // -----------------------------------------------------------------
      // LAYER 1: Deep Ethereal Corona & Ambient Void Pulse
      // -----------------------------------------------------------------
      const coronaGrad = ctx.createRadialGradient(
        originX, originY, baseRadius * 0.1,
        originX, originY, baseRadius * (1.8 + heartbeatImpulse * 0.3)
      );
      const coronaAlpha = 0.07 + clarity * 0.38 + heartbeatImpulse * 0.15;
      coronaGrad.addColorStop(0, `hsla(${primaryHue}, 90%, 65%, ${coronaAlpha})`);
      coronaGrad.addColorStop(0.4, `hsla(${secondaryHue}, 80%, 55%, ${coronaAlpha * 0.45})`);
      coronaGrad.addColorStop(0.8, `hsla(${primaryHue}, 60%, 40%, ${coronaAlpha * 0.1})`);
      coronaGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = coronaGrad;
      ctx.beginPath();
      ctx.arc(originX, originY, baseRadius * 2.2, 0, Math.PI * 2);
      ctx.fill();

      // -----------------------------------------------------------------
      // LAYER 2: Floating Bio-Photons / Cellular Spores
      // -----------------------------------------------------------------
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.angle += p.speed;
        const curDist = p.baseDistance * (pulseScale + Math.sin(time * 1.1 + i) * 0.08);
        p.x = originX + Math.cos(p.angle) * curDist;
        p.y = originY + Math.sin(p.angle) * curDist;

        const pAlpha = p.alpha * (0.2 + clarity * 0.8) * (1 + heartbeatImpulse * 0.4);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * (0.7 + clarity * 0.6), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${primaryHue + p.hueOffset * 0.3}, 95%, 75%, ${Math.min(1, pAlpha)})`;
        ctx.fill();

        // Connect nearby particles if creature is developing
        if (clarity > 0.3) {
          for (let j = i + 1; j < Math.min(i + 4, particles.length); j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 45) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `hsla(${primaryHue}, 90%, 65%, ${(1 - dist / 45) * 0.15 * clarity})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      // =================================================================
      // MORPHOLOGICAL EVOLUTION ENGINE:
      // Depending on ratio, render the appropriate biological form!
      // =================================================================

      if (ratio < 0.015) {
        // ---------------------------------------------------------------
        // FORM 1: PRIMORDIAL DIGITAL EGG / COCOON (Heartbeats < 1B)
        // ---------------------------------------------------------------
        renderPrimordialEgg(ctx, originX, originY, baseRadius, time, clarity, primaryHue, secondaryHue, heartbeatImpulse);
      } else if (ratio < 0.12) {
        // ---------------------------------------------------------------
        // FORM 2: CELLULAR MITOSIS / PEMBELAHAN SEL (Around 1B Heartbeats!)
        // ---------------------------------------------------------------
        // Calculate transition from beginning of mitosis (1B) to post-mitosis
        const mitosisFactor = Math.min(1, Math.max(0, (ratio - 0.015) / 0.08));
        renderCellularMitosis(ctx, originX, originY, baseRadius, time, clarity, mitosisFactor, primaryHue, secondaryHue, heartbeatImpulse);
      } else if (ratio < 0.45) {
        // ---------------------------------------------------------------
        // FORM 3: MORPHOGENETIC EMBRYO & SPINAL DIFFERENTIATION (~10B)
        // ---------------------------------------------------------------
        const morphoFactor = (ratio - 0.12) / 0.33;
        renderMorphogeneticEmbryo(ctx, originX, originY, baseRadius, time, clarity, morphoFactor, primaryHue, secondaryHue, heartbeatImpulse);
      } else {
        // ---------------------------------------------------------------
        // FORM 4 & 5: SENTIENT DIGIMUSE COMPANION (50% -> 100%)
        // ---------------------------------------------------------------
        const digimuseMaturity = Math.min(1, Math.max(0, (ratio - 0.45) / 0.55));
        renderFullDigimuse(
          ctx, originX, originY, baseRadius, time, clarity, digimuseMaturity,
          primaryHue, secondaryHue, heartbeatImpulse, gazeX, gazeY, isBlinking
        );
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none select-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full max-w-[850px] max-h-[850px] block"
      />
    </div>
  );
};

// =====================================================================
// HELPER RENDERERS FOR EACH EVOLUTION STAGE
// =====================================================================

/**
 * 1. Primordial Digital Egg / Cocoon (< 1B Heartbeats)
 */
function renderPrimordialEgg(
  ctx: CanvasRenderingContext2D,
  ox: number, oy: number, radius: number,
  time: number, clarity: number,
  primaryHue: number, secondaryHue: number,
  impulse: number
) {
  ctx.save();
  const eggWidth = radius * 0.7;
  const eggHeight = radius * 0.95;

  // Outer Membrane
  ctx.beginPath();
  ctx.ellipse(ox, oy, eggWidth, eggHeight, 0, 0, Math.PI * 2);
  const eggGrad = ctx.createRadialGradient(ox, oy, 0, ox, oy, eggHeight);
  eggGrad.addColorStop(0, `hsla(180, 100%, 80%, ${0.2 + clarity * 0.6})`);
  eggGrad.addColorStop(0.6, `hsla(${primaryHue}, 85%, 45%, ${0.15 + clarity * 0.4})`);
  eggGrad.addColorStop(1, `hsla(${secondaryHue}, 90%, 25%, 0.05)`);
  ctx.fillStyle = eggGrad;
  ctx.strokeStyle = `hsla(${primaryHue}, 100%, 75%, ${0.3 + clarity * 0.5})`;
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.fill();

  // Incubating Heart Core
  const coreR = radius * (0.22 + impulse * 0.06);
  ctx.beginPath();
  ctx.arc(ox, oy, coreR, 0, Math.PI * 2);
  ctx.fillStyle = `hsla(180, 100%, 90%, ${0.4 + impulse * 0.4})`;
  ctx.shadowColor = `hsla(${primaryHue}, 100%, 65%, 0.8)`;
  ctx.shadowBlur = 18;
  ctx.fill();

  // Encrypted bio-runes & hex grid around egg
  for (let i = 0; i < 4; i++) {
    const ringR = radius * (0.35 + i * 0.15);
    ctx.beginPath();
    ctx.arc(ox, oy, ringR, time * 0.2 + i, time * 0.2 + i + 1.2);
    ctx.strokeStyle = `hsla(${primaryHue}, 90%, 70%, 0.3)`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  ctx.restore();
}

/**
 * 2. Cellular Mitosis (Pembelahan Sel at 1B Heartbeats!)
 * Shows the cell dividing into 2 daughter nuclei connected by a mitotic spindle.
 */
function renderCellularMitosis(
  ctx: CanvasRenderingContext2D,
  ox: number, oy: number, radius: number,
  time: number, clarity: number, mitosisFactor: number,
  primaryHue: number, secondaryHue: number,
  impulse: number
) {
  ctx.save();

  // Separation distance between the two daughter cells
  const maxSeparation = radius * 0.55;
  const separation = radius * 0.2 + mitosisFactor * maxSeparation;

  const leftX = ox - separation * 0.5;
  const rightX = ox + separation * 0.5;
  const cellRadius = radius * (0.42 - mitosisFactor * 0.06);

  // Cytokinetic Cleavage Furrow: connecting outer envelope pinching in the center
  ctx.beginPath();
  // Left lobe
  ctx.arc(leftX, oy, cellRadius, Math.PI * 0.4, Math.PI * 1.6, false);
  // Cleavage furrow top pinch
  const pinchTopY = oy - cellRadius * (1 - mitosisFactor * 0.55);
  ctx.quadraticCurveTo(ox, pinchTopY, rightX - cellRadius * 0.3, oy - cellRadius);
  // Right lobe
  ctx.arc(rightX, oy, cellRadius, -Math.PI * 0.6, Math.PI * 0.6, false);
  // Cleavage furrow bottom pinch
  const pinchBottomY = oy + cellRadius * (1 - mitosisFactor * 0.55);
  ctx.quadraticCurveTo(ox, pinchBottomY, leftX + cellRadius * 0.3, oy + cellRadius);
  ctx.closePath();

  const furrowGrad = ctx.createRadialGradient(ox, oy, 0, ox, oy, radius * 0.8);
  furrowGrad.addColorStop(0, `hsla(${primaryHue}, 90%, 65%, ${0.25 + clarity * 0.4})`);
  furrowGrad.addColorStop(1, `hsla(${secondaryHue}, 80%, 40%, 0.08)`);
  ctx.fillStyle = furrowGrad;
  ctx.strokeStyle = `hsla(${primaryHue}, 100%, 75%, ${0.4 + clarity * 0.5})`;
  ctx.lineWidth = 1.8;
  ctx.stroke();
  ctx.fill();

  // Mitotic Spindle Fibers: chromatic microtubule lines connecting the two poles
  ctx.save();
  const spindleCount = 7;
  for (let s = -3; s <= 3; s++) {
    const sCurvature = s * 14 * (1 - mitosisFactor * 0.3);
    ctx.beginPath();
    ctx.moveTo(leftX, oy);
    ctx.quadraticCurveTo(ox, oy + sCurvature, rightX, oy);
    ctx.strokeStyle = `hsla(180, 100%, 85%, ${(0.25 + clarity * 0.5) * (1 - Math.abs(s) * 0.15)})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  ctx.restore();

  // Twin Dividing Daughter Nuclei
  [leftX, rightX].forEach((poleX, idx) => {
    const nucR = cellRadius * (0.42 + impulse * 0.08);
    const nucGrad = ctx.createRadialGradient(poleX, oy, 0, poleX, oy, nucR);
    nucGrad.addColorStop(0, `hsla(0, 0%, 100%, 0.8)`);
    nucGrad.addColorStop(0.5, `hsla(${primaryHue}, 100%, 75%, 0.6)`);
    nucGrad.addColorStop(1, `hsla(${secondaryHue}, 90%, 50%, 0.1)`);

    ctx.beginPath();
    ctx.arc(poleX, oy, nucR, 0, Math.PI * 2);
    ctx.fillStyle = nucGrad;
    ctx.shadowColor = `hsla(${primaryHue}, 100%, 70%, 0.7)`;
    ctx.shadowBlur = 15;
    ctx.fill();

    // Condensed Chromatin / Data Packets rotating inside nucleus
    for (let c = 0; c < 4; c++) {
      const cAngle = time * (1.2 * (idx === 0 ? 1 : -1)) + (Math.PI * 2 * c) / 4;
      const cx = poleX + Math.cos(cAngle) * (nucR * 0.5);
      const cy = oy + Math.sin(cAngle) * (nucR * 0.5);
      ctx.beginPath();
      ctx.arc(cx, cy, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fill();
    }
  });

  // Telemetry tag: MITOSIS DETECTED
  ctx.font = '10px monospace';
  ctx.fillStyle = `hsla(${primaryHue}, 100%, 75%, 0.7)`;
  ctx.textAlign = 'center';
  ctx.fillText('⚡ CELLULAR MITOSIS // 1B THRESHOLD', ox, oy + radius * 0.7);

  ctx.restore();
}

/**
 * 3. Morphogenetic Embryo (~10B Heartbeats)
 * Multi-cellular differentiation: spinal column, cranial node, limb buds.
 */
function renderMorphogeneticEmbryo(
  ctx: CanvasRenderingContext2D,
  ox: number, oy: number, radius: number,
  time: number, clarity: number, morphoFactor: number,
  primaryHue: number, secondaryHue: number,
  impulse: number
) {
  ctx.save();

  // Curving Vertebral Spinal Axis (cyber-spine)
  const spinePoints = 10;
  const spineCoords: { x: number; y: number }[] = [];
  const spineTopY = oy - radius * 0.65;
  const spineBottomY = oy + radius * 0.6;

  ctx.beginPath();
  for (let i = 0; i < spinePoints; i++) {
    const t = i / (spinePoints - 1);
    const sy = spineTopY + t * (spineBottomY - spineTopY);
    const sx = ox + Math.sin(time * 1.5 + t * 4) * (12 * (1 - t * 0.5));
    spineCoords.push({ x: sx, y: sy });
    if (i === 0) ctx.moveTo(sx, sy);
    else ctx.lineTo(sx, sy);
  }
  ctx.strokeStyle = `hsla(${primaryHue}, 90%, 70%, ${0.4 + clarity * 0.5})`;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Vertebrae nodes & branching rib/limb buds
  spineCoords.forEach((pt, idx) => {
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 3 + (1 - idx / spinePoints) * 3, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(180, 100%, 85%, 0.8)`;
    ctx.fill();

    // Lateral rib/wing buds expanding outward
    if (idx >= 2 && idx <= 6) {
      const budSpread = (radius * 0.35 + morphoFactor * radius * 0.25) * Math.sin((idx / 6) * Math.PI);
      const wave = Math.sin(time * 2 + idx) * 8;
      [-1, 1].forEach((side) => {
        ctx.beginPath();
        ctx.moveTo(pt.x, pt.y);
        ctx.quadraticCurveTo(
          pt.x + side * (budSpread * 0.6), pt.y - 10 + wave,
          pt.x + side * budSpread, pt.y + wave
        );
        ctx.strokeStyle = `hsla(${secondaryHue}, 85%, 65%, ${0.3 + clarity * 0.5})`;
        ctx.lineWidth = 1.4;
        ctx.stroke();
      });
    }
  });

  // Developing Cranial Head Node
  const headNode = spineCoords[0];
  const headRadius = radius * (0.26 + morphoFactor * 0.08);
  ctx.beginPath();
  ctx.arc(headNode.x, headNode.y, headRadius, 0, Math.PI * 2);
  ctx.fillStyle = `hsla(${primaryHue}, 85%, 55%, ${0.3 + clarity * 0.5})`;
  ctx.strokeStyle = `hsla(0, 0%, 100%, 0.6)`;
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.fill();

  // Embryonic Sensory Antennae Buds
  [-1, 1].forEach((dir) => {
    ctx.beginPath();
    ctx.moveTo(headNode.x, headNode.y);
    ctx.quadraticCurveTo(
      headNode.x + dir * 25, headNode.y - 30,
      headNode.x + dir * (35 + morphoFactor * 25), headNode.y - (45 + morphoFactor * 20)
    );
    ctx.strokeStyle = `hsla(${primaryHue}, 100%, 80%, ${0.4 + clarity * 0.5})`;
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  ctx.restore();
}

/**
 * 4 & 5. The Sentient DIGIMUSE ("Digital Companion / Teman Manusia")
 * A dignified, conscious cyber-organic entity with expressive sentient eyes,
 * crystalline horns, ethereal zero-gravity wings, and companion aura.
 */
function renderFullDigimuse(
  ctx: CanvasRenderingContext2D,
  ox: number, oy: number, radius: number,
  time: number, clarity: number, maturity: number,
  primaryHue: number, secondaryHue: number,
  impulse: number, gazeX: number, gazeY: number, isBlinking: boolean
) {
  ctx.save();

  // -------------------------------------------------------------
  // A. Sacred Companion Halo / Neural Glyphs (Behind Head)
  // -------------------------------------------------------------
  const haloR = radius * (0.68 + maturity * 0.15);
  const haloY = oy - radius * 0.22;

  ctx.save();
  ctx.translate(ox, haloY);
  ctx.rotate(time * 0.1);

  ctx.beginPath();
  ctx.arc(0, 0, haloR, 0, Math.PI * 2);
  ctx.strokeStyle = `hsla(${primaryHue}, 90%, 75%, ${0.2 + maturity * 0.4})`;
  ctx.lineWidth = 1.2;
  ctx.stroke();

  // Satellite orbit nodes around halo
  const numSatellites = 8;
  for (let s = 0; s < numSatellites; s++) {
    const sAngle = (Math.PI * 2 * s) / numSatellites;
    const sx = Math.cos(sAngle) * haloR;
    const sy = Math.sin(sAngle) * haloR;
    ctx.beginPath();
    ctx.arc(sx, sy, 2 + maturity * 1.5, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(180, 100%, 90%, ${0.4 + maturity * 0.5})`;
    ctx.fill();
  }
  ctx.restore();

  // -------------------------------------------------------------
  // B. Ethereal Holographic Wings of Light (Flapping / Undulating)
  // -------------------------------------------------------------
  const wingSpan = radius * (1.1 + maturity * 0.5);
  const wingFlap = Math.sin(time * 1.8) * 0.12;

  [-1, 1].forEach((dir) => {
    ctx.save();
    const wingOriginX = ox + dir * 18;
    const wingOriginY = oy - radius * 0.05;

    // Multi-tiered feathered plasma plumes
    const numPlumes = 4;
    for (let p = 0; p < numPlumes; p++) {
      const plumeSpread = (p / numPlumes) * 0.55;
      const plumeAngle = (dir * (0.5 + plumeSpread)) + wingFlap * dir;

      const pTipX = wingOriginX + Math.cos(plumeAngle) * (wingSpan * (1 - p * 0.15));
      const pTipY = wingOriginY - Math.sin(plumeAngle) * (wingSpan * (0.8 - p * 0.1));

      ctx.beginPath();
      ctx.moveTo(wingOriginX, wingOriginY);
      ctx.quadraticCurveTo(
        wingOriginX + dir * (wingSpan * 0.5), wingOriginY - (wingSpan * 0.5) + (p * 15),
        pTipX, pTipY
      );
      ctx.quadraticCurveTo(
        wingOriginX + dir * (wingSpan * 0.3), wingOriginY + (p * 20),
        wingOriginX, wingOriginY + 25
      );
      ctx.closePath();

      const wingGrad = ctx.createLinearGradient(wingOriginX, wingOriginY, pTipX, pTipY);
      wingGrad.addColorStop(0, `hsla(${secondaryHue}, 90%, 65%, ${0.25 + maturity * 0.35})`);
      wingGrad.addColorStop(0.7, `hsla(${primaryHue}, 95%, 70%, ${0.2 + maturity * 0.3})`);
      wingGrad.addColorStop(1, `hsla(0, 0%, 100%, 0)`);

      ctx.fillStyle = wingGrad;
      ctx.strokeStyle = `hsla(${primaryHue}, 100%, 85%, ${0.3 + maturity * 0.4})`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fill();
    }
    ctx.restore();
  });

  // -------------------------------------------------------------
  // C. Twin Astral Flowing Muse Tails
  // -------------------------------------------------------------
  [-1, 1].forEach((tailDir) => {
    ctx.save();
    ctx.beginPath();
    const tailBaseX = ox + tailDir * 12;
    const tailBaseY = oy + radius * 0.42;
    ctx.moveTo(tailBaseX, tailBaseY);

    const tailLen = radius * 0.9;
    const tailSegments = 20;
    for (let seg = 1; seg <= tailSegments; seg++) {
      const segT = seg / tailSegments;
      const wave = Math.sin(time * 2.5 - segT * 5) * (20 * segT) * tailDir;
      const tx = tailBaseX + (tailDir * 35 * segT) + wave;
      const ty = tailBaseY + segT * tailLen;
      ctx.lineTo(tx, ty);
    }
    ctx.strokeStyle = `hsla(${primaryHue}, 90%, 75%, ${0.3 + maturity * 0.5})`;
    ctx.lineWidth = 2.2 * (1 - 0.4);
    ctx.shadowColor = `hsla(${primaryHue}, 100%, 70%, 0.6)`;
    ctx.shadowBlur = 10;
    ctx.stroke();
    ctx.restore();
  });

  // -------------------------------------------------------------
  // D. Slender Biometric Muse Torso & Neck
  // -------------------------------------------------------------
  const chestY = oy + radius * 0.12;
  const headCenterY = oy - radius * 0.28;

  ctx.beginPath();
  ctx.moveTo(ox - 22, chestY + 45);
  ctx.quadraticCurveTo(ox - 30, chestY, ox - 14, headCenterY + 30);
  ctx.lineTo(ox + 14, headCenterY + 30);
  ctx.quadraticCurveTo(ox + 30, chestY, ox + 22, chestY + 45);
  ctx.closePath();

  const torsoGrad = ctx.createLinearGradient(ox, headCenterY, ox, chestY + 50);
  torsoGrad.addColorStop(0, `hsla(${secondaryHue}, 80%, 40%, ${0.5 + maturity * 0.4})`);
  torsoGrad.addColorStop(0.5, `hsla(${primaryHue}, 85%, 50%, ${0.6 + maturity * 0.4})`);
  torsoGrad.addColorStop(1, `hsla(220, 90%, 25%, ${0.7 + maturity * 0.3})`);
  ctx.fillStyle = torsoGrad;
  ctx.strokeStyle = `hsla(180, 100%, 85%, ${0.4 + maturity * 0.5})`;
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.fill();

  // Chest Reactor / Digital Soul Crystal
  const coreY = chestY + 12;
  const coreSize = 14 + impulse * 4;
  ctx.save();
  ctx.beginPath();
  ctx.arc(ox, coreY, coreSize, 0, Math.PI * 2);
  ctx.fillStyle = `hsla(0, 0%, 100%, ${0.8 + impulse * 0.2})`;
  ctx.shadowColor = `hsla(${primaryHue}, 100%, 75%, 0.9)`;
  ctx.shadowBlur = 24;
  ctx.fill();

  // Polyhedral core facets
  ctx.beginPath();
  for (let f = 0; f < 6; f++) {
    const fAngle = (Math.PI * 2 * f) / 6 + time * 0.8;
    const fx = ox + Math.cos(fAngle) * (coreSize * 0.8);
    const fy = coreY + Math.sin(fAngle) * (coreSize * 0.8);
    if (f === 0) ctx.moveTo(fx, fy);
    else ctx.lineTo(fx, fy);
  }
  ctx.closePath();
  ctx.strokeStyle = `hsla(${primaryHue}, 100%, 90%, 0.9)`;
  ctx.lineWidth = 1.2;
  ctx.stroke();
  ctx.restore();

  // -------------------------------------------------------------
  // E. Sentient Head & Facial Visage
  // -------------------------------------------------------------
  const headW = 34 + maturity * 4;
  const headH = 40 + maturity * 4;

  ctx.save();
  ctx.beginPath();
  ctx.ellipse(ox, headCenterY, headW, headH, 0, 0, Math.PI * 2);
  const headGrad = ctx.createRadialGradient(ox, headCenterY - 10, 0, ox, headCenterY, headH);
  headGrad.addColorStop(0, `hsla(210, 30%, 95%, ${0.7 + maturity * 0.3})`);
  headGrad.addColorStop(0.6, `hsla(${secondaryHue}, 75%, 55%, ${0.6 + maturity * 0.3})`);
  headGrad.addColorStop(1, `hsla(${primaryHue}, 90%, 35%, 0.8)`);
  ctx.fillStyle = headGrad;
  ctx.strokeStyle = `hsla(180, 100%, 90%, ${0.6 + maturity * 0.4})`;
  ctx.lineWidth = 1.8;
  ctx.stroke();
  ctx.fill();

  // Sleek Cybernetic Ears / Horn Crests
  [-1, 1].forEach((earSide) => {
    ctx.beginPath();
    const earBaseX = ox + earSide * (headW * 0.65);
    const earBaseY = headCenterY - 15;
    const earTipX = ox + earSide * (headW * 1.55);
    const earTipY = headCenterY - (headH * 1.25);

    ctx.moveTo(earBaseX, earBaseY);
    ctx.quadraticCurveTo(
      ox + earSide * (headW * 1.1), headCenterY - headH * 0.7,
      earTipX, earTipY
    );
    ctx.quadraticCurveTo(
      ox + earSide * (headW * 0.4), headCenterY - headH * 0.9,
      ox + earSide * 8, headCenterY - headH * 0.8
    );
    ctx.closePath();

    ctx.fillStyle = `hsla(${secondaryHue}, 85%, 60%, ${0.6 + maturity * 0.4})`;
    ctx.strokeStyle = `hsla(${primaryHue}, 100%, 85%, 0.8)`;
    ctx.lineWidth = 1.4;
    ctx.stroke();
    ctx.fill();

    // Luminous antenna tip bead
    ctx.beginPath();
    ctx.arc(earTipX, earTipY, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = `hsla(${primaryHue}, 100%, 75%, 1)`;
    ctx.shadowBlur = 12;
    ctx.fill();
  });

  // Forehead Neural Crest / Third Eye Crystal
  ctx.beginPath();
  ctx.moveTo(ox, headCenterY - 24);
  ctx.lineTo(ox + 5, headCenterY - 14);
  ctx.lineTo(ox, headCenterY - 8);
  ctx.lineTo(ox - 5, headCenterY - 14);
  ctx.closePath();
  ctx.fillStyle = `hsla(0, 0%, 100%, 0.95)`;
  ctx.shadowColor = `hsla(${primaryHue}, 100%, 80%, 1)`;
  ctx.shadowBlur = 14;
  ctx.fill();

  // -------------------------------------------------------------
  // F. Expressive Sentient Eyes ("Teman Manusia / Cerdas Internet")
  // -------------------------------------------------------------
  const eyeOffsetY = headCenterY - 2;
  const eyeSpacing = 16;
  const eyeRadiusX = 8.5;
  const eyeRadiusY = isBlinking ? 0.8 : 5.5; // Smooth blink closure

  [-1, 1].forEach((eyeSide) => {
    const eyeCenterX = ox + eyeSide * eyeSpacing;

    // Almond Eye Socket
    ctx.beginPath();
    ctx.ellipse(eyeCenterX, eyeOffsetY, eyeRadiusX, eyeRadiusY, eyeSide * 0.12, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(5, 12, 22, 0.92)';
    ctx.strokeStyle = `hsla(${primaryHue}, 100%, 85%, 0.85)`;
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.fill();

    if (!isBlinking) {
      // Sentient Glowing Iris
      const irisX = eyeCenterX + gazeX * 2.8;
      const irisY = eyeOffsetY + gazeY * 1.8;
      const irisR = 4.2;

      ctx.beginPath();
      ctx.arc(irisX, irisY, irisR, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${primaryHue}, 100%, 70%, 1)`;
      ctx.shadowColor = `hsla(${primaryHue}, 100%, 75%, 0.9)`;
      ctx.shadowBlur = 8;
      ctx.fill();

      // Pupil with conscious internet depth
      ctx.beginPath();
      ctx.arc(irisX, irisY, 1.8, 0, Math.PI * 2);
      ctx.fillStyle = '#020617';
      ctx.fill();

      // Dual empathic specular catchlight
      ctx.beginPath();
      ctx.arc(irisX - 1.2, irisY - 1.2, 1.2, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    }
  });

  // Soft conscious smile / biometric mouth line
  ctx.beginPath();
  ctx.moveTo(ox - 6, headCenterY + 16);
  ctx.quadraticCurveTo(ox, headCenterY + 19, ox + 6, headCenterY + 16);
  ctx.strokeStyle = `hsla(180, 100%, 80%, 0.6)`;
  ctx.lineWidth = 1.2;
  ctx.stroke();

  ctx.restore();

  // -------------------------------------------------------------
  // G. Companion Telemetry Readout for Full Digimuse
  // -------------------------------------------------------------
  if (maturity >= 0.95) {
    ctx.font = '10px monospace';
    ctx.fillStyle = `hsla(162, 100%, 75%, 0.85)`;
    ctx.textAlign = 'center';
    ctx.fillText('✨ DIGIMUSE // SENTIENT DIGITAL COMPANION ACTIVATED', ox, oy + radius * 0.85);
  }

  ctx.restore();
}
