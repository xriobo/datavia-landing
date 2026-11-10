# Landing inclusiva — plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** que datavia.app se pueda usar y entender con baja visión, daltonismo, lector de pantalla, solo teclado,
alto contraste de Windows, zoom al 200 %, dislexia y discapacidad cognitiva, con una prueba automática que lo vigile.

**Architecture:** una prueba de accesibilidad automática (pa11y-ci + axe, WCAG 2.2 AA) sobre el `dist` compilado y en
los dos temas, que guía los arreglos; arreglos de CSS en `src/styles/page.css` y de marcado en `src/pages/index.astro`;
dos páginas nuevas (`/accesibilidad` y `/lectura-facil`) y un protocolo de pruebas manuales para lo que la máquina no ve.

**Tech Stack:** Astro 7, kit taste-skill en `public/kit/`, Atkinson Hyperlegible Next + Mono (ya instaladas el 2026-11-10),
pa11y-ci con el runner axe usando el Edge instalado.

**Spec:** la sección «Requisitos» de este documento, que resume la investigación del 2026-11-10 (fuentes al final). El
diseño de la página está en `docs/superpowers/specs/2026-11-09-landing-multiproducto-design.md`.

## Requisitos

| # | Requisito | Origen |
|---|---|---|
| R1 | Objetivo WCAG 2.2 nivel AA en los dos temas (claro y oscuro) | W3C WCAG 2.2, base de UNE-EN 301 549 |
| R2 | Ningún contenido se solapa ni se corta con zoom al 200 %, a 320 px de ancho ni con el espaciado de texto de 1.4.12 | WCAG 1.4.4, 1.4.10, 1.4.12 |
| R3 | El foco del teclado se ve siempre y la barra fija no lo tapa | WCAG 2.4.7, 2.4.11 (nuevo en 2.2) |
| R4 | Objetivos táctiles de 24 × 24 px como mínimo (44 en los controles propios) | WCAG 2.5.8 (nuevo en 2.2) |
| R5 | La página funciona en el modo de alto contraste de Windows (`forced-colors`) y respeta `prefers-contrast: more` | Guía HCM de Mozilla |
| R6 | El color nunca es la única señal (huellas rotas, estado de cada producto) | WCAG 1.4.1 |
| R7 | Lenguaje claro: frases cortas, siglas explicadas, una página en lectura fácil | W3C COGA, UNE 153101 EX |
| R8 | Tipografía para dislexia y baja visión: Atkinson Hyperlegible, cuerpo ≥ 16 px, interlineado ≥ 1,5, líneas ≤ 62 caracteres, sin justificar, sin cursiva | Braille Institute, guía de estilo de la British Dyslexia Association |
| R9 | Declaración de accesibilidad con estado, limitaciones conocidas y un contacto para avisar de barreras | Práctica de la Ley 11/2023 y del RD 193/2023 |
| R10 | Pruebas con lector de pantalla y con personas con discapacidad antes de declarar conformidad | W3C COGA |

**Situación legal (no es asesoramiento jurídico, verificar en el BOE o con un abogado):** la Ley 11/2023 exime de sus
requisitos a las microempresas que prestan servicios (menos de 10 personas y no más de 2 M€), así que hoy datavia no
está obligada por ella. El RD 193/2023 fija 2029 (servicios nuevos) y 2030 (existentes) para la accesibilidad de webs
privadas según UNE-EN 301 549, y varias fuentes dicen que su calendario sí alcanza a las microempresas. Se hace por
convicción y por adelantarse a 2029, no por una sanción inmediata.

## Global Constraints

- La paleta, los tokens y el kit no se tocan para «pasar» una prueba: los arreglos van en `src/styles/page.css`.
- Ningún arreglo puede romper los comprobadores de taste: tras cada tarea, `consistency.mjs` sigue con un solo FAIL
  (`split-pair` de la portada, aceptado) y `perf.mjs` sin FAIL.
- Los cambios de texto siguen `copy.md` de taste y el castellano peninsular; nada inventado.
- Navegador de pruebas: el Edge instalado, sin descargar Chromium (`PUPPETEER_SKIP_DOWNLOAD=1`). Para mirar a mano,
  camofox, como en el resto del proyecto.
- Cada color nuevo necesita su valor en los dos temas.

## Review Focus

1. **Zoom al 200 % en un portátil de 1280 px:** el kit da a cada sección una altura fija (`100svh`); con el texto al
   doble, el contenido se sale y pisa la sección siguiente. Se espera que la sección crezca. Lo prueba la Tarea 2.
2. **Tabular hasta un enlace del pie con la barra fija encima:** el foco puede quedar bajo los 72 px de la barra. Se
   espera verlo entero. Lo prueba la Tarea 3.
3. **Alto contraste de Windows:** los paneles de producto y las tarjetas se distinguen por fondo, que ese modo
   elimina; sin borde, las tres tarjetas se funden. Lo prueba la Tarea 4.
4. **Lector de pantalla en la demo de Custia:** al alterar el importe, solo cambia el color de la fila; quien no ve el
   rojo depende de la línea de estado. Se espera oír qué factura se rompió. Lo prueba la Tarea 5.
5. **Enlaces `mailto:`:** «Escribir a datavia» abre el programa de correo sin avisar, y en un móvil sin cuenta de
   correo no hace nada visible. Se espera que el texto lo anuncie y que la dirección se vea. Lo prueba la Tarea 5.

---

### Task 1: Prueba automática de accesibilidad

**Files:**
- Create: `.pa11yci.json`
- Create: `scripts/a11y-serve-and-test.mjs`
- Modify: `package.json` (script `test:a11y`, devDependency `pa11y-ci`)
- Modify: `README.md` (sección «Antes de desplegar»)

**Interfaces:**
- Produces: `npm run test:a11y` — compila, sirve `dist` en `http://127.0.0.1:4329` y ejecuta pa11y-ci; sale con código
  distinto de 0 si hay errores. Las tareas siguientes lo usan como su prueba.

- [ ] **Step 1: Configurar pa11y-ci** con `runners: ["axe"]`, `standard: "WCAG2AA"`, las reglas de axe
  `wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa`, `chromeLaunchConfig.executablePath` apuntando a
  `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe` y dos URL: la portada tal cual (tema oscuro) y la
  portada con `actions: ["click element .theme-link", "wait for element html[data-theme=\"light\"] to be added"]`.
- [ ] **Step 2: `scripts/a11y-serve-and-test.mjs`** levanta un servidor estático de `dist` (módulo `node:http`, sin
  dependencias), ejecuta `pa11y-ci` y cierra el servidor con el código de salida de pa11y.
- [ ] **Step 3: Ejecutar la línea base.** Run: `npm run test:a11y`. Expected: termina y lista los errores actuales en
  los dos temas (puede fallar: es la foto de partida). Guardar la salida en el PR o en el commit.
- [ ] **Step 4: Commit** `test: prueba de accesibilidad automática con pa11y-ci y axe`.

### Task 2: Secciones que crecen con el texto (zoom, reflow y espaciado)

**Files:**
- Modify: `src/styles/page.css`
- Create: `scripts/a11y-overlap-check.js` (fragmento que se ejecuta en el navegador)

**Interfaces:**
- Produces: `window.overlapCheck(): { section: string, overflow: number }[]` — lista vacía si ninguna sección
  desborda (contenido más alto que la caja, o caja que pisa la siguiente).

- [ ] **Step 1: Escribir la comprobación.** `overlapCheck()` recorre `main > section, footer.closing` y devuelve las
  que cumplen `el.scrollHeight > el.clientHeight + 1` o cuyo `getBoundingClientRect().bottom` supera el `top` de la
  siguiente.
- [ ] **Step 2: Verla fallar.** En camofox, a 1280 × 800, aplicar el CSS de WCAG 1.4.12
  (`* { line-height: 1.5 !important; letter-spacing: .12em !important; word-spacing: .16em !important }` y
  `p { margin-bottom: 2em !important }`) más `html { font-size: 200% }`, cargar el fragmento y llamar a
  `overlapCheck()`. Expected: al menos una sección.
- [ ] **Step 3: Arreglar en `page.css`:** `main > :is(section, .section), footer.closing { height: auto;
  min-height: calc(var(--h, 1) * 100svh); }` y su equivalente con `--hm` y `100lvh` por debajo de 640 px. Cuando el
  contenido cabe, la altura es la misma de antes, así que los comprobadores de taste no cambian.
- [ ] **Step 4: Verla pasar.** Repetir el Step 2. Expected: `[]`. Repetir a 320 px de ancho sin zoom. Expected: `[]`
  y sin desplazamiento horizontal (`document.documentElement.scrollWidth <= innerWidth`).
- [ ] **Step 5: Comprobadores de taste** (`consistency.mjs`, `check.mjs`, `perf.mjs`): sin FAIL nuevos.
- [ ] **Step 6: Commit** `fix: las secciones crecen con el texto en vez de solaparse`.

### Task 3: Teclado, foco y objetivos táctiles

**Files:**
- Modify: `src/styles/page.css`
- Modify: `src/pages/index.astro` (encabezados del pie, enlace de salto)

**Interfaces:**
- Consumes: `npm run test:a11y` (Task 1), `overlapCheck` no.

- [ ] **Step 1: Prueba de foco tapado.** En camofox, recorrer con `Tab` todos los controles (script que llama a
  `focus()` en cada `a, button` en orden de tabulación) y comprobar para cada uno que su `top` es mayor o igual que el
  alto de `header.nav` y que tiene un contorno visible (`outline-style != none`). Expected ahora: falla en algún enlace
  del pie o de la portada.
- [ ] **Step 2: Arreglar:** `:focus-visible { scroll-margin-top: calc(var(--nav) + 16px); scroll-margin-bottom: 16px; }`
  (no `scroll-padding` global, que el kit deja a 0 para encuadrar las secciones). El enlace de salto apunta a `#top` y
  el `main` lleva `tabindex="-1"` para recibir el foco.
- [ ] **Step 3: Objetivos de 24 × 24 px.** Script en camofox: todo `a` y `button` fuera de un párrafo mide al menos
  24 × 24 (los enlaces del pie y del índice de productos). Arreglar con `min-height: 44px; display: inline-flex;
  align-items: center` en `.footer__col a` y `.product`.
- [ ] **Step 4: Encabezados en orden:** los títulos de columna del pie pasan de `h4` a `h3` (siguen al `h2` del
  cierre). Run: `npm run test:a11y`. Expected: sin errores de `heading-order` ni de `target-size`.
- [ ] **Step 5: Commit** `fix: foco visible y nunca tapado, objetivos táctiles de 44 px`.

### Task 4: Alto contraste de Windows y `prefers-contrast`

**Files:**
- Modify: `src/styles/page.css`

- [ ] **Step 1: Verlo fallar.** En Edge, DevTools → Rendering → «Emulate CSS media feature forced-colors: active», en
  los dos temas. Anotar lo que desaparece: borde de tarjetas y paneles, separación entre las tres tarjetas, iconos del
  selector de tema, estado de los chips de las maquetas.
- [ ] **Step 2: Arreglar** dentro de `@media (forced-colors: active)`: `.card, .frame, .panel, .d-win, .frag, .phone,
  .chain { border: 1px solid CanvasText; }`, `:focus-visible { outline: 2px solid Highlight; }`, los SVG con
  `stroke: currentColor` intactos y `forced-color-adjust: none` solo en las marcas de producto (`.product img`,
  `.product-mark`), que son logotipos. Nada de `-ms-high-contrast`.
- [ ] **Step 3:** dentro de `@media (prefers-contrast: more) and (not (forced-colors: active))`: el gris `--muted` y
  `--ui-muted` suben a 7:1 sobre su fondo en los dos temas, y los contornos de botones secundarios a 2 px.
- [ ] **Step 4: Verlo pasar.** Repetir el Step 1. Expected: tarjetas, paneles, botones e iconos distinguibles; foco en
  color de sistema.
- [ ] **Step 5: Commit** `feat: soporte del alto contraste de Windows y de prefers-contrast`.

### Task 5: Lector de pantalla, color y enlaces de correo

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/components/HashChain.astro`

- [ ] **Step 1: Prueba de la demo.** En camofox, pulsar «Alterar el importe de la factura 2» y comprobar que la fila
  rota contiene un texto (no solo color): `tr.is-broken td:last-child` incluye «rota». Expected ahora: falla.
- [ ] **Step 2: Arreglar `HashChain.astro`:** en las filas rotas, la celda de la huella añade «· rota» en texto
  visible y la fila lleva `aria-describedby` hacia la línea de estado.
- [ ] **Step 3: Enlaces de correo.** Cada `mailto:` lleva texto visible u oculto que diga que abre el correo
  (`<span class="sr-only"> (abre tu programa de correo)</span>`), y la dirección `hola@datavia.app` aparece escrita en
  el cierre (ya está) para quien no tiene programa de correo. Añadir `.sr-only` a `page.css` (patrón estándar:
  `position:absolute; width:1px; height:1px; overflow:hidden; clip-path: inset(50%); white-space: nowrap`).
- [ ] **Step 4: Siglas.** Primera aparición de NIF, NIE, NAF, AEAT y PWA con su significado en texto llano (no solo
  `<abbr title>`, que los lectores de pantalla no leen de forma fiable); «VERI*FACTU» con
  `aria-label="Veri factu"` en un `span` para que no se lea el asterisco.
- [ ] **Step 5:** Run: `npm run test:a11y`. Expected: sin errores. Commit `fix: la demo y los enlaces de correo se
  entienden sin ver el color`.

### Task 6: Lenguaje claro y página en lectura fácil

**Files:**
- Modify: `src/pages/index.astro` (textos)
- Create: `src/pages/lectura-facil.astro`
- Modify: `src/pages/index.astro` (enlace «Lectura fácil» en el pie)

- [ ] **Step 1: Medir.** Script que cuenta palabras por frase en el texto visible de la portada (fuera de las
  maquetas). Objetivo de COGA: ninguna frase de más de 25 palabras en el cuerpo y la mayoría por debajo de 20.
  Expected ahora: alguna entradilla supera el límite.
- [ ] **Step 2: Reescribir** las frases largas sin perder hechos (copy.md de taste: sin metáforas, sustantivo primero).
- [ ] **Step 2b: Comprobar R8** con un script en camofox sobre todo el texto fuera de las maquetas: `font-size >= 16px`
  en párrafos, `line-height / font-size >= 1.5`, ancho de párrafo ≤ 62 caracteres (`.measure` del kit), ningún
  `text-align: justify` ni `font-style: italic`. Expected: sin incumplimientos; si los hay, se corrigen en `page.css`.
- [ ] **Step 3: `/lectura-facil`** con las pautas de UNE 153101 EX: una idea por frase, frases afirmativas, sin
  siglas, números en cifra, letra ≥ 16 px, alineado a la izquierda, una sección por producto con qué es, para quién y
  cómo escribirnos. Usa el mismo `Layout` y los dos temas.
- [ ] **Step 4: Validación con personas.** Pedir la validación de la página a un equipo de validadores de lectura
  fácil (Plena inclusión ofrece el servicio). Hasta tenerla, la página no dice que está «validada».
- [ ] **Step 5:** Run: `npm run test:a11y` con `/lectura-facil` añadida a `.pa11yci.json`. Expected: sin errores.
  Commit `feat: textos más claros y página en lectura fácil`.

### Task 7: Declaración de accesibilidad y pruebas con personas

**Files:**
- Create: `src/pages/accesibilidad.astro`
- Modify: `src/pages/index.astro` (enlace «Accesibilidad» en el pie)
- Modify: `README.md` (protocolo de pruebas manuales)

- [ ] **Step 1: Protocolo manual** en el README, en este orden, en los dos temas: solo teclado; NVDA con Firefox; Narrador
  con Edge; VoiceOver en Safari de iOS; TalkBack en Chrome de Android; zoom al 200 % y al 400 %; alto contraste de
  Windows; movimiento reducido. Cada paso con lo que hay que oír o ver.
- [ ] **Step 2: Pasar el protocolo** y anotar cada barrera encontrada como tarea nueva.
- [ ] **Step 3: `/accesibilidad`** con: estado («parcialmente conforme con WCAG 2.2 AA» hasta cerrar el Step 2),
  fecha de la última revisión, cómo se probó (pa11y-ci + axe y el protocolo manual), limitaciones conocidas (las
  maquetas de producto son ilustraciones; la marca de Custia es provisional), y el contacto `hola@datavia.app` con
  asunto «Accesibilidad» y el plazo de respuesta que el usuario decida. Sin fecha de respuesta inventada.
- [ ] **Step 4: Pruebas con personas con discapacidad** (W3C COGA): al menos una persona con baja visión, una que
  use lector de pantalla y una con discapacidad cognitiva o dislexia. Sin esto, la declaración no pasa a «conforme».
- [ ] **Step 5:** Run: `npm run test:a11y` con `/accesibilidad` añadida. Expected: sin errores. Commit
  `docs: declaración de accesibilidad y protocolo de pruebas`.

---

## Decisiones que necesitan al usuario

1. **Runner de pruebas:** pa11y-ci abre un Edge sin interfaz para ejecutar axe. Si prefieres no añadir esa
   herramienta, la alternativa es inyectar axe-core en camofox; funciona, pero no queda como prueba de un comando.
2. **Plazo de respuesta** de la declaración de accesibilidad (Task 7).
3. **Coste de la validación de lectura fácil** (Task 6): es un servicio de pago.

## Fuentes (consultadas el 2026-11-10)

- W3C, [Novedades de WCAG 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/) y [resumen de Deque](https://dequeuniversity.com/resources/wcag-2.2)
- BOE, [Ley 11/2023](https://www.boe.es/buscar/act.php?id=BOE-A-2023-11022); [análisis de Olga Carreras](https://olgacarreras.blogspot.com/2023/05/ley-112023-de-8-de-mayo-de-trasposicion.html)
- RD 193/2023: [Universidad de Alicante](https://accesibilidadweb.dlsi.ua.es/?menu=rd193-2023), [Olga Carreras](https://olgacarreras.blogspot.com/2023/04/real-decreto-1932023-de-21-de-marzo-por.html)
- Atkinson Hyperlegible: [All About Vision](https://www.allaboutvision.com/conditions/blindness-low-vision/atkinson-hyperlegible-typeface/), [repositorio de Google Fonts](https://github.com/googlefonts/atkinson-hyperlegible)
- Lectura fácil: [AENOR, UNE 153101/153102](https://en.tienda.aenor.com/al-dia/noticias/une-153101-une-153102-lectura-facil), [Universidad Isabel I](https://www.ui1.es/blog-ui1/lectura-facil-informacion-accesible-para-una-sociedad-inclusiva)
- Dislexia: [Smashing Magazine sobre la guía de la BDA](https://smashingmagazine.com/2021/11/dyslexia-friendly-mode-website), [Dyslexia Scotland](https://dyslexiascotland.org.uk/wp-content/uploads/2025/10/formats.pdf)
- Alto contraste: [Mozilla, HCM CSS Self-Check Guide](https://firefox-source-docs.mozilla.org/accessible/HCMCSSChecklist.html), [Mozilla, media queries HCM](https://firefox-source-docs.mozilla.org/accessible/HCMMediaQueries.html)
- Cognitivo: [W3C, Making Content Usable for People with Cognitive and Learning Disabilities](https://www.w3.org/TR/coga-usable/)
- Pruebas: [pa11y-ci con axe en GitHub Actions (CivicActions)](https://accessibility.civicactions.com/posts/automated-accessibility-testing-leveraging-github-actions-and-pa11y-ci-with-axe), [Universidad de Arizona](https://accessibility.arizona.edu/web-apps/cicd-testing)
