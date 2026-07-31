import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
,  standalone: false})
export class AppComponent {
  title = 'hello-world';

  public resolved(captchaResponse: string | null) {
    console.log('resolved captcha response', captchaResponse);
  }
}

