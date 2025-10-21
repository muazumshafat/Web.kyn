
(function(){
  'use strict';
  const hamb = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');
  if(hamb && nav) hamb.addEventListener('click', ()=> nav.classList.toggle('open'));
  document.addEventListener('click', function(e){
    const a = e.target.closest('a[href^="#"]');
    if(a){
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'}); history.replaceState(null,'','#'+id); }
    }
  });
  if(window.AOS && typeof AOS.init === 'function'){
    AOS.init({duration:900, once:true, easing:'ease-out-cubic'});
  } else {
    const io = new IntersectionObserver((entries)=>{ entries.forEach(ent=>{ if(ent.isIntersecting){ ent.target.classList.add('aos-animate'); io.unobserve(ent.target); } }); }, {threshold:0.12});
    document.querySelectorAll('.reveal, [data-aos]').forEach(el=>io.observe(el));
  }
  document.addEventListener('click', function(e){
    const btn = e.target.closest('[data-filter]');
    if(!btn) return;
    const cat = btn.dataset.filter;
    document.querySelectorAll('.work-grid .card').forEach(card=>{
      const cats = (card.dataset.cat||'').split(' ');
      if(cat==='all' || cats.includes(cat)) card.style.display=''; else card.style.display='none';
    });
    document.querySelectorAll('[data-filter]').forEach(b=>b.classList.remove('active')); btn.classList.add('active');
  });
})();
