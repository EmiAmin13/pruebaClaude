import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MultiagenteLoopsPage } from './multiagente-loops';
import { expectNoA11yViolations } from '../../../testing/axe';
import { expectTocAnchorsResolve } from '../../../testing/doc-page';

describe('MultiagenteLoopsPage', () => {
  let fixture: ComponentFixture<MultiagenteLoopsPage>;
  let host: HTMLElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    fixture = TestBed.createComponent(MultiagenteLoopsPage);
    await fixture.whenStable();
    host = fixture.nativeElement as HTMLElement;
  });

  it('renderiza el título de la página', () => {
    expect(host.querySelector('h1')?.textContent).toContain('Multiagentes y loops');
  });

  it('el índice apunta a secciones que existen', () => {
    expectTocAnchorsResolve(host, fixture.componentInstance.sections.length);
  });

  it('describe los tres roles del flujo', () => {
    const rows = host.querySelectorAll('#flujo .doc-table tbody tr');

    expect(rows.length).toBe(fixture.componentInstance.roles.length);
  });

  it('el diagrama del flujo tiene alternativa textual', () => {
    const svg = host.querySelector('svg[role="img"]');

    expect(svg?.querySelector('title')?.textContent).toBeTruthy();
    expect(svg?.querySelector('desc')?.textContent).toContain('coordinador');
  });

  it('enlaza a las páginas relacionadas', () => {
    expect(host.querySelector('a[href="/sdd-ciclo"]')).not.toBeNull();
    expect(host.querySelector('a[href="/fundamentos-ia"]')).not.toBeNull();
  });

  it('no tiene violaciones de accesibilidad', async () => {
    await expectNoA11yViolations(host);
  });
});
