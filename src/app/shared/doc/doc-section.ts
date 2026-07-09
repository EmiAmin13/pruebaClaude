import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Sección con ancla. Centraliza el vínculo entre el `id` de la sección y el
 * enlace que genera el `Toc`, para que no se desincronicen.
 */
@Component({
  selector: 'app-doc-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <section class="section" [id]="sectionId()" [attr.aria-labelledby]="sectionId() + '-title'">
      <h2 [id]="sectionId() + '-title'" class="section__title">
        {{ title() }}
        <a class="section__anchor" [routerLink]="[]" [fragment]="sectionId()">
          <span aria-hidden="true">#</span>
          <span class="visually-hidden">Enlace permanente a {{ title() }}</span>
        </a>
      </h2>
      <div class="section__body">
        <ng-content />
      </div>
    </section>
  `,
  styles: `
    .section {
      margin-top: var(--space-8);
      scroll-margin-top: calc(var(--navbar-height) + var(--space-4));
    }

    .section__title {
      font-size: var(--fs-2xl);
      font-weight: 700;
      letter-spacing: -0.02em;
    }

    .section__anchor {
      margin-left: var(--space-2);
      font-family: var(--font-mono);
      font-size: var(--fs-lg);
      color: var(--color-text-muted);
      text-decoration: none;
      opacity: 0;
    }

    .section__title:hover .section__anchor,
    .section__anchor:focus-visible {
      opacity: 1;
    }

    .section__body {
      margin-top: var(--space-4);
    }
  `,
})
export class DocSection {
  readonly sectionId = input.required<string>();
  readonly title = input.required<string>();
}
