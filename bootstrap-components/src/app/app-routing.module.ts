import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { CheckoutComponent } from './components/checkout/checkout.component';


const routes: Routes = [
  { path: 'sign-in', component: SignInComponent, pathMatch: 'full' },
  { path: 'checkout', component: CheckoutComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
