# 002 · Fundamentos de IA — Plan

## Enfoque

Página de contenido estático estructurado en secciones. Usar un layout de documentación con sidebar para la navegación interna de la página.

## Implementación

1. Generar componente `FundamentosIaPageComponent` en `src/app/pages/fundamentos-ia/`.
2. Configurar ruta lazy.
3. Maquetar secciones: qué es un LLM, tokens, parámetros, ventana de contexto, multimodalidad, alucinaciones.
4. Crear sección de prompt engineering con ejemplos bueno/malo.
5. Crear sección de vibe coding vs ingeniería de software.
6. Diagramas en ASCII o SVG simple para conceptos clave.

## Decisiones

- **Sidebar de documentación** — Reutilizar el componente compartido de navegación.
- **Contenido estático** — No necesita backend, todo es markdown renderizado o HTML directo.
- **Diagramas** — Preferir SVG inline o Mermaid si es viable.

## Riesgos

- **Cantidad de contenido** — La página puede ser larga; asegurar buena navegación interna con anchors.
