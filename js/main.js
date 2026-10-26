/* ==========================================================================
   SINERGIA EN TEXTILES — main.js
   JavaScript nativo · cero dependencias · progresivo
   ========================================================================== */
(function () {
  'use strict';

  document.documentElement.classList.remove('no-js');

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------- Header */
  var header = document.getElementById('site-header');
  if (header) {
    var ticking = false;
    var onScroll = function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        header.classList.toggle('is-scrolled', window.scrollY > 24);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ------------------------------------------------------- Menú móvil */
  var toggle = document.querySelector('.nav-toggle');
  var panel = document.getElementById('nav-panel');

  if (toggle && panel) {
    var setMenu = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      panel.classList.toggle('is-open', open);
      document.body.classList.toggle('nav-open', open);
    };

    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });

    panel.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });

    // Al pasar a escritorio, el panel se oculta por CSS; normalizamos el estado.
    var desktop = window.matchMedia('(min-width: 900px)');
    var syncMenu = function (e) { if (e.matches) setMenu(false); };
    if (desktop.addEventListener) desktop.addEventListener('change', syncMenu);
    else if (desktop.addListener) desktop.addListener(syncMenu);
  }

  /* --------------------------------------------- Reveal on scroll (suave) */
  var revealables = document.querySelectorAll('.reveal');

  if (prefersReduced || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(revealables, function (el) {
      el.classList.add('is-visible');
    });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    Array.prototype.forEach.call(revealables, function (el) { io.observe(el); });
  }

  /* --------------------------------- Hero: micro partículas del logotipo
     Se generan en JS para no ensuciar el markup. Si no hay JS (o el usuario
     prefiere movimiento reducido) el hero queda limpio, sin partículas.     */
  var particleHost = document.querySelector('.hero__particles');
  if (particleHost && !prefersReduced) {
    var pCount = parseInt(particleHost.getAttribute('data-particles'), 10) || 26;
    var pFrag = document.createDocumentFragment();
    for (var i = 0; i < pCount; i++) {
      var dot = document.createElement('span');
      dot.className = 'hero__particle' + (i % 3 === 0 ? ' hero__particle--teal' : '');
      dot.style.left = (Math.random() * 100).toFixed(2) + '%';
      dot.style.top = (Math.random() * 100).toFixed(2) + '%';
      dot.style.setProperty('--p-size', (1.4 + Math.random() * 2.2).toFixed(2) + 'px');
      dot.style.setProperty('--p-dur', (11 + Math.random() * 15).toFixed(1) + 's');
      dot.style.setProperty('--p-delay', (-Math.random() * 24).toFixed(1) + 's');
      dot.style.setProperty('--p-drift', (Math.random() * 70 - 35).toFixed(0) + 'px');
      pFrag.appendChild(dot);
    }
    particleHost.appendChild(pFrag);
  }

  /* ------------------------------------------------- Formulario de contacto */
  var form = document.getElementById('contact-form');
  if (form) {
    var status = document.getElementById('form-status');
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        if (status) status.textContent = 'Revisa los campos obligatorios.';
        return;
      }

      var btn = form.querySelector('button[type="submit"]');
      if (btn) btn.disabled = true;
      if (status) status.textContent = 'Enviando…';

      // Prototipo: aquí se conecta el endpoint real (Formspree / API propia).
      window.setTimeout(function () {
        if (status) {
          status.textContent =
            'Gracias. Hemos recibido tu solicitud y te contactaremos en menos de 24 h hábiles.';
        }
        form.reset();
        if (btn) btn.disabled = false;
      }, 700);
    });
  }

  /* ------------------------------------------------------------- Año actual */
  Array.prototype.forEach.call(document.querySelectorAll('[data-year]'), function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* =========================================================
     EFECTOS PREMIUM (solo se activan si el markup los pide)
     ========================================================= */
  var canTranslate = 'translate' in document.documentElement.style;

  /* --- Barra de progreso de scroll --- */
  var progress = document.querySelector('.scroll-progress');

  /* --- Parallax: [data-speed] se desplaza con el scroll ---
     Se desactiva en táctil y en prefers-reduced-motion: en móvil aporta poco
     y obliga a forzar reflow en cada frame de scroll. */
  var parallaxOn =
    canTranslate &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
    !window.matchMedia('(pointer: coarse)').matches;
  var parallaxEls = parallaxOn ? document.querySelectorAll('[data-speed]') : [];

  var tick = function () {
    var vh = window.innerHeight;
    var i;
    var rects = [];
    var el;
    var r;
    var speed;
    var offset;

    /* 1) LECTURAS primero: así una sola medición de layout por frame */
    if (parallaxEls.length) {
      for (i = 0; i < parallaxEls.length; i++) {
        rects[i] = parallaxEls[i].getBoundingClientRect();
      }
    }

    /* 2) ESCRITURAS después: sin reflow forzado entre medición y pintura */
    if (progress) {
      var doc = document.documentElement;
      var max = doc.scrollHeight - vh;
      var p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      progress.style.transform = 'scaleX(' + p.toFixed(4) + ')';
    }

    for (i = 0; i < rects.length; i++) {
      r = rects[i];
      if (r.bottom < -200 || r.top > vh + 200) continue;
      el = parallaxEls[i];
      speed = parseFloat(el.getAttribute('data-speed')) || 0.1;
      offset = (r.top + r.height / 2 - vh / 2) * speed;
      el.style.translate = '0 ' + offset.toFixed(1) + 'px';
    }

    tickingFx = false;
  };

  var tickingFx = false;
  var onFxScroll = function () {
    if (tickingFx) return;
    tickingFx = true;
    window.requestAnimationFrame(tick);
  };

  if (progress || parallaxEls.length) {
    tick();
    window.addEventListener('scroll', onFxScroll, { passive: true });
    window.addEventListener('resize', onFxScroll, { passive: true });
  }

  /* --- Tilt 3D bajo el cursor: [data-tilt] --- */
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    Array.prototype.forEach.call(document.querySelectorAll('[data-tilt]'), function (el) {
      var max = parseFloat(el.getAttribute('data-tilt')) || 10;
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty('--ry', (px * max).toFixed(2) + 'deg');
        el.style.setProperty('--rx', (-py * max).toFixed(2) + 'deg');
      });
      var reset = function () {
        el.style.setProperty('--rx', '0deg');
        el.style.setProperty('--ry', '0deg');
      };
      el.addEventListener('pointerleave', reset);
      el.addEventListener('pointercancel', reset);
    });

    /* --- Botones magnéticos: [data-magnetic] --- */
    if (canTranslate) {
      Array.prototype.forEach.call(document.querySelectorAll('[data-magnetic]'), function (el) {
        var power = parseFloat(el.getAttribute('data-magnetic')) || 0.28;
        el.addEventListener('pointermove', function (e) {
          var r = el.getBoundingClientRect();
          var dx = (e.clientX - (r.left + r.width / 2)) * power;
          var dy = (e.clientY - (r.top + r.height / 2)) * power;
          el.style.translate = dx.toFixed(1) + 'px ' + dy.toFixed(1) + 'px';
        });
        var off = function () { el.style.translate = '0 0'; };
        el.addEventListener('pointerleave', off);
        el.addEventListener('pointercancel', off);
      });
    }
  }

  /* ================================================ LIGHTBOX DE ZOOM == */
  /* Clic en una foto -> se abre en grande, con zoom (clic/rueda/pellizco),
     desplazamiento, prev/contador/siguiente, teclado y CTA al detalle.   */
  var ZOOMABLE = '.card__media, .cat__media, .split__media, .gallery__item';
  var zoomables = Array.prototype.slice.call(document.querySelectorAll(ZOOMABLE));

  if (zoomables.length) {
    var ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" ' +
               'stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/>' +
               '<path d="M20 20l-4-4M11 8v6M8 11h6"/></svg>';

    var lb = document.createElement('div');
    lb.className = 'lb';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Fotografía ampliada');
    lb.setAttribute('aria-hidden', 'true');
    lb.innerHTML =
      '<div class="lb__stage"><img class="lb__img" alt=""></div>' +
      '<div class="lb__bar">' +
        '<p class="lb__caption"></p>' +
        '<div class="lb__meta">' +
          '<p class="lb__hint">Clic: ampliar · Rueda: acercar · Arrastrar: mover</p>' +
          '<p class="lb__count" aria-live="polite"></p>' +
          '<a class="lb__cta" hidden>Ver detalle <span aria-hidden="true">&rarr;</span></a>' +
        '</div>' +
      '</div>' +
      '<button class="lb__btn lb__btn--close" type="button" aria-label="Cerrar la vista ampliada">&#10005;</button>' +
      '<button class="lb__btn lb__btn--prev" type="button" aria-label="Fotograf\u00eda anterior">&#8249;</button>' +
      '<button class="lb__btn lb__btn--next" type="button" aria-label="Fotograf\u00eda siguiente">&#8250;</button>';
    document.body.appendChild(lb);

    var stage = lb.querySelector('.lb__stage');
    var lbImg = lb.querySelector('.lb__img');
    var lbCap = lb.querySelector('.lb__caption');
    var lbNum = lb.querySelector('.lb__count');
    var lbCta = lb.querySelector('.lb__cta');
    var lbClose = lb.querySelector('.lb__btn--close');
    var lbPrev = lb.querySelector('.lb__btn--prev');
    var lbNext = lb.querySelector('.lb__btn--next');

    var lbIndex = 0, lbOpen = false, lastFocus = null, suppressClick = false;
    var MIN_S = 1, MAX_S = 4.5, scale = 1, ox = 0, oy = 0;

    var imgOf = function (i) { return zoomables[i].querySelector('img'); };
    var srcOf = function (i) { var im = imgOf(i); return im ? (im.currentSrc || im.src) : ''; };
    var altOf = function (i) { var im = imgOf(i); return (im && im.alt) ? im.alt : ''; };
    var linkElOf = function (i) {
      var box = zoomables[i];
      var own = box.closest ? box.closest('a[href]') : null;
      if (own) return own;
      var parent = box.parentElement;
      return (parent && parent.querySelector('a[href]')) || null;
    };
    var linkLabel = function (i) {
      var a = linkElOf(i);
      if (!a) return 'Ver detalle';
      var sr = a.querySelector('.sr-only');
      var head = a.querySelector('h3, h2');
      if (sr && sr.textContent.trim()) return sr.textContent.trim();
      if (head && head.textContent.trim()) return 'Ver ' + head.textContent.trim();
      var plain = (a.textContent || '').replace(/\s+/g, ' ').trim();
      return plain || 'Ver detalle';
    };

    var clampPan = function () {
      if (scale <= 1.01) { ox = 0; oy = 0; return; }
      var r = stage.getBoundingClientRect();
      var maxX = Math.max(0, (lbImg.offsetWidth * scale - r.width) / 2);
      var maxY = Math.max(0, (lbImg.offsetHeight * scale - r.height) / 2);
      ox = Math.max(-maxX, Math.min(maxX, ox));
      oy = Math.max(-maxY, Math.min(maxY, oy));
    };
    var applyZoom = function () {
      lbImg.style.setProperty('--lb-scale', scale.toFixed(3));
      lbImg.style.setProperty('--lb-x', ox.toFixed(1) + 'px');
      lbImg.style.setProperty('--lb-y', oy.toFixed(1) + 'px');
      lb.classList.toggle('is-zoomed', scale > 1.01);
    };
    var resetZoom = function () { scale = 1; ox = 0; oy = 0; applyZoom(); };
    /* Anclado al puntero: mantiene bajo el cursor el punto ampliado */
    var zoomAt = function (px, py, next) {
      var s2 = Math.max(MIN_S, Math.min(MAX_S, next));
      var k = 1 - s2 / scale;
      ox += k * (px - ox);
      oy += k * (py - oy);
      scale = s2;
      if (scale <= 1.01) { scale = 1; ox = 0; oy = 0; }
      clampPan(); applyZoom();
    };
    var localPoint = function (e) {
      var r = stage.getBoundingClientRect();
      return { x: e.clientX - (r.left + r.width / 2), y: e.clientY - (r.top + r.height / 2) };
    };

    var render = function () {
      lbImg.src = srcOf(lbIndex);
      lbImg.alt = altOf(lbIndex);
      lbCap.textContent = altOf(lbIndex);
      lbNum.textContent = (lbIndex + 1) + ' / ' + zoomables.length;
      var linkEl = linkElOf(lbIndex);
      if (linkEl && linkEl.href) {
        lbCta.href = linkEl.href;
        lbCta.firstChild.nodeValue = linkLabel(lbIndex) + ' ';
        lbCta.hidden = false;
      } else {
        lbCta.removeAttribute('href');
        lbCta.hidden = true;
      }
      resetZoom();
      // Precarga de vecinas para navegar sin parpadeo
      [lbIndex + 1, lbIndex - 1].forEach(function (n) {
        var w = (n + zoomables.length) % zoomables.length;
        var s = srcOf(w);
        if (s) { var pre = new Image(); pre.src = s; }
      });
    };

    var openLb = function (i) {
      lbIndex = i;
      /* A dónde volver el foco al cerrar: al mismo elemento que lo abrió */
      var box = zoomables[i];
      var act = document.activeElement;
      var anchor = box.closest('a[href]');
      if (!anchor) {
        var parent = box.parentElement;
        anchor = parent && parent.querySelector('a[href]');
      }
      lastFocus = (act && act !== document.body && box.contains(act)) ? act : (anchor || act);
      suppressClick = false;
      render();
      lb.classList.add('is-open');
      lb.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      lbOpen = true;
      lbClose.focus();
    };
    var closeLb = function () {
      lb.classList.remove('is-open');
      lb.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      lbOpen = false;
      resetZoom();
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    };
    var go = function (step) {
      lbIndex = (lbIndex + step + zoomables.length) % zoomables.length;
      render();
    };

    /* --- Insignias + clic en cada foto --- */
    zoomables.forEach(function (box, i) {
      box.classList.add('is-zoomable');
      var hint = document.createElement('span');
      hint.className = 'zoom-hint';
      hint.setAttribute('aria-hidden', 'true');
      hint.innerHTML = ICON;
      box.appendChild(hint);

      /* Fotos que ya forman parte de un enlace (categorías): no se tocan.
         Las demás se vuelven activables también con teclado. */
      if (!box.closest('a[href]')) {
        var im = box.querySelector('img');
        var cap = box.querySelector('figcaption');
        /* El nombre accesible debe contener todo el texto visible (pie incluido) */
        var text = ((im && im.alt) || '').trim() + (cap ? ' ' + cap.textContent.trim() : '');
        box.setAttribute('tabindex', '0');
        box.setAttribute('role', 'button');
        box.setAttribute('aria-label', 'Ver en grande: ' + (text || 'fotografía'));
        box.addEventListener('keydown', function (e) {
          if (e.key !== 'Enter' && e.key !== ' ') return;
          e.preventDefault();
          openLb(i);
        });
      }

      box.addEventListener('click', function (e) {
        e.preventDefault();   // corta la navegación de tarjeta/categoría
        e.stopPropagation();
        openLb(i);
      });
    });

    /* --- Controles --- */
    lbClose.addEventListener('click', closeLb);
    lbPrev.addEventListener('click', function () { go(-1); });
    lbNext.addEventListener('click', function () { go(1); });
    stage.addEventListener('click', function (e) { if (e.target === stage) closeLb(); });

    lbImg.addEventListener('click', function (e) {
      e.stopPropagation();
      if (suppressClick) { suppressClick = false; return; }
      var p = localPoint(e);
      if (scale > 1.01) resetZoom();
      else zoomAt(p.x, p.y, 2.6);
    });

    stage.addEventListener('wheel', function (e) {
      if (!lbOpen) return;
      e.preventDefault();
      var p = localPoint(e);
      zoomAt(p.x, p.y, scale * (e.deltaY < 0 ? 1.14 : 1 / 1.14));
    }, { passive: false });

    /* --- Arrastre (pan) y pellizco --- */
    var pointers = {}, startX = 0, startY = 0, sOx = 0, sOy = 0,
        sDist = 1, sScale = 1, pinchMid = null, dragging = false, moved = 0;

    lbImg.addEventListener('pointerdown', function (e) {
      pointers[e.pointerId] = { x: e.clientX, y: e.clientY };
      var ids = Object.keys(pointers);
      moved = 0;
      try { lbImg.setPointerCapture(e.pointerId); } catch (err) {}
      if (ids.length === 1 && scale > 1.01) {
        dragging = true; lb.classList.add('is-dragging');
        startX = e.clientX; startY = e.clientY; sOx = ox; sOy = oy;
      } else if (ids.length >= 2) {
        var a = pointers[ids[0]], b = pointers[ids[1]];
        sDist = Math.hypot(a.x - b.x, a.y - b.y) || 1;
        sScale = scale; sOx = ox; sOy = oy;
        pinchMid = localPoint({ clientX: (a.x + b.x) / 2, clientY: (a.y + b.y) / 2 });
        dragging = false;
      }
    });

    lbImg.addEventListener('pointermove', function (e) {
      if (!(e.pointerId in pointers)) return;
      pointers[e.pointerId] = { x: e.clientX, y: e.clientY };
      var ids = Object.keys(pointers);
      if (ids.length >= 2 && pinchMid) {
        var a = pointers[ids[0]], b = pointers[ids[1]];
        var d = Math.hypot(a.x - b.x, a.y - b.y) || 1;
        var s2 = Math.max(MIN_S, Math.min(MAX_S, sScale * (d / sDist)));
        var k = 1 - s2 / sScale;
        scale = s2;
        ox = sOx + k * (pinchMid.x - sOx);
        oy = sOy + k * (pinchMid.y - sOy);
        clampPan(); applyZoom(); moved = 99;
      } else if (dragging) {
        ox = sOx + (e.clientX - startX);
        oy = sOy + (e.clientY - startY);
        moved = Math.max(moved, Math.abs(e.clientX - startX) + Math.abs(e.clientY - startY));
        clampPan(); applyZoom();
      }
    });

    var endPointer = function (e) {
      delete pointers[e.pointerId];
      if (Object.keys(pointers).length < 2) pinchMid = null;
      if (!Object.keys(pointers).length) {
        if (moved > 6) suppressClick = true;   // fue arrastre, no clic
        dragging = false;
        lb.classList.remove('is-dragging');
      }
    };
    lbImg.addEventListener('pointerup', endPointer);
    lbImg.addEventListener('pointercancel', endPointer);

    /* --- Teclado: cerrar, navegar, zoom, trampa de foco --- */
    document.addEventListener('keydown', function (e) {
      if (!lbOpen) return;
      if (e.key === 'Escape') { closeLb(); return; }
      if (e.key === 'ArrowRight') { go(1); return; }
      if (e.key === 'ArrowLeft') { go(-1); return; }
      if (e.key === '+' || e.key === '=') { zoomAt(0, 0, scale * 1.3); return; }
      if (e.key === '-') { zoomAt(0, 0, scale / 1.3); return; }
      if (e.key === '0') { resetZoom(); return; }
      if (e.key !== 'Tab') return;
      var items = [lbClose, lbPrev, lbNext].concat(lbCta.hidden ? [] : [lbCta]);
      var first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }
})();
