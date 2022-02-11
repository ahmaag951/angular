import { Component } from '@angular/core';
import { FavoriteChangedEventArgs } from './favorite/favorite.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'this titile is changed by me';
  // onFavoriteChanged(isFavorite) {
  //   alert('onFavoriteChanged to: ' + isFavorite)
  // }
  // onFavoriteChanged(eventArgs) {
  //   alert('onFavoriteChanged to: ' + eventArgs.newValue)

  // }
  onFavoriteChanged(eventArgs: FavoriteChangedEventArgs) {
    alert('onFavoriteChanged to: ' + eventArgs.newValue)

  }
}

