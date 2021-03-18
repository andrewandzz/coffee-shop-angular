import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared/shared.module';

import { StoreComponent } from './store.component';
import { CoffeeListComponent } from './components/coffee-list/coffee-list.component';
import { CartComponent } from './components/cart/cart.component';
import { RangeControlComponent } from './components/range-control/range-control.component';
import { CreateCoffeeComponent } from './components/coffee-customization/create-coffee/create-coffee.component';
import { UpdateCoffeeComponent } from './components/coffee-customization/update-coffee/update-coffee.component';

import { CoffeeService } from './services/coffee.service';
import { OrderService } from '../shared/services/order.service';
import { OrderItemService } from '../shared/services/order-item.service';
import { CustomerGuidService } from '../shared/services/customer-guid.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  declarations: [
    StoreComponent,
    CoffeeListComponent,
    CartComponent,
    RangeControlComponent,
    CreateCoffeeComponent,
    UpdateCoffeeComponent
  ],
  providers: [
    CoffeeService,
    OrderItemService,
    OrderService,
    CustomerGuidService
  ]
})
export class StoreModule { }
