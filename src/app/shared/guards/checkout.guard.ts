import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CustomerGuidService } from '../services/customer-guid.service';
import { OrderItemService } from '../services/order-item.service';

@Injectable()
export class CheckoutGuard implements CanActivate {
  private readonly orderItemService: OrderItemService;
  private readonly customerGuidService: CustomerGuidService;
  private readonly router: Router;

  public constructor(
    orderItemService: OrderItemService,
    customerGuidService: CustomerGuidService,
    router: Router
  ) {
    this.orderItemService = orderItemService;
    this.customerGuidService = customerGuidService;
    this.router = router;
  }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.orderItemService.getAllByCustomerGuid(
      this.customerGuidService.getCustomerGuid()
    ).pipe(switchMap(orderItems => {
      if (orderItems.length > 0) {
        return of(true);
      } else {
        return of(this.router.createUrlTree(['/store']));
      }
    }));
  }
}
