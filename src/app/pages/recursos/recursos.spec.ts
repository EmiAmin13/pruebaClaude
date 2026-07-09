import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RecursosPage } from './recursos';
import { expectNoA11yViolations } from '../../../testing/axe';
import { expectTocAnchorsResolve } from '../../../testing/doc-page';

describe('RecursosPage', () => {
  let fixture: ComponentFixture<RecursosPage>;
  let host: HTMLElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    fixture = TestBed.createComponent(RecursosPage);
    await fixture.whenStable();
    host = fixture.nativeElement as HTMLElement;
  });

  it('renderiza el título de la página', () => {
    expect(host.querySelector('h1')?.textContent).toContain('Recursos');
  });

  it('el índice apunta a secciones que existen', () => {
    expectTocAnchorsResolve(host, fixture.componentInstance.sections.length);
  });

  it('renderiza una card por recurso', () => {
    const { material, documentation, tools } = fixture.componentInstance;
    const total = material.length + documentation.length + tools.length;

    expect(host.querySelectorAll('.cards app-card').length).toBe(total);
  });

  it('los enlaces externos usan rel=noopener', () => {
    const external = Array.from(host.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]'));

    expect(external.length).toBe(
      fixture.componentInstance.documentation.length + fixture.componentInstance.tools.length,
    );
    for (const link of external) {
      expect(link.rel, `${link.getAttribute('href')} sin rel=noopener`).toContain('noopener');
    }
  });

  it('el material del curso se sirve como descarga', () => {
    const downloads = Array.from(host.querySelectorAll<HTMLAnchorElement>('a[download]'));

    expect(downloads.map((link) => link.getAttribute('href'))).toEqual(
      fixture.componentInstance.material.map((item) => item.href),
    );
  });

  // Angular copia `public/` tal cual a la raíz del sitio, así que un nombre mal
  // escrito aquí es un 404 silencioso en producción.
  it('cada descarga existe realmente en public/', () => {
    for (const item of fixture.componentInstance.material) {
      const file = join(process.cwd(), 'public', item.href);

      expect(existsSync(file), `falta public/${item.href}`).toBe(true);
    }
  });

  it('no tiene violaciones de accesibilidad', async () => {
    await expectNoA11yViolations(host);
  });
});
