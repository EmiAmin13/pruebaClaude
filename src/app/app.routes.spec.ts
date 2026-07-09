import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';
import { COURSE_MODULES } from './shared/navigation';

describe('rutas de la aplicación', () => {
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    document.body.classList.remove('dark');
  });

  it('cada módulo del sidebar y la landing tiene una ruta que resuelve', async () => {
    const fixture = TestBed.createComponent(App);

    for (const module of COURSE_MODULES) {
      const navigated = await router.navigateByUrl(module.path);
      await fixture.whenStable();

      expect(navigated, `la navegación a ${module.path} falló`).toBe(true);
      expect(router.url, `${module.path} redirigió a otra ruta`).toBe(module.path);
    }
  });

  it('los enlaces del índice conservan la ruta y no vuelven a la landing', async () => {
    const fixture = TestBed.createComponent(App);
    await router.navigateByUrl('/sdd-ciclo');
    await fixture.whenStable();

    const links = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLAnchorElement>('.toc a'),
    );

    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      // Un `href="#el-ciclo"` se resolvería contra el `<base href="/">` y
      // acabaría navegando a la landing.
      expect(link.getAttribute('href')).toMatch(/^\/sdd-ciclo#.+/);
    }
  });

  it('carga de forma diferida una página distinta por ruta', async () => {
    const fixture = TestBed.createComponent(App);
    const titulos = new Set<string>();

    for (const module of COURSE_MODULES) {
      await router.navigateByUrl(module.path);
      await fixture.whenStable();

      const heading = (fixture.nativeElement as HTMLElement).querySelector('main h1');
      expect(heading, `sin <h1> en ${module.path}`).not.toBeNull();
      titulos.add(heading!.textContent!.trim());
    }

    expect(titulos.size, 'dos rutas renderizan la misma página').toBe(COURSE_MODULES.length);
  });
});
