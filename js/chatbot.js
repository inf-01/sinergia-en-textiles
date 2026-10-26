(function () {
  'use strict';

  /* ═══════════════════════════════════════════════════════════════
     BASE DE CONOCIMIENTO
  ═══════════════════════════════════════════════════════════════ */
  var KB = [
    {
      id: 'servicios',
      label: 'Servicios que ofrecen',
      keywords: ['servicio', 'ofrecen', 'hacen', 'trabajan', 'productos', 'lineas', 'líneas', 'que tienen'],
      reply: 'Contamos con <strong>cuatro líneas de trabajo</strong>:<br><br>' +
             '🔹 <strong>Uniformes corporativos</strong> — camisas, pantalones y conjuntos de vestir<br>' +
             '🔹 <strong>Bordados de precisión</strong> — logotipos con hilo de alta tenacidad<br>' +
             '🔹 <strong>Merch personalizado</strong> — gorras, camisetas, bucket hats y más<br>' +
             '🔹 <strong>Artículos promocionales</strong> — tote bags, tazas, loncheras y más<br><br>' +
             'Todo producido bajo el mismo techo, <strong>sin intermediarios</strong>.',
      followups: ['tecnicas', 'uniformes', 'merch', 'cotizar']
    },
    {
      id: 'tecnicas',
      label: 'Técnicas de personalización',
      keywords: ['tecnica', 'técnica', 'personaliz', 'bordado', 'serigrafia', 'serigrafía', 'dtf', 'metodo', 'método', 'impresion', 'impresión', 'estampad'],
      reply: 'Manejamos <strong>3 técnicas de personalización</strong>:<br><br>' +
             '✦ <strong>Bordado</strong> — Alta durabilidad, permanece lavado tras lavado. Ideal para uniformes corporativos.<br>' +
             '✦ <strong>Serigrafía</strong> — Colores vibrantes para grandes volúmenes.<br>' +
             '✦ <strong>DTF</strong> — Transferencia digital de alta resolución, ideal para diseños complejos y multicolor.<br><br>' +
             'Seleccionamos la técnica ideal según su prenda, uso y volumen de producción.',
      followups: ['uniformes', 'cotizar', 'asesor']
    },
    {
      id: 'uniformes',
      label: 'Uniformes corporativos',
      keywords: ['uniform', 'camisa', 'pantalon', 'pantalón', 'vestir', 'corporativ', 'polo', 'jacket', 'chaqueta', 'cocina', 'reflectiv', 'escolar', 'combinada', 'conjunto'],
      reply: 'Nuestra línea de <strong>Uniformes Corporativos</strong> incluye:<br><br>' +
             '👔 Camisas de vestir — manga corta y larga<br>' +
             '👕 Polos y camisetas de punto de alta resistencia<br>' +
             '🧥 Jackets, cortavientos y chaquetas de nylon<br>' +
             '👨‍🍳 Uniformes de cocina y operación<br>' +
             '🦺 Camisas con cinta reflectiva para seguridad<br>' +
             '🎓 Uniformes escolares por grado y talla<br>' +
             '🎨 Camisas combinadas en dos tonos<br><br>' +
             'Todos personalizables con su logotipo en bordado, DTF o serigrafía.',
      followups: ['tecnicas', 'cotizar', 'asesor']
    },
    {
      id: 'merch',
      label: 'Merch y artículos',
      keywords: ['merch', 'gorra', 'tote', 'bolso', 'mochila', 'taza', 'lonchera', 'articul', 'promocional', 'bucket', 'sombrero', 'washed', 'vintage', 'giger'],
      reply: 'En nuestra línea de <strong>Merch y Artículos Promocionales</strong>:<br><br>' +
             '🧢 Gorras bordadas y DTF (clásicas y washed vintage)<br>' +
             '🪣 Bucket hats personalizados para eventos y campañas<br>' +
             '👜 Tote bags y loncheras con su marca<br>' +
             '☕ Tazas y artículos de sublimación<br>' +
             '👕 Camisas washed vintage — línea <strong>Giger Club</strong><br><br>' +
             'Ideal para kits corporativos, eventos y campañas de marca.',
      followups: ['cotizar', 'asesor']
    },
    {
      id: 'ubicacion',
      label: '¿Dónde están ubicados?',
      keywords: ['ubic', 'donde', 'dónde', 'direcci', 'local', 'tienda', 'lugar', 'guadalup', 'costa rica', 'cr', 'visitar', 'showroom'],
      reply: 'Estamos ubicados en <strong>Guadalupe, Costa Rica</strong>.<br><br>' +
             '📍 100 este y 100 norte del Palí de Novacentro<br>' +
             '📞 <strong>(+506) 6053-6545</strong><br>' +
             '✉️ sinergiaentextiles@gmail.com<br>' +
             '💬 <a href="https://wa.me/50660536545" target="_blank" rel="noopener" class="chat-link">WhatsApp directo →</a><br><br>' +
             'Contamos con un <strong>showroom</strong> con catálogo completo en exposición. ¡Le esperamos!',
      followups: ['cotizar', 'asesor']
    },
    {
      id: 'cotizar',
      label: 'Cotizar un proyecto',
      keywords: ['cotiz', 'precio', 'costo', 'cuanto', 'cuánto', 'presupuest', 'valor', 'tarifa', 'quote', 'pedido', 'orden'],
      reply: 'Para preparar su cotización necesitamos:<br><br>' +
             '📋 Tipo de prenda o artículo deseado<br>' +
             '📦 Cantidad estimada del pedido<br>' +
             '🎨 Técnica de personalización deseada<br>' +
             '📅 Fecha objetivo de entrega<br><br>' +
             'Puede enviarnos esta información por <strong>WhatsApp al (+506) 6053-6545</strong> o escribirnos a <strong>sinergiaentextiles@gmail.com</strong> y le respondemos con una propuesta personalizada.',
      followups: ['asesor']
    },
    {
      id: 'empresa',
      label: 'Sobre Sinergia en Textiles',
      keywords: ['empresa', 'quienes', 'quiénes', 'historia', 'cuando', 'cuándo', 'fundaci', 'años', 'experiencia', 'nosotros', '2013', 'quien', 'quién'],
      reply: '<strong>Sinergia en Textiles</strong> es una empresa costarricense fundada en <strong>2013</strong>, especializada en producción y personalización textil B2B.<br><br>' +
             '🏭 Producción 100% nacional, desde Costa Rica<br>' +
             '🎯 Enfoque corporativo B2B<br>' +
             '✅ Más de 10 años de experiencia<br>' +
             '🔧 Diseño, personalización y control de calidad bajo un mismo techo<br><br>' +
             'Trabajamos con empresas, escuelas, restaurantes y marcas que cuidan cada detalle de su imagen.',
      followups: ['servicios', 'cotizar', 'asesor']
    },
    {
      id: 'sastreria',
      label: 'Servicios de sastrería',
      keywords: ['sastreria', 'sastrería sastre', 'confeccion', 'confección', 'medida', 'arreglo', 'ajuste', 'terno', 'traje'],
      reply: 'Ofrecemos <strong>Servicios de Sastrería</strong>:<br><br>' +
             '📐 Confección a medida de camisas, pantalones y chaquetas<br>' +
             '✂️ Ajustes y arreglos de prendas de vestir<br>' +
             '📏 Toma de medidas y prueba previa a la entrega<br><br>' +
             'Es nuestro servicio especial de mayor precisión. Contáctenos para coordinar una cita.',
      followups: ['cotizar', 'asesor']
    },
    {
      id: 'asesor',
      label: 'Hablar con un asesor',
      keywords: ['asesor', 'humano', 'persona', 'hablar', 'contactar', 'llamar', 'whatsapp', 'comunicar', 'agente', 'representante', 'ayuda'],
      reply: '¡Con gusto! Un asesor de <strong>Sinergia en Textiles</strong> se pondrá en contacto con usted a la brevedad para conocer los detalles de su proyecto y presentarle una propuesta completamente personalizada.<br><br>' +
             'Si desea contactarnos de inmediato:<br>' +
             '📞 <strong>(+506) 6053-6545</strong><br>' +
             '💬 <a href="https://wa.me/50660536545" target="_blank" rel="noopener" class="chat-link">WhatsApp directo →</a><br>' +
             '✉️ sinergiaentextiles@gmail.com<br><br>' +
             '<em>¡Gracias por su interés en Sinergia en Textiles! 🙏</em>',
      followups: [],
      isEnd: true
    }
  ];

  var GREETING = '¡Hola! 👋 Soy el asistente virtual de <strong>Sinergia en Textiles</strong>.<br>' +
                 'Estoy aquí para responder sus consultas sobre nuestros servicios y productos.<br><br>' +
                 '¿En qué le puedo ayudar hoy?';

  var INITIAL_QR = ['servicios', 'tecnicas', 'ubicacion', 'cotizar', 'empresa'];

  var FALLBACK = 'Gracias por su mensaje. Para atenderle de la mejor manera posible, ' +
                 'un asesor de <strong>Sinergia en Textiles</strong> se pondrá en contacto ' +
                 'con usted a la brevedad.<br><br>' +
                 '📞 <strong>(+506) 6053-6545</strong><br>' +
                 '💬 <a href="https://wa.me/50660536545" target="_blank" rel="noopener" class="chat-link">WhatsApp directo →</a>';

  /* ═══════════════════════════════════════════════════════════════
     DOM
  ═══════════════════════════════════════════════════════════════ */
  var widget   = document.getElementById('chat-widget');
  var toggle   = document.getElementById('chat-toggle');
  var panel    = document.getElementById('chat-panel');
  var closeBtn = document.getElementById('chat-close');
  var messages = document.getElementById('chat-messages');
  var quickEl  = document.getElementById('chat-quick');
  var input    = document.getElementById('chat-input');
  var sendBtn  = document.getElementById('chat-send');
  var badge    = document.getElementById('chat-badge');

  if (!widget) return; // Salida segura si el widget no existe en la página

  var isOpen    = false;
  var hasGreeted = false;

  /* ═══════════════════════════════════════════════════════════════
     ABRIR / CERRAR
  ═══════════════════════════════════════════════════════════════ */
  function openChat() {
    isOpen = true;
    panel.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    if (badge) badge.style.display = 'none';
    input.focus();
    if (!hasGreeted) {
      hasGreeted = true;
      setTimeout(function () {
        addBotMsg(GREETING);
        setTimeout(function () { showQR(INITIAL_QR); }, 650);
      }, 380);
    }
  }

  function closeChat() {
    isOpen = false;
    panel.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', function () { isOpen ? closeChat() : openChat(); });
  closeBtn.addEventListener('click', closeChat);

  /* ═══════════════════════════════════════════════════════════════
     MENSAJES
  ═══════════════════════════════════════════════════════════════ */
  function addBotMsg(html) {
    var wrap = document.createElement('div');
    wrap.className = 'chat-msg chat-msg--bot';
    wrap.innerHTML =
      '<span class="chat-msg__avatar" aria-hidden="true">S</span>' +
      '<div class="chat-msg__bubble">' + html + '</div>';
    messages.appendChild(wrap);
    scrollBottom();
    requestAnimationFrame(function () { wrap.classList.add('is-visible'); });
  }

  function addUserMsg(text) {
    var wrap = document.createElement('div');
    wrap.className = 'chat-msg chat-msg--user';
    wrap.innerHTML = '<div class="chat-msg__bubble">' + escHtml(text) + '</div>';
    messages.appendChild(wrap);
    scrollBottom();
    requestAnimationFrame(function () { wrap.classList.add('is-visible'); });
  }

  function showTyping() {
    removeTyping();
    var el = document.createElement('div');
    el.className = 'chat-msg chat-msg--bot chat-typing';
    el.id = 'chat-typing';
    el.innerHTML =
      '<span class="chat-msg__avatar" aria-hidden="true">S</span>' +
      '<div class="chat-msg__bubble"><span class="chat-dots">' +
      '<span></span><span></span><span></span></span></div>';
    messages.appendChild(el);
    scrollBottom();
    requestAnimationFrame(function () { el.classList.add('is-visible'); });
  }

  function removeTyping() {
    var el = document.getElementById('chat-typing');
    if (el) el.remove();
  }

  function scrollBottom() {
    messages.scrollTop = messages.scrollHeight;
  }

  function escHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  /* ═══════════════════════════════════════════════════════════════
     QUICK REPLIES
  ═══════════════════════════════════════════════════════════════ */
  function showQR(ids) {
    quickEl.innerHTML = '';
    var items = ids.map(function (id) {
      return KB.find(function (k) { return k.id === id; });
    }).filter(Boolean);

    items.forEach(function (item) {
      var btn = document.createElement('button');
      btn.className = 'chat-chip';
      btn.textContent = item.label;
      btn.addEventListener('click', function () { handleIntent(item); });
      quickEl.appendChild(btn);
    });
    quickEl.classList.toggle('has-chips', items.length > 0);
  }

  function clearQR() {
    quickEl.innerHTML = '';
    quickEl.classList.remove('has-chips');
  }

  /* ═══════════════════════════════════════════════════════════════
     INTENCIÓN / NLU
  ═══════════════════════════════════════════════════════════════ */
  function normalize(s) {
    return s.toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
  }

  function matchIntent(text) {
    var t = normalize(text);
    for (var i = 0; i < KB.length; i++) {
      var item = KB[i];
      for (var j = 0; j < item.keywords.length; j++) {
        if (t.indexOf(normalize(item.keywords[j])) !== -1) return item;
      }
    }
    return null;
  }

  function handleIntent(item) {
    clearQR();
    showTyping();
    var delay = 800 + Math.floor(Math.random() * 500);
    setTimeout(function () {
      removeTyping();
      addBotMsg(item.reply);
      if (item.isEnd) {
        clearQR();
      } else if (item.followups && item.followups.length) {
        setTimeout(function () { showQR(item.followups); }, 420);
      } else {
        setTimeout(function () { showQR(INITIAL_QR); }, 420);
      }
    }, delay);
  }

  /* ═══════════════════════════════════════════════════════════════
     ENVIAR MENSAJE
  ═══════════════════════════════════════════════════════════════ */
  function sendMessage() {
    var text = input.value.trim();
    if (!text) return;
    input.value = '';
    addUserMsg(text);
    clearQR();

    var intent = matchIntent(text);
    if (intent) {
      handleIntent(intent);
    } else {
      showTyping();
      setTimeout(function () {
        removeTyping();
        addBotMsg(FALLBACK);
        setTimeout(function () { showQR(INITIAL_QR); }, 500);
      }, 1000);
    }
  }

  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') sendMessage();
  });

}());
