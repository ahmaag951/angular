import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-my-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.css']
})
export class MyDialogComponent implements OnInit {

  // now we need to receive the sent data to this dialog
  // when the dialog service open this component in a dialog it's going to pass our data 
  // in the constructor, the type of data should be any, because we can pass any thing here
  constructor(
    // so angular know what to inject to this constructor because if you didn't tell
    // the constructor what to inject you will get an error because any can be anything
    // the first way to do dependency injection is by the providers array
    // and the second way is using the @Inject decorator
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    // the dialogRef is just used if you want to have reference to the dialog to close it
    // private dialogRef: MatDialogRef<MyDialogComponent>,
  ngOnInit() {
  }

}
