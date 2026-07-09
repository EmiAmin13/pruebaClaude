import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { Layout } from './layout';
import { expectNoA11yViolations } from '../../../testing/axe';

@Component({ template: 'contenido de prueba' })
class StubPage {}

describe('Layout', () => {
  let fixture: ComponentFixture<Layout>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter([{ path: '', component: StubPage }])],
    });
    fixture = TestBed.createComponent(Layout);
    await fixture.whenStable();
  });

  afterEach(() => {
    document.body.classList.remove('dark');
  });

  it('arranca con el sidebar cerrado', () => {
    expect(fixture.componentInstance.sidebarOpen()).toBe(false);
  });

  it('la hamburguesa del navbar abre y cierra el sidebar', () => {
    const menu = fixture.nativeElement.querySelector('.navbar__menu') as HTMLButtonElement;

    menu.click();
    expect(fixture.componentInstance.sidebarOpen()).toBe(true);

    menu.click();
    expect(fixture.componentInstance.sidebarOpen()).toBe(false);
  });

  it('el backdrop del sidebar lo cierra', async () => {
    fixture.componentInstance.toggleSidebar();
    await fixture.whenStable();

    (fixture.nativeElement.querySelector('.backdrop') as HTMLButtonElement).click();

    expect(fixture.componentInstance.sidebarOpen()).toBe(false);
  });

  it('cierra el sidebar al navegar', async () => {
    fixture.componentInstance.toggleSidebar();
    expect(fixture.componentInstance.sidebarOpen()).toBe(true);

    await TestBed.inject(Router).navigateByUrl('/');
    await fixture.whenStable();

    expect(fixture.componentInstance.sidebarOpen()).toBe(false);
  });

  it('expone los landmarks y el destino del skip-link', () => {
    const host = fixture.nativeElement as HTMLElement;

    expect(host.querySelector('header')).not.toBeNull();
    expect(host.querySelector('footer')).not.toBeNull();
    expect(host.querySelector('main#content')).not.toBeNull();
    expect(host.querySelector('.skip-link')?.getAttribute('href')).toBe('#content');
  });

  it('no tiene violaciones de accesibilidad con el sidebar abierto', async () => {
    fixture.componentInstance.toggleSidebar();
    await fixture.whenStable();

    await expectNoA11yViolations(fixture.nativeElement);
  });
});
