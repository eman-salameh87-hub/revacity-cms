(function(){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var heading = document.getElementById('heading');
  if(!heading) return;

  var canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;left:0;pointer-events:none;z-index:15;';
  document.body.appendChild(canvas);
  var ctx = canvas.getContext('2d');
  if(!ctx) return;

  function resize(){
    var dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener('resize', resize);
  resize();

  var particles = [];
  function burst(){
    try{
      var rect = heading.getBoundingClientRect();
      if(rect.width < 4 || rect.height < 4) return; 
      var n = 55;
      for(var i = 0; i < n; i++){
        var tx = rect.left + Math.random() * rect.width;
        var ty = rect.top + Math.random() * rect.height;
        var angle = Math.random() * Math.PI * 2;
        var dist = 50 + Math.random() * 150;
        particles.push({
          x: tx + Math.cos(angle) * dist,
          y: ty + Math.sin(angle) * dist,
          tx: tx, ty: ty,
          life: 0,
          maxLife: 0.55 + Math.random() * 0.5,
          size: 1 + Math.random() * 2.2
        });
      }
      if(particles.length > 400) particles.splice(0, particles.length - 400);
    }catch(e){  }
  }

  var lastText = '';
  try{
    var mo = new MutationObserver(function(){
      var t = heading.textContent;
      if(t !== lastText){ lastText = t; burst(); }
    });
    mo.observe(heading, { childList:true, characterData:true, subtree:true });
    lastText = heading.textContent;
  }catch(e){ /* MutationObserver unsupported — the page still works, just without this flourish */ }

  var cachedAccent = '#9db4ff', accentReadCounter = 0;
  function readAccent(){
    accentReadCounter++;
    if(accentReadCounter % 20 === 0){
      try{
        var v = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
        if(v) cachedAccent = v;
      }catch(e){  }
    }
    return cachedAccent;
  }

  var prevTime = null;
  function loop(now){
    try{
      if(prevTime === null) prevTime = now;
      var dt = Math.min(0.05, (now - prevTime) / 1000);
      prevTime = now;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      if(particles.length){
        var accent = readAccent();
        for(var i = particles.length - 1; i >= 0; i--){
          var p = particles[i];
          p.life += dt;
          var t = Math.min(1, p.life / p.maxLife);
          var ease = 1 - Math.pow(1 - t, 3);
          var x = p.x + (p.tx - p.x) * ease;
          var y = p.y + (p.ty - p.y) * ease;
          ctx.beginPath();
          ctx.arc(x, y, p.size * (1 - t * 0.4), 0, Math.PI * 2);
          ctx.fillStyle = accent;
          ctx.globalAlpha = (1 - t) * 0.8;
          ctx.fill();
          if(t >= 1) particles.splice(i, 1);
        }
        ctx.globalAlpha = 1;
      }
    }catch(e){  }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();
