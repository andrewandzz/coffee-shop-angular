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
  @Output() public itemClick: EventEmitter<OrderItem>;
  public items: OrderItem[];
  public total: number;
  public isVisible: boolean;

  private readonly orderItemService: OrderItemService;
  private readonly customerGuidService: CustomerGuidService;

  public constructor(
    orderItemService: OrderItemService,
    customerGuidService: CustomerGuidService
  ) {
    this.orderItemService = orderItemService;
    this.customerGuidService = customerGuidService;
    this.itemClick = new EventEmitter<OrderItem>();
    this.items = null;
    this.total = 0;
    this.isVisible = false;
  }

  public ngOnInit(): void {
    this.updateItems();
  }

  public updateItems(): void {
    this.orderItemService.getAllByCustomerGuid(this.customerGuidService.getCustomerGuid())
      .subscribe(items => {
        this.items = items;

        if (items.length > 0) {
          this.total = items.map(item => item.coffee.price).reduce((prev, cur) => prev + cur);
        }

        this.isVisible = true;
      });
  }

  public removeItem(id: number): void {
    this.orderItemService.removeById(id)
      .subscribe(removedItem => {
        this.items = this.items.filter(item => item.id !== removedItem.id);
      });
  }

  public handleItemClick(item: OrderItem): void {
    this.itemClick.emit(item);
  }
}
