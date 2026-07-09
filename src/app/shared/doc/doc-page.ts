import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Toc } from './toc';
import { TocItem } from './doc.types';

/**
 * Cabecera y rejilla comunes a las seis páginas de contenido: marcador de spec,
 * título, entradilla e índice interno junto al cuerpo proyectado.
 */
@Component({
  selector: 'app-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Toc],
  template: `
    <header class="head">
      <p class="spec-marker">{{ marker() }}</p>
      <h1 class="head__title">{{ heading() }}</h1>
      <p class="head__intro">{{ intro() }}</p>
    </header>

    <div class="grid">
      <div class="grid__body">
        <ng-content />
      </div>

      @if (sections().length > 0) {
        <app-toc class="grid__toc" [items]="sections()" />
      }
    </div>
  `,
  styles: `
    .head {
      max-width: var(--measure);
      padding-bottom: var(--space-6);
      border-bottom: 1px solid var(--color-border);
    }

    .head__title {
      margin-block: var(--space-3) var(--space-4);
      font-size: var(--fs-3xl);
      font-weight: 700;
      line-height: 1.1;
      letter-spacing: -0.03em;
    }

    .head__intro {
      font-size: var(--fs-lg);
      color: var(--color-text-muted);
    }

    .grid__toc {
      display: block;
      margin-top: var(--space-6);
    }

    @media (min-width: 1280px) {
      .grid {
        display: grid;
        grid-template-columns: minmax(0, 1fr) 15rem;
        gap: var(--space-7);
        align-items: start;
      }

      .grid__toc {
        order: 2;
        margin-top: var(--space-8);
      }

      .grid__body {
        order: 1;
      }
    }
  `,
})
export class DocPage {
  readonly marker = input.required<string>();
  readonly heading = input.required<string>();
  readonly intro = input.required<string>();
  readonly sections = input<readonly TocItem[]>([]);
}
