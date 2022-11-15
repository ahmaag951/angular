import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hello-world';

  public resolved(captchaResponse: string) {
    console.log('resolved captcha response', captchaResponse);
  }
}
