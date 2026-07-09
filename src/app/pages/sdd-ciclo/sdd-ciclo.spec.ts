import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SddCicloPage } from './sdd-ciclo';
import { expectNoA11yViolations } from '../../../testing/axe';
import { expectTocAnchorsResolve } from '../../../testing/doc-page';

describe('SddCicloPage', () => {
  let fixture: ComponentFixture<SddCicloPage>;
  let host: HTMLElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    fixture = TestBed.createComponent(SddCicloPage);
    await fixture.whenStable();
    host = fixture.nativeElement as HTMLElement;
  });

  it('renderiza el título de la página', () => {
    expect(host.querySelector('h1')?.textContent).toContain('Ciclo SDD');
  });

  it('el índice apunta a secciones que existen', () => {
    expectTocAnchorsResolve(host, fixture.componentInstance.sections.length);
  });

  it('describe los tres niveles de SDD', () => {
    const rows = host.querySelectorAll('#niveles .doc-table tbody tr');

    expect(rows.length).toBe(3);
  });

  it('el diagrama del ciclo tiene alternativa textual', () => {
    const svg = host.querySelector('svg[role="img"]');

    expect(svg?.querySelector('title')?.textContent).toContain('Ciclo');
    expect(svg?.querySelector('desc')?.textContent).toBeTruthy();
  });

  it('enlaza a la página de recursos', () => {
    const link = host.querySelector<HTMLAnchorElement>('a[href="/recursos"]');

    expect(link).not.toBeNull();
  });

  it('no tiene violaciones de accesibilidad', async () => {
    await expectNoA11yViolations(host);
  });
});
