(function(){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if(!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const SELECTOR = '.landscape-card, .negation-card, .model-card, .topology-table-wrapper';
  const MAX_DEG = 6;
  let current = null;
  function setTilt(el, rotX, rotY){
    el.style.setProperty('--tilt-x', rotX.toFixed(2) + 'deg');
    el.style.setProperty('--tilt-y', rotY.toFixed(2) + 'deg');
  }
  function clearTilt(el){
    if(!el) return;
    el.style.setProperty('--tilt-x', '0deg');
    el.style.setProperty('--tilt-y', '0deg');
  }
  document.addEventListener('pointermove', (e) => {
    const el = e.target.closest(SELECTOR);
    if(el !== current){
      clearTilt(current);
      current = el;
    }
    if(!el) return;
    const r = el.getBoundingClientRect();
    if(r.width === 0 || r.height === 0) return;
    const px = (e.clientX - r.left) / r.width - 0.5;   
    const py = (e.clientY - r.top) / r.height - 0.5;
    


    setTilt(el, py * -MAX_DEG, px * MAX_DEG);
  }, { passive:true });
  document.addEventListener('pointerleave', () => { clearTilt(current); current = null; }, { passive:true });
  window.addEventListener('blur', () => { clearTilt(current); current = null; });
})();
</script>
