import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { FundamentosIaPage } from './fundamentos-ia';
import { expectNoA11yViolations } from '../../../testing/axe';
import { expectTocAnchorsResolve } from '../../../testing/doc-page';

describe('FundamentosIaPage', () => {
  let fixture: ComponentFixture<FundamentosIaPage>;
  let host: HTMLElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    fixture = TestBed.createComponent(FundamentosIaPage);
    await fixture.whenStable();
    host = fixture.nativeElement as HTMLElement;
  });

  it('renderiza el título de la página', () => {
    expect(host.querySelector('h1')?.textContent).toContain('Fundamentos de IA');
  });

  it('el índice apunta a secciones que existen', () => {
    expectTocAnchorsResolve(host, fixture.componentInstance.sections.length);
  });

  it('compara vibe coding e ingeniería en una tabla', () => {
    const rows = host.querySelectorAll('.doc-table tbody tr');

    expect(rows.length).toBe(fixture.componentInstance.comparison.length);
  });

  it('el diagrama del LLM tiene alternativa textual', () => {
    const svg = host.querySelector('svg[role="img"]');

    expect(svg).not.toBeNull();
    expect(svg?.querySelector('title')?.textContent).toBeTruthy();
  });

  it('no tiene violaciones de accesibilidad', async () => {
    await expectNoA11yViolations(host);
  });
});
