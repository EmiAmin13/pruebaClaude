import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Landing } from './landing';
import { COURSE_MODULES } from '../../shared/navigation';
import { expectNoA11yViolations } from '../../../testing/axe';

describe('Landing', () => {
  let fixture: ComponentFixture<Landing>;

  beforeEach(async () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    fixture = TestBed.createComponent(Landing);
    await fixture.whenStable();
  });

  it('renderiza el hero con título y llamada a la acción', () => {
    const host = fixture.nativeElement as HTMLElement;

    expect(host.querySelector('h1')?.textContent).toContain('Desarrollo con IA');
    expect(host.querySelector('.hero__cta')?.getAttribute('href')).toBe('/fundamentos-ia');
  });

  it('renderiza una card por cada módulo del curso', () => {
    const host = fixture.nativeElement as HTMLElement;
    const cards = host.querySelectorAll('.checklist app-card');

    expect(cards.length).toBe(COURSE_MODULES.length);
  });

  it('enlaza cada módulo a su ruta', () => {
    const host = fixture.nativeElement as HTMLElement;
    const links = Array.from(host.querySelectorAll<HTMLAnchorElement>('.checklist__link'));

    expect(links.map((link) => link.getAttribute('href'))).toEqual(
      COURSE_MODULES.map((module) => module.path),
    );
  });

  it('muestra el resumen de cada módulo', () => {
    const host = fixture.nativeElement as HTMLElement;
    const summaries = Array.from(host.querySelectorAll<HTMLElement>('.checklist__summary'));

    expect(summaries.map((element) => element.textContent?.trim())).toEqual(
      COURSE_MODULES.map((module) => module.summary),
    );
  });

  it('no tiene violaciones de accesibilidad', async () => {
    await expectNoA11yViolations(fixture.nativeElement);
  });
});
