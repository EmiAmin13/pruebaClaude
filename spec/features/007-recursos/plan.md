# 007 · Recursos — Plan

## Enfoque

Página sencilla tipo listado de recursos con enlaces y descripciones. Cada recurso es una card con icono, título, descripción y enlace.

## Implementación

1. Generar componente `RecursosPageComponent` en `src/app/pages/recursos/`.
2. Configurar ruta lazy.
3. Crear cards de recursos: guía Claude Code, plantilla SDD, docs OpenCode, Context7, skills.sh.
4. Agregar enlaces externos (abrir en nueva pestaña).
5. Incluir PDFs como recursos descargables.

## Decisiones

- **Cards con diseño uniforme** — Fáciles de escanear y mantener.
- **Enlaces externos** — Con `target="_blank"` y `rel="noopener"`.
- **PDFs** — Servidos desde la carpeta `public/` de Angular.

## Riesgos

- **Tamaño de PDFs** — La guía Claude Code pesa ~9.5 MB; considerar compresión si afecta rendimiento.
