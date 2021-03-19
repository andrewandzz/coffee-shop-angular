import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CartComponent } from './components/cart/cart.component';
import { CreateCoffeeComponent } from './components/coffee-customization/create-coffee/create-coffee.component';
import { UpdateCoffeeComponent } from './components/coffee-customization/update-coffee/update-coffee.component';
import { CoffeeListComponent } from './components/coffee-list/coffee-list.component';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements AfterViewInit {
  @ViewChild(CoffeeListComponent)
  private readonly coffeeList: CoffeeListComponent;
  @ViewChild(CartComponent)
  private readonly cart: CartComponent;
  @ViewChild(CreateCoffeeComponent)
  private readonly createCoffee: CreateCoffeeComponent;
  @ViewChild(UpdateCoffeeComponent)
  private readonly updateCoffee: UpdateCoffeeComponent;

  public ngAfterViewInit(): void {
    this.coffeeList.coffeeClicked.subscribe(coffeeName => {
      this.createCoffee.open(coffeeName);      
      this.disableBodyScroll();
    });

    this.cart.itemClicked.subscribe(orderItem => {
      this.updateCoffee.open(orderItem);
      this.disableBodyScroll();
    });

    this.createCoffee.orderItemCreated.subscribe(_ => this.cart.updateItems());
    this.updateCoffee.orderItemUpdated.subscribe(_ => this.cart.updateItems());
    this.createCoffee.closing.subscribe(_ => this.enableBodyScroll());
    this.updateCoffee.closing.subscribe(_ => this.enableBodyScroll());
  }

  private enableBodyScroll(): void {
    const body = window.document.body;
    body.classList.remove('no-scroll');
  }

  private disableBodyScroll(): void {
    const body = window.document.body;
    body.classList.add('no-scroll');
  }
}
