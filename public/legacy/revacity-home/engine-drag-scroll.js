(function(){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var SELECTOR = '.cards-grid, .models-columns-grid';
  var dragEl = null, startX = 0, startScroll = 0;
  document.addEventListener('pointerdown', function(e){
    if(e.pointerType !== 'mouse') return;
    var el = e.target.closest(SELECTOR);
    if(!el) return;
    dragEl = el; startX = e.clientX; startScroll = el.scrollLeft;
  });
  window.addEventListener('pointermove', function(e){
    if(!dragEl || e.pointerType !== 'mouse') return;
    dragEl.scrollLeft = startScroll - (e.clientX - startX);
  });
  window.addEventListener('pointerup', function(){ dragEl = null; });
  window.addEventListener('pointercancel', function(){ dragEl = null; });
})();
</script>


