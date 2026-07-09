# 005 · Ciclo SDD — Plan

## Enfoque

Página conceptual con diagramas y ejemplos concretos. Mostrar la estructura de carpetas del propio proyecto como ejemplo vivo.

## Implementación

1. Generar componente `SddCicloPageComponent` en `src/app/pages/sdd-ciclo/`.
2. Configurar ruta lazy.
3. Maquetar sección: el problema que resuelve SDD (con/sin SDD).
4. Diagrama del ciclo SDD (usar SVG o Mermaid).
5. Maquetar sección: niveles de SDD.
6. Maquetar sección: artefactos (constitution + features).
7. Incluir referencia a la plantilla spec_template.zip como descarga.

## Decisiones

- **Diagrama del ciclo** — SVG inline o Mermaid para claridad visual.
- **Ejemplo vivo** — Usar la estructura `spec/` del proyecto como ejemplo.
- **Enlace a plantilla** — Apuntar al zip original del curso.

## Riesgos

- **Diagrama Mermaid** — Verificar que se renderiza bien sin librerías externas; si no, usar SVG.
