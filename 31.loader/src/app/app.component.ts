import { Component } from '@angular/core';
import { LoaderService } from './loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hello-world';

  constructor(private route: Router, private loaderService: LoaderService) {
console.log(loaderService.isLoading);

  }

  login() {
    
    
    this.loaderService.show();
    setTimeout(() => {    // <<<---    using ()=> syntax
      this.route.navigate(['/second']);
      this.loaderService.hide();
    }, 1500);

  }
}
