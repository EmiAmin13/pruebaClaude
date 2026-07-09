import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Card } from './card';

@Component({
  imports: [Card],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-card>
      <h2 card-title>Título</h2>
      <p>Descripción</p>
      <a card-actions href="/destino">Acción</a>
    </app-card>
  `,
})
class CardHost {}

describe('Card', () => {
  it('proyecta título, cuerpo y acciones', async () => {
    const fixture = TestBed.createComponent(CardHost);
    await fixture.whenStable();
    const card = fixture.nativeElement.querySelector('.card') as HTMLElement;

    expect(card.querySelector('h2')?.textContent).toBe('Título');
    expect(card.querySelector('p')?.textContent).toBe('Descripción');
    expect(card.querySelector('a')?.textContent).toBe('Acción');
  });
});
