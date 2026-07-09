import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  afterEach(() => {
    document.body.classList.remove('dark');
  });

  it('arranca en tema claro y sin clase en body', () => {
    expect(service.isDark()).toBe(false);
    expect(document.body.classList.contains('dark')).toBe(false);
  });

  it('toggle() activa el tema oscuro y añade la clase a body', () => {
    service.toggle();

    expect(service.isDark()).toBe(true);
    expect(document.body.classList.contains('dark')).toBe(true);
  });

  it('un segundo toggle() vuelve al tema claro y retira la clase', () => {
    service.toggle();
    service.toggle();

    expect(service.isDark()).toBe(false);
    expect(document.body.classList.contains('dark')).toBe(false);
  });
});
