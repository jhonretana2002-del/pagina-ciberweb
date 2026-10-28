'use strict';
const toggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
function closeMenu() { toggle.setAttribute('aria-expanded','false'); mobileNav.hidden = true; }
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded',String(open));
  mobileNav.hidden = !open;
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event => {
  if (event.key === 'Escape' && !mobileNav.hidden) { closeMenu(); toggle.focus(); }
});
window.matchMedia('(min-width: 801px)').addEventListener('change',event => { if(event.matches) closeMenu(); });

const concepts = {
  deportes: {
    label:'DEPORTES / PASIÓN Y SUPERACIÓN',
    title:'Un lugar para las futuras estrellas.',
    description:'Una web que transmita la energía de tu equipo y la emoción de ser parte. Que las familias imaginen el próximo entrenamiento y los jugadores encuentren su comunidad.',
    features:['Video de entrenamientos y momentos compartidos.','Presentación de la academia, categorías y cuerpo técnico.','Horarios, encuentros y un camino claro para consultar por inscripciones.']
  },
  clinicas: {
    label:'CLÍNICAS / CONFIANZA Y TRANQUILIDAD',
    title:'Que el cuidado se sienta desde aquí.',
    description:'Una experiencia serena para conocer a tu equipo, entender tus servicios y dar el siguiente paso con confianza.',
    features:['Fotografías cercanas del equipo y los espacios.','Servicios y especialidades explicados con claridad.','Ubicación, horarios y acceso a los canales para consultar por una cita.']
  },
  educacion: {
    label:'CENTROS EDUCATIVOS / CURIOSIDAD Y PERTENENCIA',
    title:'Un primer vistazo a su futuro.',
    description:'Una página que acerque a las familias a tu comunidad y refleje cómo se aprende, se juega y se crece en tu institución.',
    features:['Vida estudiantil y espacios para aprender y compartir.','Propuesta educativa y etapas de formación.','Información de admisiones y una invitación a conocer el centro.']
  },
  joyerias: {
    label:'JOYERÍAS / RECUERDOS Y SIGNIFICADO',
    title:'Piezas que dicen algo de ti.',
    description:'Una vitrina digital donde el detalle, los materiales y la historia de cada colección tengan espacio para brillar.',
    features:['Fotografía de producto con encuadres cuidados.','Colecciones, materiales y detalles de cada pieza.','Una invitación a consultar por ese regalo o momento especial.']
  },
  veterinarias: {
    label:'VETERINARIAS / CARIÑO Y CONFIANZA',
    title:'Cuidar a quienes hacen hogar.',
    description:'Una página cálida que refleje el vínculo con cada mascota y permita conocer el cuidado que ofrece tu equipo.',
    features:['Escenas de atención cercana y trato amable.','Equipo, servicios y cuidados explicados de forma sencilla.','Horarios, ubicación y canales para consultar por una visita.']
  },
  ropa: {
    label:'ROPA / IDENTIDAD Y EXPRESIÓN',
    title:'Una marca que se lleva puesta.',
    description:'Una experiencia editorial que muestre cómo se siente tu colección y la forma de expresarse de quienes la eligen.',
    features:['Fotografía de prendas en uso y detalles de cada colección.','Categorías, tallas y guías para encontrar el estilo propio.','Un recorrido claro hacia la consulta por productos disponibles.']
  },
  calzado: {
    label:'CALZADO / MOVIMIENTO Y LIBERTAD',
    title:'Una historia en cada paso.',
    description:'Un escaparate que conecte cada modelo con la vida real: moverse, entrenar, trabajar o salir a descubrir.',
    features:['Primeros planos de materiales y calzado en movimiento.','Modelos, tallas y detalles relevantes para elegir.','Acceso sencillo a la consulta por disponibilidad y asesoría.']
  }
};
const conceptDialog = document.querySelector('#concept-dialog');
document.querySelectorAll('.concept-open').forEach(button => button.addEventListener('click',() => {
  const concept = concepts[button.dataset.concept];
  document.querySelector('#concept-label').textContent = concept.label;
  document.querySelector('#concept-title').textContent = concept.title;
  document.querySelector('#concept-description').textContent = concept.description;
  document.querySelector('#concept-features').replaceChildren(...concept.features.map(text => {
    const item = document.createElement('li'); item.textContent = text; return item;
  }));
  conceptDialog.showModal();
}));
document.querySelector('#concept-contact').addEventListener('click',() => conceptDialog.close());
document.querySelectorAll('.contact-pending').forEach(button => button.addEventListener('click',() => {
  const channel = button.dataset.channel;
  const description = !channel
    ? 'Estamos preparando nuestros canales de WhatsApp y correo. En esta vista previa puedes explorar los conceptos e imaginar lo que crearíamos para tu marca.'
    : channel === 'WhatsApp'
      ? 'Estamos preparando el enlace de WhatsApp de Ciberweb. Lo encontrarás aquí cuando esté disponible.'
      : 'Estamos preparando el perfil de Ciberweb en ' + channel + '. El enlace aparecerá aquí cuando esté disponible.';
  document.querySelector('#pending-description').textContent = description;
  document.querySelector('#contact-dialog').showModal();
}));
document.querySelector('#credits-open').addEventListener('click',() => document.querySelector('#credits-dialog').showModal());
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelectorAll('.dialog-close,.dialog-close-text').forEach(button => button.addEventListener('click',() => dialog.close()));
  dialog.addEventListener('click',event => {
    const bounds = dialog.getBoundingClientRect();
    if(event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
  });
});

// Posters remain available when autoplay is blocked or reduced motion/data
// saving is enabled. Load and play only when a video is actually in view.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const saveData = navigator.connection?.saveData;
const videos = [...document.querySelectorAll('.ambient-video')];
function buttonFor(video) { return document.querySelector('[data-video-target="' + video.id + '"]'); }
function reflectVideo(video) {
  const button = buttonFor(video);
  const playing = !video.paused;
  button.setAttribute('aria-pressed',String(playing));
  const subject = video.dataset.videoLabel || 'esta sección';
  button.setAttribute('aria-label',(playing ? 'Pausar' : 'Reproducir') + ' video de ' + subject);
  button.querySelector('.play-icon').textContent = playing ? 'Ⅱ' : '▶';
  button.querySelector('.video-label').textContent = playing ? 'Pausar video' : 'Reproducir video';
}
function loadVideo(video) {
  if(!video.getAttribute('src')) { video.src = video.dataset.videoSrc; video.load(); }
}
async function startVideo(video) {
  if (!video.paused || video.dataset.starting === 'true') return;
  video.dataset.starting = 'true';
  loadVideo(video);
  try { await video.play(); } catch { reflectVideo(video); }
  finally { video.dataset.starting = 'false'; }
}
function syncPlayback() {
  const midpoint = window.innerHeight / 2;
  const active = videos.filter(video => video.dataset.inView === 'true').sort((a,b) => {
    const aRect = a.getBoundingClientRect();
    const bRect = b.getBoundingClientRect();
    return Math.abs(aRect.top + aRect.height / 2 - midpoint) - Math.abs(bRect.top + bRect.height / 2 - midpoint);
  })[0];
  videos.forEach(video => {
    const allowed = video === active && !document.hidden && video.dataset.userPaused !== 'true' &&
      ((!reduceMotion.matches && !saveData) || video.dataset.manualPlay === 'true');
    if (allowed) startVideo(video);
    else video.pause();
  });
}
videos.forEach(video => {
  video.addEventListener('play',() => reflectVideo(video));
  video.addEventListener('pause',() => reflectVideo(video));
  buttonFor(video).addEventListener('click',() => {
    if(video.paused) { video.dataset.userPaused = 'false'; video.dataset.manualPlay = 'true'; videos.filter(other => other !== video).forEach(other => other.pause()); startVideo(video); }
    else { video.dataset.userPaused = 'true'; video.dataset.manualPlay = 'false'; video.pause(); }
  });
});
const observer = new IntersectionObserver(entries => {
  entries.forEach(({target:video,intersectionRatio}) => {
    video.dataset.inView = String(intersectionRatio >= .12);
  });
  syncPlayback();
},{threshold:[.12,.5]});
videos.forEach(video => observer.observe(video));
document.addEventListener('visibilitychange',syncPlayback);
reduceMotion.addEventListener('change',syncPlayback);
document.querySelector('#year').textContent = new Date().getFullYear();
