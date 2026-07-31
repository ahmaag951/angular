import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
,  standalone: false})
export class AppComponent {
  title = 'hello-world';
  list = [
    { id: 1, name: "abc" },
    { id: 2, name: "def" },
    { id: 3, name: "jhi" },
  ];

  showDetails(animalType: HTMLElement) {
    console.log('show details');

    console.log(animalType.getAttribute('data-animal-type'));
  }

  test() {
    console.log('test');

  }
}

