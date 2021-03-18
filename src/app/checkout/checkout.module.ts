import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

import { CheckoutComponent } from './checkout.component';
import { OrderComponent } from './components/order/order.component';
import { FormComponent } from './components/form/form.component';
import { ThanksComponent } from './components/thanks/thanks.component';

import { OrderService } from '../shared/services/order.service';

@NgModule({
  declarations: [
    CheckoutComponent,
    OrderComponent,
    FormComponent,
    ThanksComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [OrderService]
})
export class CheckoutModule { }
