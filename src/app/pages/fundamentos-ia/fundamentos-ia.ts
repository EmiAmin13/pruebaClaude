import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CodeBlock } from '../../shared/doc/code-block';
import { DocPage } from '../../shared/doc/doc-page';
import { DocSection } from '../../shared/doc/doc-section';
import { TocItem } from '../../shared/doc/doc.types';

interface PromptPart {
  readonly name: string;
  readonly role: string;
}

interface Comparison {
  readonly aspect: string;
  readonly vibe: string;
  readonly engineering: string;
}

@Component({
  selector: 'app-fundamentos-ia',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DocPage, DocSection, CodeBlock],
  templateUrl: './fundamentos-ia.html',
  styleUrl: './fundamentos-ia.css',
})
export class FundamentosIaPage {
  readonly sections: readonly TocItem[] = [
    { id: 'que-es-un-llm', label: '¿Qué es un LLM?' },
    { id: 'tokens', label: 'Tokens, parámetros y costes' },
    { id: 'contexto', label: 'Ventana de contexto' },
    { id: 'limites', label: 'Multimodalidad y alucinaciones' },
    { id: 'prompt', label: 'Anatomía del prompt' },
    { id: 'vibe-vs-ingenieria', label: 'Vibe coding vs ingeniería' },
  ];

  readonly promptParts: readonly PromptPart[] = [
    { name: 'Rol', role: 'Quién debe ser el modelo. Acota el vocabulario y los supuestos.' },
    { name: 'Contexto', role: 'Qué información necesita para no inventarse el resto.' },
    { name: 'Tarea', role: 'Qué tiene que hacer, en un verbo y sin ambigüedad.' },
    { name: 'Restricciones', role: 'Qué no puede hacer, y los límites que debe respetar.' },
    { name: 'Formato', role: 'Cómo quieres la respuesta para poder usarla sin retocarla.' },
  ];

  readonly badPrompt = 'Mejora este componente.';

  readonly goodPrompt = `Actúa como desarrollador Angular sénior.

Contexto: este componente carga la lista de usuarios en ngOnInit con
una suscripción manual que nunca se cancela.

Tarea: reescríbelo usando signals y el patrón resource().

Restricciones: no añadas dependencias, mantén la API pública intacta
y usa ChangeDetectionStrategy.OnPush.

Formato: devuelve solo el archivo .ts completo, sin explicación.`;

  readonly comparison: readonly Comparison[] = [
    {
      aspect: 'Punto de partida',
      vibe: 'Una idea en la cabeza',
      engineering: 'Una spec escrita y acordada',
    },
    {
      aspect: 'Artefacto duradero',
      vibe: 'El código, y el chat que se pierde',
      engineering: 'La spec, el plan y las tareas',
    },
    {
      aspect: 'Verificación',
      vibe: 'Se prueba a ojo, si se prueba',
      engineering: 'Criterios de aceptación medibles',
    },
    {
      aspect: 'Repetibilidad',
      vibe: 'Cada sesión empieza de cero',
      engineering: 'El contexto vive en el repositorio',
    },
    {
      aspect: 'Cuando falla',
      vibe: 'Se vuelve a pedir con otras palabras',
      engineering: 'Se corrige la spec y se reimplementa',
    },
  ];
}
