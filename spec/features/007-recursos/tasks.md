# 007 · Recursos — Tareas

- [x] Generar componente `RecursosPageComponent`.
- [x] Configurar ruta lazy.
- [x] Crear card: Guía Claude Code (PDF).
- [x] Crear card: Plantilla SDD (spec_template.zip).
- [x] Crear card: Documentación OpenCode.
- [x] Crear card: Context7.
- [x] Crear card: skills.sh.
- [x] Crear card: Herramientas (OpenCode, Claude Code, Cursor).
- [x] Copiar PDFs y plantilla a `public/` para descarga.
- [x] Verificar accesibilidad (AXE) — ya no está bloqueado: `axe-core` se añadió en la feature 000 y `recursos.spec.ts` lo ejecuta.
- [x] Validar contra los criterios de aceptación de `spec.md`.
- [x] Mover la feature a "Hecho" en `../../constitution/roadmap.md`.

## Notas de implementación

- Los enlaces externos llevan `target="_blank"` y `rel="noopener"`, comprobado en el test.
- El PDF se sirve como `claude-code-guia-esencial.pdf`. `recursos.spec.ts` comprueba que cada
  descarga existe en `public/`: un nombre mal escrito sería un 404 silencioso en producción.
- Las cards de descarga muestran formato y peso. La guía pesa 9,2 MB y conviene avisarlo antes de
  que alguien la abra desde el móvil.
