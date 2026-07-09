import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Sidebar } from './sidebar';
import { COURSE_MODULES } from '../navigation';

describe('Sidebar', () => {
  let fixture: ComponentFixture<Sidebar>;

  beforeEach(async () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    fixture = TestBed.createComponent(Sidebar);
    await fixture.whenStable();
  });

  async function setOpen(open: boolean): Promise<void> {
    fixture.componentRef.setInput('isOpen', open);
    await fixture.whenStable();
  }

  it('lista Inicio más cada módulo del curso', () => {
    const links = fixture.nativeElement.querySelectorAll('.sidebar__link');

    expect(links.length).toBe(COURSE_MODULES.length + 1);
  });

  it('no muestra el backdrop cuando está cerrado', () => {
    expect(fixture.nativeElement.querySelector('.backdrop')).toBeNull();
  });

  it('el backdrop emite closeRequested al pulsarlo', async () => {
    await setOpen(true);
    let emitted = 0;
    fixture.componentInstance.closeRequested.subscribe(() => emitted++);

    fixture.nativeElement.querySelector('.backdrop').click();

    expect(emitted).toBe(1);
  });

  it('marca el aside como abierto según el input', async () => {
    const aside = fixture.nativeElement.querySelector('.sidebar') as HTMLElement;
    expect(aside.classList.contains('sidebar--open')).toBe(false);

    await setOpen(true);

    expect(aside.classList.contains('sidebar--open')).toBe(true);
  });

  it('Escape emite closeRequested solo si está abierto', async () => {
    let emitted = 0;
    fixture.componentInstance.closeRequested.subscribe(() => emitted++);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(emitted).toBe(0);

    await setOpen(true);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(emitted).toBe(1);
  });
});
