import { DOCUMENT, Injectable, inject, signal } from '@angular/core';

/**
 * El tema vive en un servicio porque muta `<body>`, es decir, estado fuera del
 * árbol de componentes. El estado del sidebar, en cambio, es local al `Layout`.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly darkMode = signal(false);

  readonly isDark = this.darkMode.asReadonly();

  toggle(): void {
    this.darkMode.update((dark) => !dark);
    this.document.body.classList.toggle('dark', this.darkMode());
  }
}
