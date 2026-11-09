# datavia.app como casa de varios productos — diseño

Fecha: 2026-11-09. Aprobado en el chat ese mismo día (enfoque A, «escaparate de la casa»; estructura 1, «una sección
por producto»). El resto de dudas se resolvieron en modo desatendido, a petición del usuario, eligiendo lo más
profesional y lo más cercano a cada público.

## Por qué cambia

La landing anterior vendía una sola idea («un registro no se puede deshacer») y una hoja de ruta Capture → OCR →
Custia. Con Cuentamos (regalos y gastos en grupo, B2C) esa promesa fiscal deja fuera al segundo público. Además:

- «Abrir Capture» era el botón principal, pero sin una asesoría que lo tenga implantado no sirve, y el 9-nov daba 530.
- La estación «OCR · planeado» decía que nada lee el documento; Capture ya lee la MRZ del DNI y el NAF en el navegador.
- La cuenta atrás de VERI\*FACTU metía prisa sin ofrecer ninguna acción.
- No había contacto, favicon propio ni pantallas reales de ningún producto.

## Decisiones

| Tema | Decisión |
|---|---|
| Papel de datavia.app | Escaparate y confianza: quién hace los productos. Cada producto tiene nombre propio y datavia lo firma |
| Públicos | Asesorías y empresas (Capture, Custia) y particulares (Cuentamos) |
| Contacto | `hola@datavia.app` como `mailto:` con asunto por producto. Reenvío por Cloudflare Email Routing (pendiente: hoy no hay MX) |
| Nombre del autor | No aparece en la página; solo irá en el aviso legal cuando exista |
| Cuentamos | `cuentamos.datavia.app`, abre el 15-nov-2026. Sin botón hasta entonces. Plan B (Amigo invisible en `secret-santa.datavia.app`): se cambia en el frontmatter de `index.astro` |
| OCR | Deja de ser producto: es una función de Capture |
| Custia | Fase 1 completa, sin pruebas abiertas. La demo real de la cadena de huellas pasa a ser la imagen de su sección; fechas como texto, sin cuenta atrás |

## Sistema (landing-studio, modo C · corporativa)

Clase taste: `software` (un estudio que vende su propio software). Reparto: portada `collage`, paleta
`cool-white-slate`, tipografía `instrument` (Instrument Sans + DM Mono, autoalojadas con fontsource: sin Google
Fonts, coherente con «sin rastreadores»), menú `nav-centre` (`nav-cards` no aplica sin fotografías), pie
`footer-dark`, cierre `close-type`, ritmo `surface-pairs`, botones `tonal`, marca `wordmark`, fondo iluminado `sky`.
Sin momentos ni WebGL: en modo C solo la capa de movimiento de taste.

Kit: solo los 11 ficheros que la página usa, en `public/kit/`, con su licencia MIT.

## Páginas en pantallas (1440 × 900)

| # | id | Idea | Imagen |
|---|---|---|---|
| 1 | hero | «Software para asesorías, empresas y familias»; aviso de la apertura de Cuentamos | Ventana de Capture (alta con campos leídos del DNI) y tarjeta de un bote de Cuentamos que se completa |
| 2 | capture | Facturas y altas desde el móvil; «Pedir una demo de Capture» | Móvil con «Revisa el alta» y sus documentos |
| 3 | cuentamos | Regalos y gastos en grupo, sin cuenta y gratis | Tres tarjetas: lista con «Lo regalo yo», bote, amigo invisible |
| 4 | custia | VERI\*FACTU con huella encadenada; fechas; «Pedir aviso de Custia» (fondo `surface`) | Demo real SHA-256 con su botón de alterar |
| 5 | reglas | Tres reglas, cada una con el producto que la cumple (fondo `surface`) | Tres fragmentos pequeños |
| 6 | contact | Cierre con «Escribir a datavia» y pie oscuro | — |

Acción principal, igual en menú, portada y cierre: «Escribir a datavia».

## Fuera de alcance

Aviso legal y privacidad (faltan los datos del titular), despliegue, Email Routing y la imagen social definitiva.
