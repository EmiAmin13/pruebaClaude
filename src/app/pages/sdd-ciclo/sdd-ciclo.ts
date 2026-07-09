import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlock } from '../../shared/doc/code-block';
import { DocPage } from '../../shared/doc/doc-page';
import { DocSection } from '../../shared/doc/doc-section';
import { TocItem } from '../../shared/doc/doc.types';

interface Level {
  readonly name: string;
  readonly what: string;
  readonly when: string;
}

interface Artifact {
  readonly file: string;
  readonly answers: string;
}

@Component({
  selector: 'app-sdd-ciclo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DocPage, DocSection, CodeBlock, RouterLink],
  templateUrl: './sdd-ciclo.html',
  styleUrl: './sdd-ciclo.css',
})
export class SddCicloPage {
  readonly sections: readonly TocItem[] = [
    { id: 'el-problema', label: 'El problema que resuelve' },
    { id: 'el-ciclo', label: 'El ciclo' },
    { id: 'niveles', label: 'Los tres niveles' },
    { id: 'artefactos', label: 'Los artefactos' },
  ];

  readonly levels: readonly Level[] = [
    {
      name: 'Spec-first',
      what: 'Escribes la spec antes de programar, y luego la abandonas.',
      when: 'Un script, un prototipo, algo que no vas a mantener.',
    },
    {
      name: 'Spec-anchored',
      what: 'La spec vive en el repositorio y se actualiza con el código.',
      when: 'El caso normal. Es el nivel que usa este proyecto.',
    },
    {
      name: 'Spec-as-source',
      what: 'La spec es la fuente y el código se regenera desde ella.',
      when: 'Dominios muy repetitivos: clientes de API, migraciones, formularios.',
    },
  ];

  readonly artifacts: readonly Artifact[] = [
    { file: 'constitution/mission.md', answers: '¿Qué construimos y para quién?' },
    { file: 'constitution/tech-stack.md', answers: '¿Con qué, y qué no está permitido?' },
    { file: 'constitution/roadmap.md', answers: '¿En qué orden?' },
    { file: 'features/NNN-nombre/spec.md', answers: '¿Qué hace y cuándo está terminado?' },
    { file: 'features/NNN-nombre/plan.md', answers: '¿Cómo se implementa?' },
    { file: 'features/NNN-nombre/tasks.md', answers: '¿Por dónde voy?' },
  ];

  readonly tree = `spec/
├── constitution/        ← reglas estables, cambian poco
│   ├── mission.md
│   ├── tech-stack.md
│   └── roadmap.md
└── features/            ← una carpeta por feature
    └── 001-landing/
        ├── spec.md      ← qué hace + criterios de aceptación
        ├── plan.md      ← cómo se implementa
        └── tasks.md     ← checklist de tareas`;
}
