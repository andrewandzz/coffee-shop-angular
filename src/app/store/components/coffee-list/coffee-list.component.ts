import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Coffee } from '../../../shared/interfaces/coffee.interface';
import { CoffeeService } from '../../services/coffee.service';

@Component({
  selector: 'app-coffee-list',
  templateUrl: './coffee-list.component.html',
  styleUrls: ['./coffee-list.component.css']
})
export class CoffeeListComponent implements OnInit {
  @Output() public coffeeClick: EventEmitter<string>;
  public coffees: Coffee[];

  private readonly coffeeService: CoffeeService;

  public constructor(productService: CoffeeService) {
    this.coffeeService = productService;
    this.coffeeClick = new EventEmitter<string>();
  }

  public ngOnInit(): void {
    this.coffeeService.getAllForDisplay()
      .subscribe(coffees => this.coffees = coffees);
  }

  public handleClick(productName: string): void {
    this.coffeeClick.emit(productName);
  }
}
