import { Component, OnInit } from '@angular/core';
import { OrderItem } from 'src/app/shared/interfaces/order-item.interface';
import { CustomerGuidService } from 'src/app/shared/services/customer-guid.service';
import { OrderItemService } from 'src/app/shared/services/order-item.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public items: OrderItem[];
  public totalPrice: number;

  private readonly orderItemService: OrderItemService;
  private readonly customerGuidService: CustomerGuidService;

  public constructor(
    orderItemService: OrderItemService,
    customerGuidService: CustomerGuidService
  ) {
    this.orderItemService = orderItemService;
    this.customerGuidService = customerGuidService;
    this.items = null;
    this.totalPrice = 0;
  }

  public ngOnInit(): void {
    this.orderItemService.getAllByCustomerGuid(
      this.customerGuidService.getCustomerGuid()
    ).subscribe(items => {
      this.items = items;
      this.totalPrice = items.map(item => item.coffee.price).reduce((a, b) => a + b, 0);
    });
  }
}
