import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CustomerGuidService } from 'src/app/shared/services/customer-guid.service';
import { OrderItem } from '../../../shared/interfaces/order-item.interface';
import { OrderItemService } from '../../../shared/services/order-item.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Output() public itemClicked: EventEmitter<OrderItem>;
  public items: OrderItem[];
  public totalPrice: number;
  public isVisible: boolean;

  private readonly orderItemService: OrderItemService;
  private readonly customerGuidService: CustomerGuidService;

  public constructor(
    orderItemService: OrderItemService,
    customerGuidService: CustomerGuidService
  ) {
    this.orderItemService = orderItemService;
    this.customerGuidService = customerGuidService;
    this.itemClicked = new EventEmitter<OrderItem>();
    this.items = null;
    this.totalPrice = 0;
    this.isVisible = false;
  }

  public ngOnInit(): void {
    this.updateItems();
  }

  public updateItems(): void {
    this.orderItemService.getAllByCustomerGuid(this.customerGuidService.getCustomerGuid())
      .subscribe(items => {
        this.items = items;
        this.updateTotalPrice();
        this.isVisible = true;
      });
  }

  public removeItem(id: number): void {
    this.orderItemService.removeById(id)
      .subscribe(removedItem => {
        this.items = this.items.filter(item => item.id !== removedItem.id);
        this.updateTotalPrice();
      });
  }

  public handleItemClick(item: OrderItem): void {
    this.itemClicked.emit(item);
  }

  private updateTotalPrice(): void {
    this.totalPrice = this.items.map(item => item.coffee.price).reduce((prev, cur) => prev + cur, 0);
  }
}
