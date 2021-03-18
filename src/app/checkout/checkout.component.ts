import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CheckoutOrder } from '../shared/interfaces/checkout-order.interface';
import { CustomerGuidService } from '../shared/services/customer-guid.service';
import { OrderService } from '../shared/services/order.service';
import { ThanksComponent } from './components/thanks/thanks.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  @ViewChild(ThanksComponent)
  public thanks: ThanksComponent;

  private readonly orderService: OrderService;
  private readonly customerGuidService: CustomerGuidService;
  private readonly router: Router;

  public constructor(
    orderService: OrderService,
    customerGuidService: CustomerGuidService,
    router: Router
  ) {
    this.orderService = orderService;
    this.customerGuidService = customerGuidService;
    this.router = router;
  }

  public submit(form: FormGroup): void {
    const checkoutOrder = {
      customerName: form.controls.customerName.value
    } as CheckoutOrder;

    if (form.controls.customerPhone.value !== null) {
      checkoutOrder.customerPhone = form.controls.customerPhone.value.toString();
    }

    this.orderService.checkoutByCustomerGuid(
      this.customerGuidService.getCustomerGuid(),
      checkoutOrder
    ).subscribe(_ => this.thanks.show());
  }
}
