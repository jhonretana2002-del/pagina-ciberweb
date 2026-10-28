'use strict';

// A local, guided assistant, like the other project chat widgets.
// Messages are rendered as text and stay in memory for this page session.
(() => {
  const launcher = document.querySelector('.chat-launcher');
  const panel = document.querySelector('#ciberweb-chat');
  const closeButton = panel.querySelector('.chat-close');
  const resetButton = panel.querySelector('.chat-reset');
  const messages = document.querySelector('#chat-messages');
  const choices = document.querySelector('#chat-choices');
  const form = document.querySelector('#chat-form');
  const input = document.querySelector('#chat-input');
  let started = false;

  const homeChoices = [
    ['servicios','¿Qué pueden crear?'],
    ['sectores','Ver mi sector'],
    ['precios','Precios y tiempos'],
    ['empezar','¿Cómo empiezo?']
  ];
  const sectorChoices = [
    ['clinicas','Clínicas'],['educacion','Centros educativos'],
    ['joyerias','Joyerías'],['veterinarias','Veterinarias'],
    ['ropa','Ropa'],['calzado','Calzado'],['deportes','Deportes']
  ];
  const replies = {
    servicios: {
      prompt:'¿Qué pueden crear para mi negocio?',
      text:'Creamos páginas con la identidad de tu marca: diseño a medida, mensajes claros, fotografía o video y una experiencia cómoda en teléfono y computadora. Podemos mostrar tus servicios, colecciones o comunidad y facilitar el siguiente paso de tus visitantes.',
      links:[['Ver qué hacemos','#servicios']],
      choices:[['sectores','Explorar mi sector'],['empezar','Quiero una página'],['precios','Consultar precios']]
    },
    sectores: {
      prompt:'Quiero explorar una página para mi sector.',
      text:'Cada negocio tiene algo distinto que hacer sentir. Tenemos conceptos para estos siete sectores. Elige el tuyo para imaginar su página.',
      links:[['Ver las experiencias','#experiencias']],
      choices:sectorChoices
    },
    precios: {
      prompt:'¿Cuánto cuesta y cuánto tarda una página?',
      text:'El precio y el plazo se definen según el alcance: secciones, contenido y funciones que necesite tu proyecto. Todavía no publicamos tarifas ni tiempos fijos. Para preparar una propuesta, cuéntanos tu tipo de negocio, qué quieres mostrar y qué acciones debería permitir tu página.',
      choices:[['empezar','Qué debo preparar'],['proceso','Conocer el proceso'],['contacto','Cómo contactar']]
    },
    proceso: {
      prompt:'¿Cómo es el proceso de trabajo?',
      text:'Lo construimos contigo en tres pasos: escuchamos qué quieres transmitir, creamos una propuesta que puedas recorrer y afinamos los detalles con tus comentarios antes de publicar.',
      links:[['Ver el proceso','#proceso']],
      choices:[['empezar','Quiero empezar'],['sectores','Ver mi sector']]
    },
    empezar: {
      prompt:'Quiero empezar mi página.',
      text:'Empieza por estas cuatro cosas: qué hace tu negocio, a quién quieres llegar, qué te gustaría que sintieran al visitarte y qué deberían poder hacer en la página. Si tienes logo, fotos, textos o referencias, también ayudarán. Podemos definir juntos lo que falte.',
      choices:[['sectores','Elegir mi sector'],['proceso','Ver cómo trabajamos'],['contacto','Contactar a Ciberweb']]
    },
    contacto: {
      prompt:'Quiero contactar al equipo de Ciberweb.',
      text:'Estamos preparando nuestros enlaces de WhatsApp y correo. Los botones de contacto ya están en la página y se activarán cuando estén disponibles. Por ahora puedes explorar los conceptos y preparar la idea de tu proyecto; este chat no envía una solicitud al equipo.',
      links:[['Ver opciones de contacto','#contacto']],
      choices:[['empezar','Preparar mi idea'],['sectores','Explorar conceptos']]
    },
    funciones: {
      prompt:'¿Se pueden añadir funciones a mi página?',
      text:'Podemos valorar funciones como catálogo, consultas por citas, admisiones, inscripciones o una tienda según el proyecto. El alcance y las integraciones se definen contigo. Los ejemplos de esta página muestran posibilidades de diseño.',
      choices:[['sectores','Ver ideas para mi sector'],['precios','Cómo se define el precio'],['empezar','Preparar mi proyecto']]
    },
    asistente: {
      prompt:'¿Cómo funciona este asistente?',
      text:'Soy un asistente automático con respuestas preparadas sobre Ciberweb. Puedo orientarte sobre servicios, conceptos, proceso y cómo preparar tu proyecto. Puedes escribir una pregunta o elegir una opción.',
      choices:homeChoices
    },
    saludo: {
      text:'¡Hola! Qué gusto que estés por aquí. ¿Qué te gustaría crear? Puedo ayudarte a explorar una página para tu negocio o explicarte cómo trabajamos.',
      choices:homeChoices
    },
    gracias: {
      text:'¡Con gusto! Tu idea puede ser el inicio de algo muy tuyo. Si quieres, seguimos explorando lo que podríamos crear.',
      choices:homeChoices
    },
    otro: {
      text:'No encontré una respuesta preparada para esa consulta. Puedo orientarte sobre servicios de Ciberweb, los siete sectores, precios, proceso y cómo empezar. Elige una opción o prueba con una pregunta más concreta.',
      choices:homeChoices
    }
  };

  function scrollToLatest() { messages.scrollTop = messages.scrollHeight; }
  function addMessage(text, role) {
    const bubble = document.createElement('p');
    bubble.className = 'chat-message chat-message-' + role;
    const label = document.createElement('span');
    label.className = 'visually-hidden';
    label.textContent = role === 'user' ? 'Tú: ' : 'Asistente Ciberweb: ';
    bubble.append(label,document.createTextNode(text));
    messages.append(bubble);
    while(messages.children.length > 60) messages.firstElementChild.remove();
    scrollToLatest();
  }
  function showChoices(items) {
    choices.replaceChildren(...items.map(([topic,label]) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.topic = topic;
      button.textContent = label;
      return button;
    }));
  }
  function addLinks(links) {
    if(!links?.length) return;
    const row = document.createElement('div');
    row.className = 'chat-links';
    links.forEach(([label,href]) => {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = label + ' ↗';
      link.addEventListener('click',() => closeChat(false));
      row.append(link);
    });
    messages.append(row);
    scrollToLatest();
  }
  function sectorReply(key) {
    const concept = concepts[key];
    const sectorName = sectorChoices.find(([topic]) => topic === key)[1];
    return {
      prompt:'Quiero una página para ' + sectorName.toLocaleLowerCase('es') + '.',
      text:concept.title + ' ' + concept.description + '\n\nPodríamos incluir:\n• ' + concept.features.join('\n• '),
      links:[['Ver los conceptos',key === 'deportes' || key === 'clinicas' || key === 'educacion' ? '#experiencias' : '#sectores']],
      choices:[['empezar','Empezar mi proyecto'],['sectores','Ver otro sector'],['precios','Consultar precios']]
    };
  }
  function answer(topic, writtenText) {
    const reply = sectorChoices.some(([key]) => key === topic) ? sectorReply(topic) : replies[topic] || replies.otro;
    if(writtenText || reply.prompt) addMessage(writtenText || reply.prompt,'user');
    addMessage(reply.text,'bot');
    addLinks(reply.links);
    showChoices(reply.choices || homeChoices);
  }
  function greet() {
    messages.replaceChildren();
    addMessage('¡Hola! Soy el asistente de Ciberweb. Te ayudo a imaginar tu próxima página y a conocer nuestros servicios. ¿Por dónde empezamos?','bot');
    showChoices(homeChoices);
    started = true;
  }
  function openChat() {
    if(!started) greet();
    panel.hidden = false;
    launcher.setAttribute('aria-expanded','true');
    launcher.setAttribute('aria-label','Cerrar chatbot de Ciberweb');
    closeButton.focus();
    scrollToLatest();
  }
  function closeChat(restoreFocus = true) {
    panel.hidden = true;
    launcher.setAttribute('aria-expanded','false');
    launcher.setAttribute('aria-label','Abrir chatbot de Ciberweb');
    if(restoreFocus) launcher.focus();
  }
  function classify(text) {
    const value = text.toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    if(/whats|correo|email|contact|telefono|llamar|hablar con|persona|asesor/.test(value)) return 'contacto';
    if(/precio|cuesta|costo|coste|tarifa|presupuesto|cotiza|plazo|tarda|demora|tiempo|duracion/.test(value)) return 'precios';
    if(/veterin|mascota|perro|gato/.test(value)) return 'veterinarias';
    if(/clinic|hospital|dent|medic|salud/.test(value)) return 'clinicas';
    if(/educ|escuela|colegio|institut|universid|estudian/.test(value)) return 'educacion';
    if(/joyer|joya|anillo|diamant|\boro\b|\bplata\b/.test(value)) return 'joyerias';
    if(/calzado|zapato|zapat|sneaker|tenis/.test(value)) return 'calzado';
    if(/ropa|prenda|\bmoda\b|vestido|boutique/.test(value)) return 'ropa';
    if(/deport|futbol|equipo|entren|atleta|academia|gimnas/.test(value)) return 'deportes';
    if(/chatbot|asistente|inteligencia|eres.*ia|eres.*robot/.test(value)) return 'asistente';
    if(/carrito|tienda|pago|catalog|reserv|cita|inscrip|matric|integr|funcion/.test(value)) return 'funciones';
    if(/proceso|paso|trabajan|metodo|etapa/.test(value)) return 'proceso';
    if(/empez|inici|necesito|necesitan|prepar|quiero.*(web|pagina)|hacer.*pagina|crear.*(pagina|web)/.test(value)) return 'empezar';
    if(/sector|negocio|rubro/.test(value)) return 'sectores';
    if(/servici|ofrec|disen|pueden|hacen|video|foto/.test(value)) return 'servicios';
    if(/gracia|genial|perfecto/.test(value)) return 'gracias';
    if(/^(hola|buenas|buenos|hey|saludos|que tal)\b/.test(value)) return 'saludo';
    return 'otro';
  }
  launcher.addEventListener('click',() => panel.hidden ? openChat() : closeChat());
  closeButton.addEventListener('click',() => closeChat());
  resetButton.addEventListener('click',() => { greet(); resetButton.focus(); });
  document.addEventListener('keydown',event => {
    if(event.key === 'Escape' && !panel.hidden && !document.querySelector('dialog[open]')) closeChat();
  });
  choices.addEventListener('click',event => {
    const button = event.target.closest('button[data-topic]');
    if(!button) return;
    answer(button.dataset.topic);
    // The selected button has been replaced. Keep keyboard focus in the chat.
    choices.querySelector('button')?.focus({preventScroll:true});
  });
  form.addEventListener('submit',event => {
    event.preventDefault();
    const text = input.value.trim();
    if(!text) { input.focus(); return; }
    input.value = '';
    answer(classify(text),text);
    input.focus({preventScroll:true});
  });
  function fitViewport() {
    const viewport = window.visualViewport;
    if(!viewport) return;
    panel.classList.toggle('chat-compact',viewport.height < 550);
    panel.style.setProperty('--chat-visible-height',viewport.height + 'px');
    panel.style.setProperty('--chat-keyboard-offset',Math.max(0,window.innerHeight - viewport.height - viewport.offsetTop) + 'px');
  }
  window.visualViewport?.addEventListener('resize',fitViewport);
  window.visualViewport?.addEventListener('scroll',fitViewport);
  fitViewport();
})();
