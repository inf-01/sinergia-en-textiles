# Sinergia en Textiles — Prototipo web

Rediseño **Quiet Luxury / Dark & Clean** del sitio de [sinergiaentextiles.com](https://www.sinergiaentextiles.com).
HTML5 semántico + CSS propio + JavaScript nativo. **Cero dependencias, cero build step**: se sube tal cual.

---

## Estructura

```
.
├── index.html                    Home: hero, 16 piezas "Productos top", propuesta de valor, local
├── uniformes.html                12 uniformes + sección #sastreria (confección y ajustes)
├── merch.html                    10 piezas de merch + bloque #giger-club (6 productos + redes)
├── bordados.html                 7 aplicaciones de bordado de alta precisión
├── articulos-personalizados.html 10 artículos (DTF, serigrafía, banderas, chonetes…)
├── nosotros.html                 Historia, sectores y método de trabajo
├── contacto.html                 Formulario de cotización + datos + redes sociales
├── css/
│   ├── styles.css                Sistema de diseño completo (tokens, componentes, responsive,
│   │                             efectos premium, lightbox y renderizado diferido)
│   └── fonts.css                 @font-face autoalojados (subset latin, font-display: swap)
├── js/
│   ├── main.js                   Header con scroll, menú móvil, reveal, formulario,
│   │                             partículas del hero, lightbox de fotos y efectos
│   │                             premium (parallax, tilt, magnético, progreso)
│   └── chatbot.js                Chat de soporte flotante (base de conocimiento
│                                 en JS + respuestas rápidas) · solo en index.html
└── assets/
    ├── Log_fondo_negro.png       Logo con fondo negro (footer, fondos #000)
    ├── Log_transparente.png      Logo sin fondo (secciones oscuras)
    ├── Log_mark.png              Isotipo original (fuente de las variantes)
    ├── Log_mark.webp             Isotipo en WebP · 6 KB (header de las 7 páginas)
    ├── favicon.png               Favicon 48×48 · 2,5 KB (antes pesaba 28 KB)
    ├── Camisa Columbia negra .png  Original entregado por el cliente (fuente de assets/img/)
    ├── fonts/                    3 woff2 (Cormorant Garamond 300/400 + itálica, Inter 300/400/500) · 122 KB
    └── img/                      48 fotografías reales del sitio original + 48 variantes ligeras
                                  (-450 / -800) para srcset · 3,8 MB en total
```

> Todas las rutas son **relativas**, por lo que funciona igual en local, en GitHub Pages
> y en cualquier dominio sin reconfigurar nada.

---

## Cómo verlo en local

```bash
# opción 1: doble clic en index.html
# opción 2 (recomendada): servidor local
python3 -m http.server 8000
# → http://localhost:8000
```

---

## Cómo subirlo a GitHub

```bash
git init
git add .
git commit -m "Sinergia en Textiles — prototipo web"
git branch -M main
git remote add origin https://github.com/<TU-USUARIO>/sinergia-en-textiles.git
git push -u origin main
```

### GitHub Pages (publicación gratis)

1. Repositorio → **Settings → Pages**.
2. *Source*: `Deploy from a branch` · *Branch*: `main` / `(root)` → **Save**.
3. En unos segundos queda publicado en
   `https://<TU-USUARIO>.github.io/sinergia-en-textiles/`.

---

## Rendimiento

### Optimizaciones de esta iteración

| Cambio | Efecto |
|---|---|
| **Fuentes autoalojadas** (`css/fonts.css` + `assets/fonts/`, subset latin) | Elimina la cadena render-blocking `fonts.googleapis.com → fonts.gstatic.com` (Lighthouse estimaba ~1,3 s en 4G). `preload` de las dos familias base |
| **`font-display: swap`** en las `@font-face` | El texto nunca aparece en blanco mientras cargan las woff2 (si no, el navegador espera ~100 ms y pinta la tipografía del sistema) y las familias del cliente se ven **siempre**, aunque la conexión sea lenta. Se descartó `optional`, que en redes lentas dejaba la tipografía de sustitución de forma permanente |
| **Entrada de los hero con `@keyframes`** | `.hero .reveal` y `.page-hero .reveal` arrancan con el CSS, sin esperar a `main.js` ni al `IntersectionObserver`: el título —elemento LCP— se pinta antes y la animación funciona aunque falle el script |
| **Variantes ligeras con `srcset`/`sizes`** (48 ficheros `-450`/`-800`, ~16 KB) | Un móvil descarga ~450 px en lugar de 900 px: el peso medido por página baja de 659 KiB a ~450 KiB |
| **`content-visibility: auto`** en `.section` (bloque 17 de `styles.css`) | Las secciones fuera del viewport no se renderizan hasta acercarse: el trabajo del hilo principal baja de ~7 s a ~4,4 s y el TBT de 1,46 s a 0,85 s (medido en emulación móvil) |
| **Parallax sin reflow forzado** (`js/main.js`) | Las posiciones se leen **antes** de escribir ninguna y el efecto se desactiva en puntero táctil y en `prefers-reduced-motion`: desaparecen los 297 ms de reflow forzado que detectaba Lighthouse |
| **Isotipo en WebP + favicon ligero** | El logo de cabecera pasa de 28 KB (PNG) a 6 KB (`Log_mark.webp`) y el favicon de 28 KB a 2,5 KB (`favicon.png` 48×48), en las 7 páginas |
| **Compresión** | HTML 45 KB → 9 KB · CSS 67 KB → 14 KB con gzip (GitHub Pages lo hace igual) |

### Resultados

Medido con **Lighthouse 13.5** (CLI) contra un servidor local **con gzip**, que
es lo que hace GitHub Pages; por tanto los números son comparables a los que
dará en producción.

- **Móvil**: emulación por defecto de Lighthouse —viewport 375 px, DPR 2,625,
  red simulada 4G (1,6 Mbps / 150 ms) y **CPU ×4**.
- **Escritorio**: preset `--preset=desktop` sin estrangulamiento.

| Página | Rend. | Acces. | Buenas prácticas | FCP | LCP | TBT | CLS | Velocidad | Peso |
|---|---|---|---|---|---|---|---|---|---|
| `index.html` | **83** | 100 | 100 | 1,2 s | 3,2 s | 400 ms | 0 | 1,7 s | 389 KiB |
| `uniformes.html` | **96** | 100 | 100 | 1,4 s | 2,2 s | 180 ms | 0 | 1,4 s | 261 KiB |
| `merch.html` | **92** | 100 | 100 | 1,4 s | 2,9 s | 180 ms | 0 | 1,4 s | 385 KiB |
| `bordados.html` | **94** | 100 | 100 | 1,4 s | 2,6 s | 160 ms | 0 | 1,4 s | 351 KiB |
| `articulos-personalizados.html` | **99** | 100 | 100 | 1,4 s | 2,0 s | 70 ms | 0 | 1,4 s | 222 KiB |
| `nosotros.html` | **99** | 100 | 100 | 1,4 s | 2,0 s | 50 ms | 0 | 1,4 s | 232 KiB |
| `contacto.html` | **99** | 100 | 100 | 1,4 s | 2,0 s | 0 ms | 0 | 2,3 s | 159 KiB |

**Escritorio** (`--preset=desktop`, sin estrangulamiento) — `index.html`:
**83** de rendimiento · Accesibilidad 100 · Buenas prácticas 100 ·
FCP **0,4 s** · LCP **0,5 s** · TBT 376 ms · CLS **0** · 322 KiB.

Notas:

- **Accesibilidad y buenas prácticas: 100/100 y CLS 0 en las 7 páginas**, y
  **0 errores de consola, 0 respuestas 4xx/5xx y 0 imágenes rotas** en la
  verificación de las 7 rutas.
- **El CLS se mantiene en 0 con `font-display: swap`**: el preload de las woff2
  más la entrada del hero con `@keyframes` (sin esperar a JS) evitan el
  desplazamiento que produce el cambio de tipografía, así que no hace falta
  recurrir a `optional`.
- **`index.html` es la página más pesada** (16 tarjetas, 23 fotos y galería):
  su límite es el TBT en CPU ×4, no la red. Corridas repetidas dan **83–84**
  (la primera corrida en frío puede quedar en 70 por la compilación inicial
  del motor).
- **SEO no aparece en la tabla**: el audit `canonical` de Lighthouse 13.5 falla
  con `URL.parse is not a function` (bug de la herramienta, no del sitio) y
  `robots-txt` da `notApplicable` en local. Las 7 páginas **sí** declaran
  `rel="canonical"` y ahora además incluyen **JSON-LD** (`Organization` y
  `WebSite` en `index`, `Organization` en `nosotros`, `Organization` +
  `ContactPage` en `contacto`).

### Base técnica

| Aspecto | Detalle |
|---|---|
| Dependencias | **Cero**: sin librerías, sin preprocesadores, sin build step |
| JS | Un solo archivo nativo con `defer` (`js/main.js`), sin framework |
| CSS | Un archivo (`css/styles.css`) + `css/fonts.css` para las fuentes |
| Imágenes | WebP con `width`/`height` (sin CLS), `loading="lazy"` y `srcset` |
| Motion | Todo respeta `prefers-reduced-motion` (parallax, reveals, partículas, lightbox) |
| Accesibilidad | Skip-link, `aria-*`, foco visible, contraste alto, lightbox con foco atrapado |
| Hero | Fondo limpio (sin video) + micro partículas lima/turquesa generadas en JS (cero peso extra) |

---

## Efectos premium (capa visual v2)

Todo vive en `css/styles.css` → bloque **15. SISTEMA PREMIUM** y en `js/main.js`.
Se activan por atributo en el HTML, así que cada página decide dónde aplicarlos:

| Atributo / clase | Efecto |
|---|---|
| `.hero__copy` + `.hero__product` | Hero a dos columnas: el texto y la Camisa Columbia negra lado a lado, con levitación continua y parallax suave |
| `.hero__particles` | Micro partículas lima `#c8ff3d` / turquesa `#3fe3c4` flotando (generadas en JS) |
| `.btn`, `.neu`, `.neu-in`, `.stat` | Neumorfismo: superficies elevadas e hundidas con doble sombra |
| `data-tilt="9"` | Tarjeta en 3D que sigue al cursor (`rotateX` / `rotateY` con perspectiva) |
| `data-speed="0.1"` | Parallax: el elemento se desplaza según la velocidad de scroll |
| `data-magnetic="0.22"` | Botón magnético que se acerca al cursor |
| `.scroll-progress` | Barra neón de progreso de lectura |
| `.reveal` | Entrada suave de secciones (fade + desplazamiento) |
| `.reveal--wipe` | Cortina que se retrae sobre las fotos de la galería |
| `.gradient-text` | Brillo animado en los títulos (`precisión`, cifras) |
| `.marquee__track` | Cinta horizontal con servicios (se pausa al pasar el cursor) |
| `.card--studio` | Fotos de estudio con fondo claro: se atenúan y encienden al hover |
| `.card__media::after` | Barrido neón al pasar el cursor sobre una tarjeta |
| `.card__media`, `.cat__media`, `.split__media`, `.gallery__item` | **Lightbox**: la foto se abre en grande con zoom (bloque **16. LIGHTBOX**) |
| `#chat-widget` | Chat de soporte flotante con base de conocimiento y respuestas rápidas (`js/chatbot.js` + bloque **18. CHAT WIDGET**, solo en `index.html`) |

---

## Correcciones para móvil (smartphone)

Tres fallos detectados al probar con emulación táctil real (viewport 390 px, UA
móvil, `hasTouch`) y corregidos:

| Problema | Causa | Arreglo |
|---|---|---|
| Al tocar las fotos no se abría nada (en la portada) | El contenedor del chat flotante ocupaba ~350×640 px **con el panel oculto** y capturaba los toques de casi toda la pantalla: el `elementFromPoint` del centro de cada tarjeta devolvía `#chat-widget` | `pointer-events: none` en `.chat-widget`; solo el botón y el panel abierto reciben eventos |
| Categorías y galería se veían en **blanco y negro** en táctil | El bloque que anula el `grayscale` cuando no hay hover estaba **antes** que las reglas base de `.cat__media` y `.gallery__item`; al compartir especificidad, ganaban por orden | El bloque táctil se movió al **final** de `styles.css`, con comentario para no volver a moverlo |
| A 1024 px la última columna del pie se salía 14 px del borde | `sinergiaentextiles@gmail.com` es una palabra sin espacios de ~198 px y ensanchaba su columna | `min-width: 0` en `.footer__col` + `overflow-wrap: anywhere` en los enlaces del pie |

**Verificación** (puppeteer + Chrome, emulación táctil):

- 7 páginas × 390 px → **0 fotos en gris · 0 puntos de toque bloqueados (756
  muestreados) · el lightbox abre en 6/6 páginas con fotos**.
- El chat sigue operativo en móvil: el panel abre dentro del viewport, las
  respuestas rápidas envían mensajes y cierra correctamente.
- Barrido responsivo 7 páginas × 7 anchos (320 / 360 / 390 / 414 / 768 / 1024 /
  1440 px) → **49/49 sin desborde horizontal**.
- En escritorio (puntero fino) las fotos siguen en **blanco y negro por defecto
  y pasan a color al pasar el cursor**, como en el diseño original.

---

## Lightbox de fotos (zoom)

Al hacer clic en cualquier fotografía —tarjetas de producto, categorías, fotos
sueltas y galería— se abre en un diálogo a pantalla completa para apreciar el
trabajo de cerca. Vive en `css/styles.css` → bloque **16. LIGHTBOX** y en
`js/main.js`; se inyecta desde JS, así que **sin JavaScript las fotos siguen
comportándose como antes** (clic = ir al detalle).

| Acción | Resultado |
|---|---|
| Clic / `Enter` en la foto | Abre la imagen ampliada (hasta 900 px del archivo original) |
| Clic sobre la foto ya abierta | Amplía ×2.6 anclado al punto pulsado; segundo clic vuelve a 1:1 |
| Rueda del ratón | Zoom continuo ×1 → ×4.5 anclado al cursor |
| Arrastrar (ratón o dedo) | Desplaza la imagen ampliada, sin salir del encuadre |
| Pellizco (móvil) | Zoom con dos dedos |
| `←` / `→` o botones `‹` `›` | Navega por todas las fotos de la página (con contador `3 / 13`) |
| `+` · `-` · `0` | Acercar, alejar, restablecer |
| `Esc`, clic fuera o `✕` | Cierra y devuelve el foco al elemento de origen |
| Enlace *Ver… / Cotizar…* | Botón en el pie del lightbox con el destino de esa tarjeta |

Detalles técnicos: `role="dialog"` + `aria-modal`, foco atrapado dentro del
diálogo, bloqueo del scroll de la página, precarga de las fotos vecinas,
pie de foto con el `alt` real y `cursor: zoom-in` en las miniaturas
(insignia de lupa visible siempre en pantallas táctiles). En el HTML, las fotos
que no están dentro de un enlace se vuelven botones accesibles
(`role="button"` + `aria-label`); las categorías conservan su enlace original
(clic en la etiqueta = navegar, clic en la foto = ampliar).

---

## Personalización rápida

Todo el sistema vive en `css/styles.css` dentro del bloque `01. TOKENS`:

```css
--bg: #0a0a0a;        /* fondo principal */
--ink: #f4f4f2;       /* tipografía */
--platinum: #b6b6b0;  /* acento gris platino */
--serif: "Cormorant Garamond", serif;  /* títulos */
--sans:  "Inter", sans-serif;          /* textos */
```

Y en el bloque `15. SISTEMA PREMIUM` los acentos de efecto:

```css
--neon-a: #c8ff3d;    /* lima — origen del logo */
--neon-b: #3fe3c4;    /* turquesa — origen del logo */
--neu-raise: ...;      /* sombra de superficie neumórica */
--neu-press: ...;      /* sombra de superficie hundida */
```

---

## Fotografías

Las **48 fotografías** de `assets/img/` son material real del cliente tomado del
sitio original (`static.wixstatic.com`), recortadas a **4:5 (900×1125)** o
**16:9 (1600×900)** y convertidas a WebP, más la **Camisa Columbia negra** del
hero (PNG del cliente, recortado al contenido y convertido a WebP con
transparencia). Al publicar no hay que pedir licencias adicionales.

Para cada foto existe además una **variante ligera** (`-450` / `-800`, calidad
76, ~16 KB de media) referenciada con `srcset` + `sizes` en las 80 imágenes con
`srcset` del sitio, de modo que un móvil descarga ~450 px en lugar de 900 px y
un escritorio retina la completa. Las 48 originales + 48 variantes pesan
3,8 MB en total, pero cada página carga solo lo que necesita.

| Página | Fotos con `srcset` |
|---|---|
| `index.html` | 23 |
| `uniformes.html` | 21 |
| `merch.html` | 17 |
| `articulos-personalizados.html` | 10 |
| `bordados.html` | 8 |
| `nosotros.html` | 1 |

---

## Contenido alineado con el sitio original

Todo vive **dentro de las páginas existentes** (el menú no cambia):

| Contenido del sitio original | Dónde está en el prototipo |
|---|---|
| Catálogo de uniformes (12 prendas) | `uniformes.html` → 12 tarjetas |
| Sastrería (confección, ajustes, toma de medidas) | `uniformes.html` → sección `#sastreria` con galería de 7 fotos + tarjeta destacada en `index.html` |
| Merch / Giger Club (camisas, gorras, sombreros) | `merch.html` → bloque `#giger-club` con 6 productos y redes propias (IG / FB / TikTok) |
| Bordado de alta precisión | `bordados.html` → 7 aplicaciones |
| Artículos personalizados (DTF, serigrafía) | `articulos-personalizados.html` → 10 artículos |
| Diseño web y fotografía (servicio propio) | **Fuera del alcance**, a petición del cliente |

Las secciones se renumeran por página (`01 — Catálogo`, `02 — Sastrería`,
`03 — Especificaciones`, `04 — Proceso`…), de modo que la navegación interna y
los anclas (`#sastreria`, `#giger-club`) siguen siendo coherentes.

---

## Contacto oficial incluido

- Tel: (+506) 6053-6545
- Email: sinergiaentextiles@gmail.com
- Distribuidor Guadalupe: 100 este y 100 norte del Palí de Novacentro
- Redes: [Instagram](https://www.instagram.com/sinergia_en_textiles/) ·
  [Facebook](https://www.facebook.com/profile.php?id=61590457753115) ·
  [TikTok](https://www.tiktok.com/@sinergia_en_textiles)
