import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TocItem } from './doc.types';

@Component({
  selector: 'app-toc',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  // `routerLink` vacío mantiene la ruta actual y solo añade el fragmento. Un
  // `href="#id"` a secas se resolvería contra el `<base href="/">` del index y
  // acabaría navegando a la landing.
  template: `
    <nav class="toc" aria-labelledby="toc-title">
      <p id="toc-title" class="spec-marker">En esta página</p>
      <ul>
        @for (item of items(); track item.id) {
          <li>
            <a [routerLink]="[]" [fragment]="item.id">{{ item.label }}</a>
          </li>
        }
      </ul>
    </nav>
  `,
  styles: `
    .toc {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
      padding: var(--space-4);
      background-color: var(--color-code-bg);
      border-radius: var(--radius-md);
    }

    ul {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
      font-size: var(--fs-sm);
    }

    @media (min-width: 1280px) {
      .toc {
        position: sticky;
        top: calc(var(--navbar-height) + var(--space-5));
      }
    }
  `,
})
export class Toc {
  readonly items = input.required<readonly TocItem[]>();
}
