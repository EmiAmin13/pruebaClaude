# 000 · Sistema de diseño

**Estado:** propuesta

## Qué hace

Sistema de diseño visual que define la apariencia base del sitio: paleta de colores, tipografía, espaciados, componentes compartidos (navbar, sidebar, footer, cards) y layout global responsive con toggle de modo claro/oscuro.

Todas las features siguientes consumirán este sistema, garantizando consistencia visual.

## Por qué

Sin una base visual común, cada página terminará con estilos inconsistentes y retrabajo. Es la feature fundacional que deben heredar todas las demás.

## Criterios de aceptación

- [ ] Variables CSS definidas en `src/styles.css` para colores, fuentes, espaciados, breakpoints y sombras.
- [ ] Toggle claro/oscuro funcional con CSS custom properties y clase `.dark` en `<body>`.
- [ ] `NavbarComponent` con logo, enlaces de navegación y menú hamburguesa en móvil.
- [ ] `SidebarComponent` colapsable con estado manejado por signal.
- [ ] `FooterComponent` con enlaces e información de recursos.
- [ ] `CardComponent` reutilizable con content projection.
- [ ] `LayoutComponent` que orquesta navbar + sidebar + router-outlet + footer.
- [ ] `ThemeService` con signal `isDark` y método `toggle()`.
- [ ] Estilos de accesibilidad: `:focus-visible`, landmarks ARIA, roles semánticos.
- [ ] Layout responsive probado en móvil (320px+), tablet (768px+) y escritorio (1024px+).
- [ ] Pasa AXE checks sin errores.
- [ ] Sin dependencias externas de CSS (ni Bootstrap, Tailwind, etc.).

## Fuera de alcance

- Animaciones complejas o transiciones.
- Personalización por usuario (tema persistente en localStorage se puede añadir después).
- Iconos (se usarán caracteres unicode o SVG inline, sin librería de iconos).
