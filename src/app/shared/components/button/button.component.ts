import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() public disabled: boolean;
  @Input() public fontSize: string;

  public constructor() {
    this.fontSize = '1.3rem';
  }
}
