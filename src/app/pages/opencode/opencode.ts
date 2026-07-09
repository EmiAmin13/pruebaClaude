import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CodeBlock } from '../../shared/doc/code-block';
import { DocPage } from '../../shared/doc/doc-page';
import { DocSection } from '../../shared/doc/doc-section';
import { TocItem } from '../../shared/doc/doc.types';

interface CommandRow {
  readonly command: string;
  readonly what: string;
}

interface AgentRow {
  readonly aspect: string;
  readonly build: string;
  readonly plan: string;
}

@Component({
  selector: 'app-opencode',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DocPage, DocSection, CodeBlock],
  templateUrl: './opencode.html',
  styleUrl: './opencode.css',
})
export class OpencodePage {
  readonly sections: readonly TocItem[] = [
    { id: 'instalacion', label: 'Instalación' },
    { id: 'comandos', label: 'Comandos y atajos' },
    { id: 'build-vs-plan', label: 'Build vs Plan' },
    { id: 'agents-md', label: 'AGENTS.md' },
  ];

  readonly installScript = 'curl -fsSL https://opencode.ai/install | bash';

  readonly installAlternatives = `# Node.js
npm install -g opencode-ai

# macOS y Linux con Homebrew
brew install anomalyco/tap/opencode

# Gestor de versiones Mise
mise use -g github:anomalyco/opencode`;

  readonly firstRun = `# Abre el TUI en el proyecto actual
opencode

# O ábrelo directamente en otro proyecto
opencode ~/proyectos/mi-app`;

  readonly commands: readonly CommandRow[] = [
    { command: 'opencode', what: 'Abre la interfaz de terminal en el directorio actual.' },
    { command: 'opencode [proyecto]', what: 'Abre el TUI apuntando a otro proyecto.' },
    { command: '/help', what: 'Muestra el diálogo con todos los comandos disponibles.' },
    { command: '/init', what: 'Analiza el repositorio y genera un AGENTS.md inicial.' },
    {
      command: '/undo',
      what: 'Revierte tu último mensaje, las respuestas que provocó y los cambios en archivos.',
    },
    { command: '/redo', what: 'Rehace lo que acabas de deshacer.' },
    { command: '/share', what: 'Genera un enlace para compartir la conversación.' },
  ];

  readonly agents: readonly AgentRow[] = [
    {
      aspect: 'Para qué sirve',
      build: 'Trabajo de desarrollo normal',
      plan: 'Analizar y proponer sin tocar nada',
    },
    {
      aspect: 'Edición de archivos',
      build: 'Permitida',
      plan: 'Pide permiso antes de cada escritura',
    },
    {
      aspect: 'Comandos de shell',
      build: 'Permitidos',
      plan: 'Pide permiso antes de cada comando',
    },
    {
      aspect: 'Cuándo usarlo',
      build: 'Ya sabes qué hay que hacer',
      plan: 'Exploras un repo que no conoces',
    },
  ];

  readonly agentsMdTemplate = `# Mi proyecto

Aplicación Angular 21 con TypeScript estricto.

## Estructura

- \`src/app/pages/\` — una carpeta por ruta, con carga diferida
- \`src/app/shared/\` — componentes y servicios reutilizables
- \`spec/\` — especificaciones SDD, la fuente de verdad

## Convenciones

- Componentes standalone con ChangeDetectionStrategy.OnPush
- Signals para el estado; nunca \`mutate\`
- Control de flujo nativo: @if, @for, @switch
- Tests junto al archivo: \`foo.ts\` + \`foo.spec.ts\`

## Comandos

- \`npm test\` — tests con Vitest
- \`npm run build\` — compila para producción

## Límites

- No añadir dependencias sin justificarlo
- No usar \`any\` sin justificarlo`;
}
