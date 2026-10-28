// Capabilities 3D Stage: The Cricket Pitch & Technical Disciplines.
// Scrolling orbits the camera around the 3D scene, focusing on the Ball (Analytics),
// Pitch (Databases), Wickets (Full-Stack), and Stadium (Cloud),
// with an SVG leader line connecting the 3D anchor to the active discipline card.

import { loadThree, createCricketBall, createWickets } from './intro.js';

// Camera views and 3D anchor points for each discipline
const DISCIPLINES = {
  analytics: {
    cam: { az: 0.6, el: 0.35, r: 2.2, target: [0, 0.35, 0] },
    anchor: [0, 0.35, 0]
  },
  database: {
    cam: { az: -1.2, el: 0.7, r: 7.5, target: [0, 0, -1.5] },
    anchor: [0, 0.05, 0.8]
  },
  fullstack: {
    cam: { az: 0.1, el: 0.25, r: 3.5, target: [0, 0.8, 3.5] },
    anchor: [0, 1.4, 3.5]
  },
  cloud: {
    cam: { az: -2.1, el: 0.85, r: 12.0, target: [0, 0, 0] },
    anchor: [3.5, 4.2, 2.0]
  }
};

const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (a, b, x) => {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

export async function initXray(setup) {
  const section = document.getElementById('capabilities');
  const track = document.getElementById('xrTrack');
  const stage = document.getElementById('xrStage');
  const canvas = document.getElementById('xrCanvas');
  const leader = document.getElementById('xrLeader');
  const pin = document.getElementById('xrPin');
  const pinRing = document.getElementById('xrPinRing');
  const cards = [...document.querySelectorAll('.xr-card')];
  const steps = [...document.querySelectorAll('#xrSteps li')];
  const parts = setup.map((s) => s.part);

  const { THREE } = await loadThree();
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.shadowMap.enabled = true;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);

  // Lighting
  const keyLight = new THREE.DirectionalLight(0xF0FDF4, 2.5);
  keyLight.position.set(6, 12, 6);
  scene.add(keyLight);

  const rimLight = new THREE.PointLight(0x00E575, 4, 25);
  rimLight.position.set(-4, 3, -3);
  scene.add(rimLight);

  const ambLight = new THREE.AmbientLight(0x0E1724, 1.2);
  scene.add(ambLight);

  // 3D Pitch
  const pitchGeo = new THREE.PlaneGeometry(3.6, 16);
  const pitchMat = new THREE.MeshStandardMaterial({
    color: 0x8C744F,
    roughness: 0.85,
    metalness: 0.05
  });
  const pitch = new THREE.Mesh(pitchGeo, pitchMat);
  pitch.rotation.x = -Math.PI / 2;
  pitch.receiveShadow = true;
  scene.add(pitch);

  // Crease
  const creaseMat = new THREE.MeshBasicMaterial({ color: 0xEDF2F7 });
  const creaseGeo = new THREE.PlaneGeometry(3.2, 0.08);
  const crease = new THREE.Mesh(creaseGeo, creaseMat);
  crease.rotation.x = -Math.PI / 2;
  crease.position.set(0, 0.002, 2.5);
  scene.add(crease);

  // 3D Ball
  const { group: ball } = createCricketBall(THREE);
  ball.position.set(0, 0.35, 0);
  scene.add(ball);

  // 3D Wickets
  const { group: wickets, setZing } = createWickets(THREE);
  wickets.position.set(0, 0, 3.5);
  scene.add(wickets);

  // Stadium Floodlight Tower Mockup for Cloud View
  const towerGeo = new THREE.CylinderGeometry(0.08, 0.14, 6, 8);
  const towerMat = new THREE.MeshStandardMaterial({ color: 0x1E293B, metalness: 0.8, roughness: 0.3 });
  const tower = new THREE.Mesh(towerGeo, towerMat);
  tower.position.set(4, 3, 2);
  scene.add(tower);

  const headGeo = new THREE.BoxGeometry(0.8, 0.5, 0.2);
  const headMat = new THREE.MeshBasicMaterial({ color: 0x38BDF8 });
  const lightHead = new THREE.Mesh(headGeo, headMat);
  lightHead.position.set(4, 5.8, 2);
  scene.add(lightHead);

  // Resize
  function resize() {
    const w = stage.clientWidth;
    const h = stage.clientHeight;
    if (!w || !h) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  }
  window.addEventListener('resize', resize);
  resize();

  // Scroll tracking
  let currentFraction = 0;

  function update() {
    const rect = track.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    const scrollY = -rect.top;
    const frac = total > 0 ? Math.max(0, Math.min(1, scrollY / total)) : 0;
    currentFraction = frac;

    // Determine active index among 4 items
    const count = parts.length;
    const activeIdx = Math.min(count - 1, Math.floor(frac * count));

    // Update active card & step
    cards.forEach((c, i) => c.classList.toggle('on', i === activeIdx));
    steps.forEach((s, i) => s.classList.toggle('on', i === activeIdx));

    // Interpolate camera between views
    const seg = 1 / (count - 1);
    const segIdx = Math.min(count - 2, Math.floor(frac / seg));
    const localT = (frac - segIdx * seg) / seg;
    const smoothT = smooth(0, 1, localT);

    const partA = parts[segIdx];
    const partB = parts[segIdx + 1] || partA;
    const viewA = DISCIPLINES[partA].cam;
    const viewB = DISCIPLINES[partB].cam;

    const az = lerp(viewA.az, viewB.az, smoothT);
    const el = lerp(viewA.el, viewB.el, smoothT);
    const r = lerp(viewA.r, viewB.r, smoothT);
    const tx = lerp(viewA.target[0], viewB.target[0], smoothT);
    const ty = lerp(viewA.target[1], viewB.target[1], smoothT);
    const tz = lerp(viewA.target[2], viewB.target[2], smoothT);

    camera.position.set(
      tx + r * Math.sin(az) * Math.cos(el),
      ty + r * Math.sin(el),
      tz + r * Math.cos(az) * Math.cos(el)
    );
    camera.lookAt(tx, ty, tz);

    // Ball subtle rotation
    ball.rotation.x += 0.01;
    ball.rotation.y += 0.015;

    // Zing glow when fullstack discipline is active
    setZing(activeIdx === 2, 3.5);

    renderer.render(scene, camera);

    // Project anchor to 2D screen coordinates for SVG leader line
    const activePart = parts[activeIdx];
    const anchorWorld = new THREE.Vector3(...DISCIPLINES[activePart].anchor);
    anchorWorld.project(camera);

    const stageRect = stage.getBoundingClientRect();
    const px = ((anchorWorld.x + 1) / 2) * stageRect.width;
    const py = ((-anchorWorld.y + 1) / 2) * stageRect.height;

    // Position pin
    pin.setAttribute('cx', px);
    pin.setAttribute('cy', py);
    pinRing.setAttribute('cx', px);
    pinRing.setAttribute('cy', py);

    // Connect leader line from anchor to active card
    const activeCard = cards[activeIdx];
    if (activeCard) {
      const cardRect = activeCard.getBoundingClientRect();
      const cardX = cardRect.left - stageRect.left;
      const cardY = cardRect.top - stageRect.top + 30;

      // Draw clean polyline
      const midX = px + (cardX - px) * 0.45;
      leader.setAttribute('points', `${px},${py} ${midX},${py} ${midX},${cardY} ${cardX},${cardY}`);
    }
  }

  let rafId;
  function loop() {
    update();
    rafId = requestAnimationFrame(loop);
  }
  loop();

  return () => {
    cancelAnimationFrame(rafId);
    window.removeEventListener('resize', resize);
    renderer.dispose();
  };
}
