import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Navbar } from './navbar';
import { ThemeService } from '../services/theme.service';

describe('Navbar', () => {
  let fixture: ComponentFixture<Navbar>;

  beforeEach(async () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    fixture = TestBed.createComponent(Navbar);
    await fixture.whenStable();
  });

  afterEach(() => {
    document.body.classList.remove('dark');
  });

  function menuButton(): HTMLButtonElement {
    return fixture.nativeElement.querySelector('.navbar__menu');
  }

  function themeButton(): HTMLButtonElement {
    return fixture.nativeElement.querySelector('.navbar__theme');
  }

  it('emite menuToggle al pulsar la hamburguesa', () => {
    let emitted = 0;
    fixture.componentInstance.menuToggle.subscribe(() => emitted++);

    menuButton().click();

    expect(emitted).toBe(1);
  });

  it('refleja el estado del sidebar en aria-expanded', async () => {
    expect(menuButton().getAttribute('aria-expanded')).toBe('false');

    fixture.componentRef.setInput('sidebarOpen', true);
    await fixture.whenStable();

    expect(menuButton().getAttribute('aria-expanded')).toBe('true');
  });

  it('el botón de tema invoca ThemeService y refleja aria-pressed', async () => {
    const theme = TestBed.inject(ThemeService);
    expect(themeButton().getAttribute('aria-pressed')).toBe('false');

    themeButton().click();
    await fixture.whenStable();

    expect(theme.isDark()).toBe(true);
    expect(themeButton().getAttribute('aria-pressed')).toBe('true');
  });
});
