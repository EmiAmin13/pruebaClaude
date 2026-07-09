# Tech stack y convenciones

## Tecnologías

- **Lenguaje:** TypeScript estricto
- **Framework:** Angular 21.2 (standalone components, sin NgModules)
- **Estilo:** Prettier
- **Tests:** Vitest + jsdom
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

- **Nombres:** camelCase para variables y funciones, kebab-case para archivos y componentes.
- **Tests:** junto al archivo: `foo.ts` + `foo.test.ts`.
- **Estado:** signals con `signal()` / `computed()`, sin `mutate`.
- **Control de flujo:** nativo (`@if`, `@for`, `@switch`), sin directivas estructurales.
- **Formularios:** reactivos (`ReactiveFormsModule`), no template-driven.
- **Accesibilidad:** WCAG AA, pasar AXE checks.
- **Rutas:** lazy loading por feature.
- **Responsive:** mobile-first. La web debe funcionar correctamente en cualquier dispositivo (móvil, tablet, escritorio). Sidebar colapsable en móvil.

## Estilo visual

- **Tema:** claro/oscuro (por definir).
- **Tipografía:** system-ui o similar.
- **Layout:** responsive mobile-first con diseño tipo documentación (sidebar colapsable + contenido).

## Límites duros

- No añadir dependencias externas sin justificarlo.
- No usar `any` en TypeScript sin justificarlo.
- No subir `.env*` ni secretos al repositorio.
- No tocar `spec/` sin actualizar antes la constitution si el cambio la afecta.
