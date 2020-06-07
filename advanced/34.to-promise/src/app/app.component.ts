import { Component } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hello-world';

  async ngOnInit() {
    let observble = of('abc')
      .pipe(
        delay(2000)
      );

    observble.subscribe(result => console.log('result from observable: ', result));

    await observble.toPromise().then(result => console.log('result from promise:', result));
    console.log('this should be logged after the result');

  }

}
