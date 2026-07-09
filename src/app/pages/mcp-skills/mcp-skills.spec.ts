import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { McpSkillsPage } from './mcp-skills';
import { expectNoA11yViolations } from '../../../testing/axe';
import { expectTocAnchorsResolve } from '../../../testing/doc-page';

describe('McpSkillsPage', () => {
  let fixture: ComponentFixture<McpSkillsPage>;
  let host: HTMLElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    fixture = TestBed.createComponent(McpSkillsPage);
    await fixture.whenStable();
    host = fixture.nativeElement as HTMLElement;
  });

  it('renderiza el título de la página', () => {
    expect(host.querySelector('h1')?.textContent).toContain('MCP y Skills');
  });

  it('el índice apunta a secciones que existen', () => {
    expectTocAnchorsResolve(host, fixture.componentInstance.sections.length);
  });

  it('los ejemplos de configuración MCP son JSON válido', () => {
    const { remoteMcp, localMcp } = fixture.componentInstance;

    expect(() => JSON.parse(remoteMcp)).not.toThrow();
    expect(() => JSON.parse(localMcp)).not.toThrow();
  });

  it('los enlaces externos se abren de forma segura', () => {
    const external = Array.from(host.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]'));

    expect(external.length).toBeGreaterThan(0);
    for (const link of external) {
      expect(link.rel, `${link.href} sin rel=noopener`).toContain('noopener');
    }
  });

  it('no tiene violaciones de accesibilidad', async () => {
    await expectNoA11yViolations(host);
  });
});
