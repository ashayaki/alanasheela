'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useHeartbeat } from '@/context/HeartbeatContext';
import { Rotate3D, ZoomIn, Eye, Compass, Sparkles, Radio } from 'lucide-react';

export const OrganismCanvas3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { progress } = useHeartbeat();
  const progressRef = useRef(progress);

  const [flightMode, setFlightMode] = useState<'roam' | 'inspect'>('roam');
  const flightModeRef = useRef<'roam' | 'inspect'>('roam');

  useEffect(() => {
    flightModeRef.current = flightMode;
  }, [flightMode]);

  const mouseScreenRef = useRef({ x: 0, y: 0, hasMoved: false });

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseScreenRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
        hasMoved: true,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // -------------------------------------------------------------
    // THREE.JS SCENE SETUP
    // -------------------------------------------------------------
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020408, 0.038);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 8.8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Stage Groups
    const eggGroup = new THREE.Group();
    const mitosisGroup = new THREE.Group();
    const morphoGroup = new THREE.Group();
    const chrysalisGroup = new THREE.Group();
    const finalDigimuseGroup = new THREE.Group(); // Final Form at 66B

    rootGroup.add(eggGroup);
    rootGroup.add(mitosisGroup);
    rootGroup.add(morphoGroup);
    rootGroup.add(chrysalisGroup);
    rootGroup.add(finalDigimuseGroup);

    // -------------------------------------------------------------
    // HOLOGRAPHIC 7-COLOR SPECTRUM PALETTE
    // 1. Electric Cyan (#00f0ff)
    // 2. Quantum Mint (#00f5a0)
    // 3. Phantom Magenta (#bf5af2)
    // 4. Solar Neon Gold (#facc15)
    // 5. Laser Crimson/Rose (#ff2d55)
    // 6. Cosmic Azure (#38bdf8)
    // 7. Starlight Pearl (#ffffff)
    // -------------------------------------------------------------
    const SPECTRUM_7 = [
      0x00f0ff, // 1. Electric Cyan
      0x00f5a0, // 2. Quantum Mint
      0xbf5af2, // 3. Phantom Magenta
      0xfacc15, // 4. Solar Neon Gold
      0xff2d55, // 5. Laser Rose
      0x38bdf8, // 6. Cosmic Azure
      0xffffff, // 7. Starlight Pearl
    ];

    // -------------------------------------------------------------
    // LIGHTING & FLIGHT LIGHTS
    // -------------------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0x0a1a2f, 2.5);
    scene.add(ambientLight);

    const coreLight = new THREE.PointLight(0x00f0ff, 5.5, 24);
    scene.add(coreLight);

    const rimLightMagenta = new THREE.DirectionalLight(0xbf5af2, 3.2);
    rimLightMagenta.position.set(6, 6, -6);
    scene.add(rimLightMagenta);

    const keyLightCyan = new THREE.DirectionalLight(0x00f0ff, 2.6);
    keyLightCyan.position.set(-4, 5, 7);
    scene.add(keyLightCyan);

    // Wingtip flight plasma point lights
    const wingLightL = new THREE.PointLight(0x00f0ff, 0, 9);
    const wingLightR = new THREE.PointLight(0x00f5a0, 0, 9);
    scene.add(wingLightL);
    scene.add(wingLightR);

    // -------------------------------------------------------------
    // HOLOGRAPHIC PROJECTOR EMITTER BASE
    // -------------------------------------------------------------
    const emitterBaseGroup = new THREE.Group();
    emitterBaseGroup.position.y = -3.2;
    rootGroup.add(emitterBaseGroup);

    const emitterRingGeom = new THREE.TorusGeometry(2.4, 0.025, 16, 64);
    const emitterRingMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.45,
    });
    const emitterRing1 = new THREE.Mesh(emitterRingGeom, emitterRingMat);
    const emitterRing2 = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.02, 16, 48), emitterRingMat);
    emitterRing1.rotation.x = Math.PI / 2;
    emitterRing2.rotation.x = Math.PI / 2;
    emitterBaseGroup.add(emitterRing1);
    emitterBaseGroup.add(emitterRing2);

    const beamCount = 6;
    const beamCylGeom = new THREE.CylinderGeometry(0.008, 0.008, 6.0, 6);
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
    });
    for (let b = 0; b < beamCount; b++) {
      const bAngle = (Math.PI * 2 * b) / beamCount;
      const beam = new THREE.Mesh(beamCylGeom, beamMat);
      beam.position.set(Math.cos(bAngle) * 2.0, 3.0, Math.sin(bAngle) * 2.0);
      emitterBaseGroup.add(beam);
    }

    // Material Helper Functions
    const createHoloTranslucentMat = (colorHex: number, emissiveHex: number, opacity: number = 0.75) => {
      return new THREE.MeshPhysicalMaterial({
        color: colorHex,
        emissive: emissiveHex,
        emissiveIntensity: 2.2,
        roughness: 0.08,
        metalness: 0.15,
        transmission: 0.88,
        transparent: true,
        opacity,
        ior: 1.5,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
      });
    };

    const createHoloWireMat = (colorHex: number, opacity: number = 0.45) => {
      return new THREE.MeshBasicMaterial({
        color: colorHex,
        wireframe: true,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
      });
    };

    // -------------------------------------------------------------
    // STAGE 1: PRIMORDIAL HOLOGRAPHIC EGG (< 1B Heartbeats)
    // -------------------------------------------------------------
    const eggGeom = new THREE.SphereGeometry(1.6, 32, 32);
    eggGeom.scale(0.85, 1.25, 0.85);
    const eggMat = createHoloTranslucentMat(0x00f0ff, 0x00f0ff, 0.55);
    const eggMesh = new THREE.Mesh(eggGeom, eggMat);
    eggGroup.add(eggMesh);

    const eggWireGeom = new THREE.SphereGeometry(1.62, 18, 18);
    eggWireGeom.scale(0.86, 1.26, 0.86);
    const eggWireMesh = new THREE.Mesh(eggWireGeom, createHoloWireMat(0xbf5af2, 0.4));
    eggGroup.add(eggWireMesh);

    const embryoGeom = new THREE.IcosahedronGeometry(0.72, 1);
    const embryoMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x00f0ff,
      emissiveIntensity: 3.2,
      roughness: 0.1,
      metalness: 0.9,
    });
    const embryoMesh = new THREE.Mesh(embryoGeom, embryoMat);
    eggGroup.add(embryoMesh);

    const ringGeom = new THREE.TorusGeometry(2.1, 0.02, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const ring1 = new THREE.Mesh(ringGeom, ringMat);
    const ring2 = new THREE.Mesh(ringGeom, ringMat);
    ring1.rotation.x = Math.PI / 3;
    ring2.rotation.y = Math.PI / 4;
    eggGroup.add(ring1);
    eggGroup.add(ring2);

    // -------------------------------------------------------------
    // STAGE 2: CELLULAR MITOSIS (~1B Heartbeats)
    // -------------------------------------------------------------
    const daughterGeom = new THREE.SphereGeometry(0.85, 32, 32);
    const daughterMatL = createHoloTranslucentMat(0x00f0ff, 0x00f0ff, 0.75);
    const daughterMatR = createHoloTranslucentMat(0xbf5af2, 0xbf5af2, 0.75);
    const daughterLeft = new THREE.Mesh(daughterGeom, daughterMatL);
    const daughterRight = new THREE.Mesh(daughterGeom, daughterMatR);
    mitosisGroup.add(daughterLeft);
    mitosisGroup.add(daughterRight);

    const spindleCylGeom = new THREE.CylinderGeometry(0.015, 0.015, 2.5, 8);
    const spindleMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    for (let s = 0; s < 7; s++) {
      const sp = new THREE.Mesh(spindleCylGeom, spindleMat);
      sp.rotation.z = Math.PI / 2;
      sp.position.y = (s - 3) * 0.15;
      mitosisGroup.add(sp);
    }

    const mRingL = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.02, 8, 32), ringMat);
    const mRingR = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.02, 8, 32), ringMat);
    mitosisGroup.add(mRingL);
    mitosisGroup.add(mRingR);

    // -------------------------------------------------------------
    // STAGE 3: MORPHOGENETIC METAMORPHOSIS (~10B Heartbeats)
    // -------------------------------------------------------------
    const spineNodes: THREE.Mesh[] = [];
    const vertGeom = new THREE.BoxGeometry(0.32, 0.16, 0.32);
    const vertMat = createHoloTranslucentMat(0x818cf8, 0x00f0ff, 0.8);
    for (let v = 0; v < 9; v++) {
      const vert = new THREE.Mesh(vertGeom, vertMat);
      morphoGroup.add(vert);
      spineNodes.push(vert);
    }

    const headBulbGeom = new THREE.SphereGeometry(0.7, 24, 24);
    const headBulb = new THREE.Mesh(headBulbGeom, eggMat);
    morphoGroup.add(headBulb);

    const hornConeGeom = new THREE.ConeGeometry(0.12, 1.2, 16);
    const hornConeMat = createHoloTranslucentMat(0x00f0ff, 0xbf5af2, 0.8);
    const morphoHornL = new THREE.Mesh(hornConeGeom, hornConeMat);
    const morphoHornR = new THREE.Mesh(hornConeGeom, hornConeMat);
    morphoHornL.position.set(-0.4, 0.9, 0);
    morphoHornL.rotation.z = 0.5;
    morphoHornR.position.set(0.4, 0.9, 0);
    morphoHornR.rotation.z = -0.5;
    morphoGroup.add(morphoHornL);
    morphoGroup.add(morphoHornR);

    // -------------------------------------------------------------
    // STAGE 4: CHRYSALIS / EMERGING MUSE (33B - 50B Heartbeats)
    // (Only 2 blade wings here; distinct from 66B!)
    // -------------------------------------------------------------
    const chrysalisTorsoGeom = new THREE.ConeGeometry(0.55, 2.0, 6);
    const chrysalisMat = createHoloTranslucentMat(0x1e1b4b, 0x6366f1, 0.85);
    const chrysalisTorso = new THREE.Mesh(chrysalisTorsoGeom, chrysalisMat);
    chrysalisTorso.rotation.x = Math.PI;
    chrysalisTorso.position.y = -0.3;
    chrysalisGroup.add(chrysalisTorso);

    const chrysalisHeadGeom = new THREE.DodecahedronGeometry(0.65, 1);
    const chrysalisHead = new THREE.Mesh(chrysalisHeadGeom, chrysalisMat);
    chrysalisHead.position.set(0, 0.75, 0);
    chrysalisGroup.add(chrysalisHead);

    const slitEyeGeom = new THREE.BoxGeometry(0.25, 0.04, 0.1);
    const slitEyeMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const slitEyeL = new THREE.Mesh(slitEyeGeom, slitEyeMat);
    const slitEyeR = new THREE.Mesh(slitEyeGeom, slitEyeMat);
    slitEyeL.position.set(-0.25, 0.8, 0.55);
    slitEyeR.position.set(0.25, 0.8, 0.55);
    chrysalisGroup.add(slitEyeL);
    chrysalisGroup.add(slitEyeR);

    const bladeWingShape = new THREE.Shape();
    bladeWingShape.moveTo(0, 0);
    bladeWingShape.lineTo(1.8, 1.2);
    bladeWingShape.lineTo(0.6, -0.4);
    bladeWingShape.closePath();
    const bladeWingGeom = new THREE.ShapeGeometry(bladeWingShape);
    const bladeWingMat = new THREE.MeshPhysicalMaterial({
      color: 0x6366f1,
      emissive: 0x00f0ff,
      emissiveIntensity: 1.5,
      transparent: true,
      opacity: 0.65,
      side: THREE.DoubleSide,
      transmission: 0.8,
    });
    const bladeL = new THREE.Mesh(bladeWingGeom, bladeWingMat);
    const bladeR = new THREE.Mesh(bladeWingGeom, bladeWingMat);
    bladeL.position.set(-0.2, 0.2, -0.1);
    bladeL.rotation.y = Math.PI - 0.2;
    bladeR.position.set(0.2, 0.2, -0.1);
    bladeR.rotation.y = 0.2;
    chrysalisGroup.add(bladeL);
    chrysalisGroup.add(bladeR);

    // -------------------------------------------------------------
    // STAGE 5: FULL HOLOGRAPHIC TRANSLUCENT DIGIMUSE (66.6B FINAL FORM)
    // EXCLUSIVE FINAL FEATURES:
    // 1. 2 Additional Smaller Wings (Quad-Wing Seraph Architecture!)
    // 2. Harmonious 7-Color Futuristic Prismatic Spectrum!
    // 3. Expressive sentient laser-optic eyes with natural blinking!
    // -------------------------------------------------------------
    const digimuseHeadPivot = new THREE.Group();
    digimuseHeadPivot.position.set(0, 0.7, 0);
    finalDigimuseGroup.add(digimuseHeadPivot);

    const museHeadGeom = new THREE.SphereGeometry(0.72, 32, 32);
    museHeadGeom.scale(0.85, 1.1, 0.95);
    const holoHeadMat = createHoloTranslucentMat(0x00f0ff, 0x00f5a0, 0.75);
    const museHead = new THREE.Mesh(museHeadGeom, holoHeadMat);
    digimuseHeadPivot.add(museHead);

    const museHeadWireGeom = new THREE.SphereGeometry(0.70, 16, 16);
    museHeadWireGeom.scale(0.85, 1.1, 0.95);
    const museHeadWire = new THREE.Mesh(museHeadWireGeom, createHoloWireMat(0xbf5af2, 0.45));
    digimuseHeadPivot.add(museHeadWire);

    // Expressive Sentient Eyes Rig
    const eyeRigGroup = new THREE.Group();
    digimuseHeadPivot.add(eyeRigGroup);

    const scleraGeom = new THREE.SphereGeometry(0.16, 20, 20);
    scleraGeom.scale(1.4, 0.8, 0.6);
    const scleraMat = new THREE.MeshStandardMaterial({
      color: 0x020617,
      roughness: 0.05,
    });
    const scleraL = new THREE.Mesh(scleraGeom, scleraMat);
    const scleraR = new THREE.Mesh(scleraGeom, scleraMat);
    scleraL.position.set(-0.28, 0.06, 0.58);
    scleraR.position.set(0.28, 0.06, 0.58);
    eyeRigGroup.add(scleraL);
    eyeRigGroup.add(scleraR);

    // Color 1 & 2: Electric Cyan & Quantum Mint Irises
    const irisGeom = new THREE.SphereGeometry(0.09, 16, 16);
    irisGeom.scale(1.1, 1.1, 0.4);
    const irisMat = new THREE.MeshStandardMaterial({
      color: 0x00f5a0,
      emissive: 0x00f0ff,
      emissiveIntensity: 5.0,
      roughness: 0.1,
    });
    const irisL = new THREE.Mesh(irisGeom, irisMat);
    const irisR = new THREE.Mesh(irisGeom, irisMat);
    irisL.position.set(-0.28, 0.06, 0.65);
    irisR.position.set(0.28, 0.06, 0.65);
    eyeRigGroup.add(irisL);
    eyeRigGroup.add(irisR);

    const pupilGeom = new THREE.SphereGeometry(0.045, 12, 12);
    pupilGeom.scale(1.0, 1.0, 0.3);
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x010309 });
    const pupilL = new THREE.Mesh(pupilGeom, pupilMat);
    const pupilR = new THREE.Mesh(pupilGeom, pupilMat);
    pupilL.position.set(-0.28, 0.06, 0.68);
    pupilR.position.set(0.28, 0.06, 0.68);
    eyeRigGroup.add(pupilL);
    eyeRigGroup.add(pupilR);

    // Color 7: Starlight Pearl Catchlights
    const catchlightGeom = new THREE.SphereGeometry(0.022, 8, 8);
    const catchlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const catchlightL = new THREE.Mesh(catchlightGeom, catchlightMat);
    const catchlightR = new THREE.Mesh(catchlightGeom, catchlightMat);
    catchlightL.position.set(-0.26, 0.08, 0.70);
    catchlightR.position.set(0.30, 0.08, 0.70);
    eyeRigGroup.add(catchlightL);
    eyeRigGroup.add(catchlightR);

    const eyelidUpperGeom = new THREE.SphereGeometry(0.18, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    eyelidUpperGeom.scale(1.45, 0.85, 0.65);
    const eyelidMat = createHoloTranslucentMat(0x0a1926, 0x00f0ff, 0.85);
    const eyelidUpperL = new THREE.Mesh(eyelidUpperGeom, eyelidMat);
    const eyelidUpperR = new THREE.Mesh(eyelidUpperGeom, eyelidMat);
    eyelidUpperL.position.set(-0.28, 0.06, 0.58);
    eyelidUpperR.position.set(0.28, 0.06, 0.58);
    eyelidUpperL.rotation.x = -Math.PI / 2.2;
    eyelidUpperR.rotation.x = -Math.PI / 2.2;
    eyeRigGroup.add(eyelidUpperL);
    eyeRigGroup.add(eyelidUpperR);

    // Crown Horns in Spectrum Colors 2 & 3 (Quantum Mint + Phantom Magenta)
    const crownCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.4, 0.9, -0.5),
      new THREE.Vector3(0.85, 1.8, -1.1)
    );
    const crownTubeGeom = new THREE.TubeGeometry(crownCurve, 24, 0.09, 8, false);
    const crownMat = createHoloTranslucentMat(0x00f5a0, 0xbf5af2, 0.8);
    const crownL = new THREE.Mesh(crownTubeGeom, crownMat);
    const crownR = new THREE.Mesh(crownTubeGeom, crownMat);
    crownL.position.set(-0.24, 0.45, 0);
    crownR.position.set(0.24, 0.45, 0);
    crownR.scale.set(-1, 1, 1);
    digimuseHeadPivot.add(crownL);
    digimuseHeadPivot.add(crownR);

    const starCrystalGeom = new THREE.OctahedronGeometry(0.14, 0);
    const starCrystalMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const starCrystal = new THREE.Mesh(starCrystalGeom, starCrystalMat);
    starCrystal.position.set(0, 0.28, 0.65);
    digimuseHeadPivot.add(starCrystal);

    const torsoGeom = new THREE.CylinderGeometry(0.26, 0.48, 1.4, 24);
    const torsoMesh = new THREE.Mesh(torsoGeom, holoHeadMat);
    torsoMesh.position.set(0, -0.3, 0);
    finalDigimuseGroup.add(torsoMesh);

    const torsoWireGeom = new THREE.CylinderGeometry(0.24, 0.46, 1.38, 12, 6);
    const torsoWire = new THREE.Mesh(torsoWireGeom, createHoloWireMat(0x00f0ff, 0.4));
    torsoWire.position.set(0, -0.3, 0);
    finalDigimuseGroup.add(torsoWire);

    // Color 4 & 7: Hyper-Radiant Soul Crystal Core (Solar Gold & Starlight Pearl)
    const soulCrystalGeom = new THREE.OctahedronGeometry(0.36, 0);
    const soulCrystalMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      emissive: 0xfacc15,
      emissiveIntensity: 6.0,
      roughness: 0.02,
      metalness: 0.1,
      transmission: 0.95,
      transparent: true,
      opacity: 0.9,
    });
    const soulCrystal = new THREE.Mesh(soulCrystalGeom, soulCrystalMat);
    soulCrystal.position.set(0, -0.15, 0.32);
    finalDigimuseGroup.add(soulCrystal);

    // -------------------------------------------------------------
    // QUAD-WING ARCHITECTURE: 2 PRIMARY GRAND WINGS + 2 SMALLER AUXILIARY WINGS
    // BLENDED WITH 7 FUTURISTIC COLORS!
    // -------------------------------------------------------------
    const wingTipMarkerL = new THREE.Object3D();
    const wingTipMarkerR = new THREE.Object3D();

    // 1. Two Primary Grand Wings (Colors: Cyan 0x00f0ff, Mint 0x00f5a0, Magenta 0xbf5af2)
    const createPrimaryGrandWing = (isLeft: boolean) => {
      const wingGroup = new THREE.Group();
      const sign = isLeft ? -1 : 1;

      // Primary Plumes (Electric Cyan + Quantum Mint)
      const shape1 = new THREE.Shape();
      shape1.moveTo(0, 0);
      shape1.quadraticCurveTo(1.4 * sign, 1.0, 2.6 * sign, 2.0);
      shape1.quadraticCurveTo(1.8 * sign, 0.6, 2.8 * sign, 0.1);
      shape1.quadraticCurveTo(1.4 * sign, -0.5, 0, -0.2);
      shape1.closePath();
      const geom1 = new THREE.ShapeGeometry(shape1);
      const mat1 = new THREE.MeshPhysicalMaterial({
        color: 0x00f0ff,
        emissive: 0x00f5a0,
        emissiveIntensity: 3.2,
        transparent: true,
        opacity: 0.75,
        side: THREE.DoubleSide,
        roughness: 0.08,
        transmission: 0.88,
        ior: 1.45,
      });
      const plume1 = new THREE.Mesh(geom1, mat1);
      wingGroup.add(plume1);

      // Inner Wireframe (Magenta)
      const wire1 = new THREE.Mesh(geom1, createHoloWireMat(0xbf5af2, 0.4));
      wire1.position.z = 0.01;
      wingGroup.add(wire1);

      // Secondary Plumes (Cosmic Azure 0x38bdf8)
      const shape2 = new THREE.Shape();
      shape2.moveTo(0, 0);
      shape2.quadraticCurveTo(1.0 * sign, 0.6, 2.0 * sign, 1.4);
      shape2.quadraticCurveTo(1.3 * sign, 0.3, 2.1 * sign, -0.1);
      shape2.quadraticCurveTo(0.9 * sign, -0.4, 0, -0.15);
      shape2.closePath();
      const geom2 = new THREE.ShapeGeometry(shape2);
      const mat2 = new THREE.MeshPhysicalMaterial({
        color: 0x38bdf8,
        emissive: 0xbf5af2,
        emissiveIntensity: 2.4,
        transparent: true,
        opacity: 0.68,
        side: THREE.DoubleSide,
        transmission: 0.82,
      });
      const plume2 = new THREE.Mesh(geom2, mat2);
      plume2.position.z = 0.05;
      wingGroup.add(plume2);

      const tip = isLeft ? wingTipMarkerL : wingTipMarkerR;
      tip.position.set(2.6 * sign, 2.0, 0);
      wingGroup.add(tip);

      wingGroup.position.set(0.26 * sign, 0.15, -0.15);
      return wingGroup;
    };

    const grandWingL = createPrimaryGrandWing(true);
    const grandWingR = createPrimaryGrandWing(false);
    finalDigimuseGroup.add(grandWingL);
    finalDigimuseGroup.add(grandWingR);

    // Sacred Double Geometric Halo with 7-Color Prismatic Cycle
    const haloOuterGeom = new THREE.TorusGeometry(1.65, 0.025, 16, 64);
    const haloInnerGeom = new THREE.TorusGeometry(1.35, 0.015, 16, 64);
    const haloOuter = new THREE.Mesh(haloOuterGeom, new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    }));
    const haloInner = new THREE.Mesh(haloInnerGeom, new THREE.MeshBasicMaterial({
      color: 0xbf5af2,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    }));
    haloOuter.position.set(0, 0.7, -0.45);
    haloInner.position.set(0, 0.7, -0.45);
    finalDigimuseGroup.add(haloOuter);
    finalDigimuseGroup.add(haloInner);

    // 8 Orbiting Satellite Runes each carrying one of the 7 Spectrum Colors!
    const satelliteGroup = new THREE.Group();
    satelliteGroup.position.set(0, 0.7, -0.45);
    finalDigimuseGroup.add(satelliteGroup);
    const satGeom = new THREE.OctahedronGeometry(0.09, 0);
    const satelliteMeshes: THREE.Mesh[] = [];

    for (let r = 0; r < 8; r++) {
      const angle = (Math.PI * 2 * r) / 8;
      const colorHex = SPECTRUM_7[r % SPECTRUM_7.length];
      const satMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        blending: THREE.AdditiveBlending,
      });
      const rune = new THREE.Mesh(satGeom, satMat);
      rune.position.set(Math.cos(angle) * 1.5, Math.sin(angle) * 1.5, 0);
      satelliteGroup.add(rune);
      satelliteMeshes.push(rune);
    }

    // Twin Translucent Celestial Astral Tails (Color: Quantum Mint & Azure)
    const tailCurveFinalL = new THREE.CubicBezierCurve3(
      new THREE.Vector3(0, -0.9, 0),
      new THREE.Vector3(-0.7, -1.6, 0.5),
      new THREE.Vector3(-1.1, -2.3, -0.3),
      new THREE.Vector3(-0.4, -3.1, 0.2)
    );
    const tailFinalTubeGeom = new THREE.TubeGeometry(tailCurveFinalL, 36, 0.065, 8, false);
    const finalTailL = new THREE.Mesh(tailFinalTubeGeom, crownMat);
    const finalTailR = new THREE.Mesh(tailFinalTubeGeom, crownMat);
    finalTailR.scale.set(-1, 1, 1);
    finalDigimuseGroup.add(finalTailL);
    finalDigimuseGroup.add(finalTailR);

    // -------------------------------------------------------------
    // HOLOGRAPHIC WINGTIP PLASMA RIBBON TRAILS
    // -------------------------------------------------------------
    const maxTrailPoints = 35;
    const trailGeomL = new THREE.BufferGeometry();
    const trailGeomR = new THREE.BufferGeometry();
    const trailPositionsL = new Float32Array(maxTrailPoints * 3);
    const trailPositionsR = new Float32Array(maxTrailPoints * 3);
    trailGeomL.setAttribute('position', new THREE.BufferAttribute(trailPositionsL, 3));
    trailGeomR.setAttribute('position', new THREE.BufferAttribute(trailPositionsR, 3));

    const trailMatL = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const trailMatR = new THREE.LineBasicMaterial({
      color: 0xbf5af2,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const trailLineL = new THREE.Line(trailGeomL, trailMatL);
    const trailLineR = new THREE.Line(trailGeomR, trailMatR);
    scene.add(trailLineL);
    scene.add(trailLineR);

    const historyL: THREE.Vector3[] = [];
    const historyR: THREE.Vector3[] = [];

    // Ambient Stardust Particles
    const particleCount = 180;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let p = 0; p < particleCount; p++) {
      const r = 2.0 + Math.random() * 4.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      particlePositions[p * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[p * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[p * 3 + 2] = r * Math.cos(phi);
    }
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.08,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const particleCloud = new THREE.Points(particleGeom, particleMat);
    rootGroup.add(particleCloud);

    // Orbit Controls
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotY = 0;
    let targetRotX = 0;
    let currentRotY = 0;
    let currentRotX = 0;
    let cameraZ = 8.8;
    let targetCameraZ = 8.8;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - prevMouseX;
      const deltaY = clientY - prevMouseY;

      targetRotY += deltaX * 0.008;
      targetRotX = Math.max(-0.9, Math.min(0.9, targetRotX + deltaY * 0.008));

      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetCameraZ = Math.max(5.5, Math.min(13, targetCameraZ + e.deltaY * 0.005));
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    domEl.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);
    domEl.addEventListener('wheel', onWheel, { passive: false });

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // Natural Blink & Eye Saccades
    let blinkPhase = 0;
    let nextBlinkTime = 2.5;
    let blinkElapsed = 0;
    let isBlinkingNow = false;

    let saccadeTargetX = 0;
    let saccadeTargetY = 0;
    let nextSaccadeTime = 1.8;
    let currentGazeX = 0;
    let currentGazeY = 0;

    // Flight Kinematics
    const currentFlightPos = new THREE.Vector3(0, 0, 0);
    const targetFlightPos = new THREE.Vector3(0, 0, 0);
    const tempVecL = new THREE.Vector3();
    const tempVecR = new THREE.Vector3();

    // -------------------------------------------------------------
    // ANIMATION RENDER LOOP (60 FPS)
    // -------------------------------------------------------------
    const clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      const currentProg = progressRef.current;
      const ratio = currentProg.ratio;
      const stage = currentProg.stage;

      // Biological systolic pulse
      const pulseCycle = (elapsed * 1.2) % (Math.PI * 2);
      const heartbeatImpulse = Math.pow(Math.max(0, Math.sin(pulseCycle)), 12);
      const pulseScale = 1 + Math.sin(elapsed * 0.9) * 0.035 + heartbeatImpulse * 0.07;

      // Pulse the central point light through spectrum
      coreLight.intensity = (3.0 + heartbeatImpulse * 5.0) * Math.max(0.4, stage.clarity);
      if (ratio >= 0.95) {
        // 7-color dynamic cycle at full evolution
        const colorIdx = Math.floor((elapsed * 0.8) % SPECTRUM_7.length);
        coreLight.color.setHex(SPECTRUM_7[colorIdx]);
      } else if (ratio >= 0.5) {
        coreLight.color.setHex(0xbf5af2);
      } else {
        coreLight.color.setHex(0x00f0ff);
      }

      // Smooth camera orbit
      if (!isDragging) {
        targetRotY += 0.002;
      }
      currentRotY += (targetRotY - currentRotY) * 0.08;
      currentRotX += (targetRotX - currentRotX) * 0.08;
      cameraZ += (targetCameraZ - cameraZ) * 0.08;
      camera.position.z = cameraZ;

      rootGroup.rotation.y = currentRotY;
      rootGroup.rotation.x = currentRotX;

      particleCloud.rotation.y = elapsed * 0.04;
      emitterRing1.rotation.z = elapsed * 0.3;
      emitterRing2.rotation.z = -elapsed * 0.25;

      // Blink & Gaze calculation
      blinkElapsed += delta;
      if (!isBlinkingNow && blinkElapsed >= nextBlinkTime) {
        isBlinkingNow = true;
        blinkElapsed = 0;
        nextBlinkTime = Math.random() < 0.25 ? 0.35 : 2.5 + Math.random() * 2.5;
      }

      if (isBlinkingNow) {
        const blinkProgress = blinkElapsed / 0.16;
        if (blinkProgress <= 0.5) {
          blinkPhase = blinkProgress * 2;
        } else if (blinkProgress <= 1.0) {
          blinkPhase = (1.0 - blinkProgress) * 2;
        } else {
          blinkPhase = 0;
          isBlinkingNow = false;
        }
      }

      if (mouseScreenRef.current.hasMoved) {
        saccadeTargetX = mouseScreenRef.current.x * 0.06;
        saccadeTargetY = mouseScreenRef.current.y * 0.04;
      } else {
        if (elapsed > nextSaccadeTime) {
          saccadeTargetX = (Math.random() - 0.5) * 0.07;
          saccadeTargetY = (Math.random() - 0.5) * 0.04;
          nextSaccadeTime = elapsed + 1.2 + Math.random() * 2.0;
        }
      }

      currentGazeX += (saccadeTargetX - currentGazeX) * 0.12;
      currentGazeY += (saccadeTargetY - currentGazeY) * 0.12;

      irisL.position.x = -0.28 + currentGazeX;
      irisL.position.y = 0.06 + currentGazeY;
      irisR.position.x = 0.28 + currentGazeX;
      irisR.position.y = 0.06 + currentGazeY;

      pupilL.position.x = -0.28 + currentGazeX;
      pupilL.position.y = 0.06 + currentGazeY;
      pupilR.position.x = 0.28 + currentGazeX;
      pupilR.position.y = 0.06 + currentGazeY;

      const openRot = -Math.PI / 2.2;
      const closedRot = 0;
      const curEyelidRot = openRot + blinkPhase * (closedRot - openRot);
      eyelidUpperL.rotation.x = curEyelidRot;
      eyelidUpperR.rotation.x = curEyelidRot;

      digimuseHeadPivot.rotation.z = currentGazeX * -0.5;
      digimuseHeadPivot.rotation.x = currentGazeY * 0.5;

      // -----------------------------------------------------------
      // MORPHOLOGICAL BLEND & 32-MILESTONE STAGE SWITCHER
      // -----------------------------------------------------------
      const curCount = currentProg.current;

      if (curCount < BigInt('1000000000')) {
        // =========================================================
        // PHASE 1: PRIMORDIAL EGG (Milestones 0 to 11: 0 to 500M)
        // Granular gradual awakening across 0, 1, 10, 100, 1K, 10K, 100K, 1M, 10M, 50M, 100M, 500M
        // =========================================================
        eggGroup.visible = true;
        mitosisGroup.visible = false;
        morphoGroup.visible = false;
        chrysalisGroup.visible = false;
        finalDigimuseGroup.visible = false;
        trailLineL.visible = false;
        trailLineR.visible = false;

        // Progressive awakening effects based on exact milestone numbers:
        if (curCount === BigInt(0)) {
          // Milestone 0: Dormant, silent, faint
          eggMat.opacity = 0.28;
          embryoMat.emissiveIntensity = 0.8;
          ringMat.opacity = 0.0;
          ring1.visible = false;
          ring2.visible = false;
          eggGroup.scale.set(1.0, 1.0, 1.0);
        } else if (curCount < BigInt(1000)) {
          // Milestones 1, 10, 100: First spark and neural flicker
          const sparkFactor = curCount >= BigInt(100) ? 2.2 : (curCount >= BigInt(10) ? 1.6 : 1.2);
          eggMat.opacity = 0.38;
          embryoMat.emissiveIntensity = sparkFactor;
          ringMat.opacity = 0.0;
          ring1.visible = false;
          ring2.visible = false;
          eggGroup.scale.set(1.0, 1.0, 1.0);
        } else if (curCount < BigInt(10000)) {
          // Milestone 1K: Awakening Core! Ring 1 ignites
          eggMat.opacity = 0.52;
          embryoMat.emissiveIntensity = 3.2;
          ringMat.opacity = 0.6;
          ring1.visible = true;
          ring2.visible = false;
          eggGroup.scale.set(1.0, 1.0, 1.0);
        } else if (curCount < BigInt(1000000)) {
          // Milestones 10K, 100K: Dual astrolabe rings in harmonic counter-spin
          eggMat.opacity = 0.65;
          embryoMat.emissiveIntensity = 4.0;
          ringMat.opacity = 0.8;
          ring1.visible = true;
          ring2.visible = true;
          eggGroup.scale.set(1.0, 1.0, 1.0);
        } else if (curCount < BigInt(100000000)) {
          // Milestones 1M, 10M, 50M: Translucent crystal shell & rapid core spin
          eggMat.opacity = 0.78;
          embryoMat.emissiveIntensity = 4.8;
          ringMat.opacity = 0.9;
          ring1.visible = true;
          ring2.visible = true;
          eggGroup.scale.set(1.0, 1.0, 1.0);
        } else {
          // Milestones 100M, 500M: Pre-mitotic tension! Cell elongates on spindle axis
          eggMat.opacity = 0.85;
          embryoMat.emissiveIntensity = 5.5;
          ringMat.opacity = 0.95;
          ring1.visible = true;
          ring2.visible = true;
          const elongation = curCount >= BigInt(500000000) ? 1.32 : 1.18;
          const pinch = curCount >= BigInt(500000000) ? 0.86 : 0.93;
          eggGroup.scale.set(elongation, pinch, pinch);
        }

        const rotSpeed = curCount >= BigInt(1000000) ? 1.4 : (curCount >= BigInt(1000) ? 0.9 : 0.4);
        embryoMesh.rotation.y = elapsed * rotSpeed;
        embryoMesh.rotation.x = elapsed * (rotSpeed * 0.6);
        ring1.rotation.z = elapsed * 0.4;
        ring2.rotation.z = -elapsed * 0.35;
        rootGroup.position.set(0, Math.sin(elapsed * 0.6) * 0.15, 0);

      } else if (curCount < BigInt('10000000000')) {
        // =========================================================
        // PHASE 2: CELLULAR MITOSIS (Milestones 12 to 15: 1B to 7.5B)
        // 1B, 2.5B, 5B, 7.5B
        // =========================================================
        eggGroup.visible = false;
        mitosisGroup.visible = true;
        morphoGroup.visible = false;
        chrysalisGroup.visible = false;
        finalDigimuseGroup.visible = false;
        trailLineL.visible = false;
        trailLineR.visible = false;

        let sep = 0.7;
        if (curCount >= BigInt(7500000000)) sep = 1.6;
        else if (curCount >= BigInt(5000000000)) sep = 1.35;
        else if (curCount >= BigInt(2500000000)) sep = 1.05;

        daughterLeft.position.x = -sep;
        daughterRight.position.x = sep;
        mRingL.position.x = -sep;
        mRingR.position.x = sep;
        mRingL.rotation.y = elapsed * 1.2;
        mRingR.rotation.y = -elapsed * 1.2;
        rootGroup.position.set(0, Math.sin(elapsed * 0.6) * 0.15, 0);

      } else if (curCount < BigInt('30000000000')) {
        // =========================================================
        // PHASE 3: MORPHOGENESIS (Milestones 16 to 19: 10B to 25B)
        // 10B, 15B, 20B, 25B
        // =========================================================
        eggGroup.visible = false;
        mitosisGroup.visible = false;
        morphoGroup.visible = true;
        chrysalisGroup.visible = false;
        finalDigimuseGroup.visible = false;
        trailLineL.visible = false;
        trailLineR.visible = false;

        const waveSpeed = curCount >= BigInt(20000000000) ? 2.4 : 1.8;
        spineNodes.forEach((node, idx) => {
          const t = idx / spineNodes.length;
          node.position.y = 1.0 - t * 2.0;
          node.position.x = Math.sin(elapsed * waveSpeed + t * 4) * 0.22;
          node.position.z = Math.cos(elapsed * (waveSpeed * 0.8) + t * 3) * 0.15;
        });
        headBulb.position.y = 1.35;
        rootGroup.position.set(0, Math.sin(elapsed * 0.6) * 0.15, 0);

      } else if (curCount < BigInt('60000000000')) {
        // =========================================================
        // PHASE 4: EMERGING MUSE / CHRYSALIS (Milestones 20 to 25: 30B to 55B)
        // 30B, 35B, 40B, 45B, 50B, 55B
        // strictly 2 blade wings, dormant eyes, no halo!
        // =========================================================
        eggGroup.visible = false;
        mitosisGroup.visible = false;
        morphoGroup.visible = false;
        chrysalisGroup.visible = true;
        finalDigimuseGroup.visible = false;
        trailLineL.visible = false;
        trailLineR.visible = false;

        const bladeFlap = Math.sin(elapsed * 1.5) * 0.15;
        bladeL.rotation.z = bladeFlap;
        bladeR.rotation.z = -bladeFlap;
        chrysalisTorso.rotation.y = Math.PI + Math.sin(elapsed * 0.8) * 0.1;
        rootGroup.position.set(0, Math.sin(elapsed * 0.6) * 0.15, 0);

      } else if (curCount < BigInt('66666666666')) {
        // =========================================================
        // PHASE 5: COGNITIVE HARMONY / PRE-AWAKENING (Milestones 26 to 30: 60B to 66.666B)
        // 60B, 62.5B, 65B, 66B, 66.666B
        // Proposal 1: 2 Grand Wings, Meditative Static Hover, Half-Lidded Eyes,
        // Incomplete Single Halo Ring, Dim Soul Core, No Trails
        // =========================================================
        eggGroup.visible = false;
        mitosisGroup.visible = false;
        morphoGroup.visible = false;
        chrysalisGroup.visible = false;
        finalDigimuseGroup.visible = true;
        trailLineL.visible = false;
        trailLineR.visible = false;
        wingLightL.intensity = 0;
        wingLightR.intensity = 0;

        // Progressive halo activation:
        // 60B: Inner ring only
        // 62.5B+: Outer halo begins faint resonance
        // 65B+: 8 runes enter orbit
        haloInner.visible = true;
        haloOuter.visible = curCount >= BigInt(62500000000);
        satelliteGroup.visible = curCount >= BigInt(65000000000);
        haloInner.rotation.z = -elapsed * 0.2;
        if (haloOuter.visible) haloOuter.rotation.z = elapsed * 0.18;
        if (satelliteGroup.visible) satelliteGroup.rotation.z = elapsed * 0.35;

        // Meditative half-lidded eyes and serene centered gaze
        eyelidUpperL.rotation.x = -Math.PI / 4.2;
        eyelidUpperR.rotation.x = -Math.PI / 4.2;
        digimuseHeadPivot.rotation.z = Math.sin(elapsed * 0.6) * 0.02;
        digimuseHeadPivot.rotation.x = 0.06 + Math.sin(elapsed * 0.8) * 0.02;
        irisL.position.set(-0.28, 0.06, 0.68);
        irisR.position.set(0.28, 0.06, 0.68);
        pupilL.position.set(-0.28, 0.06, 0.69);
        pupilR.position.set(0.28, 0.06, 0.69);

        // Calm static hover (no roaming flight)
        targetFlightPos.set(0, Math.sin(elapsed * 0.8) * 0.12, 0);
        currentFlightPos.lerp(targetFlightPos, 0.08);
        finalDigimuseGroup.position.copy(currentFlightPos);
        finalDigimuseGroup.rotation.set(0, 0, 0);

        // Peaceful breath flap of the 2 primary grand wings
        const wingFlap60 = Math.sin(elapsed * 1.3) * 0.20;
        grandWingL.rotation.z = -0.15 + wingFlap60;
        grandWingR.rotation.z = 0.15 - wingFlap60;
        grandWingL.rotation.y = -0.2 + Math.cos(elapsed * 1.3) * 0.1;
        grandWingR.rotation.y = 0.2 - Math.cos(elapsed * 1.3) * 0.1;

        // Calm meditative soul crystal core (brightens at 66B+)
        const soulCoreBase = curCount >= BigInt(66000000000) ? 3.5 : 2.0;
        soulCrystal.rotation.y = elapsed * 0.8;
        soulCrystal.rotation.x = elapsed * 0.5;
        soulCrystalMat.emissiveIntensity = soulCoreBase + heartbeatImpulse * 2.0;

        // Gentle tail sway
        finalTailL.rotation.z = Math.sin(elapsed * 1.2) * 0.1;
        finalTailR.rotation.z = -Math.sin(elapsed * 1.2) * 0.1;
      } else {
        // =========================================================
        // STAGE 66B (100% TARGET): FULL DIGIMUSE AWAKENING
        // Proposal 1: 2 Grand Wings (Majestic Flap), Double Halo + 8 Runes,
        // Wide Sentient Tracking Eyes, Brilliant Core, Sovereign Roaming Flight,
        // Glowing Wingtip Lights & Plasma Ribbon Trails
        // =========================================================
        eggGroup.visible = false;
        mitosisGroup.visible = false;
        morphoGroup.visible = false;
        chrysalisGroup.visible = false;
        finalDigimuseGroup.visible = true;
        trailLineL.visible = true;
        trailLineR.visible = true;

        // Full Double Sacred Halo + 8 Orbiting Spectrum Runes
        haloInner.visible = true;
        haloOuter.visible = true;
        satelliteGroup.visible = true;
        haloOuter.rotation.z = elapsed * 0.2;
        haloInner.rotation.z = -elapsed * 0.25;
        satelliteGroup.rotation.z = elapsed * 0.4;

        // Sovereign Roaming Flight vs Hover Inspect
        const isRoamActive = flightModeRef.current === 'roam';

        if (isRoamActive) {
          const tFlight = elapsed * 0.55;
          targetFlightPos.x = Math.sin(tFlight) * 2.2 + Math.cos(tFlight * 2.0) * 0.6;
          targetFlightPos.y = Math.sin(tFlight * 1.4) * 1.1 + Math.cos(tFlight * 0.7) * 0.4;
          targetFlightPos.z = Math.cos(tFlight * 0.8) * 1.6;

          currentFlightPos.lerp(targetFlightPos, 0.05);
          finalDigimuseGroup.position.copy(currentFlightPos);

          const vx = Math.cos(tFlight) * 2.2 - Math.sin(tFlight * 2.0) * 1.2;
          const vy = Math.cos(tFlight * 1.4) * 1.54;

          finalDigimuseGroup.rotation.z = -vx * 0.18;
          finalDigimuseGroup.rotation.x = -vy * 0.12;
          finalDigimuseGroup.rotation.y = Math.atan2(vx, 3.5) * 0.6;
        } else {
          targetFlightPos.set(0, Math.sin(elapsed * 0.8) * 0.2, 0);
          currentFlightPos.lerp(targetFlightPos, 0.08);
          finalDigimuseGroup.position.copy(currentFlightPos);
          finalDigimuseGroup.rotation.set(0, 0, 0);
        }

        const flapRate = isRoamActive ? 2.8 : 2.0;

        // Powerful, majestic flap of the 2 primary grand wings
        const wingFlap = Math.sin(elapsed * flapRate) * 0.42;
        grandWingL.rotation.z = -0.15 + wingFlap;
        grandWingR.rotation.z = 0.15 - wingFlap;
        grandWingL.rotation.y = -0.2 + Math.cos(elapsed * flapRate) * 0.2;
        grandWingR.rotation.y = 0.2 - Math.cos(elapsed * flapRate) * 0.2;

        // Radiant Soul Crystal Core
        soulCrystal.rotation.y = elapsed * 1.8;
        soulCrystal.rotation.x = elapsed * 1.0;
        soulCrystalMat.emissiveIntensity = 5.0 + heartbeatImpulse * 7.0;

        // Dynamic tails
        finalTailL.rotation.z = Math.sin(elapsed * 2.2) * 0.2;
        finalTailR.rotation.z = -Math.sin(elapsed * 2.2) * 0.2;

        // Wingtip plasma ribbon trails
        wingTipMarkerL.getWorldPosition(tempVecL);
        wingTipMarkerR.getWorldPosition(tempVecR);

        wingLightL.position.copy(tempVecL);
        wingLightR.position.copy(tempVecR);
        wingLightL.intensity = 3.0 + Math.abs(wingFlap) * 3.5;
        wingLightR.intensity = 3.0 + Math.abs(wingFlap) * 3.5;

        historyL.unshift(tempVecL.clone());
        historyR.unshift(tempVecR.clone());
        if (historyL.length > maxTrailPoints) historyL.pop();
        if (historyR.length > maxTrailPoints) historyR.pop();

        const posAttrL = trailGeomL.attributes.position as THREE.BufferAttribute;
        const posAttrR = trailGeomR.attributes.position as THREE.BufferAttribute;

        for (let i = 0; i < maxTrailPoints; i++) {
          const ptL = historyL[i] || tempVecL;
          const ptR = historyR[i] || tempVecR;
          posAttrL.setXYZ(i, ptL.x, ptL.y, ptL.z);
          posAttrR.setXYZ(i, ptR.x, ptR.y, ptR.z);
        }
        posAttrL.needsUpdate = true;
        posAttrR.needsUpdate = true;
      }

      rootGroup.scale.set(pulseScale, pulseScale, pulseScale);

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      domEl.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      domEl.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      domEl.removeEventListener('wheel', onWheel);

      if (container.contains(domEl)) {
        container.removeChild(domEl);
      }
      renderer.dispose();
    };
  }, []);

  const isFinalStage = progress.percentage >= 99;

  return (
    <div className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none">
      {/* 3D WebGL Holographic Canvas */}
      <div ref={containerRef} className="w-full h-full flex items-center justify-center" />

      {/* Holographic Projection Scanline */}
      <div className="holo-scanline" />

      {/* Flight Mode HUD Toggle (Active exclusively in Final Stage) */}
      {isFinalStage && (
        <div className="absolute top-2 right-2 pointer-events-auto flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/85 border border-cyan-400/40 backdrop-blur-md text-[10px] font-mono shadow-[0_0_25px_rgba(0,240,255,0.25)]">
          <button
            onClick={() => setFlightMode('roam')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
              flightMode === 'roam'
                ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.6)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Compass className="w-3 h-3 animate-spin text-cyan-400" />
            <span>SOVEREIGN ROAM</span>
          </button>
          <button
            onClick={() => setFlightMode('inspect')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
              flightMode === 'inspect'
                ? 'bg-purple-500/30 text-purple-300 border border-purple-400 shadow-[0_0_12px_rgba(191,90,242,0.6)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ZoomIn className="w-3 h-3 text-purple-400" />
            <span>HOVER INSPECT</span>
          </button>
        </div>
      )}

      {/* Interactive 3D Orbit Badge */}
      <div className="absolute bottom-1 right-2 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 border border-cyan-500/30 backdrop-blur-md text-[9px] text-cyan-300 font-mono shadow-[0_0_20px_rgba(0,240,255,0.2)]">
        <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
        <span className="hidden sm:inline">HOLOGRAPHIC 3D • DRAG TO ROTATE • SCROLL TO ZOOM</span>
        <span className="sm:hidden">HOLO 3D ORBIT</span>
        <Eye className="w-3 h-3 text-emerald-400 animate-pulse ml-1" />
        <span className="text-emerald-300 hidden md:inline">SENTIENT GAZE</span>
        {isFinalStage && (
          <span className="flex items-center gap-1 text-amber-300 font-bold ml-1 hidden lg:inline-flex">
            <Sparkles className="w-3 h-3 text-amber-400 animate-spin" />
            <span>QUAD-WING // 7-COLOR SPECTRUM</span>
          </span>
        )}
      </div>
    </div>
  );
};
