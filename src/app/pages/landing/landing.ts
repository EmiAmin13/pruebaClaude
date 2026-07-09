import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Card } from '../../shared/card/card';
import { COURSE_MODULES } from '../../shared/navigation';

@Component({
  selector: 'app-landing',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Card],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {
  readonly modules = COURSE_MODULES;
}
