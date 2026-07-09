# 001 · Landing page — Tareas

- [x] Generar componente `LandingPageComponent` con Angular CLI. — Creado como `Landing` en `src/app/pages/landing/`.
- [x] Configurar ruta lazy en `app.routes.ts`.
- [x] Maquetar hero section.
- [x] Crear sección de módulos del curso con cards.
- [x] Crear componente `NavbarComponent` compartido. (ya existía de 000)
- [x] Crear componente `FooterComponent` compartido. (ya existía de 000)
- [x] Agregar estilos responsive.
- [x] Verificar compilación.
- [x] Verificar accesibilidad (AXE). — `expectNoA11yViolations` en `landing.spec.ts`.
- [x] Validar contra los criterios de aceptación de `spec.md`.
- [x] Mover la feature a "Hecho" en `../../constitution/roadmap.md`.

## Notas de implementación

- El hero se presenta como un `spec.md` renderizado: marcador de spec, título, resumen, CTA y
  metadatos en monoespaciada. Los módulos del curso son los "criterios de aceptación", cada uno una
  casilla `[ ]` que se marca al apuntarla.
- Los módulos salen de `src/app/shared/navigation.ts`, compartido con el sidebar: añadir una sección
  ahí la hace aparecer en ambos sitios.
- Las seis rutas enlazadas ya existen y sirven un componente `Placeholder` hasta que se implemente
  cada feature.
