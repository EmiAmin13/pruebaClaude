# pruebaClaude — Proyecto de práctica del curso "Desarrollo con IA"

Proyecto Angular 21 para aprender y practicar las buenas prácticas del curso: Skills, `AGENTS.md`/`CLAUDE.md`, MCP, Spec-Driven Development (SDD) y documentación. Base limpia lista para ir construyendo features siguiendo el flujo SDD.

You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

### Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- When using external templates/styles, use paths relative to the component TS file.

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection

## Especificaciones (SDD)

El proyecto sigue Spec-Driven Development. Las specs son la fuente de verdad:

- `spec/constitution/` — reglas estables del proyecto (`mission.md`, `tech-stack.md`, `roadmap.md`)
- `spec/features/NNN-nombre/` — cada feature con `spec.md`, `plan.md` y `tasks.md`
- No implementar nada sin leer la spec y el plan de la feature correspondiente
- Marcar progreso en `tasks.md` y mover la feature a "Hecho" en `roadmap.md` al completar
- La constitución manda: si una feature choca con `mission.md` o `tech-stack.md`, se replantea la feature, no la constitución
- Ver `spec/README.md` para el detalle de la plantilla y el flujo

## MCP y Skills

- **MCP (`.mcp.json`, nivel proyecto):**
  - **Context7** (`context7`, remoto HTTP) — documentación actualizada de librerías bajo demanda
  - **Angular CLI** (`angular-cli`, vía `npx @angular/cli mcp`) — herramientas del CLI de Angular
  - En VS Code, los mismos servidores están en `.vscode/mcp.json`
- **Skills:**
  - `frontend-design` — diseño UI (instalada a nivel proyecto en `.claude/skills/`)
  - `find-skills` — descubrir e instalar skills (disponible a nivel usuario)

## Flujo de trabajo

1. Leer `spec/features/<id-feature>/spec.md` (criterios de aceptación)
2. Revisar `plan.md` para el enfoque técnico
3. Implementar siguiendo las tareas de `tasks.md`
4. Verificar contra los criterios de aceptación (build/tests/lint)
5. Al terminar, marcar tareas y actualizar `roadmap.md`
