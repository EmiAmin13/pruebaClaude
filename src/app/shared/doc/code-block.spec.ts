import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CodeBlock } from './code-block';

const SNIPPET = 'npm install\nnpm run build\n  linea indentada';

describe('CodeBlock', () => {
  let fixture: ComponentFixture<CodeBlock>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(CodeBlock);
    fixture.componentRef.setInput('code', SNIPPET);
    fixture.componentRef.setInput('language', 'bash');
    await fixture.whenStable();
  });

  it('renderiza el código sin alterar espacios ni saltos de línea', () => {
    const host = fixture.nativeElement as HTMLElement;
    const code = host.querySelector('pre code') as HTMLElement;

    expect(code.textContent).toBe(SNIPPET);
  });

  it('muestra el lenguaje del bloque', () => {
    const host = fixture.nativeElement as HTMLElement;

    expect(host.querySelector('.block__lang')?.textContent?.trim()).toBe('bash');
  });

  it('copy() no falla cuando el portapapeles no está disponible', async () => {
    await expect(fixture.componentInstance.copy()).resolves.toBeUndefined();
    expect(fixture.componentInstance.copied()).toBe(false);
  });
});
