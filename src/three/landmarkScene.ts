import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

/**
 * "From Land to Landmark" — a five-stage construction journey driven by
 * scroll progress p ∈ [0,1]:
 *
 *   LAND        0.00–0.12  empty dusk site, blueprint grid + survey lines
 *   FOUNDATION  0.12–0.30  foundation marks, footings, ground beams, rebar
 *   STRUCTURE   0.30–0.62  crane up, columns + slabs rise floor by floor
 *   FACADE      0.62–0.85  spandrels + glass sweep up the frame
 *   DELIVERY    0.85–1.00  crane departs, crown, plaza, light sweep, dawn
 *
 * The scene runs its own dusk→golden-dawn arc (dayness) so the journey
 * reads as one continuous cinematic take.
 */

export const STAGE_WINDOWS = [
  { key: 'land', from: 0.0, to: 0.12 },
  { key: 'foundation', from: 0.12, to: 0.3 },
  { key: 'structure', from: 0.3, to: 0.62 },
  { key: 'facade', from: 0.62, to: 0.85 },
  { key: 'delivery', from: 0.85, to: 1.0 },
] as const;

export const FLOOR_COUNT = 12;
const FH = 3;
const TOWER_W = 16;
const TOWER_D = 12;
const TOWER_H = FLOOR_COUNT * FH;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (t: number) => t * t * (3 - 2 * t);
const map01 = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const phase = (f: number, a: number, b: number) => smooth(map01(f, a, b));
export const dayness = (p: number) => smooth(map01(p, 0.2, 0.88));

/* ---------- palette ---------- */
const NIGHT = {
  fog: new THREE.Color(0x0e1a26),
  ground: new THREE.Color(0x2a3441),
  pad: new THREE.Color(0x323c48),
  city: new THREE.Color(0x2e3944),
  river: new THREE.Color(0x1d2c38),
  sun: new THREE.Color(0x7189a8),
};
const DAY = {
  fog: new THREE.Color(0xe9e4d8),
  ground: new THREE.Color(0xd3cec5),
  pad: new THREE.Color(0xc6c1b7),
  city: new THREE.Color(0xcdd0d2),
  river: new THREE.Color(0xaebfc6),
  sun: new THREE.Color(0xffe3b8),
};

const M = {
  concrete: new THREE.MeshStandardMaterial({ color: 0xcfcac1, roughness: 0.92 }),
  concreteLight: new THREE.MeshStandardMaterial({ color: 0xdedad2, roughness: 0.9 }),
  core: new THREE.MeshStandardMaterial({ color: 0xb8b2a8, roughness: 0.95 }),
  facade: new THREE.MeshStandardMaterial({ color: 0xe9e5dd, roughness: 0.55, metalness: 0.05 }),
  glass: new THREE.MeshStandardMaterial({
    color: 0x44617a,
    roughness: 0.08,
    metalness: 0.95,
    transparent: true,
    opacity: 0,
  }),
  steel: new THREE.MeshStandardMaterial({ color: 0x2a2c2e, roughness: 0.55, metalness: 0.6, transparent: true }),
  craneGold: new THREE.MeshStandardMaterial({ color: 0xc9a961, roughness: 0.45, metalness: 0.35, transparent: true }),
  scaffold: new THREE.MeshStandardMaterial({ color: 0x8f8a80, roughness: 0.7, metalness: 0.4, transparent: true }),
  navy: new THREE.MeshStandardMaterial({ color: 0x12283a, roughness: 0.6, transparent: true }),
  gold: new THREE.MeshStandardMaterial({ color: 0xc9a961, roughness: 0.4, metalness: 0.3 }),
  rebar: new THREE.MeshStandardMaterial({ color: 0x6b5b3e, roughness: 0.6, metalness: 0.5 }),
  vest: new THREE.MeshStandardMaterial({ color: 0xd97b29, roughness: 0.8 }),
  helmet: new THREE.MeshStandardMaterial({ color: 0xc9a961, roughness: 0.4 }),
  skin: new THREE.MeshStandardMaterial({ color: 0xdedad2, roughness: 0.9 }),
};

function boxAt(g: THREE.BufferGeometry[], w: number, h: number, d: number, x: number, y: number, z: number) {
  const geo = new THREE.BoxGeometry(w, h, d);
  geo.translate(x, y, z);
  g.push(geo);
}

function lattice(len: number, size: number, bar: number, axis: 'x' | 'y'): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = [];
  const h = size / 2;
  const step = size * 1.4;
  if (axis === 'y') {
    for (const [px, pz] of [[-h, -h], [h, -h], [-h, h], [h, h]]) boxAt(parts, bar, len, bar, px, len / 2, pz);
    for (let y = step; y < len; y += step) {
      boxAt(parts, size, bar, bar, 0, y, -h);
      boxAt(parts, size, bar, bar, 0, y, h);
      boxAt(parts, bar, bar, size, -h, y, 0);
      boxAt(parts, bar, bar, size, h, y, 0);
    }
  } else {
    for (const [py, pz] of [[-h, -h], [h, -h], [-h, h], [h, h]]) boxAt(parts, len, bar, bar, len / 2, py, pz);
    for (let x = step; x < len; x += step) {
      boxAt(parts, bar, size, bar, x, 0, -h);
      boxAt(parts, bar, size, bar, x, 0, h);
      boxAt(parts, bar, bar, size, x, -h, 0);
      boxAt(parts, bar, bar, size, x, h, 0);
    }
  }
  return mergeGeometries(parts);
}

function makeWorker(): THREE.Group {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.26, 0.9, 8), M.vest);
  body.position.y = 0.45;
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.17, 10, 10), M.skin);
  head.position.y = 1.05;
  const hat = new THREE.Mesh(new THREE.SphereGeometry(0.19, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2), M.helmet);
  hat.position.y = 1.08;
  g.add(body, head, hat);
  return g;
}

/* blueprint grid drawn on a canvas — gold technical lines */
function blueprintTexture(): THREE.Texture {
  const c = document.createElement('canvas');
  c.width = c.height = 1024;
  const ctx = c.getContext('2d')!;
  ctx.clearRect(0, 0, 1024, 1024);
  ctx.strokeStyle = 'rgba(201,169,97,0.55)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 32; i++) {
    const v = (i / 32) * 1024;
    ctx.beginPath(); ctx.moveTo(v, 0); ctx.lineTo(v, 1024); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, v); ctx.lineTo(1024, v); ctx.stroke();
  }
  ctx.strokeStyle = 'rgba(201,169,97,0.95)';
  ctx.lineWidth = 2.5;
  for (let i = 0; i <= 8; i++) {
    const v = (i / 8) * 1024;
    ctx.beginPath(); ctx.moveTo(v, 0); ctx.lineTo(v, 1024); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, v); ctx.lineTo(1024, v); ctx.stroke();
  }
  /* building footprint + diagonals, heavier */
  ctx.strokeStyle = 'rgba(233,215,171,1)';
  ctx.lineWidth = 4;
  const bx = 512 - (TOWER_W / 64) * 512;
  const bz = 512 - (TOWER_D / 64) * 512;
  ctx.strokeRect(bx, bz, 1024 - 2 * bx, 1024 - 2 * bz);
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(bx, bz); ctx.lineTo(1024 - bx, 1024 - bz); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(1024 - bx, bz); ctx.lineTo(bx, 1024 - bz); ctx.stroke();
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function dustTexture(): THREE.Texture {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const ctx = c.getContext('2d')!;
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(216,210,198,0.85)');
  grad.addColorStop(0.5, 'rgba(216,210,198,0.28)');
  grad.addColorStop(1, 'rgba(216,210,198,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

interface FloorParts {
  columns: THREE.Mesh;
  slab: THREE.Mesh;
  slabMat: THREE.MeshStandardMaterial;
  facade: THREE.Mesh;
  facadeMat: THREE.MeshStandardMaterial;
  glass: THREE.Mesh;
  glassMat: THREE.MeshStandardMaterial;
  baseY: number;
}

export function createLandmarkScene(canvas: HTMLCanvasElement) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const isMobile = window.innerWidth < 768;
  renderer.shadowMap.enabled = !isMobile;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x0e1a26, 110, 320);

  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.5;

  const camera = new THREE.PerspectiveCamera(36, 1, 0.5, 600);

  /* ---------- lights ---------- */
  const sun = new THREE.DirectionalLight(0xffe3b8, 0.2);
  sun.position.set(70, 55, 38);
  if (!isMobile) {
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.left = -60;
    sun.shadow.camera.right = 60;
    sun.shadow.camera.top = 70;
    sun.shadow.camera.bottom = -20;
    sun.shadow.camera.far = 250;
    sun.shadow.bias = -0.0004;
  }
  scene.add(sun);
  const hemi = new THREE.HemisphereLight(0xe8eef4, 0xcfc5b0, 0.2);
  scene.add(hemi);
  const rim = new THREE.DirectionalLight(0xc9a961, 0.35);
  rim.position.set(-55, 25, -40);
  scene.add(rim);
  /* night work lights */
  const siteLightA = new THREE.PointLight(0xffcf8a, 2.4, 70, 1.6);
  siteLightA.position.set(-14, 9, 12);
  const siteLightB = new THREE.PointLight(0xffcf8a, 1.8, 60, 1.6);
  siteLightB.position.set(15, 7, -9);
  scene.add(siteLightA, siteLightB);

  /* ---------- ground ---------- */
  const groundMat = new THREE.MeshStandardMaterial({ color: 0x2a3441, roughness: 1 });
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(900, 900), groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  const padMat = new THREE.MeshStandardMaterial({ color: 0x323c48, roughness: 1 });
  const pad = new THREE.Mesh(new THREE.BoxGeometry(52, 0.3, 40), padMat);
  pad.position.y = 0.15;
  pad.receiveShadow = true;
  scene.add(pad);

  /* ---------- LAND: blueprint grid + survey ---------- */
  const gridMat = new THREE.MeshBasicMaterial({
    map: blueprintTexture(),
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  const grid = new THREE.Mesh(new THREE.PlaneGeometry(64, 64), gridMat);
  grid.rotation.x = -Math.PI / 2;
  grid.position.y = 0.34;
  scene.add(grid);

  /* survey perimeter line, drawn point by point */
  const hw = TOWER_W / 2 + 2;
  const hd = TOWER_D / 2 + 2;
  const surveyPts: THREE.Vector3[] = [];
  const corners = [
    new THREE.Vector3(-hw, 0.5, -hd),
    new THREE.Vector3(hw, 0.5, -hd),
    new THREE.Vector3(hw, 0.5, hd),
    new THREE.Vector3(-hw, 0.5, hd),
    new THREE.Vector3(-hw, 0.5, -hd),
    new THREE.Vector3(hw, 0.5, hd),
  ];
  const SEG = 24;
  for (let c = 0; c < corners.length - 1; c++) {
    for (let s = 0; s < SEG; s++) {
      surveyPts.push(corners[c].clone().lerp(corners[c + 1], s / SEG));
    }
  }
  const surveyGeo = new THREE.BufferGeometry().setFromPoints(surveyPts);
  const survey = new THREE.Line(surveyGeo, new THREE.LineBasicMaterial({ color: 0xe9d7ab, transparent: true, opacity: 0.9 }));
  survey.geometry.setDrawRange(0, 0);
  scene.add(survey);

  const stakes: THREE.Mesh[] = [];
  for (const cnr of corners.slice(0, 4)) {
    const stake = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 1.4, 6), M.gold);
    stake.position.set(cnr.x, 0, cnr.z);
    stake.scale.setScalar(0.0001);
    scene.add(stake);
    stakes.push(stake);
  }

  /* ---------- FOUNDATION ---------- */
  const nx = 5;
  const nz = 4;
  const colPositions: [number, number][] = [];
  for (let ix = 0; ix < nx; ix++) {
    for (let iz = 0; iz < nz; iz++) {
      if (ix > 0 && ix < nx - 1 && iz > 0 && iz < nz - 1) continue;
      colPositions.push([
        -TOWER_W / 2 + (ix * TOWER_W) / (nx - 1),
        -TOWER_D / 2 + (iz * TOWER_D) / (nz - 1),
      ]);
    }
  }

  /* glowing foundation marks */
  const markGroup = new THREE.Group();
  const markMat = new THREE.LineBasicMaterial({ color: 0xe9d7ab, transparent: true, opacity: 0 });
  for (const [x, z] of colPositions) {
    const s = 1.1;
    const pts = [
      new THREE.Vector3(x - s, 0.42, z - s),
      new THREE.Vector3(x + s, 0.42, z - s),
      new THREE.Vector3(x + s, 0.42, z + s),
      new THREE.Vector3(x - s, 0.42, z + s),
      new THREE.Vector3(x - s, 0.42, z - s),
    ];
    markGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), markMat));
  }
  scene.add(markGroup);

  /* footings + rebar cages */
  const footGeos: THREE.BufferGeometry[] = [];
  const rebarGeos: THREE.BufferGeometry[] = [];
  for (const [x, z] of colPositions) {
    boxAt(footGeos, 1.9, 0.9, 1.9, x, 0.45, z);
    for (const [rx, rz] of [[-0.16, -0.16], [0.16, -0.16], [-0.16, 0.16], [0.16, 0.16]]) {
      boxAt(rebarGeos, 0.07, 2.4, 0.07, x + rx, 1.2, z + rz);
    }
  }
  /* ground beams linking footings along the perimeter */
  boxAt(footGeos, TOWER_W + 1.2, 0.5, 0.5, 0, 0.55, -TOWER_D / 2);
  boxAt(footGeos, TOWER_W + 1.2, 0.5, 0.5, 0, 0.55, TOWER_D / 2);
  boxAt(footGeos, 0.5, 0.5, TOWER_D + 1.2, -TOWER_W / 2, 0.55, 0);
  boxAt(footGeos, 0.5, 0.5, TOWER_D + 1.2, TOWER_W / 2, 0.55, 0);

  const footings = new THREE.Mesh(mergeGeometries(footGeos), M.core);
  footings.castShadow = true;
  footings.scale.y = 0.0001;
  scene.add(footings);
  const rebar = new THREE.Mesh(mergeGeometries(rebarGeos), M.rebar);
  rebar.scale.y = 0.0001;
  scene.add(rebar);

  /* ---------- TOWER ---------- */
  const tower = new THREE.Group();
  scene.add(tower);

  const coreGeo = new THREE.BoxGeometry(4.4, 1, 4.4);
  coreGeo.translate(0, 0.5, 0);
  const core = new THREE.Mesh(coreGeo, M.core);
  core.castShadow = true;
  core.position.set(0, 0.3, 0);
  core.scale.y = 0.0001;
  tower.add(core);

  const colGeos: THREE.BufferGeometry[] = [];
  for (const [x, z] of colPositions) boxAt(colGeos, 0.5, FH, 0.5, x, FH / 2, z);
  const colFloorGeo = mergeGeometries(colGeos);

  const floors: FloorParts[] = [];
  for (let i = 0; i < FLOOR_COUNT; i++) {
    const baseY = 0.3 + i * FH;
    const columns = new THREE.Mesh(colFloorGeo, M.concrete);
    columns.castShadow = true;
    columns.position.y = baseY;
    columns.scale.y = 0.0001;
    tower.add(columns);

    const slabMat = M.concreteLight.clone();
    slabMat.transparent = true;
    slabMat.opacity = 0;
    const slab = new THREE.Mesh(new THREE.BoxGeometry(TOWER_W + 1.4, 0.42, TOWER_D + 1.4), slabMat);
    slab.castShadow = true;
    slab.receiveShadow = true;
    slab.position.y = baseY + FH;
    tower.add(slab);

    const facadeMat = M.facade.clone();
    facadeMat.transparent = true;
    facadeMat.opacity = 0;
    const fParts: THREE.BufferGeometry[] = [];
    boxAt(fParts, TOWER_W + 1.2, 0.9, 0.18, 0, FH - 0.45, (TOWER_D + 1.2) / 2);
    boxAt(fParts, TOWER_W + 1.2, 0.9, 0.18, 0, FH - 0.45, -(TOWER_D + 1.2) / 2);
    boxAt(fParts, 0.18, 0.9, TOWER_D + 1.2, (TOWER_W + 1.2) / 2, FH - 0.45, 0);
    boxAt(fParts, 0.18, 0.9, TOWER_D + 1.2, -(TOWER_W + 1.2) / 2, FH - 0.45, 0);
    for (let mx = -3; mx <= 3; mx++) {
      boxAt(fParts, 0.14, FH - 0.4, 0.14, (mx * TOWER_W) / 7, (FH - 0.4) / 2, (TOWER_D + 1.05) / 2);
      boxAt(fParts, 0.14, FH - 0.4, 0.14, (mx * TOWER_W) / 7, (FH - 0.4) / 2, -(TOWER_D + 1.05) / 2);
    }
    const facade = new THREE.Mesh(mergeGeometries(fParts), facadeMat);
    facade.castShadow = true;
    facade.position.y = baseY;
    tower.add(facade);

    const glassMat = M.glass.clone();
    const gParts: THREE.BufferGeometry[] = [];
    boxAt(gParts, TOWER_W + 0.9, FH - 0.6, 0.08, 0, (FH - 0.5) / 2, (TOWER_D + 0.8) / 2);
    boxAt(gParts, TOWER_W + 0.9, FH - 0.6, 0.08, 0, (FH - 0.5) / 2, -(TOWER_D + 0.8) / 2);
    boxAt(gParts, 0.08, FH - 0.6, TOWER_D + 0.9, (TOWER_W + 0.8) / 2, (FH - 0.5) / 2, 0);
    boxAt(gParts, 0.08, FH - 0.6, TOWER_D + 0.9, -(TOWER_W + 0.8) / 2, (FH - 0.5) / 2, 0);
    const glass = new THREE.Mesh(mergeGeometries(gParts), glassMat);
    glass.position.y = baseY;
    tower.add(glass);

    floors.push({ columns, slab, slabMat, facade, facadeMat, glass, glassMat, baseY });
  }

  /* crown */
  const crown = new THREE.Group();
  const parapet = new THREE.Mesh(new THREE.BoxGeometry(TOWER_W + 1.6, 0.9, TOWER_D + 1.6), M.facade);
  parapet.castShadow = true;
  const crownBand = new THREE.Mesh(new THREE.BoxGeometry(TOWER_W + 1.7, 0.22, TOWER_D + 1.7), M.gold);
  crownBand.position.y = 0.56;
  const mastTip = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 6, 6), M.steel);
  mastTip.position.y = 3.4;
  crown.add(parapet, crownBand, mastTip);
  crown.position.y = 0.3 + TOWER_H + 0.45;
  crown.scale.setScalar(0.0001);
  tower.add(crown);

  /* light sweep across the finished glass */
  const sweepMat = new THREE.MeshBasicMaterial({
    color: 0xffe9c4,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const sweep = new THREE.Mesh(new THREE.PlaneGeometry(2.6, TOWER_H - 2), sweepMat);
  sweep.position.set(0, TOWER_H / 2 + 0.3, (TOWER_D + 1.4) / 2 + 0.12);
  scene.add(sweep);

  /* ---------- scaffolding ---------- */
  const scafGeo: THREE.BufferGeometry[] = [];
  const sw = TOWER_W + 3.6;
  const sd = TOWER_D + 3.6;
  for (const [sx, sz] of [
    [-sw / 2, -sd / 2], [sw / 2, -sd / 2], [-sw / 2, sd / 2], [sw / 2, sd / 2],
    [0, -sd / 2], [0, sd / 2], [-sw / 2, 0], [sw / 2, 0],
  ]) {
    boxAt(scafGeo, 0.12, FH * 2, 0.12, sx, FH, sz);
  }
  for (const ry of [FH * 0.66, FH * 1.5]) {
    boxAt(scafGeo, sw, 0.1, 0.1, 0, ry, -sd / 2);
    boxAt(scafGeo, sw, 0.1, 0.1, 0, ry, sd / 2);
    boxAt(scafGeo, 0.1, 0.1, sd, -sw / 2, ry, 0);
    boxAt(scafGeo, 0.1, 0.1, sd, sw / 2, ry, 0);
  }
  const scaffold = new THREE.Mesh(mergeGeometries(scafGeo), M.scaffold);
  scaffold.castShadow = true;
  scaffold.visible = false;
  scene.add(scaffold);

  /* ---------- crane ---------- */
  const crane = new THREE.Group();
  crane.position.set(-19, 0, 8);
  scene.add(crane);

  const craneBase = new THREE.Mesh(new THREE.BoxGeometry(3.4, 1, 3.4), M.navy);
  craneBase.position.y = 0.5;
  craneBase.castShadow = true;
  crane.add(craneBase);

  const mast = new THREE.Mesh(lattice(TOWER_H + 12, 1.5, 0.14, 'y'), M.craneGold);
  mast.castShadow = true;
  mast.position.y = 1;
  mast.scale.y = 0.0001;
  crane.add(mast);

  const craneTop = new THREE.Group();
  craneTop.position.y = TOWER_H + 13;
  craneTop.visible = false;
  crane.add(craneTop);

  const cab = new THREE.Mesh(new THREE.BoxGeometry(1.9, 1.6, 1.7), M.navy);
  cab.position.set(0.4, 0.6, 0);
  craneTop.add(cab);
  const jibLen = 30;
  const jib = new THREE.Mesh(lattice(jibLen, 1.1, 0.11, 'x'), M.craneGold);
  jib.position.set(0.8, 1.4, 0);
  craneTop.add(jib);
  const cjib = new THREE.Mesh(lattice(9, 1.1, 0.11, 'x'), M.craneGold);
  cjib.rotation.y = Math.PI;
  cjib.position.set(-0.8, 1.4, 0);
  craneTop.add(cjib);
  const counterweight = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.6, 2.2), M.core);
  counterweight.position.set(-8.4, 0.9, 0);
  craneTop.add(counterweight);
  const apex = new THREE.Mesh(lattice(5, 1.0, 0.1, 'y'), M.craneGold);
  apex.position.set(0, 1.9, 0);
  craneTop.add(apex);

  const trolley = new THREE.Group();
  trolley.position.set(20, 1.0, 0);
  craneTop.add(trolley);
  trolley.add(new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.4, 0.9), M.steel));
  const cable = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, -20, 0)]),
    new THREE.LineBasicMaterial({ color: 0x1c1e20, transparent: true }),
  );
  trolley.add(cable);
  const hook = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.6, 0.5), M.craneGold);
  hook.position.y = -20;
  trolley.add(hook);
  const payload = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.35, 2.2), M.concreteLight);
  payload.position.y = -20.6;
  trolley.add(payload);

  const craneMats = [M.craneGold, M.steel, M.navy, M.scaffold];

  /* ---------- site props ---------- */
  const props = new THREE.Group();
  scene.add(props);
  const mixerBody = new THREE.Mesh(new THREE.BoxGeometry(4.2, 1.6, 2), M.navy);
  mixerBody.position.set(16, 0.95, 13);
  mixerBody.castShadow = true;
  const drum = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.6, 2.4, 12), M.concreteLight);
  drum.rotation.z = Math.PI / 2.6;
  drum.position.set(15.4, 2.1, 13);
  const container1 = new THREE.Mesh(new THREE.BoxGeometry(6, 2.6, 2.4), M.navy);
  container1.position.set(-14, 1.45, -11);
  const container2 = new THREE.Mesh(new THREE.BoxGeometry(6, 2.6, 2.4), M.gold);
  container2.position.set(-14.6, 4.05, -10.6);
  props.add(mixerBody, drum, container1, container2);

  /* delivery plaza: planters + flags, hidden until the end */
  const plaza = new THREE.Group();
  plaza.scale.setScalar(0.0001);
  scene.add(plaza);
  for (const [px, pz] of [[-13, 10], [-13, -10], [13, 10], [13, -10]] as [number, number][]) {
    const planter = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.8, 2.4), M.core);
    planter.position.set(px, 0.7, pz);
    const canopy = new THREE.Mesh(new THREE.SphereGeometry(1.5, 10, 8), new THREE.MeshStandardMaterial({ color: 0x5d7052, roughness: 0.9 }));
    canopy.position.set(px, 2.6, pz);
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 1.6, 6), M.rebar);
    trunk.position.set(px, 1.6, pz);
    plaza.add(planter, trunk, canopy);
  }
  for (const fx of [-4, 0, 4]) {
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 7, 6), M.steel);
    pole.position.set(fx, 3.8, TOWER_D / 2 + 6);
    const flag = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 0.9), new THREE.MeshStandardMaterial({ color: 0xc9a961, side: THREE.DoubleSide }));
    flag.position.set(fx + 0.85, 6.8, TOWER_D / 2 + 6);
    plaza.add(pole, flag);
  }

  /* workers */
  const groundWorkers: THREE.Group[] = [];
  for (const [wx, wz] of [[-9, 12], [11, 9], [-12, -6]] as [number, number][]) {
    const w = makeWorker();
    w.position.set(wx, 0.3, wz);
    w.visible = false;
    scene.add(w);
    groundWorkers.push(w);
  }
  const floorCrew = new THREE.Group();
  const fwA = makeWorker();
  const fwB = makeWorker();
  fwB.position.x = 4;
  floorCrew.add(fwA, fwB);
  floorCrew.visible = false;
  scene.add(floorCrew);

  /* ---------- city + river ---------- */
  const cityMat = new THREE.MeshStandardMaterial({ color: 0x2e3944, roughness: 1 });
  const city = new THREE.Group();
  scene.add(city);
  const rng = ((seed) => () => ((seed = (seed * 9301 + 49297) % 233280), seed / 233280))(7);
  for (let i = 0; i < 46; i++) {
    const ang = rng() * Math.PI * 2;
    const rad = 95 + rng() * 130;
    const h = 6 + rng() * 34;
    const b = new THREE.Mesh(new THREE.BoxGeometry(8 + rng() * 12, h, 8 + rng() * 12), cityMat);
    b.position.set(Math.cos(ang) * rad, h / 2, Math.sin(ang) * rad);
    city.add(b);
  }
  const riverMat = new THREE.MeshStandardMaterial({ color: 0x1d2c38, roughness: 0.35, metalness: 0.4 });
  const river = new THREE.Mesh(new THREE.PlaneGeometry(500, 60), riverMat);
  river.rotation.x = -Math.PI / 2;
  river.position.set(0, 0.05, -215);
  scene.add(river);

  /* ---------- dust ---------- */
  const DUST_N = 220;
  const dustPos = new Float32Array(DUST_N * 3);
  const dustSeed = new Float32Array(DUST_N);
  for (let i = 0; i < DUST_N; i++) {
    dustPos[i * 3] = (rng() - 0.5) * 46;
    dustPos[i * 3 + 1] = rng() * 8;
    dustPos[i * 3 + 2] = (rng() - 0.5) * 36;
    dustSeed[i] = rng() * Math.PI * 2;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  const dustMat = new THREE.PointsMaterial({
    map: dustTexture(),
    size: 1.6,
    transparent: true,
    opacity: 0.1,
    depthWrite: false,
    sizeAttenuation: true,
  });
  scene.add(new THREE.Points(dustGeo, dustMat));

  /* ---------- camera keyframes ---------- */
  const KF = [
    { p: 0.0, th: -1.3, r: 44, h: 13, ty: 0, tx: -6 },
    { p: 0.12, th: -1.02, r: 33, h: 8, ty: 0.5, tx: -4 },
    { p: 0.3, th: -0.6, r: 50, h: 11, ty: 7, tx: -8 },
    { p: 0.62, th: -0.05, r: 62, h: 26, ty: 14, tx: -9 },
    { p: 0.85, th: 0.55, r: 70, h: 25, ty: 15, tx: -7 },
    { p: 1.0, th: 0.88, r: 96, h: 30, ty: 16, tx: -5 },
  ];

  /* ---------- state ---------- */
  let progress = 0;
  let pointerX = 0;
  let pointerY = 0;
  let sPX = 0;
  let sPY = 0;
  let running = false;
  let rafId = 0;
  const clock = new THREE.Clock();
  const camTarget = new THREE.Vector3();
  const tmpColor = new THREE.Color();

  function applyProgress(p: number) {
    progress = p;
    const d = dayness(p);

    /* environment arc: dusk → golden dawn */
    (scene.fog as THREE.Fog).color.lerpColors(NIGHT.fog, DAY.fog, d);
    groundMat.color.lerpColors(NIGHT.ground, DAY.ground, d);
    padMat.color.lerpColors(NIGHT.pad, DAY.pad, d);
    cityMat.color.lerpColors(NIGHT.city, DAY.city, d);
    riverMat.color.lerpColors(NIGHT.river, DAY.river, d);
    sun.color.lerpColors(NIGHT.sun, DAY.sun, d);
    sun.intensity = 0.18 + d * 2.5;
    hemi.intensity = 0.2 + d * 0.58;
    rim.intensity = 0.3 + d * 0.3;
    siteLightA.intensity = (1 - d) * 2.6;
    siteLightB.intensity = (1 - d) * 2.0;
    scene.environmentIntensity = 0.18 + d * 0.4;

    /* LAND — blueprint + survey */
    gridMat.opacity = phase(p, 0.015, 0.06) * (1 - phase(p, 0.34, 0.5)) * 0.9;
    const sv = phase(p, 0.045, 0.115);
    survey.geometry.setDrawRange(0, Math.floor(sv * surveyPts.length));
    (survey.material as THREE.LineBasicMaterial).opacity = 0.9 * (1 - phase(p, 0.34, 0.5));
    stakes.forEach((s, i) => {
      const t = phase(p, 0.04 + i * 0.012, 0.075 + i * 0.012);
      s.scale.set(t, t, t);
      s.position.y = 0.3 + t * 0.7;
    });

    /* FOUNDATION */
    markMat.opacity = phase(p, 0.125, 0.16) * (1 - phase(p, 0.4, 0.52));
    const ft = phase(p, 0.16, 0.245);
    footings.scale.y = Math.max(0.0001, ft);
    const rb = phase(p, 0.23, 0.3) * (1 - phase(p, 0.34, 0.42));
    rebar.scale.y = Math.max(0.0001, rb);

    /* crane assembles late in foundation */
    const cm = phase(p, 0.24, 0.3);
    mast.scale.y = Math.max(0.0001, cm);
    craneTop.visible = cm > 0.85;
    const craneOut = phase(p, 0.86, 0.93);
    crane.position.x = -19 - craneOut * 34;
    craneMats.forEach((m) => (m.opacity = 1 - craneOut));
    (cable.material as THREE.LineBasicMaterial).opacity = 1 - craneOut;
    crane.visible = craneOut < 0.98;

    /* STRUCTURE — columns + slabs floor by floor */
    const builtFloors = map01(p, 0.3, 0.62) * FLOOR_COUNT;
    core.scale.y = Math.max(0.0001, Math.min(TOWER_H + 1.2, (builtFloors + 1.4) * FH) * map01(p, 0.28, 0.34) || 0.0001);
    floors.forEach((fl, i) => {
      const f = clamp01(builtFloors - i);
      const c = phase(f, 0, 0.5);
      fl.columns.scale.y = Math.max(0.0001, c);
      fl.columns.visible = c > 0.001;
      const s = phase(f, 0.45, 0.85);
      fl.slabMat.opacity = s;
      fl.slab.visible = s > 0.001;
      fl.slab.position.y = fl.baseY + FH + (1 - s) * 2.4;
    });

    /* FACADE — sweeps bottom-up */
    const facadeFloors = map01(p, 0.62, 0.83) * FLOOR_COUNT;
    floors.forEach((fl, i) => {
      const f = clamp01(facadeFloors - i);
      const fa = phase(f, 0, 0.55);
      fl.facadeMat.opacity = fa;
      fl.facade.visible = fa > 0.001;
      const gl = phase(f, 0.4, 1);
      fl.glassMat.opacity = gl * 0.92;
      fl.glass.visible = gl > 0.001;
    });

    /* scaffolding follows the working level, leaves before delivery */
    const structActive = p > 0.31 && p < 0.86;
    scaffold.visible = structActive;
    if (structActive) {
      const level = p < 0.62 ? Math.min(FLOOR_COUNT - 2, Math.floor(builtFloors)) : Math.min(FLOOR_COUNT - 2, Math.floor(facadeFloors));
      const targetY = 0.3 + level * FH;
      scaffold.position.y += (targetY - scaffold.position.y) * 0.25;
      M.scaffold.opacity = phase(p, 0.31, 0.34) * (1 - phase(p, 0.8, 0.86));
    }

    /* crane hook follows build height */
    const buildTop = 0.3 + Math.max(builtFloors, facadeFloors) * FH;
    const hookY = Math.min(-3.5, -(TOWER_H + 13 - buildTop - 5));
    hook.position.y = hookY;
    payload.position.y = hookY - 0.6;
    payload.visible = p > 0.3 && p < 0.62;
    cable.geometry.setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, hookY + 0.3, 0)]);
    craneTop.rotation.y = -0.35 + map01(p, 0.3, 0.85) * 1.05;
    trolley.position.x = 12 + Math.sin(p * Math.PI * 3) * 7;

    /* DELIVERY */
    const cr = phase(p, 0.875, 0.93);
    crown.scale.setScalar(Math.max(0.0001, cr));
    const pl = phase(p, 0.9, 0.975);
    plaza.scale.setScalar(Math.max(0.0001, pl));
    plaza.position.y = 0;
    const swp = map01(p, 0.93, 1);
    sweepMat.opacity = swp > 0 && swp < 1 ? 0.5 * Math.sin(swp * Math.PI) : 0;
    sweep.position.x = -11 + swp * 22;

    /* workers */
    const wVis = phase(p, 0.14, 0.2) * (1 - phase(p, 0.85, 0.9));
    groundWorkers.forEach((w) => {
      w.visible = wVis > 0.05;
      w.scale.setScalar(Math.max(0.0001, wVis));
    });
    const crewOn = p > 0.32 && p < 0.84;
    floorCrew.visible = crewOn;
    if (crewOn) {
      const lvl = p < 0.62 ? Math.floor(builtFloors) : Math.floor(facadeFloors);
      floorCrew.position.set(-3, 0.3 + Math.min(lvl, FLOOR_COUNT - 1) * FH + 0.42, TOWER_D / 2 - 1.4);
    }

    /* props fade out for the finished plaza */
    const propsOut = 1 - phase(p, 0.86, 0.94);
    props.scale.setScalar(Math.max(0.0001, propsOut));

    /* dust strongest during structure */
    dustMat.opacity = 0.05 + 0.3 * Math.sin(Math.PI * map01(p, 0.14, 0.86));
  }

  function updateCamera(dt: number) {
    sPX += (pointerX - sPX) * Math.min(1, dt * 4);
    sPY += (pointerY - sPY) * Math.min(1, dt * 4);

    let k = 0;
    while (k < KF.length - 2 && progress > KF[k + 1].p) k++;
    const a = KF[k];
    const b = KF[k + 1];
    const t = smooth(map01(progress, a.p, b.p));
    const th = a.th + (b.th - a.th) * t;
    const r = (a.r + (b.r - a.r) * t) * (isMobile ? 1.35 : 1);
    const h = a.h + (b.h - a.h) * t;
    const ty = a.ty + (b.ty - a.ty) * t;
    const tx = (a.tx + (b.tx - a.tx) * t) * (isMobile ? 0.25 : 1);

    camera.position.set(Math.sin(th) * r + sPX * 2.2, h + sPY * 1.4, Math.cos(th) * r);
    camTarget.set(tx, ty, 0);
    camera.lookAt(camTarget);
  }

  function tick() {
    const dt = clock.getDelta();
    const t = clock.elapsedTime;

    const pos = dustGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < DUST_N; i++) {
      const y = pos.getY(i) + dt * (0.25 + Math.sin(dustSeed[i]) * 0.1);
      pos.setY(i, y > 10 ? 0 : y);
      pos.setX(i, pos.getX(i) + Math.sin(t * 0.3 + dustSeed[i]) * dt * 0.35);
    }
    pos.needsUpdate = true;

    groundWorkers.forEach((w, i) => {
      w.rotation.y = Math.sin(t * 0.5 + i * 2.1) * 0.4;
    });

    updateCamera(dt);
    renderer.render(scene, camera);
    if (running) rafId = requestAnimationFrame(tick);
  }

  function resize() {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    if (!running) renderer.render(scene, camera);
  }

  applyProgress(0);
  resize();

  return {
    setProgress: applyProgress,
    setPointer(x: number, y: number) {
      pointerX = x;
      pointerY = y;
    },
    setRunning(v: boolean) {
      if (v && !running) {
        running = true;
        clock.getDelta();
        rafId = requestAnimationFrame(tick);
      } else if (!v && running) {
        running = false;
        cancelAnimationFrame(rafId);
      }
    },
    resize,
    dispose() {
      running = false;
      cancelAnimationFrame(rafId);
      renderer.dispose();
      pmrem.dispose();
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh || o instanceof THREE.Points || o instanceof THREE.Line) {
          o.geometry?.dispose();
          const m = o.material as THREE.Material | THREE.Material[];
          if (Array.isArray(m)) m.forEach((mm) => mm.dispose());
          else m?.dispose();
        }
      });
    },
  };
}

export type LandmarkScene = ReturnType<typeof createLandmarkScene>;
