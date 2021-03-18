import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonComponent } from './components/button/button.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { OverlayComponent } from './components/overlay/overlay.component';

@NgModule({
  declarations: [
    ButtonComponent,
    CartItemComponent,
    OverlayComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    ButtonComponent,
    CartItemComponent,
    OverlayComponent
  ]
})
export class SharedModule { }
