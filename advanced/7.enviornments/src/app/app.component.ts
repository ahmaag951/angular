import { Component } from '@angular/core';

// make sure to always import from enviornment not enviornment.prod and let the 
// angular cli choose from the enviornement he want.
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = environment.myCustomtitle;
/*
  the change in the title property will be base on the ng serve enviornment
  the default enviornment is development
  ng serve --configuration=production or the same way ng serve --prod 

  to add new enviornemt like testing for example
  1. add enviornment.test.ts file in the enviornments
  2. in angular.json file register this enviornment in the fileReplacements array 
  This tells ng build and ng serve, “If I use the production configuration, replace the 
  contents of the environment.ts file with the contents of the environment.prod.ts file.”
  so for the new environment you need to object with the test environment

  and also add object to the configurations object in the serve object

  please note that the non development environment don't have the hot module replacement
  so, when you change someting in the code, it will not change automatically, you have to
  restart the server.
*/
}
