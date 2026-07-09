import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { OpencodePage } from './opencode';
import { expectNoA11yViolations } from '../../../testing/axe';
import { expectTocAnchorsResolve } from '../../../testing/doc-page';

describe('OpencodePage', () => {
  let fixture: ComponentFixture<OpencodePage>;
  let host: HTMLElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    fixture = TestBed.createComponent(OpencodePage);
    await fixture.whenStable();
    host = fixture.nativeElement as HTMLElement;
  });

  it('renderiza el título de la página', () => {
    expect(host.querySelector('h1')?.textContent).toContain('OpenCode');
  });

  it('el índice apunta a secciones que existen', () => {
    expectTocAnchorsResolve(host, fixture.componentInstance.sections.length);
  });

  it('lista los comandos en una tabla', () => {
    const rows = host.querySelectorAll('#comandos .doc-table tbody tr');

    expect(rows.length).toBe(fixture.componentInstance.commands.length);
  });

  it('muestra el script de instalación oficial', () => {
    const blocks = Array.from(host.querySelectorAll('pre code')).map((el) => el.textContent);

    expect(blocks).toContain('curl -fsSL https://opencode.ai/install | bash');
  });

  it('no tiene violaciones de accesibilidad', async () => {
    await expectNoA11yViolations(host);
  });
});
