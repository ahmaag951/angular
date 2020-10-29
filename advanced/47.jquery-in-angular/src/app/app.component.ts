import { AfterViewInit, Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'hello-world';
  // this is the link https://stackoverflow.com/a/40355691/1858417
  constructor() {

  }

  ngAfterViewInit() {

    $(document).ready(() => {

      $('#theDivId').click(() => {
        console.log($('#theDivId').text('The div was clicked!'));

        $(this).hide();
      });
    });
  }

}
