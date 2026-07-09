import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { COURSE_MODULES } from '../navigation';

@Component({
  selector: 'app-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
  host: {
    '(document:keydown.escape)': 'onEscape()',
  },
})
export class Sidebar {
  readonly modules = COURSE_MODULES;

  readonly isOpen = input(false);

  readonly closeRequested = output<void>();

  onEscape(): void {
    if (this.isOpen()) {
      this.closeRequested.emit();
    }
  }
}
