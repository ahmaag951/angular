import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hello-world from me 2';

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('ar');

    translate.get('demo.fromts').subscribe((text:string) => {console.log(text)});
  }
  

  useLanguage(language: string) {
    this.translate.use(language);
}
}
