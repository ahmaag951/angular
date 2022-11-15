import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // the old way
  videoUrl = 'https://www.youtube.com/embed/OXgF9GeoX8o';
  safeUrl;
  title = 'hello-world';
  constructor(private sanitizer: DomSanitizer){
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl);
  }

  // the new way is to install @angular/youtube-player
}
