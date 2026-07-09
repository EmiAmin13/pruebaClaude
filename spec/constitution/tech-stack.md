# Tech stack y convenciones

## Tecnologías

- **Lenguaje:** TypeScript estricto
- **Framework:** Angular 21.2 (standalone components, sin NgModules)
- **Estilo:** Prettier
- **Tests:** Vitest + jsdom
- **Accesibilidad:** `axe-core` (devDependency)
- **Despliegue:** Por definir

## Archivos / módulos clave

- `src/app/` — componente raíz y páginas
- `src/app/pages/` — componentes de cada ruta (lazy loading)
- `src/app/shared/` — componentes, directivas y pipes reutilizables
- `spec/` — especificaciones SDD del proyecto

## Comandos

- `ng serve` — arranca el servidor de desarrollo en `localhost:4200`
- `ng test` — ejecuta los tests con Vitest
- `ng build` — compila para producción

## Convenciones

- **Nombres:** camelCase para variables y funciones, kebab-case para archivos y componentes. Clases sin sufijo `Component` (`navbar.ts` → `class Navbar`), como genera Angular 21.
- **Tests:** junto al archivo: `foo.ts` + `foo.spec.ts`. El builder `@angular/build:unit-test` solo recoge `src/**/*.spec.ts` (ver `tsconfig.spec.json`).
- **Estado:** signals con `signal()` / `computed()`, sin `mutate`.
- **Control de flujo:** nativo (`@if`, `@for`, `@switch`), sin directivas estructurales.
- **Formularios:** reactivos (`ReactiveFormsModule`), no template-driven.
- **Accesibilidad:** WCAG AA, pasar AXE checks.
- **Rutas:** lazy loading por feature.
- **Responsive:** mobile-first. La web debe funcionar correctamente en cualquier dispositivo (móvil, tablet, escritorio). Sidebar colapsable en móvil.

## Estilo visual

Definido en la feature 000. El cromo del sitio está hecho de artefactos SDD: el sitio enseña
Spec-Driven Development y se documenta a sí mismo con sus propias convenciones.

- **Tema:** claro/oscuro, con clase `.dark` en `<body>` y tokens redefinidos en `body.dark`.
- **Tipografía:** dos roles, ambos desde stacks del sistema (sin fuentes externas).
  - Display y cuerpo: `system-ui, -apple-system, 'Segoe UI', sans-serif`. Titulares en peso 700 con tracking `-0.02em`; medida de lectura ~68ch.
  - Utility y código: `ui-monospace, 'Cascadia Code', 'SF Mono', Consolas, monospace`. Marcadores de spec, casillas, etiquetas y bloques de código.
- **Paleta:** definida como custom properties en `src/styles.css`. Oscuro azul-pizarra (no negro puro), primario índigo, acento teal reservado para estados de verificación. `src/styles.spec.ts` verifica automáticamente que cada par de texto cumple WCAG AA leyendo los tokens reales.
- **Signature:** el marcador de spec (`[ 002 · FUNDAMENTOS ]`) como eyebrow de sección, y las listas de módulos como casillas `[ ]` / `[x]` calcadas de los `tasks.md` del repositorio.
- **Layout:** responsive mobile-first con diseño tipo documentación (sidebar colapsable + contenido).
- **Movimiento:** mínimo. Transición de color en el toggle de tema y micro-hover en las casillas. `prefers-reduced-motion` respetado.

## Límites duros

- No añadir dependencias externas sin justificarlo.
- No usar `any` en TypeScript sin justificarlo.
- No subir `.env*` ni secretos al repositorio.
- No tocar `spec/` sin actualizar antes la constitution si el cambio la afecta.

## Dependencias justificadas

- **`axe-core`** (dev) — siete de las ocho features tienen "pasa AXE checks" como criterio de aceptación. Se usa desde `src/testing/axe.ts`. Bajo jsdom no evalúa contraste de color (no rasteriza), así que la regla `color-contrast` se desactiva ahí y se cubre en `src/styles.spec.ts`, que calcula los ratios sobre los tokens.
- **`@types/node`** (dev) — solo tipos, sin runtime. Necesario para que `src/styles.spec.ts` lea `src/styles.css` y verifique la paleta contra su fuente real en vez de contra una copia.
