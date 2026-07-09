# 000 · Sistema de diseño — Tareas

- [x] Definir CSS custom properties en `src/styles.css` (modo claro y oscuro).
- [x] Crear `ThemeService` con signal `isDark` y método `toggle()`.
- [x] Crear `NavbarComponent` (logo, nav links, hamburguesa, toggle tema).
- [x] Crear `SidebarComponent` (enlaces, colapsable con signal).
- [x] Crear `FooterComponent`.
- [x] Crear `CardComponent` (content projection).
- [x] Crear `LayoutComponent` (navbar + sidebar + router-outlet + footer).
- [x] Agregar estilos de accesibilidad (`:focus-visible`, landmarks ARIA, skip-link).
- [x] Actualizar `app.component.html` para usar `LayoutComponent`. — `Layout` se monta como ruta padre en `app.routes.ts`; `app.ts` queda como `<router-outlet />`.
- [x] Probar layout responsive (móvil, tablet, escritorio). — Validado visualmente en móvil real y en los tres breakpoints.
- [x] Verificar contraste de color en modo claro y oscuro. — Automatizado en `src/styles.spec.ts` sobre los tokens reales.
- [x] Pasar AXE checks. — `expectNoA11yViolations` sobre `Layout` con el sidebar abierto.
- [x] Validar contra los criterios de aceptación de `spec.md`.
- [x] Mover la feature a "Hecho" en `../../constitution/roadmap.md`.

## Notas de implementación

- Los nombres de clase siguen el estilo de Angular 21 sin sufijo: `Navbar`, `Sidebar`, `Footer`,
  `Card`, `Layout`.
- El estado del sidebar vive como signal en `Layout` y viaja por `input()` / `output()`. El tema sí
  es un servicio porque muta `<body>`, fuera del árbol de componentes.
- El sidebar cerrado usa `visibility: hidden`, no solo `transform`: de lo contrario sus enlaces
  seguirían siendo enfocables con el tabulador fuera de pantalla.
- Se añadió `src/app/shared/navigation.ts` (no previsto en el plan) como fuente única de los módulos
  del curso, compartida por el sidebar y la landing.
- `axe-core` no evalúa contraste bajo jsdom, así que esa comprobación vive aparte en
  `src/styles.spec.ts`, que parsea `styles.css` y calcula los ratios WCAG.
