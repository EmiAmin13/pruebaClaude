import { ViewportScroller } from '@angular/common';
import { ApplicationRef, ComponentRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { App } from './app';
import { appConfig } from './app.config';

/**
 * Usa los providers reales de `appConfig`, no una copia: así el test cubre la
 * configuración que se envía a producción.
 *
 * El `RouterScroller` solo arranca desde el listener de bootstrap del router, y
 * ese listener se planta si el componente no es el primero de
 * `ApplicationRef.components`. Por eso aquí se arranca la app de verdad con
 * `ApplicationRef.bootstrap` en vez de usar `TestBed.createComponent`.
 */
describe('appConfig', () => {
  let host: HTMLElement;
  let componentRef: ComponentRef<App>;
  let router: Router;
  let scroller: ViewportScroller;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [...appConfig.providers] });

    host = document.createElement('app-root');
    document.body.appendChild(host);

    router = TestBed.inject(Router);
    scroller = TestBed.inject(ViewportScroller);
    componentRef = TestBed.inject(ApplicationRef).bootstrap(App, host);
  });

  afterEach(() => {
    componentRef.destroy();
    host.remove();
    document.body.classList.remove('dark');
  });

  /** El router despacha el scroll tras un `setTimeout`, fuera de Angular. */
  async function navigateAndFlushScroll(url: string): Promise<void> {
    await router.navigateByUrl(url);
    await new Promise((resolve) => setTimeout(resolve, 20));
  }

  it('vuelve arriba al cambiar de página', async () => {
    await navigateAndFlushScroll('/opencode');

    const scrollToPosition = vi.spyOn(scroller, 'scrollToPosition');
    await navigateAndFlushScroll('/recursos');

    expect(scrollToPosition).toHaveBeenCalledWith([0, 0]);
  });

  it('salta a la sección cuando la URL trae un fragmento', async () => {
    const scrollToAnchor = vi.spyOn(scroller, 'scrollToAnchor');

    await navigateAndFlushScroll('/sdd-ciclo#niveles');

    expect(scrollToAnchor).toHaveBeenCalledWith('niveles');
  });
});
