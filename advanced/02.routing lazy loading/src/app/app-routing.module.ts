import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // { path: 'test', component: AppComponent },

  { path: 'lookups', loadChildren: '../app/lookups/lookups.module#LookupsModule' },
  { path: 'test', loadChildren: '../app/test/test.module#TestModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
