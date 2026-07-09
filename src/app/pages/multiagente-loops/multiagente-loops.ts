import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlock } from '../../shared/doc/code-block';
import { DocPage } from '../../shared/doc/doc-page';
import { DocSection } from '../../shared/doc/doc-section';
import { TocItem } from '../../shared/doc/doc.types';

interface Role {
  readonly name: string;
  readonly job: string;
  readonly stage: string;
}

@Component({
  selector: 'app-multiagente-loops',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DocPage, DocSection, CodeBlock, RouterLink],
  templateUrl: './multiagente-loops.html',
  styleUrl: './multiagente-loops.css',
})
export class MultiagenteLoopsPage {
  readonly sections: readonly TocItem[] = [
    { id: 'subagentes', label: '¿Qué es un subagente?' },
    { id: 'flujo', label: 'El flujo de tres roles' },
    { id: 'loops', label: 'Loop engineering' },
    { id: 'con-sdd', label: 'Cómo encaja con SDD' },
  ];

  readonly roles: readonly Role[] = [
    {
      name: 'Coordinador',
      job: 'Lee la spec, parte el trabajo y reparte. No escribe código.',
      stage: 'tasks',
    },
    {
      name: 'Implementador',
      job: 'Recibe una tarea acotada y la resuelve en su propio contexto.',
      stage: 'implement',
    },
    {
      name: 'Verificador',
      job: 'Comprueba el resultado contra los criterios de aceptación.',
      stage: 'verify',
    },
  ];

  readonly loopExample = `Arregla todos los tests que fallan.

Repite hasta que \`npm test\` pase sin errores:
  1. Ejecuta npm test y lee el primer fallo.
  2. Arregla solo ese fallo.
  3. Vuelve a ejecutar npm test.

Si un test falla dos veces por la misma razón, para y explica por qué.`;
}
