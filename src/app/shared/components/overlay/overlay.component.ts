import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component} from '@angular/core';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css'],
  animations: [
    trigger('animate', [
      state('shown', style({
        opacity: 1,
        visibility: 'visible'
      })),
      state('hidden', style({
        opacity: 0,
        visibility: 'hidden'
      })),
      transition('shown <=> hidden', [
        animate('0.3s ease-in-out')
      ])
    ])
  ]
})
export class OverlayComponent {
  public isVisible: boolean;

  public constructor() {
    this.isVisible = false;
  }

  public show(): void {
    this.isVisible = true;
  }

  public hide(): void {
    this.isVisible = false;
  }
}
