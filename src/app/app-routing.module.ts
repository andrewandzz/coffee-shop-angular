import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';
import { StoreComponent } from './store/store.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { CheckoutGuard } from './shared/guards/checkout.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'store', component: StoreComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [CheckoutGuard] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CheckoutGuard]
})
export class AppRoutingModule { }
