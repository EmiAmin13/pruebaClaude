import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-code-block',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // El código se interpola, nunca se inyecta con [innerHTML].
  template: `
    <figure class="block">
      <figcaption class="block__bar">
        <span class="block__lang">{{ language() }}</span>
        <button type="button" class="block__copy" (click)="copy()">
          {{ copied() ? 'Copiado' : 'Copiar' }}
          <span class="visually-hidden">el bloque de código en {{ language() }}</span>
        </button>
      </figcaption>
      <pre class="block__pre"><code>{{ code() }}</code></pre>
    </figure>
  `,
  styles: `
    .block {
      margin: var(--space-4) 0 0;
      overflow: hidden;
      background-color: var(--color-code-bg);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
    }

    .block__bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-3);
      padding: var(--space-2) var(--space-3);
      border-bottom: 1px solid var(--color-border);
    }

    .block__lang {
      font-family: var(--font-mono);
      font-size: var(--fs-xs);
      letter-spacing: 0.06em;
      color: var(--color-text-muted);
      text-transform: uppercase;
    }

    .block__copy {
      padding: var(--space-1) var(--space-2);
      font-family: var(--font-mono);
      font-size: var(--fs-xs);
      color: var(--color-text-muted);
      border-radius: var(--radius-sm);
    }

    .block__copy:hover {
      color: var(--color-text);
    }

    .block__pre {
      margin: 0;
      padding: var(--space-4);
      overflow-x: auto;
      font-size: var(--fs-sm);
      line-height: 1.6;
    }
  `,
})
export class CodeBlock {
  readonly code = input.required<string>();
  readonly language = input('bash');

  readonly copied = signal(false);

  async copy(): Promise<void> {
    // `navigator.clipboard` no existe en contextos no seguros ni bajo jsdom.
    if (!navigator.clipboard) {
      return;
    }

    await navigator.clipboard.writeText(this.code());
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }
}
