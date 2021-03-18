import { Component, EventEmitter, Output } from '@angular/core';
import { OrderItem } from 'src/app/shared/interfaces/order-item.interface';
import { EditCoffeeComponent } from '../edit-coffee/edit-coffee.component';
import { FormInitials } from '../form-initials.interface';
import { UpdateOrderItem } from 'src/app/shared/interfaces/update-order-item.interface';
import { CoffeeService } from 'src/app/store/services/coffee.service';
import { OrderItemService } from 'src/app/shared/services/order-item.service';
import { CustomerGuidService } from 'src/app/shared/services/customer-guid.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-update-coffee',
  templateUrl: '../edit-coffee/edit-coffee.component.html',
  styleUrls: ['../edit-coffee/edit-coffee.component.css'],
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
export class UpdateCoffeeComponent extends EditCoffeeComponent {
  @Output()
  public orderItemUpdated: EventEmitter<void>;

  private orderItem: OrderItem;
  private isWaitingForResponse: boolean;

  public constructor(
    coffeeService: CoffeeService,
    orderItemService: OrderItemService,
    customerGuidService: CustomerGuidService
  ) {
    super(coffeeService, orderItemService, customerGuidService);

    this.orderItemUpdated = new EventEmitter<void>();
    this.buttonText = 'Save';
    this.isWaitingForResponse = false;
  }

  public open(orderItem: OrderItem): void {
    this.orderItem = orderItem;

    this.coffeeService.getVariants(orderItem.coffee.name)
      .subscribe(coffeeVariants => {
        const formInitials = {
          volume: orderItem.coffee.volume,
          sugar: orderItem.sugar,
          cupCap: orderItem.cupCap
        } as FormInitials;

        if (this.initModel(coffeeVariants, formInitials)) {
          this.show();
        }
      });
  }

  public handleButtonClick(): void {
    if (this.isWaitingForResponse === true) {
      return;
    }

    if (this.form.pristine) {
      this.close();
      return;
    }

    const updateOrderItem = {
      coffeeId: this.coffeeVariants.find(coffee => coffee.volume === this.form.controls.volume.value).id,
      sugar: this.form.controls.sugar.value,
      cupCap: this.form.controls.cupCap.value
    } as UpdateOrderItem;

    this.isWaitingForResponse = true;

    this.orderItemService.updateById(updateOrderItem, this.orderItem.id)
      .subscribe(_ => {
        this.close();
        this.isWaitingForResponse = false;
        this.orderItemUpdated.emit();
      });
  }
}
