// Same exact URL as the main scene's dynamic import further down — using
// one canonical specifier means the browser fetches/parses Three.js only
// ONCE and reuses that cached module record for both, instead of pulling
// down and compiling the library twice from two different CDNs.
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.160.0/three.module.min.js';

(function () {
  const CONFIG = {
    tileCols: 8,
    tileRows: 5,
    planeWidth: 16,          
    driftXY: 3.2,            
    driftZ: 2.0,             
    pullForward: 0.9,        
    fov: 45,
    dollyAmount: 0.1,        
    smoothing: 0.085,
    tileCornerRadius: 0.05,
    tileEdgeFeather: 0.065, 
    tileShineIntensity: 0.15, 
    tileShineSharpness: 34,   
    tileShineColor: 0xf3f4ff, 
  };

  const section = document.querySelector('.clps-section');
  const sticky = section.querySelector('.clps-sticky');
  const wrap = document.getElementById('clpsCanvasWrap');
  const video = document.getElementById('clpsVideo');
  const fallbackVideo = document.getElementById('clpsFallbackVideo');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  
  let renderer;
  try {
    /* alpha:false — this canvas used to clear to fully transparent, which
       depends on correct DOM/z-index stacking to keep anything behind it
       from showing through the gaps between the shatter tiles. Making the
       canvas itself paint fully opaque removes that dependency entirely:
       there is no longer any transparent pixel for anything else to show
       through, regardless of stacking order. */
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  } catch (e) {
    renderer = null;
  }
  if (!renderer || !renderer.getContext()) {
    section.classList.add('no-webgl');
  } else {
    initScene();
  }

  
  
  video.muted = true;
  video.play().then(() => video.pause()).catch(() => {});

  function initScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x030208);
    renderer.setClearColor(0x030208, 1);

    const camera = new THREE.PerspectiveCamera(CONFIG.fov, 1, 0.1, 100);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    wrap.appendChild(renderer.domElement);

    
    const texture = new THREE.VideoTexture(video);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;

    
    
    
    const tileVertexShader = `
      attribute vec2 aMaskUv;
      varying vec2 vUv;
      varying vec2 vMaskUv;
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      void main() {
        vUv = uv;
        vMaskUv = aMaskUv;
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `;
    const tileFragmentShader = `
      precision mediump float;
      uniform sampler2D map;
      uniform float cornerRadius;
      uniform float edgeFeather;
      uniform float shineIntensity;
      uniform float shineSharpness;
      uniform vec3 shineColor;
      varying vec2 vUv;
      varying vec2 vMaskUv;
      varying vec3 vNormal;
      varying vec3 vViewPosition;

      // signed distance to a rounded box (Inigo Quilez)
      float sdRoundedBox(vec2 p, vec2 halfSize, float r) {
        vec2 q = abs(p) - halfSize + r;
        return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
      }

      void main() {
        vec4 texColor = texture2D(map, vUv);
        vec2 p = vMaskUv - 0.5;
        float dist = sdRoundedBox(p, vec2(0.5), cornerRadius);
        float alpha = 1.0 - smoothstep(0.0, edgeFeather, dist);
        if (alpha < 0.02) discard;

        // a fixed key light + camera-facing rim, so each shard catches a real,
        // angle-dependent glint as it tumbles rather than a flat painted-on shine
        vec3 N = normalize(vNormal);
        vec3 V = normalize(vViewPosition);
        vec3 L = normalize(vec3(0.35, 0.55, 1.0));
        vec3 H = normalize(L + V);
        float spec = pow(max(dot(N, H), 0.0), shineSharpness);
        float fresnel = pow(1.0 - max(dot(N, V), 0.0), 2.5) * 0.5;
        vec3 shine = shineColor * (spec + fresnel) * shineIntensity;

        gl_FragColor = vec4(texColor.rgb + shine, alpha);
      }
    `;
    const material = new THREE.ShaderMaterial({
      uniforms: {
        map: { value: texture },
        cornerRadius: { value: CONFIG.tileCornerRadius },
        edgeFeather: { value: CONFIG.tileEdgeFeather },
        shineIntensity: { value: CONFIG.tileShineIntensity },
        shineSharpness: { value: CONFIG.tileShineSharpness },
        shineColor: { value: new THREE.Color(CONFIG.tileShineColor) },
      },
      vertexShader: tileVertexShader,
      fragmentShader: tileFragmentShader,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    
    const cols = CONFIG.tileCols;
    const rows = CONFIG.tileRows;
    const videoAspect = 16 / 9; 
    const planeW = CONFIG.planeWidth;
    const planeH = planeW / videoAspect;
    const tileW = planeW / cols;
    const tileH = planeH / rows;

    const tiles = [];
    const group = new THREE.Group();
    scene.add(group);

    const maxDist = Math.hypot(planeW / 2, planeH / 2);

    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const geo = new THREE.PlaneGeometry(tileW, tileH, 1, 1);

        
        const u0 = i / cols, u1 = (i + 1) / cols;
        const vTop = 1 - j / rows, vBottom = 1 - (j + 1) / rows;
        geo.setAttribute('uv', new THREE.BufferAttribute(new Float32Array([
          u0, vTop,  u1, vTop,
          u0, vBottom, u1, vBottom,
        ]), 2));

        
        geo.setAttribute('aMaskUv', new THREE.BufferAttribute(new Float32Array([
          0, 1,  1, 1,
          0, 0,  1, 0,
        ]), 2));

        const mesh = new THREE.Mesh(geo, material);
        const baseX = -planeW / 2 + tileW * (i + 0.5);
        const baseY = planeH / 2 - tileH * (j + 0.5);
        mesh.position.set(baseX, baseY, 0);
        group.add(mesh);

        const dist = Math.hypot(baseX, baseY);
        const rand = (min, max) => min + Math.random() * (max - min);

        tiles.push({
          mesh,
          base: { x: baseX, y: baseY },
          delay: (dist / maxDist) * 0.35, 
          seed: {
            dx: rand(-1, 1),
            dy: rand(-1, 1),
            dz: rand(0.4, 1),
            rx: rand(-1, 1),
            ry: rand(-1, 1),
            rz: rand(-1, 1),
            floatFreq: rand(0.0005, 0.0013),
            floatPhase: rand(0, Math.PI * 2),
            floatAmp: rand(0.045, 0.11),
          },
        });
      }
    }

    let baseDistance = 10;
    function fitCamera() {
      const w = sticky.clientWidth, h = sticky.clientHeight;
      const aspect = w / h;
      camera.aspect = aspect;
      const fovRad = (CONFIG.fov * Math.PI) / 180;
      const distForHeight = planeH / (2 * Math.tan(fovRad / 2));
      const distForWidth = planeW / (2 * Math.tan(fovRad / 2) * aspect);
      
      
      baseDistance = Math.min(distForHeight, distForWidth) * 0.96;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    fitCamera();
    window.addEventListener('resize', fitCamera);

    
    let targetProgress = 0;
    let currentProgress = 0;
    function readProgress() {
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      if (total <= 0) return 0;
      const scrolled = -rect.top;
      return Math.min(1, Math.max(0, scrolled / total));
    }
    window.addEventListener('scroll', () => { targetProgress = readProgress(); }, { passive: true });
    targetProgress = readProgress();
    currentProgress = targetProgress;

    
    let pointer = { x: 0, y: 0 };
    if (!prefersReducedMotion) {
      window.addEventListener('pointermove', (e) => {
        pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
      }, { passive: true });
    }

    const clamp01 = (v) => Math.min(1, Math.max(0, v));
    const smoothstep = (v) => v * v * (3 - 2 * v);
    const lerp = (a, b, t) => a + (b - a) * t;

    const beats = [
      document.getElementById('clpsBeat0'),
      document.getElementById('clpsBeat1'),
      document.getElementById('clpsBeat2'),
    ];
    const beatRanges = [
      
      
      [-0.06, 0.20],  
      [0.24, 0.80],   
      [0.84, 1.1],    
    ];

    function beatOpacity(p, [start, end]) {
      const fadeIn = smoothstep(clamp01((p - start) / 0.06));
      const fadeOut = 1 - smoothstep(clamp01((p - (end - 0.06)) / 0.06));
      return Math.min(fadeIn, fadeOut);
    }

    function updateTiles(p, time) {
      for (const t of tiles) {
        const local = clamp01((p - t.delay) / (1 - t.delay + 0.0001));
        const eased = smoothstep(local);
        const { seed, base, mesh } = t;

        
        
        const floatFade = prefersReducedMotion ? 0 : (1 - eased);
        const floatX = Math.sin(time * seed.floatFreq + seed.floatPhase) * seed.floatAmp * floatFade;
        const floatY = Math.cos(time * seed.floatFreq * 0.82 + seed.floatPhase) * seed.floatAmp * floatFade;
        const floatZ = Math.sin(time * seed.floatFreq * 1.35 + seed.floatPhase) * seed.floatAmp * 0.5 * floatFade;
        const floatRotZ = Math.sin(time * seed.floatFreq * 1.1 + seed.floatPhase) * 0.05 * floatFade;

        mesh.position.set(
          base.x + eased * seed.dx * CONFIG.driftXY + floatX,
          base.y + eased * seed.dy * CONFIG.driftXY + floatY,
          eased * seed.dz * CONFIG.driftZ + eased * eased * CONFIG.pullForward + floatZ
        );
        mesh.rotation.x = eased * seed.rx * Math.PI * 0.55;
        mesh.rotation.y = eased * seed.ry * Math.PI * 0.55;
        mesh.rotation.z = eased * seed.rz * Math.PI * 0.25 + floatRotZ;
        const s = 1 - eased * 0.3;
        mesh.scale.setScalar(Math.max(s, 0.4));
      }
    }

    function updateCamera(p, time) {
      camera.position.z = baseDistance * (1 - p * CONFIG.dollyAmount);
      const parallaxStrength = prefersReducedMotion ? 0 : 0.35;
      camera.position.x = pointer.x * parallaxStrength;
      camera.position.y = pointer.y * parallaxStrength * 0.6;
      group.rotation.y = lerp(-0.04, 0.1, p) + (prefersReducedMotion ? 0 : Math.sin(time * 0.00015) * 0.01);
      camera.lookAt(0, 0, 0);
    }

    function updateHUD(p) {
      for (let i = 0; i < beats.length; i++) {
        beats[i].style.opacity = beatOpacity(p, beatRanges[i]);
      }
    }

    
    function reveal() {
      wrap.classList.add('is-ready');
    }
    if (video.readyState >= 2) reveal();
    else video.addEventListener('loadeddata', reveal, { once: true });
    setTimeout(reveal, 600); 

    
    const duration = () => video.duration || 8;
    function animate(time) {
      currentProgress += (targetProgress - currentProgress) * CONFIG.smoothing;

      const target = currentProgress * duration();
      if (Math.abs(video.currentTime - target) > 0.01 && video.readyState >= 1) {
        if (video.fastSeek) video.fastSeek(target);
        else video.currentTime = target;
      }
      texture.needsUpdate = true;

      updateTiles(currentProgress, time);
      updateCamera(currentProgress, time);
      updateHUD(currentProgress);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }
})();
