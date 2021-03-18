import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderItem } from 'src/app/shared/interfaces/order-item.interface';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {
  @Input() public item: OrderItem;
  @Input() public removable: boolean;
  @Output() public removeButtonClick: EventEmitter<void>;

  public constructor() {
    this.removable = true;
    this.removeButtonClick = new EventEmitter<void>();
  }

  public handleButtonClick(event: MouseEvent): void {
    event.stopPropagation();
    this.removeButtonClick.emit();
  }
}
