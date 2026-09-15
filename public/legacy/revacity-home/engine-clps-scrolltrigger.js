(function(){
  if(!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  var sticky = document.querySelector('.clps-sticky'),
      dive   = document.getElementById('scrollDive'),
      rise   = document.getElementById('scrollRise'),
      dark   = document.getElementById('scrollDark'),
      clps   = document.querySelector('.clps-section'),
      trackB = document.getElementById('scrollTrackB');
  if(!sticky || !dive || !rise || !dark || !clps || !trackB) return;

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  







  var DIVE_VH = 80;
  





  var RISE_VH = 220;
  var SCRUB = reduced ? true : 0.9;

  









  var DARK_VH = 60;

  dive.style.height = DIVE_VH + 'vh';
  rise.style.height = RISE_VH + 'vh';
  dark.style.height = DARK_VH + 'vh';

  gsap.set(sticky, { autoAlpha: 0, scale: 1.04, transformOrigin: '50% 50%' });

  


  gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: { trigger: dive, start: 'top top', end: 'bottom top', scrub: SCRUB }
  })
  .fromTo(sticky,
    { autoAlpha: 0, scale: 1.04 },
    { autoAlpha: 1, scale: 1, duration: 0.40, immediateRender: false }, 0.60);

  // The ambient starfield (canvas#gl) stays visible for the ordinary
  // "orb has left, nothing else on screen yet" stretch of this dive, and
  // only fades out in sync with the collapse section's own reveal above —
  // same start point and duration as the sticky tween just above, so the
  // two crossfade together instead of the stars cutting out early.
  var glCanvas = document.getElementById('gl');
  if(glCanvas){
    gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: dive, start: 'top top', end: 'bottom top', scrub: SCRUB }
    })
    .fromTo(glCanvas,
      { autoAlpha: 1 },
      { autoAlpha: 0, duration: 0.40, immediateRender: false }, 0.60);
  }

  

  gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: { trigger: rise, start: 'top top', end: 'bottom top', scrub: SCRUB }
  })
  .fromTo(sticky,
    { autoAlpha: 1, scale: 1 },
    { autoAlpha: 0, scale: 1.04, duration: 0.23, immediateRender: false }, 0)
  



  .to({}, { duration: 0.77 }, 0.23);   

  
  



  ScrollTrigger.create({
    trigger: dive, start: 'top top',
    endTrigger: rise, end: '26% top',
    onToggle: function(self){
      document.body.classList.toggle('merge-on', self.isActive);
    }
  });

  


  ScrollTrigger.create({
    trigger: dark, start: 'top top',
    endTrigger: trackB, end: '4% top',
    onToggle: function(self){
      document.body.classList.toggle('dark-on', self.isActive);
    }
  });

  window.addEventListener('load', function(){ ScrollTrigger.refresh(); });
})();
