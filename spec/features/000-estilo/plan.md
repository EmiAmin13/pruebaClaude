# 000 · Sistema de diseño — Plan

## Enfoque

CSS custom properties para todos los tokens de diseño. Componentes standalone con `ChangeDetectionStrategy.OnPush`. Signals para estado del sidebar (abierto/cerrado) y del tema (claro/oscuro). Sin librerías CSS externas.

## Implementación

1. **CSS variables globales** en `src/styles.css`:
   - Modo claro: fondos blancos/grises claros, texto negro/gris oscuro.
   - Modo oscuro: fondos oscuros (#1a1a2e, #16213e), texto claro (#e0e0e0).
   - Tipografía: `system-ui, -apple-system, sans-serif`.
   - Breakpoints: `--bp-mobile: 320px`, `--bp-tablet: 768px`, `--bp-desktop: 1024px`.
   - Sombras y radios suaves para cards.

2. **`ThemeService`** en `src/app/shared/services/theme.service.ts`:
   - Signal `isDark` con valor inicial `false`.
   - Método `toggle()` que cambia el signal y alterna clase `.dark` en `<body>`.

3. **`NavbarComponent`** en `src/app/shared/navbar/`:
   - Logo del sitio, enlaces de navegación principales.
   - Botón hamburguesa visible en móvil que emite evento para abrir/cerrar sidebar.
   - Botón de toggle claro/oscuro.

4. **`SidebarComponent`** en `src/app/shared/sidebar/`:
   - Lista de enlaces a las secciones del curso.
   - Signal `isOpen` para colapsar en móvil.
   - Visible permanentemente en escritorio, superpuesto en móvil.

5. **`FooterComponent`** en `src/app/shared/footer/`:
   - Enlaces a recursos, copyright.

6. **`CardComponent`** en `src/app/shared/card/`:
   - Content projection con `<ng-content>`.
   - Slots para título, descripción, acciones.

7. **`LayoutComponent`** en `src/app/shared/layout/`:
   - Estructura: navbar arriba, sidebar + router-outlet al medio, footer abajo.
   - Sidebar colapsable en móvil vía signal compartida o input/output.
   - Usa `<router-outlet>` para el contenido dinámico.

8. **Estilos de accesibilidad**:
   - `:focus-visible` con outline visible.
   - `role="navigation"`, `role="contentinfo"`, `aria-label`.
   - Saltar al contenido (`skip-link`).

9. **Actualizar `app.component.html`** para usar `LayoutComponent`.

## Decisiones

- **CSS variables** sobre SCSS — Angular 21 las soporta nativamente, son reactivas y permiten el toggle claro/oscuro sin recompilar.
- **Sin dependencias CSS** — El proyecto debe ser autónomo y fácil de mantener.
- **Sidebar con signal** — Estado local del layout, no necesita servicio global.
- **Content projection en Card** — Máxima flexibilidad para que cada feature use el card como quiera.

## Riesgos

- **Toggle claro/oscuro** — Probar que los colores tengan suficiente contraste en ambos modos (WCAG AA).
- **Sidebar en móvil** — Asegurar que el overlay no bloquee interacciones y que el botón de cierre sea visible.
