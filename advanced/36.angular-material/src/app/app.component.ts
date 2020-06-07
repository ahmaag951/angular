import { MyDialogComponent } from './my-dialog/my-dialog.component';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormControl } from '@angular/forms';
import { ConditionalExpr } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-material-demo';
  isChecked = true;
  colors = [
    { id: 1, name: "Red" },
    { id: 2, name: "Green" },
    { id: 3, name: "Black" },
  ]

  mySelectedColor = 2; // green

  minDate = new Date(2019, 1, 1);
  maxDate = new Date(2019, 8, 1);

  isSpinnerLoading = false;

  animal: string = "this is the initial animal select";

  multipleSelect = new FormControl();
  multipleSelectList = [1, 2];
  
  multipleSelectOnChange(){
    console.log(this.multipleSelect)
  }

  constructor(private dialog: MatDialog){
    this.isSpinnerLoading = true;

    // simulate some time
    setInterval(()=>{
      this.isSpinnerLoading = false;
    }, 4000);
  }

  onChange($event) {
    console.log($event);
    this.isChecked = $event.checked;
  }

  openDialog() {
    // now you need to know how to pass data to a dialog
    const dialogRef = this.dialog.open(MyDialogComponent, {
      data: { animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result =>{
      this.animal = result;
    });
  }

  /*
  - angular material is a collection of components that give the applications a modern look 
  and feel. it's a library of high-quality UI components built with angular and typescript
  - the installation steps here https://v7.material.angular.io/guide/getting-started
  - npm install --save @angular/material @angular/cdk @angular/animations
  - cdk: component development kit, it's one of the dependencies of angular material,
  and it's a library that helps you to build awsem components for the web but without adopting
  material design visual language (a language created by google and used in google plus,
    and android)
    - the next step is to choose the theme of the angular material, if you go to node_modules
    => angular => material => prebuilt-themes, you will find 4 themes
    1. deeppurple-amber
    2. indiago-pink
    3.pink-bluegrey
    4. purple-green
    
    so you need to go to styles.css and import on of them
    - the final step is to go to app.module and import BrowserAnimationsModule if you 
    want to use animation or NoopAnimationsModule in the imports

    now you can use angular material

    - every componet in angular material is defined in a seperate module, and to know where
    each component is defined you need to go to material.angular.io to know that
    so for the checkbox it's MdCheckboxModule 
    - when you want to use a component in a module, you need to add its module to the
    module you want to use it in like app module here
  */
}
