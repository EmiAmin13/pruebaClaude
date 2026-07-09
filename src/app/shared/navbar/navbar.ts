import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private readonly theme = inject(ThemeService);

  readonly isDark = this.theme.isDark;

  /** Solo para reflejar `aria-expanded`; el estado lo posee el `Layout`. */
  readonly sidebarOpen = input(false);

  readonly menuToggle = output<void>();

  toggleTheme(): void {
    this.theme.toggle();
  }
}
