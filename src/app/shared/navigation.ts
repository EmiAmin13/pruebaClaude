/**
 * Los módulos del curso, en el orden del roadmap. Fuente única para el sidebar
 * y la landing: si se añade una sección, se añade aquí y aparece en ambos.
 * `number` es el identificador real de la feature en `spec/features/`.
 */
export interface CourseModule {
  readonly number: string;
  readonly path: string;
  readonly label: string;
  readonly summary: string;
}

export const COURSE_MODULES: readonly CourseModule[] = [
  {
    number: '002',
    path: '/fundamentos-ia',
    label: 'Fundamentos de IA',
    summary: 'Cómo funciona un LLM, tokens, ventana de contexto y la anatomía de un buen prompt.',
  },
  {
    number: '003',
    path: '/opencode',
    label: 'OpenCode',
    summary: 'Instalación, comandos, los modos Build y Plan, y cómo escribir un AGENTS.md.',
  },
  {
    number: '004',
    path: '/mcp-skills',
    label: 'MCP y Skills',
    summary: 'Conectar servicios externos con MCP y ampliar al agente con skills.',
  },
  {
    number: '005',
    path: '/sdd-ciclo',
    label: 'Ciclo SDD',
    summary: 'De la constitución a la verificación: el ciclo que sigue este mismo proyecto.',
  },
  {
    number: '006',
    path: '/multiagente-loops',
    label: 'Multiagentes y loops',
    summary: 'Subagentes especializados y bucles de retroalimentación que se verifican solos.',
  },
  {
    number: '007',
    path: '/recursos',
    label: 'Recursos',
    summary: 'Guías, plantillas y enlaces para seguir por tu cuenta.',
  },
];
