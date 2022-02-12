import { CountryComponent } from './country/country.component';
import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hello-world';
  fromAppComponent = "Hello, I'm from the app component";

  constructor(private dialog: MatDialog) {

  }

  onClick() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = { id: 5 };
    let myDialog = this.dialog.open(CountryComponent, dialogConfig);
    myDialog.afterClosed().subscribe(result => console.log('result: ', result));
  }
}
