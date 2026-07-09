import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DocPage } from './doc-page';
import { DocSection } from './doc-section';
import { TocItem } from './doc.types';
import { expectNoA11yViolations } from '../../../testing/axe';
import { expectTocAnchorsResolve } from '../../../testing/doc-page';

const SECTIONS: readonly TocItem[] = [
  { id: 'uno', label: 'Sección uno' },
  { id: 'dos', label: 'Sección dos' },
];

@Component({
  imports: [DocPage, DocSection],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-doc-page marker="002 · Prueba" heading="Título" intro="Entradilla" [sections]="sections">
      @for (section of sections; track section.id) {
        <app-doc-section [sectionId]="section.id" [title]="section.label">
          <p>Cuerpo de {{ section.label }}</p>
        </app-doc-section>
      }
    </app-doc-page>
  `,
})
class DocPageHost {
  readonly sections = SECTIONS;
}

describe('DocPage y DocSection', () => {
  let fixture: ComponentFixture<DocPageHost>;

  beforeEach(async () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    fixture = TestBed.createComponent(DocPageHost);
    await fixture.whenStable();
  });

  it('renderiza cabecera, marcador y entradilla', () => {
    const host = fixture.nativeElement as HTMLElement;

    expect(host.querySelector('h1')?.textContent).toContain('Título');
    expect(host.querySelector('.spec-marker')?.textContent).toContain('002 · Prueba');
    expect(host.querySelector('.head__intro')?.textContent).toContain('Entradilla');
  });

  it('el índice enlaza a un id que existe en la página', () => {
    const host = fixture.nativeElement as HTMLElement;

    expectTocAnchorsResolve(host, SECTIONS.length);
  });

  it('cada sección tiene su ancla permanente sin perder la ruta actual', () => {
    const host = fixture.nativeElement as HTMLElement;
    const anchors = Array.from(host.querySelectorAll<HTMLAnchorElement>('.section__anchor'));

    for (const [index, anchor] of anchors.entries()) {
      const href = anchor.getAttribute('href')!;

      expect(href).toContain(`#${SECTIONS[index].id}`);
      expect(href.startsWith('#'), `${href} se resolvería contra el <base>`).toBe(false);
    }
  });

  it('no tiene violaciones de accesibilidad', async () => {
    await expectNoA11yViolations(fixture.nativeElement);
  });
});
