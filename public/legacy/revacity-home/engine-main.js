window.__ENGINE_BUILD__ = '2026-09-14T07:27Z-red-ring-fix';
console.log('[revacity-engine] build:', window.__ENGINE_BUILD__);
if('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

let THREE;
try{
  THREE = await import('https://cdnjs.cloudflare.com/ajax/libs/three.js/0.160.0/three.module.min.js');
}catch(e){
  document.body.innerHTML = '<div style="position:fixed;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:32px;font-family:system-ui,sans-serif;color:#eef0ff;background:#0a0315;"><div style="max-width:480px;"><p style="font-size:15px;line-height:1.6;opacity:.85;">Couldn\u2019t load the Three.js library from the CDN (network/CSP blocked it). Try opening this downloaded HTML file directly in a regular browser tab rather than an embedded preview.</p></div></div>';
  throw e;
}
if(!window.gsap || !window.ScrollTrigger){
  document.body.innerHTML = '<div style="position:fixed;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:32px;font-family:system-ui,sans-serif;color:#eef0ff;background:#0a0315;"><div style="max-width:480px;"><p style="font-size:15px;line-height:1.6;opacity:.85;">Couldn\u2019t load GSAP/ScrollTrigger from the CDN (network/CSP blocked it). Try opening this downloaded HTML file directly in a regular browser tab rather than an embedded preview.</p></div></div>';
  throw new Error('GSAP failed to load');
}














let PostFX = null;
try{
  const [composerMod, renderMod, bloomMod, shaderMod] = await Promise.all([
    import('three/addons/postprocessing/EffectComposer.js'),
    import('three/addons/postprocessing/RenderPass.js'),
    import('three/addons/postprocessing/UnrealBloomPass.js'),
    import('three/addons/postprocessing/ShaderPass.js'),
  ]);
  PostFX = {
    EffectComposer: composerMod.EffectComposer,
    RenderPass: renderMod.RenderPass,
    UnrealBloomPass: bloomMod.UnrealBloomPass,
    ShaderPass: shaderMod.ShaderPass,
  };
}catch(e){
  PostFX = null;
}









const chapters = [
  {
    key:'intro', hex:'#e7ecff', isStatement:true,
    eyebrow:'\u201cAre you here to <u>Compete</u>, or to <u>Dominate</u>?\u201d',
    heading:'Are you Here for a <a class="u-word" href="/en/services" target="_top">Reason</a> or <a class="u-word" href="/en/the-agent" target="_top">Reasoning</a>?',
    sub:'',
    detail:'Smooth, immersive 3D scroll experiences built with GSAP, WebGL, and Three.js \u2014 turning simple scrolling into responsive visual motion.'
  },
  {
    key:'origin', hex:'#c9a8ff',
    eyebrow:'The Industry in 2026', heading:'Five Systemic Failures',
    sub:'',   /* empty — `p.sub:empty { display:none }` drops it from the flow */
    /* Any chapter carrying `items` renders them as a numbered list and switches
       the copy block to the wide, left-aligned layout. */
    items:[
      ['Semantic Collapse',   'No common terms, no unified source of truth. Anyone can twist any phrase.'],
      ['Agent-Washing',       'Vendors take rigidly programmed workflow wrappers and rebrand them as \u201cautonomous agents.\u201d'],
      ['Process Amplification','If logic is messy, the agent doesn\u2019t fix it; it automates the mess.'],
      ['Trust Recession',     'AI-generated content saturation has made consumers skeptical.'],
      ['The Jagged Frontier', 'Agents solve PhD math but fail on real-world process.'],
    ],
    detail:'In the first fraction of a second, energy became matter. What began as pure light would, in time, become stars, planets, and everything that has ever wondered about them.'
  },
  {
    key:'nebula', hex:'#e26fe0',
    eyebrow:'COMPETITIVE LANDSCAPE', heading:'What We Replace',
    sub:'',
    detail:'',
    /* Any chapter carrying `cards` renders them as the red-themed
       competitive-landscape grid below the heading (see has-cards in
       <style>) — the heading/eyebrow themselves stay centered, same size
       and style as every other chapter. */
    cards:[
      { n:'01', title:'The Retainer Mafia', text:'Monthly retainers for “ongoing optimization.” You pay whether they deliver or not. The incentive is to keep you dependent, not to make you successful.', icon:1 },
      { n:'02', title:'The Arbitrage Circus', text:'Agencies that buy cheap attention and sell it expensive. No engineering. No strategy. Just margin on media spend.', icon:2 },
      { n:'03', title:'The Agent-Washers', text:'Vendors wrapping rigid workflows in AI branding. The agent doesn’t think; it follows a script someone wrote in 2023.', icon:3 }
    ],
    footer:'We are none of these. We are a <span class="highlight-purple">Stateless Outcome Engineering Practice</span> that signs behind revenue outcomes with our own money on the line.'
  },
  {
    key:'galaxy', hex:'#8f6fff',
    eyebrow:'CLARITY THROUGH NEGATION', heading:'What We Are Not.',
    sub:'',
    detail:'',
    /* Any chapter carrying `negation` renders it as the red dash-bordered
       negation grid below the heading (see has-negation in <style>) — same
       treatment as `cards`: heading stays put, permanently visible. */
    negation:[
      { title:'Not a Marketing Agency.', text:'We don’t manage campaigns, buy media, or optimize funnels.' },
      { title:'Not a Consulting Firm.', text:'We don’t write decks and walk away. We engineer outcomes and sign behind them.' },
      { title:'Not an AI Vendor.', text:'We don’t sell software, licenses, or platforms. AI is our instrument, not our product.' },
      { title:'Not a Staffing Company.', text:'We don’t rent bodies. We deploy Sovereign Architects who own outcomes end-to-end.' },
      { title:'Not a Growth Hacking Shop.', text:'We don’t chase hacks, shortcuts, or viral tricks. We engineer compound systems.' },
      { title:'Not a Traditional Agency.', text:'We don’t bill hours, pad retainers, or hide behind scope-change fees.' }
    ],
    negationFooter:'We are a <span class="text-purple">Revenue and Growth Engineering Practice</span> that gets paid <span class="text-yellow">when you collect money.</span>'
  },
  {
    key:'voyage', hex:'#6f8fff',
    eyebrow:'LINGUISTIC ARCHITECTURE',
    heading:'Words Matter. We <span class="highlight-red">Replaced</span> Yours.',
    sub:'',
    detail:'',
    /* Any chapter carrying `comparison` renders it as the term/replaces
       table below the heading (see has-comparison in <style>) — heading
       (including the inline red highlight) stays permanently visible, same
       treatment as `cards`/`negation`. */
    comparison:[
      ['Revenue Intelligence', 'Marketing analytics'],
      ['Decision Intelligence', 'Business intelligence'],
      ['Revenue Topology', 'Funnel'],
      ['RAAR', 'KPIs'],
      ['Revenue Initiative', 'Campaign'],
      ['Novel Embedded Agent', 'Chatbot'],
      ['Architectural Liberation', 'Digital transformation'],
      ['Zero-Distance Commerce', 'Conversion optimization'],
      ['Outcome-as-a-Service', 'SaaS engine'],
      ['Total Value of Marketing', 'Attribution']
    ],
    banned:['Optimization','Funnel','Campaign','Best practices','Synergy','Leverage','Cutting-edge','Impressions','Growth hacking','Omnichannel']
  },
  {
    key:'horizon', hex:'#b06fff',
    eyebrow:'REVENUE TOPOLOGY',
    heading:'Not a <span class="strike-funnel">Funnel</span>. A Fluid Revenue Topology.',
    sub:'',
    detail:'',
    /* Any chapter carrying `topology` renders it as the phase table + node
       graphic below the heading (see has-topology in <style>) \u2014 heading
       (including the inline strikethrough) stays permanently visible, same
       treatment as cards/negation/comparison. */
    topology:[
      [1,  'The Silence',   'Before intent \u2014 ambient brand presence, dark social'],
      [2,  'The Collision', 'First meaningful interaction'],
      [3,  'The Mirror',    'User recognizes a pain'],
      [4,  'The Dig',       'Active research, competitor comparison'],
      [5,  'The Weigh',     'Shortlisting, trust signals'],
      [6,  'The Lock',      'Decision made'],
      [7,  'The Build',     'POC \u2192 MVP \u2192 MMP \u2192 Launch'],
      [8,  'The Proof',     'Revenue generation begins'],
      [9,  'The Multiply',  'Upsell, cross-sell, deeper integration'],
      [10, 'The Amplify',   'Client becomes proof'],
      [11, 'The Return',    'Win-back, reactivation']
    ],
    topologyFootnote:'Multi-entry, multi-exit. The topology adapts to the customer\u2019s meaning-state, not the other way around.'
  },
  {
    key:'singularity', hex:'#d06fff',
    eyebrow:'THE AUTOPSY', heading:'BROKEN MODELS. ONE REALITY.',
    sub:'',
    detail:'',
    /* Any chapter carrying `models` renders them as the model-card grid
       below the heading (see has-models in <style>) — heading stays
       permanently visible, same treatment as cards/negation/comparison/
       topology. Cards render fully expanded (no click-to-expand). */
    dyingBadge:'WHY YOUR CURRENT AGENCY IS DYING.',
    models:[
      {
        icon:'house', stroke:'stroke-pink', tagClass:'tag-purple', tag:'TIME + HEADCOUNT = 💀',
        title:'THE RETAINER MAFIA',
        body:'They bill by the hour, so every problem must take hours. They have 47 layers of account management between you and the person doing the work. Their ‘creative’ is recycled from three clients ago. Their ‘strategy’ is a calendar of tactics. They are the IBM of marketing — expensive, slow, and proud of their process documentation.',
        altColor:'text-purple',
        altBody:'We don’t have account managers. We have engineers. We don’t bill time. We warrant outcomes. Our process is: understand → engineer → validate → scale. No decks. No meetings about meetings.'
      },
      {
        icon:'monitor', stroke:'stroke-yellow', tagClass:'tag-brown', tag:'BUY LOW, SELL HIGH, PRAY HARD',
        title:'THE ARBITRAGE CIRCUS',
        body:'They found a gap in CPMs and called it a ‘proprietary methodology.’ Their ‘AI’ is a spreadsheet with VLOOKUP. Their ‘team’ is one guy in a timezone you don’t know refreshing dashboards. They don’t build assets. They don’t build brands. They buy cheap and mark up expensive, while your customer acquisition cost quietly doubles.',
        altColor:'text-orange',
        altBody:'We build revenue engines, not arbitrage loops. Every channel we open is owned, measured, and engineered for compounding returns. We don’t rent audiences. We build them.'
      },
      {
        icon:'robot', stroke:'stroke-blue', tagClass:'tag-blue', tag:'RIGID WORKFLOWS IN A TUXEDO',
        title:'THE AGENT-WASHERS',
        body:'They took a Zapier integration and called it an ‘autonomous agent.’ They sell ‘AI transformation’ but deliver ‘slightly faster emails.’ They handle your tech stack with the empathy of a DMV clerk. They understand LLMs but have never met your customer. The result? A very expensive proof of concept that never becomes production.',
        altColor:'text-teal',
        altBody:'Our agents are personas, not wrappers. Signal Stalker. Legacy Sleuth. Ontology Architect. Each is a specialist in our swarm, orchestrated by a Meta-Agent that decomposes your problem into a shopping list of capabilities. This isn’t automation. This is cognitive engineering.'
      }
    ]
  },
  {
    key:'infinity', hex:'#f3e8ff',
    eyebrow:'', heading:'Book the Diagnostic.',
    sub:'', detail:'',
    diagnostic:true,
    diagLead:'',
    diagBanner:'We don\u2019t sell services. We sell <span class="purple-glow-text">financial certainty.</span>',
    skepticTitle:'Still skeptical?',
    skepticDesc:'Good. Skeptics make the best clients.',
    compareText:'Compare us with others<br>so you can know more'
  }
];
const N_CHAPTERS = chapters.length;










let letterboxTop = null, letterboxBottom = null;
try{
  letterboxTop = document.createElement('div');
  letterboxTop.className = 'letterbox-bar letterbox-top';
  letterboxBottom = document.createElement('div');
  letterboxBottom.className = 'letterbox-bar letterbox-bottom';
  document.body.appendChild(letterboxTop);
  document.body.appendChild(letterboxBottom);
}catch(e){ letterboxTop = null; letterboxBottom = null; }


const els = {
  copy: document.getElementById('copy'),
  eyebrow: document.getElementById('eyebrow'),
  heading: document.getElementById('heading'),
  sub: document.getElementById('sub'),
  ctaRow: document.getElementById('ctaRow'),
  chapNum: document.getElementById('chapNum'),
  ring: document.getElementById('ringProg'),
  progressFill: document.getElementById('progressFill'),
  scrollCue: document.getElementById('scrollCue'),
  chapterList: document.getElementById('chapterList'),
  chapterRule: document.getElementById('chapterRule'),
  chapterCards: document.getElementById('chapterCards'),
  chapterFooterBar: document.getElementById('chapterFooterBar'),
  footerBarText: document.getElementById('footerBarText'),
  chapterNegation: document.getElementById('chapterNegation'),
  chapterNegationFooter: document.getElementById('chapterNegationFooter'),
  negationFooterText: document.getElementById('negationFooterText'),
  chapterComparison: document.getElementById('chapterComparison'),
  chapterBannedBanner: document.getElementById('chapterBannedBanner'),
  bannedTermsList: document.getElementById('bannedTermsList'),
  chapterTopologySplit: document.getElementById('chapterTopologySplit'),
  topologyBody: document.getElementById('topologyBody'),
  topologyFootnote: document.getElementById('topologyFootnote'),
  dyingAgencyBadge: document.getElementById('dyingAgencyBadge'),
  chapterModels: document.getElementById('chapterModels'),
  diagnosticLead: document.getElementById('diagnosticLead'),
  diagnosticBanner: document.getElementById('diagnosticBanner'),
  chapterSkeptic: document.getElementById('chapterSkeptic'),
  skepticTitle: document.getElementById('skepticTitle'),
  skepticDesc: document.getElementById('skepticDesc'),
  compareText: document.getElementById('compareText'),
  diagnosticForm: document.getElementById('diagnosticForm'),
  diagGoBtn: document.getElementById('diagGoBtn'),
  scrollTrackA: document.getElementById('scrollTrackA'),
  scrollTrackB: document.getElementById('scrollTrackB'),
  enterBtn: document.getElementById('enterBtn'),
  detailPanel: document.getElementById('detailPanel'),
  detailHeading: document.getElementById('detailHeading'),
  detailBody: document.getElementById('detailBody'),
  detailClose: document.getElementById('detailClose'),
  soundBtn: document.getElementById('soundBtn'),
  soundOn: document.getElementById('soundIconOn'),
  soundOff: document.getElementById('soundIconOff'),
  labelAgent: document.getElementById('labelAgent'),
  labelServices: document.getElementById('labelServices'),
};


const INTRO_DWELL_VH = 70;                        
els.scrollTrackA.style.height = INTRO_DWELL_VH + 'vh';
els.scrollTrackB.style.height = ((N_CHAPTERS - 1) * 100) + 'vh';
const RING_C = 2 * Math.PI * 8;
const root = document.documentElement;


const canvas = document.getElementById('gl');
const renderer = new THREE.WebGLRenderer({ canvas, antialias:false, powerPreference:'high-performance' });
window.__dbgRenderer = renderer;
renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 700 ? 1.25 : 1.5));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;

const scene = new THREE.Scene();
window.__dbgScene = scene;
scene.background = new THREE.Color('#030208');
const camera = new THREE.PerspectiveCamera(55, window.innerWidth/window.innerHeight, 0.1, 700);
window.__dbgCamera = camera;

const baseFog = new THREE.Color('#030208');
const fog = new THREE.FogExp2(baseFog.getHex(), 0.0055);
scene.fog = fog;







let composer = null, bloomPass = null, fxPass = null;
window.__dbgGetComposer = () => composer;
const wipeState = { v: 0 };






const gradeColorState = (() => {
  const c = new THREE.Color(chapters[0].hex);
  return { r: c.r, g: c.g, b: c.b };
})();







if(PostFX && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  try{
    composer = new PostFX.EffectComposer(renderer);
    composer.addPass(new PostFX.RenderPass(scene, camera));
    bloomPass = new PostFX.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.55, 0.7, 0.18);
    bloomPass.strength = 0;
    composer.addPass(bloomPass);
    fxPass = new PostFX.ShaderPass({
      uniforms:{
        tDiffuse:  { value: null },
        uResolution:{ value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uTime:     { value: 0 },
        uAberration:{ value: 0 },  
        uGrain:    { value: 0 },   
        uWipe:     { value: 0 },   
        uGradeColor:{ value: new THREE.Vector3(1,1,1) }, 
        uGradeAmount:{ value: 0 }, 
        uFocusBlur:{ value: 0 },  
      },
      vertexShader: `
        varying vec2 vUv;
        void main(){
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform vec2 uResolution;
        uniform float uTime, uAberration, uGrain, uWipe;
        uniform vec3 uGradeColor;
        uniform float uGradeAmount;
        uniform float uFocusBlur;
        varying vec2 vUv;
        float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); }
        void main(){
          vec2 uv = vUv;
          vec2 c = uv - 0.5;
          float dist = length(c);
          vec2 dir = dist > 0.0001 ? c / dist : vec2(0.0);
          /* chapter-cut ripple: a brief radial ring pushes outward through
             the frame, decaying with distance so it reads as a pulse from
             the centre rather than a uniform screen shake */
          if(uWipe > 0.0005){
            float ring = sin(dist*26.0 - uTime*9.0) * uWipe * 0.018 * (1.0 - dist);
            uv += dir * ring;
          }
          /* chromatic aberration, strongest toward the edges */
          vec2 caOffset = c * uAberration * 0.006;
          float r = texture2D(tDiffuse, uv - caOffset).r;
          float g = texture2D(tDiffuse, uv).g;
          float b = texture2D(tDiffuse, uv + caOffset).b;
          vec3 color = vec3(r, g, b);
          /* rack focus: a cheap 3x3 box blur, faded in only while uFocusBlur
             is non-zero (mid-transition between chapters) and faded back to
             a single crisp sample once a chapter settles into center —
             deliberately not a true depth-based DOF (no depth texture, no
             extra render target, nothing that could fail differently on
             different GPUs) — just enough softness to sell "pulling focus"
             through the cut. Skipped entirely at uFocusBlur==0 so the
             common case (settled, reading a chapter) costs nothing extra. */
          if(uFocusBlur > 0.004){
            vec2 texel = (1.0 / uResolution) * uFocusBlur * 3.5;
            vec3 blurSum = vec3(0.0);
            for(int bx = -1; bx <= 1; bx++){
              for(int by = -1; by <= 1; by++){
                blurSum += texture2D(tDiffuse, uv + vec2(float(bx), float(by)) * texel).rgb;
              }
            }
            blurSum /= 9.0;
            color = mix(color, blurSum, min(uFocusBlur, 1.0));
          }
          /* per-chapter color grade: a gentle multiplicative tint toward
             the current chapter's own hue, strongest in the shadows/mids
             (luma-weighted) so it reads as a film-stock mood shift rather
             than a flat color wash over highlights */
          float luma = dot(color, vec3(0.299, 0.587, 0.114));
          vec3 gradeTint = mix(vec3(1.0), uGradeColor * 1.15, uGradeAmount * (1.0 - luma * 0.5));
          color *= gradeTint;
          /* film grain */
          float grain = (hash(uv*uResolution.xy + uTime) - 0.5) * uGrain;
          color += grain;
          gl_FragColor = vec4(color, 1.0);
        }
      `
    });
    fxPass.renderToScreen = true;
    composer.addPass(fxPass);
  }catch(e){
    composer = null; bloomPass = null; fxPass = null;
  }
}

function resize(){
  const w = window.innerWidth, h = window.innerHeight;
  renderer.setSize(w,h);
  camera.aspect = w/h;
  camera.updateProjectionMatrix();
  if(composer){
    composer.setSize(w,h);
    if(fxPass) fxPass.uniforms.uResolution.value.set(w,h);
  }
}
window.addEventListener('resize', resize);
resize();

// Safety net: an embedded iframe's own `resize` event isn't always fired
// reliably when its CSS box changes size for reasons outside the iframe
// itself — e.g. the host page's layout shifting (dvh recalculating when
// devtools docks/undocks, sidebar toggles, etc). If that happens here, the
// canvas/camera stay sized to a stale viewport indefinitely (seen as a
// squashed, wrong-aspect, sometimes near-zero-height canvas). Rather than
// depend solely on that event, cheaply re-check the real size every frame
// (inside render(), below) and only actually resize when it changed.
let __lastResizeW = window.innerWidth, __lastResizeH = window.innerHeight;
function checkResize(){
  const w = window.innerWidth, h = window.innerHeight;
  if(w > 0 && h > 0 && (w !== __lastResizeW || h !== __lastResizeH)){
    __lastResizeW = w; __lastResizeH = h;
    resize();
  }
}


const mouseNDC = new THREE.Vector2(-10, -10); 
window.addEventListener('mousemove', (e) => {
  mouseNDC.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouseNDC.y = -(e.clientY / window.innerHeight) * 2 + 1;
}, { passive:true });
window.addEventListener('mouseleave', () => { mouseNDC.set(-10, -10); });


















let isOrbitDragging = false;
let orbitDragStartX = 0, orbitDragStartY = 0;
const dragOrbit = { x: 0, y: 0 };
const dragOrbitTarget = { x: 0, y: 0 };
const ORBIT_MAX = 0.14; 












let exploreMode = false;
let exploreZoomOffset = 0;
const EXPLORE_ORBIT_MAX = 0.85; 
const tmpForward = new THREE.Vector3();

function setExploreMode(on){
  try{
    exploreMode = !!on;
    document.body.classList.toggle('explore-on', exploreMode);
    if(exploreBtn) exploreBtn.textContent = exploreMode ? 'Resume Journey' : 'Explore';
    if(exploreMode){
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      dragOrbitTarget.x = 0; dragOrbitTarget.y = 0;
      exploreZoomOffset = 0;
    }
  }catch(e){
    /* if anything about the scroll-lock/DOM update fails, fail back to a
       known-safe state rather than leaving the page stuck with scroll
       disabled and no way to undo it */
    exploreMode = false;
    try{ document.documentElement.style.overflow = ''; }catch(e2){}
  }
}

let exploreBtn = null;
if(window.matchMedia('(hover: hover) and (pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  canvas.style.cursor = 'grab';
  canvas.addEventListener('pointerdown', (e) => {
    if(e.pointerType !== 'mouse') return;
    isOrbitDragging = true;
    orbitDragStartX = e.clientX; orbitDragStartY = e.clientY;
    canvas.style.cursor = 'grabbing';
  });
  window.addEventListener('pointermove', (e) => {
    if(!isOrbitDragging || e.pointerType !== 'mouse') return;
    const dx = (e.clientX - orbitDragStartX) / window.innerWidth;
    const dy = (e.clientY - orbitDragStartY) / window.innerHeight;
    const maxOrbit = exploreMode ? EXPLORE_ORBIT_MAX : ORBIT_MAX;
    const sensitivity = exploreMode ? 1.3 : 0.5;
    dragOrbitTarget.x = THREE.MathUtils.clamp(dx * sensitivity, -maxOrbit, maxOrbit);
    dragOrbitTarget.y = THREE.MathUtils.clamp(dy * sensitivity, -maxOrbit, maxOrbit);
  });
  const endOrbitDrag = () => {
    isOrbitDragging = false;
    if(!exploreMode){ dragOrbitTarget.x = 0; dragOrbitTarget.y = 0; }
    canvas.style.cursor = 'grab';
  };
  window.addEventListener('pointerup', endOrbitDrag);
  window.addEventListener('pointercancel', endOrbitDrag);
  window.addEventListener('blur', endOrbitDrag);

  canvas.addEventListener('wheel', (e) => {
    if(!exploreMode) return;
    e.preventDefault();
    exploreZoomOffset = THREE.MathUtils.clamp(exploreZoomOffset - e.deltaY * 0.01, -8, 8);
  }, { passive:false });
}
const hoverRaycaster = new THREE.Raycaster();
const hoverPlane = new THREE.Plane();
const hoverPoint = new THREE.Vector3();
const hoverPlaneNormal = new THREE.Vector3(0, 0, 1);
const hoverWorldPos = new THREE.Vector3();




const labelProjectPos = new THREE.Vector3();
function projectLabel(el, obj3d, offsetY){
  if(!el || !obj3d) return;
  obj3d.getWorldPosition(labelProjectPos);
  labelProjectPos.project(camera);
  if(labelProjectPos.z > 1 || labelProjectPos.z < -1) return; 
  const x = (labelProjectPos.x * 0.5 + 0.5) * window.innerWidth;
  const y = (1 - (labelProjectPos.y * 0.5 + 0.5)) * window.innerHeight + (offsetY || 0);
  el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%)`;
}

function setupHoverRepel(mesh, radius, strength){
  const posAttr = mesh.geometry.attributes.position;
  mesh.userData.hover = {
    base: posAttr.array.slice(),
    count: posAttr.count,
    radius, strength
  };
}

function applyFloatPosition(obj, elapsed){
  const base = obj.userData.floatBase;
  const ph = obj.userData.floatPhase;
  obj.position.y = base.y + Math.sin(elapsed*0.35 + ph) * 0.35;
  obj.position.x = base.x + Math.cos(elapsed*0.22 + ph) * 0.22;
  obj.position.z = base.z + Math.sin(elapsed*0.28 + ph*1.3) * 0.18;
}

function applyMouseRepel(mesh, dt){
  const h = mesh.userData.hover;
  if(!h) return;
  mesh.getWorldPosition(hoverWorldPos);
  hoverRaycaster.setFromCamera(mouseNDC, camera);
  hoverPlane.setFromNormalAndCoplanarPoint(hoverPlaneNormal, hoverWorldPos);
  const hit = hoverRaycaster.ray.intersectPlane(hoverPlane, hoverPoint);

  const arr = mesh.geometry.attributes.position.array;
  const { base, count, radius, strength } = h;
  const smooth = 1 - Math.pow(0.001, dt);
  let localMouseX = null, localMouseY = null;
  if(hit){
    const rawX = hoverPoint.x - hoverWorldPos.x;
    const rawY = hoverPoint.y - hoverWorldPos.y;
    

    const rot = -mesh.rotation.z;
    const cosR = Math.cos(rot), sinR = Math.sin(rot);
    localMouseX = rawX*cosR - rawY*sinR;
    localMouseY = rawX*sinR + rawY*cosR;
  }

  for(let i=0;i<count;i++){
    const idx = i*3;
    const bx = base[idx], by = base[idx+1], bz = base[idx+2];
    let tx = bx, ty = by, tz = bz;
    if(hit){
      const dx = bx - localMouseX, dy = by - localMouseY;
      const distSq = dx*dx + dy*dy;
      if(distSq < radius*radius){
        const dist = Math.sqrt(distSq) || 0.0001;
        const push = (1 - dist/radius) * strength;
        tx = bx + (dx/dist)*push;
        ty = by + (dy/dist)*push;
      }
    }
    arr[idx]   += (tx - arr[idx]) * smooth;
    arr[idx+1] += (ty - arr[idx+1]) * smooth;
    arr[idx+2] += (tz - arr[idx+2]) * smooth;
  }
  mesh.geometry.attributes.position.needsUpdate = true;
}









let contextLost = false;
canvas.addEventListener('webglcontextlost', (e) => {
  e.preventDefault();
  contextLost = true;
}, false);
canvas.addEventListener('webglcontextrestored', () => {
  contextLost = false;
  scene.traverse((obj) => {
    const mats = Array.isArray(obj.material) ? obj.material : (obj.material ? [obj.material] : []);
    mats.forEach((m) => {
      m.needsUpdate = true;
      if(m.map) m.map.needsUpdate = true;
    });
    if(obj.geometry && obj.geometry.attributes){
      Object.values(obj.geometry.attributes).forEach((attr) => { attr.needsUpdate = true; });
    }
  });
}, false);


function glowTexture(){
  const s = 128;
  const c = document.createElement('canvas'); c.width=s;c.height=s;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(s/2,s/2,0,s/2,s/2,s/2);
  g.addColorStop(0,'rgba(255,255,255,0.95)');
  g.addColorStop(0.35,'rgba(255,255,255,0.4)');
  g.addColorStop(1,'rgba(255,255,255,0)');
  ctx.fillStyle = g; ctx.fillRect(0,0,s,s);
  return new THREE.CanvasTexture(c);
}
const GLOW_TEX = glowTexture();




function starTexture(){
  const s = 128;
  const c = document.createElement('canvas'); c.width=s;c.height=s;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(s/2,s/2,0,s/2,s/2,s/2);
  g.addColorStop(0,'rgba(255,255,255,1)');
  g.addColorStop(0.12,'rgba(255,255,255,0.85)');
  g.addColorStop(0.3,'rgba(255,255,255,0.12)');
  g.addColorStop(1,'rgba(255,255,255,0)');
  ctx.fillStyle = g; ctx.fillRect(0,0,s,s);
  return new THREE.CanvasTexture(c);
}
const STAR_TEX = starTexture();









function buildFlowStrands(hex, R, strandCount, opts){
  const ellipseX = (opts && opts.ellipseX!==undefined) ? opts.ellipseX : 1;
  const ellipseY = (opts && opts.ellipseY!==undefined) ? opts.ellipseY : 1;
  const Rx = R*ellipseX, Ry = R*ellipseY;
  const waistAmp = (opts && opts.waistAmp!==undefined) ? opts.waistAmp : 0;
  const waistFreq = (opts && opts.waistFreq!==undefined) ? opts.waistFreq : 2;
  const waistPhase = (opts && opts.waistPhase!==undefined) ? opts.waistPhase : 0;
  function waistAt(u){ return 1 - waistAmp*Math.cos(waistFreq*u + waistPhase); }
  const jaggedAmp = (opts && opts.jaggedAmp!==undefined) ? opts.jaggedAmp : 0;
  const jaggedTerms = [];
  if(jaggedAmp){
    for(let k=0;k<5;k++){
      jaggedTerms.push({ freq:3+Math.floor(Math.random()*9), phase:Math.random()*Math.PI*2, amp:0.5+Math.random()*0.5 });
    }
  }
  function jaggedAt(u){
    if(!jaggedAmp) return 0;
    let n=0, wsum=0;
    jaggedTerms.forEach(t=>{ n += Math.sin(u*t.freq+t.phase)*t.amp; wsum += t.amp; });
    return Math.max(0, n/wsum);
  }
  const windCount = (opts && opts.windCount) || 8;
  const tubeR = R * ((opts && opts.tubeRatio) || 0.03);
  const segments = (opts && opts.segments) || 220;
  const tubeRadius = (opts && opts.tubeRadius!==undefined) ? opts.tubeRadius : 0.045;
  const opacity = (opts && opts.opacity!==undefined) ? opts.opacity : 0.6;

  const group = new THREE.Group();
  


  const palette = (opts && opts.colors && opts.colors.length) ? opts.colors : [hex];
  for(let s=0;s<strandCount;s++){
    const windPhase = Math.random()*Math.PI*2;
    const pts = [];
    for(let i=0;i<segments;i++){
      const u = (i/segments)*Math.PI*2;
      const w = waistAt(u) * (1 + jaggedAmp*jaggedAt(u));
      const radialX = Math.cos(u), radialY = Math.sin(u);
      const v = u*windCount + windPhase;
      const ox = Math.cos(v)*tubeR, oz = Math.sin(v)*tubeR;
      pts.push(new THREE.Vector3(Rx*w*radialX + ox*radialX, Ry*w*radialY + ox*radialY, oz));
    }
    const curve = new THREE.CatmullRomCurve3(pts, true);
    const tubeGeo = new THREE.TubeGeometry(curve, segments, tubeRadius, 6, true);
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(palette[s % palette.length]), transparent:true, opacity,
      blending:THREE.AdditiveBlending, depthWrite:false
    });
    group.add(new THREE.Mesh(tubeGeo, mat));
  }
  return group;
}





function buildParticleOrb(hex, R, count, opts){
  const palette = (opts && opts.palette) ? opts.palette.map(c => new THREE.Color(c)) : [new THREE.Color(hex)];
  const speckleColor = new THREE.Color((opts && opts.speckleColor) || '#e7c98a');
  const speckleChance = (opts && opts.speckleChance!==undefined) ? opts.speckleChance : 0.05;
  const bandCount = (opts && opts.bandCount!==undefined) ? opts.bandCount : 4.5;
  const bandWarp = (opts && opts.bandWarp!==undefined) ? opts.bandWarp : 0.5;
  const tiltDeg = (opts && opts.tilt!==undefined) ? opts.tilt : 40;
  const tilt = tiltDeg * Math.PI/180;
  const lightDir = new THREE.Vector3(0.55, 0.65, 0.5).normalize();
  const lightExponent = (opts && opts.lightExponent!==undefined) ? opts.lightExponent : 1.4;
  const shadingEnabled = !(opts && opts.noShading);
  const rimColor = new THREE.Color((opts && opts.rimColor) || '#6a4fff');
  const rimWidth = (opts && opts.rimWidth!==undefined) ? opts.rimWidth : 0.16;
  const rimStrength = (opts && opts.rimStrength!==undefined) ? opts.rimStrength : 0;
  const jitter = (opts && opts.jitter!==undefined) ? opts.jitter : 0.05;
  const deep = new THREE.Color((opts && opts.deepColor) || '#05020a');
  const edgeFray = (opts && opts.edgeFray!==undefined) ? opts.edgeFray : 0;

  const positions = new Float32Array(count*3);
  const colors = new Float32Array(count*3);
  const tmp = new THREE.Color();
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for(let i=0;i<count;i++){
    const y = 1 - (i/(count-1))*2;
    const radiusAtY = Math.sqrt(Math.max(0, 1 - y*y));
    const theta = goldenAngle * i;
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;

    const bandCoord = y*Math.cos(tilt) + x*Math.sin(tilt);
    const warp = Math.sin(theta*3.0 + y*2.0) * bandWarp * 0.16;
    const bandT = ((bandCoord + warp + 1)/2) * bandCount;
    const bandFrac = bandT - Math.floor(bandT);
    const n = palette.length;
    const i0 = (((Math.floor(bandT) % n) + n) % n);
    const i1 = (i0+1) % n;
    tmp.copy(palette[i0]).lerp(palette[i1], bandFrac);

    const rawLight = x*lightDir.x + y*lightDir.y + z*lightDir.z;
    let light = shadingEnabled ? Math.pow(Math.max(0, (rawLight+1)/2), lightExponent) : 1;
    if(shadingEnabled) tmp.lerp(deep, 1-light);
    if(rimStrength > 0){
      const rimFactor = Math.max(0, 1 - Math.abs(rawLight)/rimWidth);
      tmp.lerp(rimColor, rimFactor*rimStrength);
      light = Math.max(light, rimFactor*rimStrength);
    }

    let isSpeckle = false;
    if(Math.random() < speckleChance * (0.3 + 0.7*light)){
      tmp.copy(speckleColor).lerp(deep, 1-light*0.8);
      isSpeckle = true;
    }

    let extraR = 0;
    if(edgeFray > 0 && isSpeckle){
      const rimFactorFray = Math.max(0, 1 - Math.abs(rawLight)/rimWidth);
      if(rimFactorFray > 0.15 && Math.random() < 0.35){
        extraR = edgeFray * R * Math.random();
      }
    }

    const rr = R * (1 + (Math.random()-0.5)*jitter) + extraR;
    positions[i*3]   = x*rr;
    positions[i*3+1] = y*rr;
    positions[i*3+2] = z*rr;
    colors[i*3]=tmp.r; colors[i*3+1]=tmp.g; colors[i*3+2]=tmp.b;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions,3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors,3));
  const mat = new THREE.PointsMaterial({
    size: (opts && opts.pointSize!==undefined) ? opts.pointSize : 0.09,
    map:GLOW_TEX, vertexColors:true, transparent:true,
    opacity: (opts && opts.pointOpacity!==undefined) ? opts.pointOpacity : 0.9,
    depthWrite:false, blending:THREE.AdditiveBlending
  });
  return new THREE.Points(geo, mat);
}





function buildServicesOrb(baseRadius, particleTex){
  const group = new THREE.Group();
  const globalColors = ['#2110c1','#e7a352','#9e847d','#89145c','#0f147b','#be2ac8','#272998','#9a764b'];
  const totalParticles = 8000;
  const perLayer = Math.floor(totalParticles / (globalColors.length + 4));
  const scale = baseRadius / 2.25; 
  const cut = { cx: 1.65*scale, cy: 1.65*scale, cz: 0, cr: baseRadius*0.93 };
  function isInsideCut(x,y,z){
    const dx=x-cut.cx, dy=y-cut.cy, dz=z-cut.cz;
    return (dx*dx+dy*dy+dz*dz) < (cut.cr*cut.cr);
  }
  const freqX=2.5, freqY=2.0, amp=0.08*scale, pSize=0.135*scale;

  globalColors.forEach((hex, index) => {
    const geo = new THREE.BufferGeometry();
    const baseColor = new THREE.Color(hex);
    const posArr = [], colArr = [];
    let attempts = 0;
    while(posArr.length/3 < perLayer && attempts < perLayer*4){
      attempts++;
      const theta = Math.random()*Math.PI*2, phi = Math.acos((Math.random()*2)-1);
      const noise = Math.sin(theta*freqX+index) * Math.cos(phi*freqY+index) * amp;
      const radius = baseRadius + noise + (Math.random()*0.1*scale);
      const px = radius*Math.sin(phi)*Math.cos(theta);
      const py = radius*Math.sin(phi)*Math.sin(theta);
      const pz = radius*Math.cos(phi);
      if(isInsideCut(px,py,pz)) continue;
      posArr.push(px,py,pz);
      colArr.push(baseColor.r, baseColor.g, baseColor.b);
    }
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(posArr),3));
    geo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colArr),3));
    const mat = new THREE.PointsMaterial({ size:pSize*1.2, vertexColors:true, transparent:true, opacity:0.9, map:particleTex, blending:THREE.AdditiveBlending, depthWrite:false, toneMapped:false });
    group.add(new THREE.Points(geo, mat));
  });

  const streamColors = ['#717874','#717874','#1f117d','#8d1c7e'];
  streamColors.forEach((hex, zi) => {
    const count = 1300;
    const streamPos = new Float32Array(count*3);
    const phaseOff = zi*(Math.PI/4), peaks = 2+(zi*0.5);
    const phi = (Math.PI/2) + [-0.04,-0.01,0.01,0.04][zi];
    let si=0, sAttempts=0;
    while(si<count && sAttempts<count*4){
      sAttempts++;
      const theta = Math.random()*Math.PI*2;
      const jitterArr = (Math.random()-0.5)*0.015*scale;
      const radius = baseRadius + (zi*0.02*scale) + Math.sin((theta+phaseOff)*peaks)*0.04*scale + jitterArr;
      const sx = radius*Math.sin(phi)*Math.cos(theta);
      const sy = radius*Math.sin(phi)*Math.sin(theta);
      const sz = radius*Math.cos(phi);
      if(isInsideCut(sx,sy,sz)) continue;
      streamPos[si*3]=sx; streamPos[si*3+1]=sy; streamPos[si*3+2]=sz;
      si++;
    }
    const streamGeo = new THREE.BufferGeometry();
    streamGeo.setAttribute('position', new THREE.BufferAttribute(streamPos,3));
    const sMat = new THREE.PointsMaterial({ size:pSize*0.25, color:new THREE.Color(hex), transparent:true, opacity:0.99, map:particleTex, blending:THREE.AdditiveBlending, depthWrite:false, toneMapped:false });
    const sPoints = new THREE.Points(streamGeo, sMat);
    const flowSpeed = (zi%2===0?1:-1)*(0.08+zi*0.015);
    Object.assign(sPoints.userData, { isStream:true, baseStreamPos:new Float32Array(streamPos), streamPhi:phi, flowSpeed });
    group.add(sPoints);
  });

  return group;
}






function buildImageParticles(dataURI, planeWidth, planeHeight, opts, onReady){
  const img = new Image();
  img.onload = function(){
    const sampleStep = (opts && opts.sampleStep) || 4;
    const alphaThreshold = (opts && opts.alphaThreshold!==undefined) ? opts.alphaThreshold : 40;
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    let data;
    try {
      data = ctx.getImageData(0, 0, img.width, img.height).data;
    } catch(e){ return; } 

    const positions = [];
    const colors = [];
    for(let y=0; y<img.height; y+=sampleStep){
      for(let x=0; x<img.width; x+=sampleStep){
        const idx = (y*img.width + x) * 4;
        const a = data[idx+3];
        if(a < alphaThreshold) continue;
        const r = data[idx]/255, g = data[idx+1]/255, b = data[idx+2]/255;
        const u = (x/img.width) - 0.5;
        const v = 0.5 - (y/img.height);
        positions.push(u*planeWidth, v*planeHeight, (Math.random()-0.5)*0.2);
        colors.push(r, g, b);
      }
    }
    if(!positions.length) return;

    




    const alphaMask = new Uint8Array(img.width * img.height);
    for(let p=0, len=alphaMask.length; p<len; p++) alphaMask[p] = data[p*4+3];

    const geo = new THREE.BufferGeometry();
    const posArr = new Float32Array(positions);
    geo.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));
    const mat = new THREE.PointsMaterial({
      size: (opts && opts.pointSize!==undefined) ? opts.pointSize : 0.05,
      vertexColors:true, map:GLOW_TEX, transparent:true,
      opacity: (opts && opts.opacity!==undefined) ? opts.opacity : 0.95,
      blending: THREE.AdditiveBlending, depthWrite:false
    });
    const points = new THREE.Points(geo, mat);

    const n = posArr.length/3;
    const floatSeeds = new Float32Array(n);
    for(let i=0;i<n;i++) floatSeeds[i] = Math.random()*Math.PI*2;
    points.userData.imgParticles = {
      basePositions: posArr.slice(),
      floatSeeds,
      floatAmp: (opts && opts.floatAmp!==undefined) ? opts.floatAmp : 0.06,
      floatSpeed: (opts && opts.floatSpeed!==undefined) ? opts.floatSpeed : 0.8,
      


      flowSpeed: (opts && opts.flowSpeed!==undefined) ? opts.flowSpeed : 0,
      flowDirX: (opts && opts.flowDirX!==undefined) ? opts.flowDirX : 0.6,
      flowDirY: (opts && opts.flowDirY!==undefined) ? opts.flowDirY : 1,
      pointSize: mat.size,
      planeWidth, planeHeight,
      alphaMask, alphaThreshold,
      imgWidth: img.width, imgHeight: img.height
    };
    if(onReady) onReady(points);
  };
  img.onerror = function(){};
  img.src = dataURI;
}




function imageParticleIsVisible(d, lx, ly){
  if(!d.alphaMask) return true;
  let px = Math.round((lx/d.planeWidth + 0.5) * d.imgWidth);
  let py = Math.round((0.5 - ly/d.planeHeight) * d.imgHeight);
  if(px < 0) px = 0; else if(px >= d.imgWidth) px = d.imgWidth-1;
  if(py < 0) py = 0; else if(py >= d.imgHeight) py = d.imgHeight-1;
  return d.alphaMask[py*d.imgWidth + px] >= d.alphaThreshold;
}




function applyImageParticleAnim(points, elapsed, dt){
  const d = points.userData.imgParticles;
  if(!d) return;
  const posAttr = points.geometry.attributes.position;
  const arr = posAttr.array;
  const base = d.basePositions;
  const n = d.floatSeeds.length;
  const hasFlow = d.flowSpeed > 0 && d.planeWidth && d.planeHeight;
  const halfW = d.planeWidth ? d.planeWidth/2 : 0;
  const halfH = d.planeHeight ? d.planeHeight/2 : 0;
  

  const inset = (d.pointSize || 0) * 0.5;
  const clampW = Math.max(0, halfW - inset);
  const clampH = Math.max(0, halfH - inset);
  const driftX = elapsed * d.flowSpeed * d.flowDirX;
  const driftY = elapsed * d.flowSpeed * d.flowDirY;
  for(let i=0;i<n;i++){
    const seed = d.floatSeeds[i];
    const ix = i*3;
    let bx = base[ix], by = base[ix+1];
    if(hasFlow){
      


      bx = (((base[ix] + halfW + driftX) % d.planeWidth) + d.planeWidth) % d.planeWidth - halfW;
      by = (((base[ix+1] + halfH + driftY) % d.planeHeight) + d.planeHeight) % d.planeHeight - halfH;
    }
    let px = bx + Math.sin(elapsed*d.floatSpeed*1.4 + seed) * d.floatAmp;
    let py = by + Math.cos(elapsed*d.floatSpeed*1.1 + seed) * d.floatAmp;
    if(halfW) px = Math.min(clampW, Math.max(-clampW, px));
    if(halfH) py = Math.min(clampH, Math.max(-clampH, py));
    



    if(imageParticleIsVisible(d, px, py)){
      arr[ix]   = px;
      arr[ix+1] = py;
    }
    arr[ix+2] = base[ix+2] + Math.sin(elapsed*d.floatSpeed*1.3 + seed) * d.floatAmp*0.6;
  }
  posAttr.needsUpdate = true;
}









function buildImageShineMesh(planeGeometry, texture, opts){
  const color = new THREE.Color((opts && opts.color!==undefined) ? opts.color : 0xeaf2ff);
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      map: { value: texture },
      uTime: { value: 0 },
      uSpeed: { value: (opts && opts.speed!==undefined) ? opts.speed : 0.16 },
      uColor: { value: color },
      uRimStrength: { value: (opts && opts.rimStrength!==undefined) ? opts.rimStrength : 0.6 },
      uSweepStrength: { value: (opts && opts.sweepStrength!==undefined) ? opts.sweepStrength : 0.9 },
      uSweepWidth: { value: (opts && opts.sweepWidth!==undefined) ? opts.sweepWidth : 0.07 }
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vNormalView;
      varying vec3 vViewPos;
      void main(){
        vUv = uv;
        vNormalView = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPos = mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform sampler2D map;
      uniform float uTime;
      uniform float uSpeed;
      uniform vec3 uColor;
      uniform float uRimStrength;
      uniform float uSweepStrength;
      uniform float uSweepWidth;
      varying vec2 vUv;
      varying vec3 vNormalView;
      varying vec3 vViewPos;
      void main(){
        vec4 texel = texture2D(map, vUv);
        if(texel.a < 0.04) discard;

        /* soft diagonal light-glint sliding across the surface, pausing
           briefly outside the [0,1] range so it doesn't sweep constantly */
        float diag = (vUv.x + vUv.y) * 0.5;
        float center = mod(uTime * uSpeed, 1.6) - 0.3;
        float dist = abs(diag - center);
        float sweep = smoothstep(uSweepWidth, 0.0, dist) * uSweepStrength;

        /* fresnel-style rim brightening tied to the plane's actual tilt,
           so the glint shifts with its own gentle rotation instead of
           looking pasted flat onto the image */
        vec3 viewDir = normalize(-vViewPos);
        vec3 n = normalize(vNormalView);
        if(!gl_FrontFacing) n = -n;
        float rim = 1.0 - abs(dot(n, viewDir));
        rim = pow(rim, 2.4) * uRimStrength;

        float glow = clamp(sweep + rim, 0.0, 1.0);
        gl_FragColor = vec4(uColor, glow * texel.a);
      }
    `,
    transparent: true,
    depthWrite: false,
    depthTest: true,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending
  });
  const mesh = new THREE.Mesh(planeGeometry, mat);
  mesh.position.z = (opts && opts.zOffset!==undefined) ? opts.zOffset : 0.02;
  mesh.renderOrder = (opts && opts.renderOrder!==undefined) ? opts.renderOrder : 1;
  return mesh;
}






function buildBlackKeyMaterial(texture, opts){
  return new THREE.ShaderMaterial({
    uniforms: {
      map: { value: texture },
      uThreshold: { value: (opts && opts.threshold!==undefined) ? opts.threshold : 0.09 },
      uSoftness: { value: (opts && opts.softness!==undefined) ? opts.softness : 0.16 },
      uOpacity: { value: (opts && opts.opacity!==undefined) ? opts.opacity : 1 }
    },
    vertexShader: `
      varying vec2 vUv;
      void main(){
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D map;
      uniform float uThreshold;
      uniform float uSoftness;
      uniform float uOpacity;
      varying vec2 vUv;
      void main(){
        vec4 texel = texture2D(map, vUv);
        float lum = dot(texel.rgb, vec3(0.299, 0.587, 0.114));
        float alpha = smoothstep(uThreshold, uThreshold + uSoftness, lum);
        if(alpha < 0.01) discard;
        gl_FragColor = vec4(texel.rgb, alpha * uOpacity);
      }
    `,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide
  });
}




function buildGlowCloud(hex, radius, count, opts){
  const color = new THREE.Color(hex);
  const deep = new THREE.Color('#000000');   
  const inner = (opts && opts.inner) || 0;
  const positions = new Float32Array(count*3);
  const colors = new Float32Array(count*3);
  const tmp = new THREE.Color();
  const innerPx = inner * radius;
  for(let i=0;i<count;i++){
    const r = radius * (inner + (1 - inner) * Math.pow(Math.random(), 0.45));
    const theta = Math.random()*Math.PI*2;
    const phi = Math.acos(2*Math.random()-1);
    let px = r*Math.sin(phi)*Math.cos(theta);
    let py = r*Math.sin(phi)*Math.sin(theta);
    const pz = r*Math.cos(phi)*0.55;
    



    if(innerPx > 0){
      const d = Math.sqrt(px*px + py*py);
      if(d < innerPx){
        const a = d > 1e-6 ? Math.atan2(py, px) : Math.random()*Math.PI*2;
        const nd = innerPx + Math.random()*(radius - innerPx)*0.35;
        px = Math.cos(a)*nd;
        py = Math.sin(a)*nd;
      }
    }
    positions[i*3]   = px;
    positions[i*3+1] = py;
    positions[i*3+2] = pz;
    tmp.copy(color).lerp(deep, Math.min(1, (r/radius)*0.7 + Math.random()*0.15));
    colors[i*3]=tmp.r; colors[i*3+1]=tmp.g; colors[i*3+2]=tmp.b;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions,3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors,3));
  const mat = new THREE.PointsMaterial({
    size:(opts && opts.size) || 0.42, map:GLOW_TEX, vertexColors:true, transparent:true,
    opacity:(opts && opts.opacity) || 0.7,
    depthWrite:false, blending:THREE.AdditiveBlending, sizeAttenuation:true,
    toneMapped:false 
  });
  return new THREE.Points(geo, mat);
}












const SKY_BASE = '#030208';       






function skyLightFrom(hex, peak, whiten){
  const r = parseInt(hex.substr(1,2),16),
        g = parseInt(hex.substr(3,2),16),
        b = parseInt(hex.substr(5,2),16);
  const k = peak / (Math.max(r,g,b) || 1);
  const mix = (v) => Math.round(v*k + (255 - v*k) * whiten);
  return mix(r) + ',' + mix(g) + ',' + mix(b);
}
const SKY_LIGHT = skyLightFrom(SKY_BASE, 170, 0.35);
const SKY_MONOCHROME = false;
const SKY_GLOW = 0.30;

function buildGalaxySkyTexture(){
  const W = 1600, H = 800;
  const c = document.createElement('canvas'); c.width=W; c.height=H;
  const ctx = c.getContext('2d');
  ctx.fillStyle = SKY_MONOCHROME ? SKY_BASE : '#050208';
  ctx.fillRect(0,0,W,H);

  
  const bandRGB = SKY_MONOCHROME ? SKY_LIGHT : '150,90,200';
  const bandA   = 0.045 * (SKY_MONOCHROME ? SKY_GLOW : 1);
  const band = ctx.createLinearGradient(0,H*0.28,0,H*0.72);
  band.addColorStop(0,'rgba(' + bandRGB + ',0)');
  band.addColorStop(0.5,'rgba(' + bandRGB + ',' + bandA + ')');
  band.addColorStop(1,'rgba(' + bandRGB + ',0)');
  ctx.fillStyle = band;
  ctx.fillRect(0,H*0.26,W,H*0.48);

  const blobDefs = [
    { x:0.12, y:0.40, r:220, rgb:'200,90,220', a:0.07  },
    { x:0.32, y:0.60, r:190, rgb:'110,90,235', a:0.06  },
    { x:0.58, y:0.34, r:260, rgb:'150,80,255', a:0.065 },
    { x:0.80, y:0.56, r:190, rgb:'230,110,200', a:0.05 },
    { x:0.46, y:0.20, r:160, rgb:'180,150,255', a:0.03 },
    { x:0.94, y:0.30, r:140, rgb:'90,110,255', a:0.045 },
  ];
  const blobs = blobDefs.map(function(b){
    const rgb = SKY_MONOCHROME ? SKY_LIGHT : b.rgb;
    const a   = b.a * (SKY_MONOCHROME ? SKY_GLOW : 1);
    return { x:b.x, y:b.y, r:b.r, c:'rgba(' + rgb + ',' + a + ')' };
  });
  ctx.globalCompositeOperation = 'lighter';
  blobs.forEach(b=>{
    const g = ctx.createRadialGradient(b.x*W,b.y*H,0,b.x*W,b.y*H,b.r);
    g.addColorStop(0,b.c);
    g.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0,0,W,H);
  });
  ctx.globalCompositeOperation = 'source-over';

  for(let i=0;i<1200;i++){
    const x = Math.random()*W, y = Math.random()*H;
    const inBand = y > H*0.28 && y < H*0.72;
    const r = Math.random()*(inBand?1.7:1.1) + 0.2;
    const a = Math.random()*0.8 + 0.2;
    ctx.beginPath();
    ctx.fillStyle = `rgba(255,255,255,${a})`;
    ctx.arc(x,y,r,0,Math.PI*2);
    ctx.fill();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}


const skyGeo = new THREE.SphereGeometry(320, 40, 24);
const skyMat = new THREE.MeshBasicMaterial({ map: buildGalaxySkyTexture(), side: THREE.BackSide, fog:false });
const skyMesh = new THREE.Mesh(skyGeo, skyMat);
scene.add(skyMesh);






function buildParticleRing(hex, R, big, opts){
  const strands = (opts && opts.strands) || 4;
  const perStrand = (opts && opts.perStrand) || (big ? 900 : 620);
  const windCount = (opts && opts.windCount) || 7;
  const tendrilCount = (opts && opts.tendrilCount!==undefined) ? opts.tendrilCount : 2;
  const perTendril = (opts && opts.perTendril) || 240;
  const tendrilSpread = (opts && opts.tendrilSpread!==undefined) ? opts.tendrilSpread : 1.5;
  const tendrilCurl = (opts && opts.tendrilCurl!==undefined) ? opts.tendrilCurl : 2.6;
  const tendrilAngleCenter = (opts && opts.tendrilAngleCenter!==undefined) ? opts.tendrilAngleCenter : null;
  const tendrilAngleSpread = (opts && opts.tendrilAngleSpread!==undefined) ? opts.tendrilAngleSpread : Math.PI*2;
  const interiorFill = (opts && opts.interiorFill) || 0;
  const interiorFalloff = (opts && opts.interiorFalloff!==undefined) ? opts.interiorFalloff : 0.55;
  const total = strands*perStrand + tendrilCount*perTendril + interiorFill;

  const positions = new Float32Array(total*3);
  const colors = new Float32Array(total*3);
  const base = new THREE.Color(hex);
  const cream = new THREE.Color('#fbf3ff');
  const deep = new THREE.Color('#0a0315');
  const rimColors = (opts && opts.rimColors) ? opts.rimColors.map(c => new THREE.Color(c)) : null;
  const rimTmp = new THREE.Color();
  



  function rimColorAt(){
    if(!rimColors) return cream;
    if(rimColors.length === 1) return rimColors[0];
    const i0 = Math.floor(Math.random()*rimColors.length);
    const i1 = Math.floor(Math.random()*rimColors.length);
    return rimTmp.copy(rimColors[i0]).lerp(rimColors[i1], Math.random());
  }
  const tubeR = R * ((opts && opts.tubeRatio) || 0.2);
  const posJitter = (opts && opts.posJitter!==undefined) ? opts.posJitter : 0.22;
  



  const scatterInward = (opts && opts.scatterInward!==undefined) ? opts.scatterInward : 0;
  const ellipseX = (opts && opts.ellipseX!==undefined) ? opts.ellipseX : 1;
  const ellipseY = (opts && opts.ellipseY!==undefined) ? opts.ellipseY : 1;
  const Rx = R * ellipseX;
  const Ry = R * ellipseY;
  const waistAmp = (opts && opts.waistAmp!==undefined) ? opts.waistAmp : 0;
  const waistFreq = (opts && opts.waistFreq!==undefined) ? opts.waistFreq : 2;
  const waistPhase = (opts && opts.waistPhase!==undefined) ? opts.waistPhase : 0;
  


  function waistAt(u){
    return 1 - waistAmp*Math.cos(waistFreq*u + waistPhase);
  }
  const jaggedAmp = (opts && opts.jaggedAmp!==undefined) ? opts.jaggedAmp : 0;
  const jaggedTerms = [];
  if(jaggedAmp){
    const numTerms = 5;
    for(let k=0;k<numTerms;k++){
      jaggedTerms.push({
        freq: 3 + Math.floor(Math.random()*9),
        phase: Math.random()*Math.PI*2,
        amp: 0.5 + Math.random()*0.5
      });
    }
  }
  



  function jaggedAt(u){
    if(!jaggedAmp) return 0;
    let n = 0, wsum = 0;
    jaggedTerms.forEach(t => { n += Math.sin(u*t.freq + t.phase)*t.amp; wsum += t.amp; });
    return Math.max(0, n/wsum);
  }
  const tmp = new THREE.Color();
  const tmpPalette = new THREE.Color();
  const palette = (opts && opts.palette) ? opts.palette.map(c => new THREE.Color(c)) : null;
  const randomColorMix = !!(opts && opts.randomColorMix);
  let p = 0;

  


  function paletteColorAt(u){
    const n = palette.length;
    const t = (((u % (Math.PI*2)) + Math.PI*2) % (Math.PI*2)) / (Math.PI*2) * n;
    const i0 = Math.floor(t) % n;
    const i1 = (i0+1) % n;
    const frac = t - Math.floor(t);
    return tmpPalette.copy(palette[i0]).lerp(palette[i1], frac);
  }

  



  function randomPaletteMix(){
    const n = palette.length;
    const i0 = Math.floor(Math.random()*n);
    const i1 = Math.floor(Math.random()*n);
    return tmpPalette.copy(palette[i0]).lerp(palette[i1], Math.random());
  }

  for(let s=0; s<strands; s++){
    const phase0 = (s/strands) * Math.PI*2;
    for(let i=0;i<perStrand;i++){
      const u = (i/perStrand) * Math.PI*2;
      const v = phase0 + u*windCount;
      const radialX = Math.cos(u), radialY = Math.sin(u);
      const w = waistAt(u) * (1 + jaggedAmp*jaggedAt(u));
      const jitter = (Math.random()-0.5) * tubeR * 0.4;
      const rr = tubeR + jitter;
      const ox = Math.cos(v) * rr;
      const oz = Math.sin(v) * rr;

      const inwardPull = scatterInward ? Math.random()*Math.random()*scatterInward : 0;
      positions[p*3]   = Rx*w*radialX + ox*radialX + (Math.random()-0.5)*posJitter - radialX*inwardPull;
      positions[p*3+1] = Ry*w*radialY + ox*radialY + (Math.random()-0.5)*posJitter - radialY*inwardPull;
      positions[p*3+2] = oz + (Math.random()-0.5)*posJitter;

      const localBase = palette ? (randomColorMix ? randomPaletteMix() : paletteColorAt(u)) : base;
      const facing = Math.cos(v);
      if(facing < 0){ tmp.copy(rimColorAt()).lerp(localBase, 1+facing); }
      else{ tmp.copy(localBase).lerp(deep, facing*0.3); }
      colors[p*3]=tmp.r; colors[p*3+1]=tmp.g; colors[p*3+2]=tmp.b;
      p++;
    }
  }

  const swayEnabled = !!(opts && opts.sway);
  const swayF = swayEnabled ? new Float32Array(total) : null;
  const swayTendrilIdx = swayEnabled ? new Float32Array(total) : null;
  const tendrilTanX = swayEnabled ? new Float32Array(tendrilCount) : null;
  const tendrilTanY = swayEnabled ? new Float32Array(tendrilCount) : null;
  const tendrilPhase = swayEnabled ? new Float32Array(tendrilCount) : null;

  for(let t=0;t<tendrilCount;t++){
    const u0 = tendrilAngleCenter!==null
      ? tendrilAngleCenter + (Math.random()-0.5)*tendrilAngleSpread
      : Math.random()*Math.PI*2;
    const localBase = palette ? (randomColorMix ? randomPaletteMix().clone() : paletteColorAt(u0).clone()) : base;
    const radialX = Math.cos(u0), radialY = Math.sin(u0);
    const tanX = -Math.sin(u0), tanY = Math.cos(u0);
    const w0 = waistAt(u0) * (1 + jaggedAmp*jaggedAt(u0));
    const startX = Rx*w0*radialX, startY = Ry*w0*radialY;
    if(swayEnabled){
      tendrilTanX[t] = tanX; tendrilTanY[t] = tanY;
      tendrilPhase[t] = Math.random()*Math.PI*2;
    }
    for(let i=0;i<perTendril;i++){
      const f = i/perTendril;
      const spread = f*f*R*tendrilSpread;
      const curl = f*tendrilCurl;
      positions[p*3]   = startX + radialX*spread + tanX*Math.sin(curl)*spread*0.4 + (Math.random()-0.5)*spread*0.5;
      positions[p*3+1] = startY + radialY*spread + tanY*Math.sin(curl)*spread*0.4 + (Math.random()-0.5)*spread*0.5;
      positions[p*3+2] = Math.cos(curl)*spread*0.5 + (Math.random()-0.5)*spread*0.4;
      if(swayEnabled){ swayF[p] = f; swayTendrilIdx[p] = t; }
      tmp.copy(localBase).lerp(deep, Math.min(1, f*1.3));
      colors[p*3]=tmp.r; colors[p*3+1]=tmp.g; colors[p*3+2]=tmp.b;
      p++;
    }
  }

  



  for(let i=0;i<interiorFill;i++){
    const u = Math.random()*Math.PI*2;
    const w = waistAt(u) * (1 + jaggedAmp*jaggedAt(u));
    const radialX = Math.cos(u), radialY = Math.sin(u);
    const rFrac = Math.pow(Math.random(), interiorFalloff);
    positions[p*3]   = Rx*w*radialX*rFrac + (Math.random()-0.5)*posJitter*0.6;
    positions[p*3+1] = Ry*w*radialY*rFrac + (Math.random()-0.5)*posJitter*0.6;
    positions[p*3+2] = (Math.random()-0.5)*tubeR*0.4;
    const localBase = palette ? (randomColorMix ? randomPaletteMix() : paletteColorAt(u)) : base;
    tmp.copy(localBase).lerp(deep, Math.random()*0.12);
    colors[p*3]=tmp.r; colors[p*3+1]=tmp.g; colors[p*3+2]=tmp.b;
    p++;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions,3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors,3));
  const mat = new THREE.PointsMaterial({
    size: (opts && opts.pointSize!==undefined) ? opts.pointSize : (big?0.15:0.12),
    map:GLOW_TEX, vertexColors:true, transparent:true,
    opacity: (opts && opts.pointOpacity!==undefined) ? opts.pointOpacity : 0.92,
    depthWrite:false, blending:THREE.AdditiveBlending, toneMapped:false
  });
  const pts = new THREE.Points(geo, mat);
  if(swayEnabled){
    pts.userData.sway = {
      basePositions: positions.slice(),
      swayF, swayTendrilIdx, tendrilTanX, tendrilTanY, tendrilPhase,
      amplitude: (opts && opts.swayAmplitude!==undefined) ? opts.swayAmplitude : 0.5,
      speed: (opts && opts.swaySpeed!==undefined) ? opts.swaySpeed : 0.8
    };
  }
  return pts;
}





function applyTendrilSway(points, elapsed){
  const s = points.userData.sway;
  if(!s) return;
  const posAttr = points.geometry.attributes.position;
  const arr = posAttr.array;
  const base = s.basePositions;
  const n = s.swayF.length;
  for(let i=0;i<n;i++){
    const f = s.swayF[i];
    if(f <= 0) continue;
    const t = s.swayTendrilIdx[i];
    const ampF = (0.2 + 0.8*Math.pow(f, 1.1)) * s.amplitude;
    const phase = s.tendrilPhase[t] + f*4.5;
    const side = Math.sin(elapsed*s.speed + phase) * ampF;
    const bob  = Math.cos(elapsed*s.speed*0.7 + phase) * ampF * 0.6;
    const ix = i*3;
    arr[ix]   = base[ix]   + s.tendrilTanX[t]*side;
    arr[ix+1] = base[ix+1] + s.tendrilTanY[t]*side;
    arr[ix+2] = base[ix+2] + bob;
  }
  posAttr.needsUpdate = true;
}


const gatePositions = [
  new THREE.Vector3(0, 0, 40),
  new THREE.Vector3(0, 0, 20),
  new THREE.Vector3(-4, 1.2, -6),
  new THREE.Vector3(5, -1, -28),
  new THREE.Vector3(-5, 2, -52),
  new THREE.Vector3(4, -1.5, -78),
  new THREE.Vector3(-5, 1.8, -102),
  new THREE.Vector3(0, 0.5, -127),
];

const AGENT_IMG_DATA = 'media/agent.png';
const AGENT_BG_IMG_DATA = 'media/agent-bg.png';
const ORB_IMG_DATA = 'media/orb.png';
const orbImgTexture = new THREE.TextureLoader().load(ORB_IMG_DATA);
const agentImgTexture = new THREE.TextureLoader().load(AGENT_IMG_DATA);
agentImgTexture.colorSpace = THREE.SRGBColorSpace;
const agentBgTexture = new THREE.TextureLoader().load(AGENT_BG_IMG_DATA);
agentBgTexture.colorSpace = THREE.SRGBColorSpace;











const SPIRAL_PARTICLE = '#d22d26';




const SPIRAL_CORE = '#000000';









function buildVeinTargetPositions(count, R){
  const pos = new Float32Array(count*3);
  let w = 0;
  function place(x, y, z){
    if(w >= count) return false;
    pos[w*3]=x; pos[w*3+1]=y; pos[w*3+2]=z;
    w++;
    return true;
  }
  



  function walk(x0, y0, z0, ang0, len, depth, maxDepth, budget){
    if(depth > maxDepth || len < 0.08*R || budget < 3) return;
    const steps = Math.max(4, Math.round(budget));
    const curl  = (Math.random()-0.5)*1.6;
    const wobA  = 0.05 + Math.random()*0.10;
    const wobF  = 3 + Math.random()*5;
    const phase = Math.random()*Math.PI*2;
    let x=x0, y=y0, z=z0, ang=ang0;
    for(let i=0;i<steps;i++){
      const s = i/steps;
      ang = ang0 + curl*s + Math.sin(s*wobF + phase)*wobA;
      const stepLen = len/steps;
      x += Math.cos(ang)*stepLen;
      y += Math.sin(ang)*stepLen;
      z += (Math.random()-0.5)*0.02*R;
      const th = 0.012*R*(1 - s*0.4); 
      if(!place(x+(Math.random()-0.5)*th, y+(Math.random()-0.5)*th, z)) return;
    }
    const children = depth === 0 ? 3 : (Math.random() < 0.55 ? 2 : 1);
    for(let c=0; c<children; c++){
      const spread = 0.6 + Math.random()*0.7;
      walk(x, y, z, ang + (Math.random()-0.5)*spread,
           len*(0.55 + Math.random()*0.2), depth+1, maxDepth,
           budget*(0.42 + Math.random()*0.16));
    }
  }
  const seeds = 5;
  const perSeedBudget = count/seeds;
  for(let s=0; s<seeds; s++){
    const a0 = Math.random()*Math.PI*2;
    const startR = Math.random()*0.15*R;
    walk(Math.cos(a0)*startR, Math.sin(a0)*startR, (Math.random()-0.5)*0.05*R,
         Math.random()*Math.PI*2, R*(0.95 + Math.random()*0.5), 0, 4, perSeedBudget);
  }
  



  while(w < count){
    const src = Math.floor(Math.random()*Math.max(1,w));
    place(pos[src*3]  +(Math.random()-0.5)*0.05*R,
          pos[src*3+1]+(Math.random()-0.5)*0.05*R,
          pos[src*3+2]+(Math.random()-0.5)*0.02*R);
  }
  return pos;
}

function buildStarBirth(ch, R){
  const violet = new THREE.Color(SPIRAL_PARTICLE);
  const hot    = new THREE.Color(SPIRAL_PARTICLE);
  const warm   = new THREE.Color(SPIRAL_PARTICLE);
  const pink   = new THREE.Color(SPIRAL_PARTICLE);
  const deep   = new THREE.Color(SPIRAL_PARTICLE);
  const coreCol= new THREE.Color(SPIRAL_CORE);
  const tmp    = new THREE.Color();

  









  const DCOUNT = 17000;
                           
                           
                           
                           
  const dPos = new Float32Array(DCOUNT*3);

  const VOID_R = 0.44;   

  let w = 0;
  const VOID_PX = VOID_R * R;
  function place(rad, ang, jx, jy, jz){
    if(w >= DCOUNT) return false;
    let x = Math.cos(ang)*rad + jx;
    let y = Math.sin(ang)*rad + jy;
    



    const d = Math.sqrt(x*x + y*y);
    if(d > 0 && d < VOID_PX){ const k = VOID_PX/d; x *= k; y *= k; }
    dPos[w*3] = x; dPos[w*3+1] = y; dPos[w*3+2] = jz;
    w++;
    return true;
  }

  


  const RIM_N = Math.round(DCOUNT*0.13);   
  for(let i=0;i<RIM_N;i++){
    const a = Math.random()*Math.PI*2;
    const clump = (0.55 + 0.45*Math.abs(Math.sin(a*1.5 + 0.7)))
                * (0.62 + 0.38*Math.abs(Math.cos(a*2.3 - 1.1)));
    

    const rad = (VOID_R + Math.pow(Math.random(), 1.5)*0.40*clump) * R;
    place(rad, a, 0, 0, (Math.random()-0.5)*0.05*R);
  }

  


  const FIL_N = 150;
  const FIL_BUDGET = Math.round(DCOUNT*0.70);   
  for(let f=0; f<FIL_N; f++){
    const a0    = Math.random()*Math.PI*2;
    const reach = 0.30 + Math.pow(Math.random(), 1.5)*1.05;
    const curl  = (Math.random()-0.5)*2.8;
    const wobA  = 0.04 + Math.random()*0.13;
    const wobF  = 2 + Math.random()*6;
    const phase = Math.random()*Math.PI*2;
    const thick = 0.005 + Math.random()*0.018;
    const n     = Math.round(FIL_BUDGET/FIL_N * (0.45 + Math.random()*1.3));
    for(let i=0;i<n;i++){
      

      const s   = Math.pow(i/n, 0.72);
      const rad = (VOID_R + s*reach) * R;
      const ang = a0 + curl*Math.pow(s, 1.4) + Math.sin(s*wobF + phase)*wobA;
      const th  = thick*R*(1 - s*0.5);
      if(!place(rad, ang,
                (Math.random()-0.5)*th*2,
                (Math.random()-0.5)*th*2,
                (Math.random()-0.5)*0.045*R*(1 - s*0.6))) break;
    }
  }

  

  const SPK_N = 10;
  const SPK_EACH = Math.round(DCOUNT*0.12 / SPK_N);
  for(let k=0;k<SPK_N;k++){
    const a0    = Math.random()*Math.PI*2;
    const reach = 1.0 + Math.random()*0.9;
    const bend  = (Math.random()-0.5)*0.22;
    for(let i=0;i<SPK_EACH;i++){
      const s   = Math.pow(i/SPK_EACH, 0.85);
      const rad = (VOID_R + s*reach) * R;
      const th  = 0.004*R*(1 - s*0.35);
      if(!place(rad, a0 + bend*s,
                (Math.random()-0.5)*th*2,
                (Math.random()-0.5)*th*2,
                (Math.random()-0.5)*0.02*R)) break;
    }
  }

  


  while(w < DCOUNT){
    place((VOID_R + (0.25 + Math.random()*0.85))*R,
          Math.random()*Math.PI*2, 0, 0, (Math.random()-0.5)*0.05*R);
  }

  



  const veinPos = buildVeinTargetPositions(DCOUNT, R);

  









  


  const SIZE_REF = 6.2;                 
  const grain = R / SIZE_REF;
  




  const SIZE_LAYERS = [
    { size: 0.040*grain, share: 0.44 },
    { size: 0.070*grain, share: 0.29 },
    { size: 0.110*grain, share: 0.19 },
    { size: 0.185*grain, share: 0.08 },
  ];

  const bucket = SIZE_LAYERS.map(() => []);
  for(let i=0;i<DCOUNT;i++){
    const r = Math.random();
    let acc = 0, b = SIZE_LAYERS.length-1;
    for(let k=0;k<SIZE_LAYERS.length;k++){
      acc += SIZE_LAYERS[k].share;
      if(r <= acc){ b = k; break; }
    }
    bucket[b].push(i);
  }

  const sizeLayers = SIZE_LAYERS.map((L,k) => {
    const idx = bucket[k];
    



    const spiralArr = new Float32Array(idx.length*3);
    const targetArr = new Float32Array(idx.length*3);
    for(let n=0;n<idx.length;n++){
      spiralArr[n*3]   = dPos[idx[n]*3];
      spiralArr[n*3+1] = dPos[idx[n]*3+1];
      spiralArr[n*3+2] = dPos[idx[n]*3+2];
      targetArr[n*3]   = veinPos[idx[n]*3];
      targetArr[n*3+1] = veinPos[idx[n]*3+1];
      targetArr[n*3+2] = veinPos[idx[n]*3+2];
    }
    const liveArr = spiralArr.slice(); 
    const g = new THREE.BufferGeometry();
    const posAttr = new THREE.BufferAttribute(liveArr, 3);
    posAttr.setUsage(THREE.DynamicDrawUsage);
    g.setAttribute('position', posAttr);
    const pts = new THREE.Points(g, new THREE.PointsMaterial({
      size:L.size, map:GLOW_TEX, color:violet, transparent:true, opacity:0.8,
      depthWrite:false, blending:THREE.AdditiveBlending, sizeAttenuation:true
    }));
    pts.userData.morph = { spiralArr, targetArr, liveArr, posAttr };
    return pts;
  });

  const disk = sizeLayers[0];
  const extraLayers = sizeLayers.slice(1);
  for(let k=0;k<extraLayers.length;k++) disk.add(extraLayers[k]);
  disk.rotation.x = -0.62; 

  
  const CCOUNT = 900;
  const cPos = new Float32Array(CCOUNT*3), cCol = new Float32Array(CCOUNT*3);
  for(let i=0;i<CCOUNT;i++){
    const r = 0.30*R*Math.pow(Math.random(),0.5);
    const th = Math.random()*Math.PI*2, ph = Math.acos(2*Math.random()-1);
    cPos[i*3]   = r*Math.sin(ph)*Math.cos(th);
    cPos[i*3+1] = r*Math.sin(ph)*Math.sin(th);
    cPos[i*3+2] = r*Math.cos(ph);
    tmp.copy(coreCol);   
    cCol[i*3]=tmp.r; cCol[i*3+1]=tmp.g; cCol[i*3+2]=tmp.b;
  }
  const cGeo = new THREE.BufferGeometry();
  cGeo.setAttribute('position', new THREE.BufferAttribute(cPos,3));
  cGeo.setAttribute('color',    new THREE.BufferAttribute(cCol,3));
  const core = new THREE.Points(cGeo, new THREE.PointsMaterial({
    size:0.2, map:STAR_TEX, vertexColors:true, transparent:true, opacity:1,
    depthWrite:false, blending:THREE.AdditiveBlending, sizeAttenuation:true
  }));
  core.visible = false;   
  disk.add(core);

  
  const flare = new THREE.Sprite(new THREE.SpriteMaterial({
    map:GLOW_TEX, color:new THREE.Color(SPIRAL_CORE), transparent:true,
    opacity:0.68, depthWrite:false, blending:THREE.AdditiveBlending
  }));
  flare.scale.set(R*1.5, R*1.5, 1);
  disk.add(flare);

  
  const streamers = new THREE.Group();
  for(let s=0;s<7;s++){
    const pts=[]; const a0 = Math.random()*Math.PI*2;
    const rStart = R*(1.35+Math.random()*0.5);
    const turns = 1.4+Math.random()*1.1, CTRL=28;
    for(let j=0;j<=CTRL;j++){
      const f=j/CTRL;
      const rad = rStart*(1-f) + 0.50*R*f;   
      const ang = a0 + turns*Math.PI*2*f;
      pts.push(new THREE.Vector3(Math.cos(ang)*rad, Math.sin(ang)*rad, (Math.random()-0.5)*0.05*R*(1-f)));
    }
    
    
    const tube=new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),220,0.008+Math.random()*0.006,6,false);
    tmp.copy(pink).lerp(violet,Math.random());
    streamers.add(new THREE.Mesh(tube, new THREE.MeshBasicMaterial({
      color:tmp.clone(), transparent:true, opacity:0.2, depthWrite:false, blending:THREE.AdditiveBlending
    })));
  }
  disk.add(streamers);

  
  disk.userData.originTick = (elapsed, dt, prox, morphT)=>{
    prox = prox || 0;
    morphT = morphT || 0;
    


    for(let k=0;k<extraLayers.length;k++) extraLayers[k].material.opacity = disk.material.opacity;
    




    const decayed = 1 - morphT*0.92;
    










    for(let k=0;k<extraLayers.length;k++){
      const layer = extraLayers[k];
      const spin = (0.10 + k*0.05) * (k%2===0 ? 1 : -1);
      layer.rotation.z = elapsed*spin*decayed;
      layer.rotation.x = Math.sin(elapsed*0.17 + k*2.1) * 0.10 * decayed;
      layer.rotation.y = Math.cos(elapsed*0.13 + k*1.4) * 0.07 * decayed;
    }
    core.scale.setScalar(1 + Math.sin(elapsed*1.6)*0.06 + prox*0.05);
    core.material.opacity = (0.85 + 0.15*Math.sin(elapsed*2.1)) * decayed;
    flare.material.opacity = (0.42 + 0.22*Math.sin(elapsed*1.3) + prox*0.15) * decayed;
    const fs = R*(1.7 + 0.25*Math.sin(elapsed*1.1) + prox*0.5);
    flare.scale.set(fs,fs,1);
    streamers.children.forEach((m,k)=>{
      m.material.opacity = (0.12 + 0.09*Math.sin(elapsed*1.5 + k) + prox*0.09) * decayed;
    });
  };

  





  let lastMorphT = -1;
  disk.userData.setMorph = (t) => {
    t = THREE.MathUtils.clamp(t, 0, 1);
    if(Math.abs(t - lastMorphT) < 0.0015) return;
    lastMorphT = t;
    for(let k=0;k<sizeLayers.length;k++){
      const { spiralArr, targetArr, liveArr, posAttr } = sizeLayers[k].userData.morph;
      for(let i=0;i<liveArr.length;i++){
        liveArr[i] = spiralArr[i] + (targetArr[i]-spiralArr[i])*t;
      }
      posAttr.needsUpdate = true;
    }
  };

  

  const glow = buildGlowCloud(SPIRAL_PARTICLE, R*1.18, 1300,
    { size:0.28, opacity:0.45, inner: VOID_R/1.18 });
  return { ring: disk, glow };
}

function buildGate(ch, pos){
  const group = new THREE.Group();

  if(ch.key === 'intro'){
    








































    const introRefAspect = 1.6;
    const introIsMobile = window.innerWidth <= 760;
    






    const introXScale = THREE.MathUtils.clamp(camera.aspect / introRefAspect, 0.32, 1.0);
    const introDepthScale = introIsMobile ? 1.7 : 1;
    const introYScaleTop = introIsMobile ? introDepthScale * 1.35 : 1;
    const introYScaleBottom = introIsMobile ? introDepthScale * 1.1 : 1;
    const agentFloatPhase = Math.random()*Math.PI*2;

    const shapeA = new THREE.Group();

    const shapeAMain = buildParticleRing(ch.hex, 2.0, true, {
      tubeRatio:0.17, windCount:8, strands:8, perStrand:950, tendrilCount:0,
      randomColorMix:true, posJitter:0.13, scatterInward:1.5,
      


      interiorFill:700, interiorFalloff:0.9,
      ellipseX:1.7, ellipseY:1.9, rimColors:['#af9e9b','#71149e'], jaggedAmp:0.22,
      palette: ['#71149e','#13119e','#931b76','#af9e9b','#190e66','#b0a3a9','#9d5193','#302a81']
    });
    shapeA.add(shapeAMain);

    


    const shapeATendrils = buildParticleRing(ch.hex, 2.0, true, {
      strands:0, tendrilCount:11, perTendril:340, tendrilSpread:4.3, tendrilCurl:5.0,
      randomColorMix:true,
      tendrilAngleCenter:2.2, tendrilAngleSpread:1.1, sway:true, swayAmplitude:0.55, swaySpeed:0.7,
      ellipseX:1.7, ellipseY:1.9, rimColors:['#af9e9b','#71149e'], jaggedAmp:0.22,
      palette: ['#71149e','#13119e','#931b76','#af9e9b','#190e66','#b0a3a9','#9d5193','#302a81']
    });
    shapeA.add(shapeATendrils);

    



    const shapeAStreaks = buildParticleRing('#fbf3ff', 2.0, false, {
      tubeRatio:0.04, windCount:9, strands:4, perStrand:560, tendrilCount:0,
      posJitter:0.05, ellipseX:1.7, ellipseY:1.9, jaggedAmp:0.22,
      pointSize:0.09, pointOpacity:0.6
    });
    shapeA.add(shapeAStreaks);

    



    const shapeAFlow1 = buildFlowStrands('#4d3d63', 2.0, 4, {
      tubeRatio:0.034, windCount:11, ellipseX:1.7, ellipseY:1.9, jaggedAmp:0.1,
      tubeRadius:0.014, opacity:0.35, colors:['#13119e', '#d5bcbf', '#4d3d63', '#4d3d63']
    });
    shapeA.add(shapeAFlow1);
    const shapeAFlow2 = buildFlowStrands('#4d3d63', 2.0, 4, {
      tubeRatio:0.034, windCount:6, ellipseX:1.7, ellipseY:1.9, jaggedAmp:0.18,
      tubeRadius:0.014, opacity:0.32, colors:['#d5bcbf', '#4d3d63', '#4d3d63', '#4d3d63']
    });
    shapeA.add(shapeAFlow2);
    shapeA.position.set(10 * introXScale, 2.6 * introYScaleTop, -10 * introDepthScale);
    shapeA.userData.floatBase = shapeA.position.clone();
    shapeA.userData.floatPhase = agentFloatPhase;
    group.add(shapeA);
    setupHoverRepel(shapeAMain, 3.2, 1.1);
    const glowA = buildGlowCloud(ch.hex, 2.8, 560, { size:0.34, opacity:1 });
    glowA.position.copy(shapeA.position);
    glowA.userData.floatBase = glowA.position.clone();
    glowA.userData.floatPhase = agentFloatPhase;
    group.add(glowA);

    




    const agentImgMat = new THREE.MeshBasicMaterial({
      map: agentBgTexture, transparent:true, opacity: introIsMobile ? 0.35 : 1,
      depthWrite:false, side:THREE.DoubleSide
    });
    const agentImgPlane = new THREE.Mesh(new THREE.PlaneGeometry(9.82, 8.14), agentImgMat);
    agentImgPlane.position.copy(shapeA.position);
    agentImgPlane.position.z -= 0.6;
    agentImgPlane.userData.floatBase = agentImgPlane.position.clone();
    agentImgPlane.userData.floatPhase = agentFloatPhase;
    agentImgPlane.visible = true;
    group.add(agentImgPlane);

    const servicesFloatPhase = Math.random()*Math.PI*2;

    const shapeB = buildServicesOrb(5.2, GLOW_TEX);
    shapeB.position.set(-10 * introXScale, -5.2 * introYScaleBottom, -9 * introDepthScale);
    shapeB.visible = false;
    shapeB.userData.floatBase = shapeB.position.clone();
    shapeB.userData.floatPhase = servicesFloatPhase;
    group.add(shapeB);
    
    const glowB = buildGlowCloud(ch.hex, 4.6, 560, { size:0.36, opacity:1 });
    glowB.position.copy(shapeB.position);
    glowB.userData.floatBase = glowB.position.clone();
    glowB.userData.floatPhase = servicesFloatPhase;
    group.add(glowB);

    


    const orbImgMat = new THREE.MeshBasicMaterial({
      map: orbImgTexture, transparent:true, opacity: introIsMobile ? 0.35 : 1,
      depthWrite:false, side:THREE.DoubleSide
    });
    const orbImgPlane = new THREE.Mesh(new THREE.PlaneGeometry(8.8, 6.77), orbImgMat);
    orbImgPlane.position.copy(shapeB.position);
    orbImgPlane.position.z -= 0.8;
    orbImgPlane.position.y += 1.9 * introYScaleBottom;
    orbImgPlane.position.x += 1.9 * introXScale;
    orbImgPlane.userData.floatBase = orbImgPlane.position.clone();
    orbImgPlane.userData.floatPhase = servicesFloatPhase;
    group.add(orbImgPlane);

    


    const orbShineMesh = buildImageShineMesh(orbImgPlane.geometry, orbImgTexture, {
      color:0xeaf2ff, speed:0.15, rimStrength:0.55, sweepStrength:0.85, sweepWidth:0.08
    });
    orbImgPlane.add(orbShineMesh);

    const introRefs = { imgParticlePoints: null };
    buildImageParticles(ORB_IMG_DATA, 8.8, 6.77, {
      sampleStep:7, pointSize:0.11, opacity:0.9, floatAmp:0.05,
      

      flowSpeed:0.16, flowDirX:0.55, flowDirY:1
    }, (points) => {
      points.position.copy(orbImgPlane.position);
      points.position.z += 0.05;
      points.userData.floatBase = points.position.clone();
      points.userData.floatPhase = servicesFloatPhase;
      group.add(points);
      introRefs.imgParticlePoints = points;
    });

    group.position.copy(pos);
    scene.add(group);
    return { group, ring:null, shapeA, shapeAMain, shapeATendrils, shapeB, glowA, glowB, agentImgPlane, orbImgPlane, orbShineMat: orbShineMesh.material, shapeAFlow1, shapeAFlow2, introRefs };
  }

  if(ch.key === 'origin'){
    const sb = buildStarBirth(ch, 4.3);   
    group.add(sb.ring);
    group.add(sb.glow);
    group.position.copy(pos);
    scene.add(group);
    return { group, ring: sb.ring, glow: sb.glow };
  }

  


  const big = ch.key === 'origin' || ch.key === 'infinity';
  const R = big ? 5.2 : 4.4;   
                                
                                

  








  const ring = buildParticleRing(ch.hex, R, big, {
    interiorFill: big ? 500 : 480,
    interiorFalloff: 0.9
  });
  group.add(ring);

  const glow = buildGlowCloud(ch.hex, R*1.15, big ? 600 : 620, { size:0.35, opacity: big ? 0.4 : 0.65 });
  group.add(glow);

  group.position.copy(pos);
  scene.add(group);
  return { group, ring, glow };
}
const gates = chapters.map((ch,i) => buildGate(ch, gatePositions[i]));
window.__dbgGates = gates;


const nebulaGroup = new THREE.Group();
const nebulaClouds = [];
chapters.forEach((ch,i)=>{
  if(ch.key === 'intro') return;
  const z = gatePositions[i].z;
  const count = ch.key === 'horizon' ? 1 : 3;
  



  const nebulaHex = '#' + new THREE.Color(ch.hex).lerp(new THREE.Color('#000000'), 1.0).getHexString();
  for(let k=0;k<count;k++){
    const scale = 2.6 + Math.random()*3;
    const baseOpacity = ch.key === 'horizon' ? 0.18 : 0.26;
    const cloud = buildGlowCloud(nebulaHex, scale, ch.key === 'horizon' ? 70 : 120, {
      size: 0.09,
      opacity: baseOpacity
    });
    cloud.position.set((Math.random()-0.5)*26, (Math.random()-0.5)*16, z + (Math.random()-0.5)*18);
    nebulaGroup.add(cloud);
    nebulaClouds.push({
      mesh: cloud, baseOpacity,
      phase: Math.random()*Math.PI*2,
      speed: 0.15 + Math.random()*0.2,
      driftPhase: Math.random()*Math.PI*2,
      driftSpeed: 0.05 + Math.random()*0.08
    });
  }
});
scene.add(nebulaGroup);


function buildStars(count, radius, zSpan, size, opacity){
  const positions = new Float32Array(count*3);
  for(let i=0;i<count;i++){
    positions[i*3]   = (Math.random()-0.5)*radius;
    positions[i*3+1] = (Math.random()-0.5)*radius*0.6;
    positions[i*3+2] = 45 - Math.random()*zSpan;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions,3));
  const mat = new THREE.PointsMaterial({
    size, map:STAR_TEX, color:0xffffff, transparent:true, opacity,
    depthWrite:false, blending:THREE.AdditiveBlending
  });
  return new THREE.Points(geo, mat);
}
function makeStarField(layers, countEach, radius, zSpan, size, baseOpacity){
  const group = new THREE.Group();
  const list = [];
  for(let i=0;i<layers;i++){
    const mesh = buildStars(countEach, radius, zSpan, size, baseOpacity);
    group.add(mesh);
    list.push({ mesh, baseOpacity, phase:Math.random()*Math.PI*2, speed:0.5+Math.random()*0.9 });
  }
  scene.add(group);
  return { group, layers:list };
}
const nearStarField = makeStarField(4, 163, 34, 150, 0.055, 0.85);
const farStarField  = makeStarField(3, 133, 130, 220, 0.045, 0.4);


const STREAK_SPAN = 180;
function buildStreaks(count){
  const positions = new Float32Array(count*2*3);
  const data = [];
  for(let i=0;i<count;i++){
    const x = (Math.random()-0.5)*32;
    const y = (Math.random()-0.5)*22;
    const z0 = Math.random()*STREAK_SPAN;
    const len = 3 + Math.random()*8;
    data.push({ x, y, z0, len });
    positions[i*6+0]=x; positions[i*6+1]=y; positions[i*6+2]=20-z0;
    positions[i*6+3]=x; positions[i*6+4]=y; positions[i*6+5]=20-z0-len;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions,3));
  const mat = new THREE.LineBasicMaterial({ color:0xcfe3ff, transparent:true, opacity:0 });
  const mesh = new THREE.LineSegments(geo, mat);
  mesh.userData.streakData = data;
  return mesh;
}
const streaks = buildStreaks(170);
scene.add(streaks);
let streakScroll = 0;


const posPoints = gatePositions;
const lookPoints = [
  new THREE.Vector3(0, 0, 24),
  new THREE.Vector3(0, 0, 4),
  new THREE.Vector3(5, 0.5, -16),
  new THREE.Vector3(-6, -0.5, -40),
  new THREE.Vector3(6, 1, -64),
  new THREE.Vector3(-4, -1, -90),
  new THREE.Vector3(6, 1.2, -114),
  new THREE.Vector3(0, 0.5, -143),
];
const posCurve = new THREE.CatmullRomCurve3(posPoints, false, 'catmullrom', 0.35);
const lookCurve = new THREE.CatmullRomCurve3(lookPoints, false, 'catmullrom', 0.35);


gsap.registerPlugin(ScrollTrigger);
gsap.set([els.copy, els.detailPanel], { xPercent: -50 });

let rawT = 0;
let lastIdx = 0;
let showDetail = false;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;














const T1 = 1 / (N_CHAPTERS - 1);            
const SCRUB = reducedMotion ? true : 1.15;  

const scrollState = { t: 0 };
window.__dbgScrollState = scrollState;













const INTRO_END = 0.45 / (N_CHAPTERS - 1);   
                           
                           






const MERGE_END = 0.62 / (N_CHAPTERS - 1);



gsap.fromTo(scrollState, { t: 0 }, {
  t: INTRO_END,
  ease: 'none',
  scrollTrigger: {
    trigger: els.scrollTrackA,
    start: 'top top',
    end: 'bottom top',
    scrub: SCRUB,
  }
});




gsap.fromTo(scrollState, { t: INTRO_END }, {
  t: MERGE_END,
  ease: 'none',
  immediateRender: false,
  scrollTrigger: {
    trigger: '#scrollDive',
    start: 'top top',
    end: 'bottom top',
    scrub: SCRUB,
  }
});














gsap.fromTo(scrollState, { t: MERGE_END }, {
  t: T1,
  ease: 'none',
  immediateRender: false,
  scrollTrigger: {
    trigger: '#scrollRise',
    start: '40% top',
    end: 'bottom top',
    scrub: SCRUB,
  }
});






const T_DARK = 1.38 / (N_CHAPTERS - 1);   

gsap.fromTo(scrollState, { t: T1 }, {
  t: T_DARK,
  ease: 'none',
  immediateRender: false,
  scrollTrigger: {
    trigger: '#scrollDark',
    start: 'top top',
    end: 'bottom top',
    scrub: SCRUB,
  }
});


gsap.fromTo(scrollState, { t: T_DARK }, {
  t: 1,
  ease: 'none',
  immediateRender: false,
  scrollTrigger: {
    trigger: els.scrollTrackB,
    start: 'top top',
    end: 'bottom bottom',
    scrub: SCRUB,
  }
});























const nightState = { k: 0 };            
const nightBase = new THREE.Color(SKY_BASE);
const nightTmp  = new THREE.Color();

function applyNight(){
  const k = nightState.k;
  nightTmp.copy(nightBase).multiplyScalar(1 - k);
  scene.background.copy(nightTmp);
  



  baseFog.copy(nightTmp);
  fog.color.copy(nightTmp);
  skyMat.color.setScalar(1 - k);
  const css = '#' + nightTmp.getHexString();
  document.documentElement.style.backgroundColor = css;
  document.body.style.backgroundColor = css;
}

gsap.to(nightState, {
  k: 1,
  ease: 'none',
  immediateRender: false,
  onUpdate: applyNight,
  scrollTrigger: {
    trigger: '#scrollRise',
    start: 'top top',      
    end: '20% top',        
    scrub: SCRUB,
  }
});
gsap.to(nightState, {
  k: 0,
  ease: 'none',
  immediateRender: false,
  onUpdate: applyNight,
  scrollTrigger: {
    trigger: '#scrollDark',
    start: 'top top',      
    end: '30% top',        
    scrub: SCRUB,
  }
});


function docMax(){ return document.documentElement.scrollHeight - window.innerHeight; }
window.addEventListener('scroll', () => {
  const max = docMax();
  rawT = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
}, { passive:true });

function scrollToChapter(idx){
  if(idx <= 0){ window.scrollTo({ top: 0, behavior:'smooth' }); return; }
  const b   = els.scrollTrackB.offsetTop;
  const end = b + els.scrollTrackB.offsetHeight - window.innerHeight;
  const p   = (idx - 1) / (N_CHAPTERS - 2);
  window.scrollTo({ top: b + p * (end - b), behavior:'smooth' });
}





























(function(){
  const MOBILE_BP = 768;
  const HOLD_MS = 2000;
  const SWIPE_THRESHOLD = 24; 
  const EPS = 4; 

  let listening = false;
  let tracking = false;
  let locked = false;
  let startY = 0;
  let startX = 0;
  let axisDecided = false;
  let isHorizontal = false;
  const AXIS_LOCK_PX = 6; 

  function isMobileWidth(){ return window.innerWidth < MOBILE_BP; }

  

  function getPaginationStops(){
    const stops = [0];
    const diveEl  = document.getElementById('scrollDive');
    const clpsEl  = document.querySelector('.clps-section');
    const riseEl  = document.getElementById('scrollRise');
    const darkEl  = document.getElementById('scrollDark');
    const trackB  = els.scrollTrackB;

    if(diveEl) stops.push(diveEl.offsetTop);
    if(clpsEl){
      /* Was only 2 generic stops (top, 50%) for this whole 300vh pinned
         section — that left no stop anywhere near the 3rd beat
         ("Intelligence, Not Hype"), so a swipe from the panel beat could
         skip right past it. This section has exactly 3 beats
         (beatRanges in the script above), each fully visible/settled
         within a narrow p-window once its own fade-in finishes and
         before its fade-out starts — one stop per beat, at the center of
         that settled window, so one swipe lands on each beat in turn. */
      /* p=0.07 (beat0's own settled center) used to be included here too,
         but .clps-sticky's own fade-in timeline already completes right
         around clpsEl's own offsetTop (the 'dive' stop just above lands
         there already), so that extra stop was sitting almost on top of
         the natural landing spot — one swipe would land on it without
         anything visibly changing, then a second swipe was needed to
         actually reach beat1. Dropping it so a swipe from before the
         section goes straight to "Current Collapse" via the dive stop,
         and the very next swipe goes straight to beat1. */
      const top = clpsEl.offsetTop, h = clpsEl.offsetHeight;
      const total = h - window.innerHeight;
      [0.52, 0.95].forEach(p => stops.push(top + p * total));
    }
    if(riseEl) stops.push(riseEl.offsetTop);
    if(darkEl) stops.push(darkEl.offsetTop);
    if(trackB){
      const b = trackB.offsetTop;
      const end = b + trackB.offsetHeight - window.innerHeight;
      for(let idx = 1; idx <= N_CHAPTERS - 1; idx++){
        const p = (idx - 1) / (N_CHAPTERS - 2);
        stops.push(b + p * (end - b));
      }
    }
    return Array.from(new Set(stops.map(v => Math.round(v)))).sort((a, b) => a - b);
  }

  function onTouchStart(e){
    if(e.touches.length !== 1) return;
    tracking = true;
    axisDecided = false;
    isHorizontal = false;
    startY = e.touches[0].clientY;
    startX = e.touches[0].clientX;
  }
  function onTouchMove(e){
    if(!tracking) return;
    if(!axisDecided){
      const t = e.touches[0];
      const dx = t.clientX - startX, dy = t.clientY - startY;
      if(Math.abs(dx) > AXIS_LOCK_PX || Math.abs(dy) > AXIS_LOCK_PX){
        axisDecided = true;
        
        isHorizontal = Math.abs(dx) > Math.abs(dy);
      } else {
   
        return;
      }
    }
    if(isHorizontal) return; 
    e.preventDefault(); 
  }
  function onTouchEnd(e){
    if(!tracking) return;
    tracking = false;
    if(isHorizontal) return; 
    if(locked) return; 
    const touch = e.changedTouches && e.changedTouches[0];
    const endY = touch ? touch.clientY : startY;
    const dy = startY - endY; 
    if(Math.abs(dy) < SWIPE_THRESHOLD) return; 

    const stops = getPaginationStops();
    const curY = window.scrollY;
    let target;
    if(dy > 0){
      target = stops.find(s => s > curY + EPS);
    } else {
      const before = stops.filter(s => s < curY - EPS);
      target = before.length ? before[before.length - 1] : undefined;
    }
    if(target === undefined) return; 

    locked = true;
    window.scrollTo({ top: target, behavior: 'smooth' });
    setTimeout(() => { locked = false; }, HOLD_MS);
  }

  function enable(){
    if(listening) return;
    listening = true;
    document.addEventListener('touchstart', onTouchStart, { passive:true });
    document.addEventListener('touchmove', onTouchMove, { passive:false });
    document.addEventListener('touchend', onTouchEnd, { passive:true });
    document.addEventListener('touchcancel', onTouchEnd, { passive:true });
  }
  function disable(){
    if(!listening) return;
    listening = false;
    tracking = false; locked = false;
    document.removeEventListener('touchstart', onTouchStart);
    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend', onTouchEnd);
    document.removeEventListener('touchcancel', onTouchEnd);
  }
  function syncForWidth(){
    if(isMobileWidth()) enable(); else disable();
  }
  syncForWidth();
  window.addEventListener('resize', syncForWidth);
})();

els.enterBtn.addEventListener('click', () => {
  
  if(scrollState.t < T1 * 0.5){
    const clps = document.querySelector('.clps-section');
    if(clps){ window.scrollTo({ top: clps.offsetTop, behavior:'smooth' }); return; }
  }
  const next = Math.min(N_CHAPTERS-1, Math.round(scrollState.t*(N_CHAPTERS-1)) + 1);
  scrollToChapter(next);
});

if(els.diagGoBtn){
  els.diagGoBtn.addEventListener('click', () => {
    const firstField = els.diagnosticForm ? els.diagnosticForm.querySelector('input, select, textarea') : null;
    if(firstField){
      firstField.scrollIntoView({ behavior:'smooth', block:'center' });
      firstField.focus({ preventScroll:true });
    }
  });
  els.diagGoBtn.addEventListener('mouseenter', () => els.diagGoBtn.classList.add('is-hovered'));
  els.diagGoBtn.addEventListener('mouseleave', () => els.diagGoBtn.classList.remove('is-hovered', 'is-clicked'));
  els.diagGoBtn.addEventListener('mousedown', () => els.diagGoBtn.classList.add('is-clicked'));
  els.diagGoBtn.addEventListener('mouseup', () => els.diagGoBtn.classList.remove('is-clicked'));
  els.diagGoBtn.addEventListener('touchstart', () => els.diagGoBtn.classList.add('is-hovered', 'is-clicked'), { passive:true });
  els.diagGoBtn.addEventListener('touchend', () => els.diagGoBtn.classList.remove('is-hovered', 'is-clicked'));
}








(function forceFormInteractive(){
  const targets = [];
  if(els.diagGoBtn) targets.push(els.diagGoBtn);
  if(els.diagnosticForm){
    targets.push(...els.diagnosticForm.querySelectorAll('input, select, textarea, label, .custom-select-wrapper, .form-input-group, .form-grid-row, .form-grid-row > *'));
  }
  targets.forEach(el => el.style.setProperty('pointer-events', 'auto', 'important'));
})();















(function detachDiagnosticForm(){
  const form = els.diagnosticForm;
  if(!form || !form.parentNode) return;
  const anchor = document.createElement('div');
  anchor.className = 'diag-form-anchor';
  form.parentNode.insertBefore(anchor, form);
  document.body.appendChild(form);

  function syncPosition(){
    const r = anchor.getBoundingClientRect();
    form.style.left = r.left + 'px';
    form.style.top = r.top + 'px';
    form.style.width = r.width + 'px';
    









    anchor.style.height = form.offsetHeight + 'px';
  }
  function tick(){
    syncPosition();
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();

els.detailClose.addEventListener('click', () => {
  showDetail = false;
  gsap.to(els.detailPanel, { opacity:0, y:20, duration:0.3, ease:'power2.in',
    onComplete:() => els.detailPanel.classList.remove('open') });
});




let listItems = [];

let cardItems = [];

let negationItems = [];



let comparisonItems = [];


let topologyItems = [];

let modelItems = [];








const HEADING_HOLD_END = 0.08;
const HEADING_FADE_END = 0.22;








let domChapterIdx = -1;




const CARD_ICONS = {
  1: '<svg class="card-living-object card-living-object1" viewBox="0 0 160 100" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M 10,90 L 30,80 M 35,78 L 55,68 M 60,66 L 80,56 M 115,38 L 135,28 M 140,26 L 160,16" stroke-width="3" /><rect x="20" y="73" width="22" height="10" rx="5" transform="rotate(-26, 31, 78)" stroke-width="1.5" /><rect x="45" y="61" width="22" height="10" rx="5" transform="rotate(-26, 56, 66)" stroke-width="1.5" /><rect x="70" y="49" width="22" height="10" rx="5" transform="rotate(-26, 81, 54)" stroke-width="1.5" /><rect x="120" y="24" width="22" height="10" rx="5" transform="rotate(-26, 131, 29)" stroke-width="1.5" /><rect x="95" y="55" width="46" height="38" rx="6" /><path d="M 105,55 V 42 A 13,13 0 0 1 131,42 V 55" /><circle cx="118" cy="68" r="3" /><path d="M 116,70 L 115,78 H 121 L 120,70 Z" /></svg>',
  2: '<svg class="card-living-object card-living-object2" viewBox="0 0 180 100" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M 20,95 L 30,65 L 55,45 L 80,65 L 90,95 Z" /><path d="M 55,45 V 95 M 39,57 V 95 M 71,57 V 95" stroke-dasharray="1 3" /><path d="M 47,95 C 47,85 63,85 63,95" fill="currentColor" fill-opacity="0.1" /><path d="M 55,45 L 55,37 L 63,41 Z" fill="currentColor" /><circle cx="125" cy="60" r="32" /><circle cx="125" cy="60" r="28" stroke-dasharray="4 3" /><circle cx="125" cy="60" r="4" /><path d="M 125,28 V 92 M 93,60 H 157 M 102,37 L 148,83 M 102,83 L 148,37" /><path d="M 125,60 L 110,95 M 125,60 L 140,95 M 95,95 H 155" /></svg>',
  3: '<svg class="card-living-object card-living-object3" viewBox="0 0 120 100" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M 25,20 C 40,18 50,25 60,25 C 70,25 80,18 95,20 C 98,45 95,70 85,85 C 75,95 65,98 60,98 C 55,98 45,95 35,85 C 25,70 22,45 25,20 Z" /><path d="M 33,40 C 37,35 47,35 51,40 C 47,44 37,44 33,40 Z" /><circle cx="42" cy="40" r="2" fill="currentColor" /><path d="M 32,34 C 38,32 46,33 50,37" stroke-width="2" /><path d="M 69,40 C 73,35 83,35 87,40 C 83,44 73,44 69,40 Z" /><circle cx="78" cy="40" r="2" fill="currentColor" /><path d="M 88,34 C 82,32 74,33 70,37" stroke-width="2" /><path d="M 60,42 V 65 L 55,68 H 65 L 60,65" /><path d="M 38,72 C 48,84 72,84 82,72 C 72,76 48,76 38,72 Z" fill="currentColor" fill-opacity="0.1" /><path d="M 34,71 C 36,71 38,74 38,74 M 86,71 C 84,71 82,74 82,74" /></svg>'
};









function hasDetailContent(ch){
  return Array.isArray(ch.items) && ch.items.length > 0;
}
function hasCardsContent(ch){
  return Array.isArray(ch.cards) && ch.cards.length > 0;
}
function hasNegationContent(ch){
  return Array.isArray(ch.negation) && ch.negation.length > 0;
}
function hasComparisonContent(ch){
  return Array.isArray(ch.comparison) && ch.comparison.length > 0;
}
function hasTopologyContent(ch){
  return Array.isArray(ch.topology) && ch.topology.length > 0;
}
function hasModelsContent(ch){
  return Array.isArray(ch.models) && ch.models.length > 0;
}
function hasDiagnosticContent(ch){
  return !!ch.diagnostic;
}



const MODEL_ICONS = {
  house: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 21V9a2 2 0 012-2h10a2 2 0 012 2v12M3 21h18M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3M9 11h2v3H9zm4 0h2v3h-2z" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  monitor: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="6" width="18" height="12" rx="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="8" cy="12" r="1.5"/><circle cx="16" cy="12" r="1.5"/></svg>',
  robot: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2a3 3 0 00-3 3v1H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-4V5a3 3 0 00-3-3z" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><path d="M9 16h6" stroke-linecap="round"/></svg>'
};

function updateCopyDOM(ch){
  domChapterIdx = chapters.indexOf(ch);
  els.eyebrow.innerHTML = ch.eyebrow;
  

  els.eyebrow.classList.toggle('eyebrow--statement', !!ch.isStatement);
  els.heading.innerHTML = ch.heading;
  els.sub.textContent = ch.sub;
  els.detailHeading.innerHTML = ch.heading;
  els.detailBody.textContent = ch.detail;
  







  els.eyebrow.style.opacity = '';
  els.heading.style.opacity = '';
  if(els.chapterRule) els.chapterRule.style.opacity = '';
  /* always cleared here so a rapid scroll back-and-forth can never leave a
     one-shot entrance class stuck mid-animation on the wrong chapter's text */
  els.heading.classList.remove('glitch-in');
  els.eyebrow.classList.remove('wipe-in');

  const hasList = Array.isArray(ch.items) && ch.items.length > 0;
  els.copy.classList.toggle('has-list', hasList);
  if(hasList){
    els.chapterList.innerHTML = ch.items.map(function(it, i){
      return '<li><div class="cl-in"><span class="cl-n">' + (i+1) + '.</span>' +
             '<span class="cl-t">' + it[0] + '</span> &mdash; ' + it[1] + '</div></li>';
    }).join('');
    /* No stagger, no per-item fade/blur/rise, no scroll-driven reveal at
       all — every item is simply shown at its natural height and full
       opacity right away, so the whole list appears at once, together
       with the heading, both riding #copy's own single fade. */
    Array.prototype.forEach.call(els.chapterList.children, function(shell){
      shell.style.height = 'auto';
      shell.style.marginBottom = '9px';
      const inner = shell.firstElementChild;
      if(inner){
        inner.style.opacity = '1';
        inner.style.filter = 'none';
        inner.style.transform = 'none';
      }
    });
  } else {
    els.chapterList.innerHTML = '';
  }
  listItems = [];

  const hasCards = Array.isArray(ch.cards) && ch.cards.length > 0;
  els.copy.classList.toggle('has-cards', hasCards);
  if(hasCards && els.chapterCards){
    els.chapterCards.innerHTML = ch.cards.map(function(c){
      return '<div class="landscape-card"><span class="card-number">' + c.n + '</span>' +
             '<h3 class="card-title">' + c.title + '</h3>' +
             '<p class="card-description">' + c.text + '</p>' +
             (CARD_ICONS[c.icon] || '') + '</div>';
    }).join('');
  } else if(els.chapterCards){
    els.chapterCards.innerHTML = '';
  }
  cardItems = els.chapterCards ? Array.prototype.slice.call(els.chapterCards.children) : [];

  if(els.footerBarText) els.footerBarText.innerHTML = (hasCards && ch.footer) ? ch.footer : '';

  const hasNegation = Array.isArray(ch.negation) && ch.negation.length > 0;
  els.copy.classList.toggle('has-negation', hasNegation);
  if(hasNegation && els.chapterNegation){
    els.chapterNegation.innerHTML = ch.negation.map(function(n){
      return '<div class="negation-card"><div class="card-icon-column"><span class="icon-cross">&times;</span></div>' +
             '<div class="card-content-column"><h3 class="negation-card-title">' + n.title + '</h3>' +
             '<p class="negation-card-description">' + n.text + '</p></div></div>';
    }).join('');
  } else if(els.chapterNegation){
    els.chapterNegation.innerHTML = '';
  }
  negationItems = els.chapterNegation ? Array.prototype.slice.call(els.chapterNegation.children) : [];

  if(els.negationFooterText) els.negationFooterText.innerHTML = (hasNegation && ch.negationFooter) ? ch.negationFooter : '';

  const hasComparison = Array.isArray(ch.comparison) && ch.comparison.length > 0;
  els.copy.classList.toggle('has-comparison', hasComparison);
  if(hasComparison && els.chapterComparison){
    const headerRow =
      '<div class="table-column-header text-purple-glow">REVacity Term</div><div></div>' +
      '<div class="table-column-header text-gray">Replaces</div>';
    const rows = ch.comparison.map(function(pair){
      return '<div class="term-box left-term">' + pair[0] + '</div>' +
             '<div class="arrow-column">&rarr;</div>' +
             '<div class="term-box right-term strikes">' + pair[1] + '</div>';
    }).join('');
    els.chapterComparison.innerHTML = headerRow + rows;
  } else if(els.chapterComparison){
    els.chapterComparison.innerHTML = '';
  }
  if(els.chapterComparison){
    /* first 3 children are the static header row (REVacity Term / Replaces),
       left untouched by render()'s animation — group the rest into rows of 3
       (left-term, arrow, right-term) for the staggered reveal below. */
    const cells = Array.prototype.slice.call(els.chapterComparison.children).slice(3);
    comparisonItems = [];
    for(let i = 0; i < cells.length; i += 3){
      comparisonItems.push([cells[i], cells[i+1], cells[i+2]]);
    }
  } else {
    comparisonItems = [];
  }

  if(hasComparison && els.bannedTermsList){
    els.bannedTermsList.innerHTML = (ch.banned || []).map(function(term){
      return '<span>' + term + '</span>';
    }).join('');
  } else if(els.bannedTermsList){
    els.bannedTermsList.innerHTML = '';
  }

  const hasTopology = Array.isArray(ch.topology) && ch.topology.length > 0;
  els.copy.classList.toggle('has-topology', hasTopology);
  if(hasTopology && els.topologyBody){
    els.topologyBody.innerHTML = ch.topology.map(function(row){
      return '<tr><td class="phase-num">' + row[0] + '</td>' +
             '<td class="revacity-name">' + row[1] + '</td>' +
             '<td class="phase-desc">' + row[2] + '</td></tr>';
    }).join('');
  } else if(els.topologyBody){
    els.topologyBody.innerHTML = '';
  }
  if(els.topologyBody){
    topologyItems = Array.prototype.slice.call(els.topologyBody.children).map(function(tr){
      return Array.prototype.slice.call(tr.children);
    });
  } else {
    topologyItems = [];
  }

  if(els.topologyFootnote) els.topologyFootnote.textContent = (hasTopology && ch.topologyFootnote) ? ch.topologyFootnote : '';

  const hasModels = Array.isArray(ch.models) && ch.models.length > 0;
  els.copy.classList.toggle('has-models', hasModels);
  if(els.dyingAgencyBadge) els.dyingAgencyBadge.textContent = (hasModels && ch.dyingBadge) ? ch.dyingBadge : '';
  if(hasModels && els.chapterModels){
    els.chapterModels.innerHTML = ch.models.map(function(m){
      return '<div class="model-card">' +
             '<div class="card-icon-row ' + m.stroke + '">' + (MODEL_ICONS[m.icon] || '') + '</div>' +
             '<h3 class="card-heading">' + m.title + '</h3>' +
             '<div class="card-pill-tag ' + m.tagClass + '">' + m.tag + '</div>' +
             '<p class="card-body-text">' + m.body + '</p>' +
             '<div class="alternative-divider"></div>' +
             '<h4 class="alternative-title ' + m.altColor + '">THE ALTERNATIVE</h4>' +
             '<p class="alternative-body-text">' + m.altBody + '</p>' +
             '</div>';
    }).join('');
  } else if(els.chapterModels){
    els.chapterModels.innerHTML = '';
  }
  modelItems = els.chapterModels ? Array.prototype.slice.call(els.chapterModels.children) : [];

  const hasDiagnostic = hasDiagnosticContent(ch);
  els.copy.classList.toggle('has-diagnostic', hasDiagnostic);
  








  document.body.classList.toggle('has-diagnostic-glow', hasDiagnostic);
  




  if(els.diagnosticForm) els.diagnosticForm.classList.toggle('js-visible', hasDiagnostic);
  if(hasDiagnostic){
    if(els.diagnosticLead) els.diagnosticLead.innerHTML = ch.diagLead;
    if(els.diagnosticBanner) els.diagnosticBanner.innerHTML = ch.diagBanner || '';
    if(els.skepticTitle) els.skepticTitle.textContent = ch.skepticTitle || '';
    if(els.skepticDesc) els.skepticDesc.textContent = ch.skepticDesc || '';
    if(els.compareText) els.compareText.innerHTML = ch.compareText || '';
  } else {
    if(els.diagnosticLead) els.diagnosticLead.innerHTML = '';
    if(els.diagnosticBanner) els.diagnosticBanner.innerHTML = '';
    if(els.skepticTitle) els.skepticTitle.textContent = '';
    if(els.skepticDesc) els.skepticDesc.textContent = '';
    if(els.compareText) els.compareText.textContent = '';
  }
}

/* splits an HTML string into per-word tokens without breaking tags that
   contain spaces of their own (e.g. `<span class="u-word">`) — only
   splits on spaces that fall outside any `<...>` tag. */
function splitWordsPreservingTags(html){
  const tokens = [];
  let cur = '', inTag = false;
  for(let i=0;i<html.length;i++){
    const c = html[i];
    if(c === '<') inTag = true;
    if(c === '>') inTag = false;
    if(c === ' ' && !inTag){
      if(cur) tokens.push(cur);
      cur = '';
    } else {
      cur += c;
    }
  }
  if(cur) tokens.push(cur);
  return tokens;
}

/* Kinetic word-in for every OTHER chapter's heading (chapter 0 keeps its
   own bigger startIntroTyping() treatment below, untouched) — same
   splitWordsPreservingTags approach so inline tags like .u-word/.highlight-
   red/.strike-funnel survive the split, just a smaller, quicker version:
   words drift in from alternating sides and settle, rather than the
   intro's bigger swing. Called right after updateCopyDOM() re-writes
   els.heading.innerHTML in transitionToChapter(), so it immediately
   re-splits that same text into animated word spans. Entirely isolated in
   its own try/catch — a failure here just leaves the heading as the plain
   text updateCopyDOM already put there, never a blank heading. */
function playHeadingKinetic(headingEl, text){
  if(reducedMotion || !headingEl) return;
  try{
    const tokens = splitWordsPreservingTags(text);
    if(tokens.length < 1) return;
    headingEl.innerHTML = tokens.map(t => `<span class="word-fly">${t}</span>`).join(' ');
    const words = headingEl.querySelectorAll('.word-fly');
    words.forEach((w,i) => {
      gsap.set(w, { opacity:0, x: i%2===0 ? -22 : 22, rotate: i%2===0 ? -5 : 5 });
    });
    gsap.to(words, { opacity:1, x:0, rotate:0, duration:0.55, stagger:0.045, ease:'back.out(1.4)' });
  }catch(e){  }
}











let introAnimTl = null;
function stopIntroTyping(){
  if(introAnimTl){ introAnimTl.kill(); introAnimTl = null; }
}
function startIntroTyping(){
  if(reducedMotion){ updateCopyDOM(chapters[0]); window.dispatchEvent(new Event('revacity:hero-revealed')); return; }
  if(introAnimTl) introAnimTl.kill();

  els.eyebrow.innerHTML = chapters[0].eyebrow;

  const headingTokens = splitWordsPreservingTags(chapters[0].heading);
  els.heading.innerHTML = headingTokens.map(t => `<span class="word-fly">${t}</span>`).join(' ');
  const headingWords = els.heading.querySelectorAll('.word-fly');

  const buttons = [els.enterBtn];

  gsap.set(els.eyebrow, { opacity:1, clipPath:'inset(0 100% 0 0)' });
  headingWords.forEach((w,i) => {
    gsap.set(w, { opacity:0, x: i%2===0 ? -34 : 34, rotate: i%2===0 ? -10 : 10 });
  });
  gsap.set(buttons, { opacity:0, scale:0.5, rotate:-6 });

  introAnimTl = gsap.timeline({ onComplete:() => { introAnimTl = null; window.dispatchEvent(new Event('revacity:hero-revealed')); } });
  introAnimTl
    .to(els.eyebrow, { clipPath:'inset(0 0% 0 0)', duration:0.9, ease:'power4.inOut' })
    .to(headingWords, { opacity:1, x:0, rotate:0, duration:0.7, stagger:0.09, ease:'back.out(1.5)' }, '-=0.35')
    .to(buttons, { opacity:1, scale:1, rotate:0, duration:0.6, stagger:0.14, ease:'elastic.out(1,0.55)' }, '-=0.1');
}

updateCopyDOM(chapters[0]);
startIntroTyping();
root.style.setProperty('--accent', chapters[0].hex);
gsap.set([els.labelAgent, els.labelServices], { opacity: 1 });










gsap.set(els.ctaRow, { autoAlpha: 0, display:'none' });
els.copy.classList.add('is-centered');











gsap.set(els.copy, { x:0, y:0, xPercent:-50, yPercent:-50 });









nebulaGroup.visible = false;

if(gates[1]){
  gates[1].ring.userData.baseOpacity = gates[1].ring.material.opacity;
  gates[1].glow.userData.baseOpacity = gates[1].glow.material.opacity;
  gates[1].ring.material.opacity = 0;
  gates[1].glow.material.opacity = 0;
  gates[1].ring.visible = false;
  gates[1].glow.visible = false;
  gsap.set([gates[1].ring.scale, gates[1].glow.scale], { x:0.55, y:0.55, z:0.55 });
}









(function playIntroEntrance(){
  const g0 = gates[0];
  if(!g0) return;

  function slideIn(obj, dx, duration, delay){
    if(!obj || !obj.userData.floatBase) return;
    const base = obj.userData.floatBase;
    const restX = base.x;
    base.x = restX + dx;
    gsap.to(base, { x:restX, duration:duration, delay:delay, ease:'power3.out' });
  }
  function fadeIn(material, duration, delay){
    if(!material) return;
    const target = material.opacity;
    material.opacity = 0;
    gsap.to(material, { opacity:target, duration:duration, delay:delay, ease:'power2.out' });
  }

  
  const agentDelay = 0.15, agentDuration = 1.3;
  slideIn(g0.shapeA, 14, agentDuration, agentDelay);
  slideIn(g0.glowA, 14, agentDuration, agentDelay);
  slideIn(g0.agentImgPlane, 14, agentDuration, agentDelay);
  fadeIn(g0.agentImgPlane.material, 1.1, agentDelay);
  fadeIn(g0.glowA.material, 1.1, agentDelay);

  
  const servicesDelay = 0.45, servicesDuration = 1.3;
  slideIn(g0.shapeB, -14, servicesDuration, servicesDelay);
  slideIn(g0.glowB, -14, servicesDuration, servicesDelay);
  slideIn(g0.orbImgPlane, -14, servicesDuration, servicesDelay);
  fadeIn(g0.orbImgPlane.material, 1.1, servicesDelay);
  fadeIn(g0.glowB.material, 1.1, servicesDelay);
  if(g0.introRefs && g0.introRefs.imgParticlePoints){
    const pts = g0.introRefs.imgParticlePoints;
    slideIn(pts, -14, servicesDuration, servicesDelay);
    fadeIn(pts.material, 1.1, servicesDelay + 0.1);
  }
})();






function revealOriginGate(){
  const g1 = gates[1];
  if(!g1) return;
  g1.ring.visible = true;
  g1.glow.visible = true;
  gsap.timeline({ overwrite:true })
    .to([g1.ring.scale, g1.glow.scale], { x:1, y:1, z:1, duration:2.2, ease:'power3.out' }, 0)
    .to(g1.ring.material, { opacity: g1.ring.userData.baseOpacity*1.3, duration:1.0, ease:'power2.out' }, 0)
    .to(g1.glow.material, { opacity: g1.glow.userData.baseOpacity*1.3, duration:1.0, ease:'power2.out' }, 0)
    .to(g1.ring.material, { opacity: g1.ring.userData.baseOpacity, duration:1.0, ease:'power2.inOut' }, 1.0)
    .to(g1.glow.material, { opacity: g1.glow.userData.baseOpacity, duration:1.0, ease:'power2.inOut' }, 1.0);
}
function hideOriginGate(){
  const g1 = gates[1];
  if(!g1) return;
  gsap.to(g1.ring.material, { opacity:0, duration:0.5, ease:'power2.in', overwrite:true,
    onComplete:() => { g1.ring.visible = false; g1.glow.visible = false; } });
  gsap.to(g1.glow.material, { opacity:0, duration:0.5, ease:'power2.in', overwrite:true });
  gsap.to([g1.ring.scale, g1.glow.scale], { x:0.55, y:0.55, z:0.55, duration:0.5, ease:'power2.in', overwrite:true });
}
let prevMergeLock = false;
// The ring/glow reveal below originally only fired on a merge-on
// true->false edge (a state that, in practice, only happens on the way
// back up out of the collapse section). Scrolling straight down into
// this chapter for the first time never crosses that edge, so the ring
// stayed at its initial opacity:0 forever. This flag fires the same
// reveal once, the first time this chapter is actually reached.
let originRevealedOnce = false;








function playFailureGlitch(){
  els.heading.classList.add('glitch-in');
  els.eyebrow.classList.add('wipe-in');
  const clear = () => {
    els.heading.classList.remove('glitch-in');
    els.eyebrow.classList.remove('wipe-in');
  };
  els.heading.addEventListener('animationend', clear, { once:true });
  setTimeout(clear, 950);
}



function transitionToChapter(idx){
  const tl = gsap.timeline();
  if(idx === 0){
    




    tl.call(() => {
      stopIntroTyping();
      updateCopyDOM(chapters[0]);
      startIntroTyping();
      els.copy.classList.add('is-centered');
      els.copy.classList.remove('is-mid');
      


      gsap.set(els.copy, { x:0, y:0, xPercent:-50, yPercent:-50 });
      


      els.labelAgent.style.setProperty('pointer-events', 'auto', 'important');
      els.labelServices.style.setProperty('pointer-events', 'auto', 'important');
    });
  } else {
    tl.to(els.copy, { opacity:0, y:16, duration:0.32, ease:'power2.in' })
      .call(() => {
        stopIntroTyping();
        updateCopyDOM(chapters[idx]);
        playHeadingKinetic(els.heading, chapters[idx].heading);
        els.copy.classList.remove('is-centered');
        els.copy.classList.add('is-mid');
        



        gsap.set(els.copy, { x:0, y:0, xPercent:-50, yPercent:-50 });
      })
      .to(els.copy, { opacity:1, y:0, duration:0.55, ease:'power3.out' });
  }
  







  gsap.to(els.ctaRow, { autoAlpha: 0, display:'none', duration:0.4, delay:0.15, overwrite:true });
  root.style.setProperty('--accent', chapters[idx].hex);

  






  if(!reducedMotion && fxPass){
    gsap.timeline({ overwrite:true })
      .to(wipeState, { v:1, duration:0.26, ease:'power2.out' })
      .to(wipeState, { v:0, duration:0.55, ease:'power2.in' });
    



    const gradeTarget = new THREE.Color(chapters[idx].hex);
    gsap.to(gradeColorState, {
      r: gradeTarget.r, g: gradeTarget.g, b: gradeTarget.b,
      duration: 0.9, ease: 'power2.inOut', overwrite: true
    });
  }

  



  if(!reducedMotion && letterboxTop && letterboxBottom && idx !== 0){
    gsap.timeline({ overwrite:true })
      .to([letterboxTop, letterboxBottom], { height:'3.2vh', duration:0.24, ease:'power2.out' })
      .to([letterboxTop, letterboxBottom], { height:'0vh', duration:0.5, ease:'power2.in' }, '+=0.08');
  }
  




  if(idx !== 0){
    gsap.to([els.labelAgent, els.labelServices], { opacity:0, duration:0.3, ease:'power2.out', overwrite:true });
    












    els.labelAgent.style.setProperty('pointer-events', 'none', 'important');
    els.labelServices.style.setProperty('pointer-events', 'none', 'important');
  }

  

  if(!reducedMotion){
    [...nearStarField.layers, ...farStarField.layers].forEach((l) => {
      gsap.fromTo(l.mesh.material, { opacity: l.baseOpacity*2.2 }, { opacity: l.baseOpacity, duration:1.1, ease:'power2.out', overwrite:true });
    });
  }
}



const setCueOpacity = gsap.quickTo(els.scrollCue, 'opacity', { duration:0.4, ease:'power2.out' });
const setRingOffset = els.ring
  ? gsap.quickTo(els.ring, 'strokeDashoffset', { duration:0.5, ease:'power3.out' })
  : function(){};

if(els.scrollCue){
  els.scrollCue.addEventListener('click', () => {
    window.scrollTo({ top: window.scrollY + window.innerHeight, behavior:'smooth' });
  });
}


let audioCtx=null, soundOn=false, gainNode=null;
function ensureAudio(){
  if(audioCtx) return;
  try{
    audioCtx = new (window.AudioContext||window.webkitAudioContext)();
    gainNode = audioCtx.createGain();
    gainNode.gain.value = 0;
    gainNode.connect(audioCtx.destination);
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass'; filter.frequency.value = 600;
    filter.connect(gainNode);
    [55, 110, 165].forEach((freq,i) => {
      const osc = audioCtx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq + i*0.5;
      const g = audioCtx.createGain();
      g.gain.value = 0.33;
      osc.connect(g); g.connect(filter);
      osc.start();
    });
  }catch(e){  }
}
if(els.soundBtn){
  els.soundBtn.addEventListener('click', () => {
    ensureAudio();
    if(!audioCtx) return;
    soundOn = !soundOn;
    els.soundBtn.setAttribute('aria-pressed', String(soundOn));
    els.soundOn.style.display = soundOn ? 'block':'none';
    els.soundOff.style.display = soundOn ? 'none':'block';
    gainNode.gain.setTargetAtTime(soundOn ? 0.045 : 0.0, audioCtx.currentTime, 0.6);
    if(soundOn && audioCtx.state === 'suspended') audioCtx.resume();
  });
}


const tmpColor = new THREE.Color();
const clock = new THREE.Clock();
let prevScrollT = 0;
let scrollVelocity = 0;
let idleTime = 0; 
let momentumSnapArmed = true; 

function colorAt(chapterFloat){
  const idx = Math.min(N_CHAPTERS-2, Math.floor(chapterFloat));
  const frac = chapterFloat - idx;
  return tmpColor.set(chapters[idx].hex).lerp(new THREE.Color(chapters[idx+1].hex), frac);
}

let pageRevealed = false;
function revealPage(){
  if(pageRevealed) return;
  pageRevealed = true;
  document.body.classList.remove('is-loading');
  window.dispatchEvent(new Event('revacity:revealed'));
}
setTimeout(revealPage, 3000);











const REVEAL_DIST = 16, REVEAL_BLUR = 4;
function revealStyle(el, p, dist){
  if(!el) return;
  const d = dist === undefined ? REVEAL_DIST : dist;
  el.style.opacity = String(p);
  




  el.style.setProperty('--reveal-rise', ((1-p)*d).toFixed(2) + 'px');
  el.style.filter = 'blur(' + ((1-p)*REVEAL_BLUR).toFixed(2) + 'px)';
}





function revealFlipStyle(el, p, fromDeg){
  if(!el) return;
  el.style.opacity = String(p);
  el.style.setProperty('--flip-rot', ((1-p)*fromDeg).toFixed(2) + 'deg');
  el.style.filter = 'blur(' + ((1-p)*REVEAL_BLUR).toFixed(2) + 'px)';
}


function renderFrame(){
  const elapsed = clock.elapsedTime;
  const dt = Math.max(clock.getDelta(), 0.0001);

  const smoothT = scrollState.t;
  const chapterFloat = smoothT * (N_CHAPTERS-1);
  const nearestIdx = Math.round(chapterFloat);

  









  




  const mergeLock = document.body.classList.contains('merge-on');
  const showLater = (nearestIdx !== 0) && !mergeLock;

  





  const GATE_REVEAL = 0.55;   
  

  if(showLater && !originRevealedOnce){ originRevealedOnce = true; revealOriginGate(); }
  if(prevMergeLock && !mergeLock && nearestIdx !== 0) revealOriginGate();
  prevMergeLock = mergeLock;
  nebulaGroup.visible = showLater && chapterFloat > 1 + GATE_REVEAL;
  for(let gi=1; gi<gates.length; gi++){
    const g = gates[gi];
    if(!g) continue;
    

    const near = gi === 1
      ? showLater
      : showLater && Math.abs(chapterFloat - gi) < GATE_REVEAL;
    if(g.ring) g.ring.visible = near;
    if(g.glow) g.glow.visible = near;
    // gate 1 (origin) starts at opacity:0 and is only ever brought back up
    // by the two GSAP tweens above (revealOriginGate / the merge-on edge) —
    // if either gets skipped or overwritten before it finishes, the ring
    // and glow stay permanently invisible even though .visible is true.
    // This is the deterministic fallback: whenever gate 1 should be shown
    // and its opacity is still at/near its startup zero, snap it straight
    // to its resting opacity every frame, independent of any tween state.
    if(gi === 1 && near){
      if(g.ring && g.ring.userData.baseOpacity && g.ring.material.opacity < g.ring.userData.baseOpacity * 0.05){
        g.ring.material.opacity = g.ring.userData.baseOpacity;
      }
      if(g.glow && g.glow.userData.baseOpacity && g.glow.material.opacity < g.glow.userData.baseOpacity * 0.05){
        g.glow.material.opacity = g.glow.userData.baseOpacity;
      }
    }
  }

  










  








  const activeCh = chapters[domChapterIdx];
  const localCf = chapterFloat - (domChapterIdx - 0.5);

  

























  if(activeCh && Array.isArray(activeCh.items) && activeCh.items.length > 0){
    /* "Five Systemic Failures" is the only chapter with a bulleted items
       list. Its fade-out used to finish at chapterFloat 1.16, but the DOM
       doesn't swap to the next chapter until chapterFloat rounds to 1.5
       (transitionToChapter()/nearestIdx above) — leaving a blank
       starfield gap of about a third of a screen's worth of scroll where
       neither this chapter's content nor the next chapter's had faded
       in. Extending the fade-out to end right at 1.48 (just before the
       1.5 swap) closes that gap. */
    const fadeIn  = THREE.MathUtils.smoothstep(chapterFloat, 0.60, 0.615);
    const fadeOut = 1 - THREE.MathUtils.smoothstep(chapterFloat, 1.30, 1.48);
    const p = fadeIn * fadeOut;
    els.eyebrow.style.opacity = String(p);
    els.heading.style.opacity = String(p);
    if(els.chapterRule) els.chapterRule.style.opacity = String(p);
    if(els.chapterList) els.chapterList.style.opacity = String(p);
  }

  





  if(cardItems.length){
    for(let ci=0; ci<cardItems.length; ci++){
      const card = cardItems[ci];
      const a = HEADING_FADE_END + ci*0.05;
      const enter = THREE.MathUtils.smoothstep(localCf, a, a + 0.1);
      const exit = 1 - THREE.MathUtils.smoothstep(localCf, 0.86, 0.96);
      const p = enter * exit;
      revealStyle(card, p);
    }
  }
  if(els.chapterFooterBar && cardItems.length){
    const a = HEADING_FADE_END + cardItems.length*0.05 + 0.05;
    const enter = THREE.MathUtils.smoothstep(localCf, a, a + 0.1);
    const exit = 1 - THREE.MathUtils.smoothstep(localCf, 0.86, 0.96);
    const p = enter * exit;
    revealStyle(els.chapterFooterBar, p);
  }

  


  if(negationItems.length){
    for(let ni=0; ni<negationItems.length; ni++){
      const row = negationItems[ni];
      const a = HEADING_FADE_END + ni*0.03;
      const enter = THREE.MathUtils.smoothstep(localCf, a, a + 0.1);
      const exit = 1 - THREE.MathUtils.smoothstep(localCf, 0.86, 0.96);
      const p = enter * exit;
      revealStyle(row, p);
    }
  }
  if(els.chapterNegationFooter && negationItems.length){
    const a = HEADING_FADE_END + negationItems.length*0.03 + 0.05;
    const enter = THREE.MathUtils.smoothstep(localCf, a, a + 0.1);
    const exit = 1 - THREE.MathUtils.smoothstep(localCf, 0.86, 0.96);
    const p = enter * exit;
    revealStyle(els.chapterNegationFooter, p);
  }

  



  if(comparisonItems.length){
    for(let ri=0; ri<comparisonItems.length; ri++){
      const row = comparisonItems[ri];
      const a = HEADING_FADE_END + ri*0.02;
      const enter = THREE.MathUtils.smoothstep(localCf, a, a + 0.1);
      const exit = 1 - THREE.MathUtils.smoothstep(localCf, 0.86, 0.96);
      const p = enter * exit;
      


      revealFlipStyle(row[0], p, -75);
      revealStyle(row[1], p);
      revealFlipStyle(row[2], p, 75);
    }
  }
  if(els.chapterBannedBanner && comparisonItems.length){
    const a = HEADING_FADE_END + comparisonItems.length*0.02 + 0.05;
    const enter = THREE.MathUtils.smoothstep(localCf, a, a + 0.1);
    const exit = 1 - THREE.MathUtils.smoothstep(localCf, 0.86, 0.96);
    const p = enter * exit;
    revealStyle(els.chapterBannedBanner, p);
  }

  




  if(els.chapterTopologySplit && topologyItems.length){
    const splitA = HEADING_FADE_END;
    const splitEnter = THREE.MathUtils.smoothstep(localCf, splitA, splitA + 0.08);
    const splitExit = 1 - THREE.MathUtils.smoothstep(localCf, 0.86, 0.96);
    els.chapterTopologySplit.style.opacity = String(splitEnter * splitExit);

    for(let ti=0; ti<topologyItems.length; ti++){
      const cells = topologyItems[ti];
      const a = HEADING_FADE_END + 0.03 + ti*0.02;
      const enter = THREE.MathUtils.smoothstep(localCf, a, a + 0.1);
      const p = enter * splitExit;
      



      for(let ci=0; ci<cells.length; ci++) revealStyle(cells[ci], p);
    }
  }
  if(els.topologyFootnote && topologyItems.length){
    const a = HEADING_FADE_END + topologyItems.length*0.02 + 0.08;
    const enter = THREE.MathUtils.smoothstep(localCf, a, a + 0.1);
    const exit = 1 - THREE.MathUtils.smoothstep(localCf, 0.86, 0.96);
    const p = enter * exit;
    revealStyle(els.topologyFootnote, p);
  }

  

  if(els.dyingAgencyBadge && modelItems.length){
    const a = HEADING_FADE_END;
    const enter = THREE.MathUtils.smoothstep(localCf, a, a + 0.08);
    const exit = 1 - THREE.MathUtils.smoothstep(localCf, 0.86, 0.96);
    const p = enter * exit;
    revealStyle(els.dyingAgencyBadge, p);
  }
  if(modelItems.length){
    /* On the mobile layout the cards form a horizontally swipeable row
       instead of a simultaneously-visible grid, so gating each card's
       reveal behind extra VERTICAL scroll progress (the mi*0.06 stagger
       below) left cards 2/3 stuck half-blurred whenever someone swiped
       to them before scrolling further down the page — swiping is
       instant, this scroll-linked reveal isn't. Reveal every card
       together on mobile; keep the stagger for the desktop grid, where
       the cascade is a nice touch and every card is already on-screen
       at once regardless. */
    const modelsMobile = window.innerWidth <= 900;
    for(let mi=0; mi<modelItems.length; mi++){
      const card = modelItems[mi];
      const staggerMi = modelsMobile ? 0 : mi;
      const a = HEADING_FADE_END + 0.08 + staggerMi*0.06;
      const enter = THREE.MathUtils.smoothstep(localCf, a, a + 0.12);
      const exit = 1 - THREE.MathUtils.smoothstep(localCf, 0.86, 0.96);
      const p = enter * exit;
      revealStyle(card, p);
    }
  }

  







  if(els.diagnosticLead && hasDiagnosticContent(chapters[domChapterIdx] || {})){
    const step = 0.06;
    const bannerA = 0.14;
    const bannerP = THREE.MathUtils.smoothstep(localCf, bannerA, bannerA + step);
    revealStyle(els.diagnosticBanner, bannerP);

    const skepticA = bannerA + step;
    const skepticP = THREE.MathUtils.smoothstep(localCf, skepticA, skepticA + step);
    revealStyle(els.chapterSkeptic, skepticP);

    const formA = skepticA + step;
    const formP = THREE.MathUtils.smoothstep(localCf, formA, formA + step + 0.02);
    revealStyle(els.diagnosticForm, formP);
  }

  if(chapterFloat < 0.5){
    const introFade = 1 - THREE.MathUtils.smoothstep(chapterFloat, 0, 0.22);
    els.copy.style.opacity = String(introFade);
    els.labelAgent.style.opacity = String(introFade);
    els.labelServices.style.opacity = String(introFade);
  }
  




  document.body.classList.toggle('intro-bright', chapterFloat < 0.3);

  
  const rawVelocity = Math.abs(smoothT - prevScrollT) / dt;
  prevScrollT = smoothT;
  scrollVelocity += (Math.min(rawVelocity, 3) - scrollVelocity) * Math.min(1, dt*4);
  const speedFactor = reducedMotion ? 0 : Math.min(1, scrollVelocity * 1.8);

  if(nearestIdx !== lastIdx){
    lastIdx = nearestIdx;
    transitionToChapter(nearestIdx);
    showDetail = false;
    els.detailPanel.classList.remove('open');
    if(els.chapNum) els.chapNum.textContent = String(nearestIdx+1).padStart(2,'0');
    setRingOffset(RING_C * (1 - nearestIdx/(N_CHAPTERS-1)));
    nebulaGroup.visible = (nearestIdx !== 0) && !mergeLock;
    if(!mergeLock){
      if(nearestIdx !== 0) revealOriginGate(); else hideOriginGate();
    }
    momentumSnapArmed = true; 
  }

  if(els.progressFill) els.progressFill.style.width = (rawT*100).toFixed(2) + '%';
  setCueOpacity(nearestIdx === 0 ? 1 - Math.min(1, smoothT*14) : 0);

  
  const t = THREE.MathUtils.clamp(smoothT, 0, 1);
  const pos = posCurve.getPoint(t);
  const look = lookCurve.getPoint(t);
  if(!reducedMotion){
    const eps = 0.01;
    const t2 = Math.min(1, t+eps), t1 = Math.max(0, t-eps);
    const dx = posCurve.getPoint(t2).x - posCurve.getPoint(t1).x;
    const bank = THREE.MathUtils.clamp(-dx*2.4, -0.3, 0.3);
    camera.up.set(Math.sin(bank), Math.cos(bank), 0);
    pos.y += Math.sin(elapsed*0.4) * 0.025;
  } else {
    camera.up.set(0,1,0);
  }
  camera.position.copy(pos);
  camera.lookAt(look);

  



  dragOrbit.x += (dragOrbitTarget.x - dragOrbit.x) * Math.min(1, dt*6);
  dragOrbit.y += (dragOrbitTarget.y - dragOrbit.y) * Math.min(1, dt*6);
  if(Math.abs(dragOrbit.x) > 0.0001 || Math.abs(dragOrbit.y) > 0.0001){
    camera.rotation.y += dragOrbit.x;
    camera.rotation.x += dragOrbit.y;
  }

  




  if(exploreMode && Math.abs(exploreZoomOffset) > 0.001){
    camera.getWorldDirection(tmpForward);
    camera.position.addScaledVector(tmpForward, exploreZoomOffset);
  }

  






  if(reducedMotion){
    idleTime = 0;
  } else if(scrollVelocity < 0.02 && !isOrbitDragging && !exploreMode){
    idleTime += dt;
  } else {
    idleTime = Math.max(0, idleTime - dt * 3);
  }
  if(idleTime > 0.4){
    const idleFactor = THREE.MathUtils.smoothstep(idleTime, 0.4, 2.2);
    camera.rotation.y += Math.sin(elapsed * 0.31) * 0.0022 * idleFactor;
    camera.rotation.x += Math.cos(elapsed * 0.24) * 0.0016 * idleFactor;
  }

  








  if(!reducedMotion && !isOrbitDragging && !exploreMode && momentumSnapArmed &&
     nearestIdx >= 1 && nearestIdx <= N_CHAPTERS - 3){
    const distToNext = (nearestIdx + 1) - chapterFloat;
    if(idleTime > 0.5 && distToNext > 0 && distToNext < 0.06){
      momentumSnapArmed = false;
      try{
        const trackB = els.scrollTrackB;
        if(trackB && trackB.offsetHeight > 0){
          const pxPerChapterFloat = trackB.offsetHeight / ((1 - T1) * (N_CHAPTERS - 1));
          window.scrollBy({ top: distToNext * pxPerChapterFloat });
        }
      }catch(e){  }
    }
  }

  


  fog.color.copy(baseFog);

  



  const voyageProximity = THREE.MathUtils.smoothstep(chapterFloat, 1.7, 3.0);
  streaks.material.opacity = Math.min(0.85, voyageProximity*0.7 + speedFactor*0.55);
  if(!reducedMotion){
    const streakSpeed = 8 + speedFactor*25 + voyageProximity*12;
    streakScroll = (streakScroll + streakSpeed*dt) % STREAK_SPAN;
    const posAttr = streaks.geometry.attributes.position;
    const arr = posAttr.array;
    const data = streaks.userData.streakData;
    for(let i=0;i<data.length;i++){
      const d = data[i];
      const z = 20 - ((d.z0 + streakScroll) % STREAK_SPAN);
      arr[i*6+0]=d.x; arr[i*6+1]=d.y; arr[i*6+2]=z;
      arr[i*6+3]=d.x; arr[i*6+4]=d.y; arr[i*6+5]=z-d.len;
    }
    posAttr.needsUpdate = true;
  }

  







  const veinMorphT = THREE.MathUtils.smoothstep(chapterFloat, 0.85, 1.35);

  if(!reducedMotion){
    

    const nearLayerSet = new Set(nearStarField.layers);
    [...nearStarField.layers, ...farStarField.layers].forEach((l) => {
      const twinkle = 0.78 + 0.22*Math.sin(elapsed*l.speed + l.phase);
      const dim = nearLayerSet.has(l) ? voyageProximity*0.3 : 0;
      l.mesh.material.opacity = l.baseOpacity*twinkle*(1-dim) + speedFactor*0.12;
    });
    nearStarField.group.rotation.z = elapsed*0.003;
    farStarField.group.rotation.z = -elapsed*0.0015;

    
    nebulaClouds.forEach((c) => {
      const s = 1 + Math.sin(elapsed*c.speed + c.phase)*0.18;
      c.mesh.scale.setScalar(s);
      c.mesh.material.opacity = c.baseOpacity * (0.85 + 0.15*Math.sin(elapsed*c.driftSpeed + c.driftPhase));
    });
    nebulaGroup.rotation.y = elapsed*0.008;

    const originProx = Math.max(0, 1 - Math.abs(chapterFloat - 1)/1.25);
    gates.forEach((g,i) => {
      if(g.ring) g.ring.rotation.z = elapsed*0.05 + i;
      if(g.ring && g.ring.userData.originTick) g.ring.userData.originTick(elapsed, dt, originProx, veinMorphT);
      if(g.shapeB){
        g.shapeB.rotation.z = -elapsed*0.03;
        applyFloatPosition(g.shapeB, elapsed);
      }
      if(g.glowB) applyFloatPosition(g.glowB, elapsed);
      if(g.orbImgPlane){
        applyFloatPosition(g.orbImgPlane, elapsed);
        const ph = g.orbImgPlane.userData.floatPhase;
        g.orbImgPlane.rotation.z = Math.sin(elapsed*0.25 + ph) * 0.03;
        g.orbImgPlane.rotation.x = Math.cos(elapsed*0.21 + ph) * 0.02;
        g.orbImgPlane.rotation.y = Math.sin(elapsed*0.16 + ph) * 0.018;
      }
      if(g.orbShineMat) g.orbShineMat.uniforms.uTime.value = elapsed;
      if(g.shapeA){
        applyFloatPosition(g.shapeA, elapsed);
      }
      if(g.shapeAMain){
        g.shapeAMain.rotation.z = elapsed*0.05;
      }
      if(g.shapeATendrils) applyTendrilSway(g.shapeATendrils, elapsed);
      if(g.shapeAFlow1) g.shapeAFlow1.rotation.z = elapsed*0.18;
      if(g.shapeAFlow2) g.shapeAFlow2.rotation.z = -elapsed*0.13;
      if(g.introRefs && g.introRefs.imgParticlePoints){
        applyImageParticleAnim(g.introRefs.imgParticlePoints, elapsed, dt);
        applyFloatPosition(g.introRefs.imgParticlePoints, elapsed);
      }
      if(g.shapeB) applyMouseRepel(g.shapeB, dt);
      if(g.glowA) applyFloatPosition(g.glowA, elapsed);
      if(g.agentImgPlane){
        const p = g.agentImgPlane;
        applyFloatPosition(p, elapsed);
        const ph = p.userData.floatPhase;
        p.rotation.z = Math.sin(elapsed*0.3 + ph) * 0.035;
        p.rotation.x = Math.cos(elapsed*0.26 + ph) * 0.025;
        p.rotation.y = Math.sin(elapsed*0.18 + ph) * 0.02;
      }
    });
    skyMesh.rotation.y = elapsed*0.004;
  }

  



  {
    const originGate = gates[1];
    if(originGate && originGate.ring && originGate.ring.userData.setMorph){
      originGate.ring.userData.setMorph(veinMorphT);
    }
  }

  


  const introGate = gates[0];
  if(introGate){
    if(introGate.agentImgPlane) projectLabel(els.labelAgent, introGate.agentImgPlane, -8);
    if(introGate.orbImgPlane) projectLabel(els.labelServices, introGate.orbImgPlane, -4);
  }

  if(!contextLost){
    if(composer){
      















      try{
        const heroT = THREE.MathUtils.smoothstep(chapterFloat, 0.35, 0.85);
        bloomPass.strength = 0.55 * heroT;
        fxPass.uniforms.uAberration.value = speedFactor * heroT;
        


        fxPass.uniforms.uGrain.value = (0.035 + speedFactor * 0.05) * heroT;
        fxPass.uniforms.uTime.value = elapsed;
        fxPass.uniforms.uWipe.value = wipeState.v * heroT;
        fxPass.uniforms.uGradeColor.value.set(gradeColorState.r, gradeColorState.g, gradeColorState.b);
        fxPass.uniforms.uGradeAmount.value = 0.3 * heroT;
        




        const focusDist = Math.min(1, Math.abs(chapterFloat - nearestIdx) * 2);
        fxPass.uniforms.uFocusBlur.value = focusDist * 0.55 * heroT;
        composer.render();
      }catch(e){
        composer = null;
        renderer.render(scene, camera);
      }
    } else {
      renderer.render(scene, camera);
    }
  }
}













let __lastFrameAt = performance.now();
let __rafHandle = null;
function render(){
  __lastFrameAt = performance.now();
  checkResize();
  try{
    renderFrame();
  }catch(e){
    console.error('renderFrame() threw — recovering so the page can still show itself:', e);
  }finally{
    if(!pageRevealed) revealPage();
    __rafHandle = requestAnimationFrame(render);
  }
}
__rafHandle = requestAnimationFrame(render);
// Watchdog: some browsers/situations throttle or stall requestAnimationFrame
// for an embedded iframe (observed: rAF callbacks simply stop firing, even
// though the tab/iframe is visible and interactive — DevTools focus and other
// conditions have been seen to trigger this). If no rAF frame has landed in
// over 300ms, force a render directly so the canvas never goes permanently
// stale. This re-enters the normal requestAnimationFrame(render) chain each
// time, so it's a self-healing nudge rather than a parallel loop.
setInterval(function(){
  if(performance.now() - __lastFrameAt > 300){
    render();
  }
}, 250);
