import { MyDialogComponent } from './my-dialog/my-dialog.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // if you used the MyDialogComponent here, you wont have to put it in the 
  // exports array
  // {
  //   path: 'mydialog',
  //   component: MyDialogComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
