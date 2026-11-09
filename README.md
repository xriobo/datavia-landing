# datavia — landing

Landing pública de [datavia.app](https://datavia.app): la casa de los productos de datavia. Cada producto
tiene nombre propio y su sección con su interfaz real:

| Producto | Público | Estado | Acción |
|---|---|---|---|
| **Capture** | Asesorías y sus empresas clientes | En producción | Pedir una demo (`mailto:`) |
| **Cuentamos** | Familias y grupos de amigos | Abre el 15-nov-2026 en `cuentamos.datavia.app` | «Abrir Cuentamos» al lanzar |
| **Custia** | Autónomos y pymes (VERI\*FACTU) | Fase 1 completa | Pedir aviso (`mailto:`) |

Diseño y decisiones: [`docs/superpowers/specs/2026-11-09-landing-multiproducto-design.md`](docs/superpowers/specs/2026-11-09-landing-multiproducto-design.md).

Astro sin frameworks de UI. El sistema visual es el kit de taste-skill (MIT), copiado solo en lo que la página usa
en `public/kit/`. Fuentes autoalojadas (`@fontsource*`): nada se pide a Google Fonts.

## Comandos

```powershell
npm install
npm run dev      # localhost:4321
npm run build    # ./dist
npm run preview
```

## Lo que hay que tocar a mano

- **El 15 de noviembre**: `launched: true` en el frontmatter de `src/pages/index.astro`. Si sale el plan B
  (Amigo invisible), se cambian ahí mismo el nombre y la URL.
- **Antes de publicar**: activar Cloudflare Email Routing para `hola@datavia.app`. Sin registro MX, los correos de
  todos los botones se pierden.
- **`public/og.png`** (1200 × 630): la imagen que se ve al compartir el enlace.

## Qué hace la página, no solo cómo se ve

- **Cadena de huellas real** en `HashChain.astro`: SHA-256 vía `crypto.subtle`, el mismo encadenado de
  `billing_record` en Custia. El botón altera un importe ya sellado y la huella deja de coincidir.
- **Las pantallas de cada producto** son HTML con los textos reales de cada app («Revisa el alta», «Lo regalo yo»,
  «Me apunto»), no capturas.

## Fuera de alcance (deliberado)

Aviso legal y privacidad: obligatorios con actividad económica, pero necesitan los datos del titular, que no se
inventan. La landing no recoge datos: el contacto es un `mailto:`.
