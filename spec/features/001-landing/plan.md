# 001 · Landing page — Plan

## Enfoque

Crear un componente standalone con layout tipo landing page. Usar routing de Angular para navegar a las secciones. Diseño responsive con CSS Grid/Flexbox.

## Implementación

1. Generar componente `LandingPageComponent` en `src/app/pages/landing/`.
2. Configurar ruta lazy en `app.routes.ts`.
3. Maquetar hero section con título y descripción del curso.
4. Crear sección de módulos con cards enlazables.
5. Agregar footer con información de recursos.
6. Implementar sidebar de navegación (componente compartido).

## Decisiones

- **Ruta lazy** — Se carga solo cuando se accede, optimizando el bundle inicial.
- **Signals para estado** — No hay estado complejo, pero se usará `signal()` si es necesario.
- **Componente compartido de navegación** — Reutilizable en todas las páginas.

## Riesgos

- **Diseño responsive** — Probar en varios tamaños desde el inicio para evitar retrabajos.
