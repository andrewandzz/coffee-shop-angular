import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OverlayComponent } from 'src/app/shared/components/overlay/overlay.component';

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.css'],
  animations: [
    trigger('animate', [
      transition(':enter', [
        style({ opacity: 0, visibility: 'hidden', transform: 'scale(0.75, 0.75)' }),
        animate('0.2s ease-in-out', style({ opacity: 1, visibility: 'visible', transform: 'scale(1, 1)' }))
      ]),
      transition(':leave', [
        animate('0.2s ease-in-out', style({ opacity: 0, visibility: 'hidden', transform: 'scale(0.95, 0.95)' }))
      ])
    ])
  ]
})
export class ThanksComponent {
  @ViewChild(OverlayComponent)
  public overlay: OverlayComponent;
  public isVisible: boolean;

  private readonly router: Router;

  public constructor(router: Router) {
    this.router = router;
    this.isVisible = false;
  }

  public show(): void {
    this.overlay.show();
    this.isVisible = true;
  }

  public goHome(): void {
    this.router.navigate(['/']);
  }
}
