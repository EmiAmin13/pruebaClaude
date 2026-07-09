import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <footer class="footer">
      <p class="spec-marker">Desarrollo con IA</p>
      <p class="footer__note">
        Resumen y referencia del curso. La fuente de verdad son las specs del repositorio.
      </p>
      <nav class="footer__links" aria-label="Enlaces del pie">
        <a routerLink="/recursos">Recursos</a>
        <a href="https://opencode.ai" target="_blank" rel="noopener">OpenCode</a>
        <a href="https://context7.com" target="_blank" rel="noopener">Context7</a>
      </nav>
    </footer>
  `,
  styles: `
    .footer {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
      padding: var(--space-6) var(--space-5);
      border-top: 1px solid var(--color-border);
    }

    .footer__note {
      max-width: var(--measure);
      font-size: var(--fs-sm);
      color: var(--color-text-muted);
    }

    .footer__links {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-4);
      margin-top: var(--space-2);
      font-size: var(--fs-sm);
    }
  `,
})
export class Footer {}
