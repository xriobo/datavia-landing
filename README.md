# datavia — landing

Landing pública de [datavia.app](https://datavia.app): presenta **Capture** (en
producción, con enlace a `capture.datavia.app`) y adelanta **OCR** (planeado) y
**Custia** (fase 1 completa, sin periodo de pruebas abierto) como el resto del
recorrido.

Astro sin frameworks de UI: HTML + CSS + un puñado de `<script>` con
TypeScript, sin build step adicional. Fuentes autoalojadas
(`@fontsource-variable/*`) — nada se sirve desde Google Fonts.

## Comandos

```powershell
npm install
npm run dev      # localhost:4321
npm run build    # ./dist
npm run preview
```

## Qué hace la página, no solo cómo se ve

- **Cadena de huellas real** en `HashChainDemo.astro`: SHA-256 vía
  `crypto.subtle`, no una animación simulada. El botón de manipulación
  recalcula la huella y la compara contra la grabada — el mismo mecanismo de
  `Custia.Core`, no una metáfora.
- **Cuenta atrás real** en `Countdown.astro` hasta el 1 de enero de 2027
  (sociedades, RD-ley 15/2025).
- **La vía de tres estaciones** en `Journey.astro` es la hoja de ruta: el
  color y el estilo de cada tarjeta (línea continua/discontinua, candado) *son*
  el estado real de cada producto, no una decoración aparte de él.

## Fuera de alcance (deliberado)

No incluye páginas de aviso legal / privacidad / cookies — son obligatorias
para un SaaS fiscal antes de recoger cualquier dato real, pero esta landing no
recoge ninguno (el único formulario vive en `capture.datavia.app`) y su
contenido no se puede fabricar sin quien redacta esas políticas. Añadirlas es
el primer candidato cuando haya una segunda página.
