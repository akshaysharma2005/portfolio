// Opening sequence: 3D Cricket delivery under stadium floodlights.
// The bowler delivers down the 22-yard pitch, the ball spins on its seam,
// crosses the glowing Zing wickets, and launches into Akshay's portfolio.

const SEEN_KEY = 'cricketIntroSeen';
const params = new URLSearchParams(location.search);
const SPEED = params.has('slowmo') ? 0.25 : 1;
const FREEZE_AT = params.has('at') ? parseFloat(params.get('at')) : NaN;
const frozen = !Number.isNaN(FREEZE_AT);

let running = false;
let threeModules = null;

export function loadThree() {
  if (!threeModules) {
    threeModules = Promise.all([
      import('three'),
      import('three/addons/environments/RoomEnvironment.js')
    ]).then(([THREE, r]) => ({
      THREE, RoomEnvironment: r.RoomEnvironment
    }));
    threeModules.catch(() => { threeModules = null; });
  }
  return threeModules;
}

const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);
const easeInOut = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const clamp01 = (x) => Math.max(0, Math.min(1, x));

// Helper to create a procedural 3D Cricket Ball with realistic leather seam
export function createCricketBall(THREE) {
  const group = new THREE.Group();

  // Ball core sphere
  const sphereGeo = new THREE.SphereGeometry(0.35, 64, 64);
  const sphereMat = new THREE.MeshPhysicalMaterial({
    color: 0x9B111E, // Rich Crimson Leather / Duke Cherry Red
    roughness: 0.25,
    metalness: 0.1,
    clearcoat: 0.85,
    clearcoatRoughness: 0.2,
    reflectivity: 0.8
  });
  const core = new THREE.Mesh(sphereGeo, sphereMat);
  group.add(core);

  // Raised equatorial seam
  const seamCurve = new THREE.EllipseCurve(0, 0, 0.354, 0.354, 0, 2 * Math.PI, false, 0);
  const points = seamCurve.getPoints(120);
  const seamGeo = new THREE.BufferGeometry().setFromPoints(points.map(p => new THREE.Vector3(p.x, p.y, 0)));
  
  // Tube along the seam
  const tubeGeo = new THREE.TorusGeometry(0.353, 0.012, 16, 100);
  const tubeMat = new THREE.MeshStandardMaterial({
    color: 0xEDEBE6,
    roughness: 0.6,
    metalness: 0.05
  });
  const seamTorus = new THREE.Mesh(tubeGeo, tubeMat);
  seamTorus.rotation.x = Math.PI / 2;
  group.add(seamTorus);

  // Stitches detail around seam
  const stitchCount = 48;
  const stitchGeo = new THREE.BoxGeometry(0.008, 0.024, 0.006);
  const stitchMat = new THREE.MeshBasicMaterial({ color: 0xF7FAFC });
  const stitches = new THREE.InstancedMesh(stitchGeo, stitchMat, stitchCount * 2);
  const dummy = new THREE.Object3D();

  for (let i = 0; i < stitchCount; i++) {
    const angle = (i / stitchCount) * Math.PI * 2;
    const r = 0.355;
    // Row 1
    dummy.position.set(Math.cos(angle) * r, Math.sin(angle) * r, 0.015);
    dummy.rotation.z = angle + Math.PI / 2;
    dummy.rotation.x = 0.2;
    dummy.updateMatrix();
    stitches.setMatrixAt(i, dummy.matrix);

    // Row 2
    dummy.position.set(Math.cos(angle) * r, Math.sin(angle) * r, -0.015);
    dummy.rotation.z = angle + Math.PI / 2;
    dummy.rotation.x = -0.2;
    dummy.updateMatrix();
    stitches.setMatrixAt(i + stitchCount, dummy.matrix);
  }
  stitches.instanceMatrix.needsUpdate = true;
  group.add(stitches);

  return { group, core, seamTorus };
}

// Helper to create 3D Wickets (3 Stumps + 2 Bails with LED glow capability)
export function createWickets(THREE) {
  const group = new THREE.Group();
  const woodMat = new THREE.MeshStandardMaterial({
    color: 0xC49A45,
    roughness: 0.4,
    metalness: 0.1
  });
  const zingMat = new THREE.MeshStandardMaterial({
    color: 0xFF2A55,
    emissive: 0x000000,
    emissiveIntensity: 0,
    roughness: 0.2
  });

  const stumpGeo = new THREE.CylinderGeometry(0.038, 0.038, 1.4, 24);
  const spacing = 0.16;

  const stumps = [];
  for (let i = -1; i <= 1; i++) {
    const stump = new THREE.Mesh(stumpGeo, woodMat);
    stump.position.set(i * spacing, 0.7, 0);
    stump.castShadow = true;
    stump.receiveShadow = true;
    group.add(stump);
    stumps.push(stump);
  }

  // 2 Bails
  const bailGeo = new THREE.CylinderGeometry(0.018, 0.018, 0.18, 16);
  const bail1 = new THREE.Mesh(bailGeo, zingMat.clone());
  bail1.rotation.z = Math.PI / 2;
  bail1.position.set(-spacing / 2, 1.415, 0);
  group.add(bail1);

  const bail2 = new THREE.Mesh(bailGeo, zingMat.clone());
  bail2.rotation.z = Math.PI / 2;
  bail2.position.set(spacing / 2, 1.415, 0);
  group.add(bail2);

  const bails = [bail1, bail2];

  function setZing(active, intensity = 2.5) {
    bails.forEach(b => {
      b.material.emissive.setHex(active ? 0xFF2A55 : 0x000000);
      b.material.emissiveIntensity = active ? intensity : 0;
    });
  }

  return { group, stumps, bails, setZing };
}

export async function playIntro() {
  if (running) return;
  running = true;

  const root = document.documentElement;
  const intro = document.getElementById('intro');
  const canvas = document.getElementById('introCanvas');
  const lights = document.getElementById('lights');
  const status = document.getElementById('introStatus');
  const loadFill = document.getElementById('loadFill');
  const loadPct = document.getElementById('loadPct');
  const skipBtn = document.getElementById('skipIntro');

  intro.className = 'intro active';
  document.body.classList.remove('arrive');
  status.textContent = 'Loading match session';
  loadFill.style.width = '0%';
  loadPct.textContent = '0';

  // 6 ball delivery indicators (an Over)
  if (!lights.children.length) {
    for (let i = 0; i < 6; i++) {
      const ball = document.createElement('span');
      ball.className = 'lamp';
      ball.dataset.ball = `0.${i + 1}`;
      lights.appendChild(ball);
    }
  }
  const lamps = [...lights.children];
  lamps.forEach((l) => l.classList.remove('on'));
  lights.classList.remove('show');

  let finished = false;
  let disposeScene = () => {};
  const timers = [];
  const later = (fn, ms) => {
    if (frozen && ms / 1000 > FREEZE_AT) return;
    timers.push(setTimeout(fn, ms / SPEED));
  };

  function finish() {
    if (finished) return;
    finished = true;
    timers.forEach(clearTimeout);
    window.removeEventListener('keydown', onKey);
    skipBtn.removeEventListener('click', finish);
    try { sessionStorage.setItem(SEEN_KEY, '1'); } catch (e) { /* storage blocked */ }

    root.classList.remove('intro-on');
    window.scrollTo(0, 0);
    document.body.classList.add('arrive');
    intro.classList.add('fade');
    setTimeout(() => {
      disposeScene();
      intro.className = 'intro';
      running = false;
    }, 950);
  }
  function onKey(e) { if (e.key === 'Escape') finish(); }
  window.addEventListener('keydown', onKey);
  skipBtn.addEventListener('click', finish);

  try {
    const { THREE } = await loadThree();

    // Scene setup
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x06090E);
    scene.fog = new THREE.FogExp2(0x06090E, 0.035);

    const camera = new THREE.PerspectiveCamera(36, window.innerWidth / window.innerHeight, 0.1, 100);

    // 22-yard turf pitch & grass outfield
    const pitchGeo = new THREE.PlaneGeometry(3.6, 22);
    const pitchMat = new THREE.MeshStandardMaterial({
      color: 0x937952, // Clay turf
      roughness: 0.85,
      metalness: 0.05
    });
    const pitch = new THREE.Mesh(pitchGeo, pitchMat);
    pitch.rotation.x = -Math.PI / 2;
    pitch.receiveShadow = true;
    scene.add(pitch);

    // Crease lines (popping crease at z = 8.5)
    const creaseMat = new THREE.MeshBasicMaterial({ color: 0xEDF2F7 });
    const creaseGeo = new THREE.PlaneGeometry(3.2, 0.08);
    const popCrease = new THREE.Mesh(creaseGeo, creaseMat);
    popCrease.rotation.x = -Math.PI / 2;
    popCrease.position.set(0, 0.002, 8.5);
    scene.add(popCrease);

    // Outfield grass
    const grassGeo = new THREE.PlaneGeometry(60, 60);
    const grassMat = new THREE.MeshStandardMaterial({
      color: 0x0B2317,
      roughness: 0.9,
      metalness: 0.02
    });
    const grass = new THREE.Mesh(grassGeo, grassMat);
    grass.rotation.x = -Math.PI / 2;
    grass.position.y = -0.01;
    grass.receiveShadow = true;
    scene.add(grass);

    // Stadium Floodlights (4 towers)
    const floodlightColor = 0xF0FDF4;
    const keyLight = new THREE.DirectionalLight(floodlightColor, 2.8);
    keyLight.position.set(8, 16, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x38BDF8, 1.2);
    fillLight.position.set(-8, 14, -8);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0x00E575, 4, 30);
    rimLight.position.set(0, 3, 10);
    scene.add(rimLight);

    const ambLight = new THREE.AmbientLight(0x0C1929, 0.7);
    scene.add(ambLight);

    // 3D Ball & Wickets
    const { group: ball, core: ballCore, seamTorus } = createCricketBall(THREE);
    ball.position.set(0, 0.35, -9);
    ball.castShadow = true;
    scene.add(ball);

    const { group: wickets, setZing } = createWickets(THREE);
    wickets.position.set(0, 0, 9.5);
    scene.add(wickets);

    // Particles (ambient stadium night dew / dust)
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 20;
      particlePos[i + 1] = Math.random() * 8 + 0.2;
      particlePos[i + 2] = (Math.random() - 0.5) * 25;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00E575,
      size: 0.04,
      transparent: true,
      opacity: 0.6
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Resize handler
    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onResize);

    // Loading sequence
    loadFill.style.width = '100%';
    loadPct.textContent = '100';
    intro.classList.add('loaded');
    status.textContent = 'Ready';

    // Show over indicators
    later(() => {
      lights.classList.add('show');
      lamps.forEach((lamp, idx) => {
        later(() => lamp.classList.add('on'), idx * 220);
      });
    }, 400);

    // Animation timeline
    let startTime = performance.now();
    let animId = null;

    function renderFrame(now) {
      if (finished) return;
      animId = requestAnimationFrame(renderFrame);

      const elapsed = ((now - startTime) / 1000) * SPEED;

      // Ball and camera choreography
      if (elapsed < 1.8) {
        // Phase 1: Ball rotating close up at the bowler's end
        const t = clamp01(elapsed / 1.8);
        camera.position.set(0.6 * (1 - t), 0.7 - t * 0.1, -7.5 - t * 0.5);
        camera.lookAt(ball.position.x, ball.position.y, ball.position.z);
        ball.rotation.x += 0.04;
        ball.rotation.y += 0.03;
      } else if (elapsed < 4.2) {
        // Phase 2: Delivery down the pitch towards the wickets
        const t = clamp01((elapsed - 1.8) / 2.4);
        const easeT = easeInOut(t);
        
        // Ball z travels from -9 to +9.3 (past wickets)
        const ballZ = -9 + easeT * 18.5;
        // Ball parabolic bounce at z = 2.0
        const bounce = Math.abs(Math.sin(easeT * Math.PI * 1.5)) * 0.6 + 0.35;
        ball.position.set(Math.sin(easeT * Math.PI) * 0.15, bounce, ballZ);

        // Rapid seam rotation
        ball.rotation.x += 0.28;
        ball.rotation.y += 0.12;
        ball.rotation.z += 0.08;

        // Camera tracking the delivery
        camera.position.set(0.4, 1.2, ballZ - 2.8);
        camera.lookAt(0, 0.8, ballZ + 3);

        // Near the wickets (t > 0.88), illuminate Zing bails!
        if (t > 0.85) {
          setZing(true, 4.0);
        }
      } else {
        // Phase 3: Flight past the wickets into site entrance
        const t = clamp01((elapsed - 4.2) / 0.8);
        camera.position.set(0, 1.3, 9.5 + t * 4);
        camera.lookAt(0, 1.3, 16);
        setZing(true, 5.0 * (1 - t * 0.5));

        if (t >= 0.95) {
          finish();
        }
      }

      // Gentle particle drift
      particles.rotation.y += 0.001;

      renderer.render(scene, camera);
    }

    animId = requestAnimationFrame(renderFrame);

    disposeScene = () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      pitchGeo.dispose();
      pitchMat.dispose();
      grassGeo.dispose();
      grassMat.dispose();
      scene.clear();
    };

    // Auto finish fallback
    later(finish, 4800);

  } catch (err) {
    console.warn('Cricket 3D intro fallback:', err);
    finish();
  }
}
