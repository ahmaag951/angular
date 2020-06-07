import { StorageService } from './services/storage.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hello-world';

  // we want to store normal string, number, object and array into the localstorage
  str = 'I am a normal string';
  num = 55;
  obj = { id: 1, name: 'Egypt' };
  obj2 = new Country();

  arr = ['a', 'b', 'c'];

  constructor(private storageService: StorageService) {
    this.obj2 = { id: 1, name: 'Egypt' };
    // the localStorage setItem accepts only string,
    // so for the other types we had to convert them to 'json' string
    storageService.setItem('str', this.str);
    storageService.setItem('num', this.num);
    storageService.setItem('obj', this.obj);
    storageService.setItem('obj2', this.obj2);
    storageService.setItem('arr', this.arr);

    // we have to parse the json to its original value
    console.log(storageService.getItem('str'));
    console.log(storageService.getItem('num'));
    console.log(storageService.getItem('obj'));
    console.log(storageService.getItem('obj2'));
    console.log(storageService.getItem('arr'));
  }

}

export class Country {
  id: number;
  name: string;
}