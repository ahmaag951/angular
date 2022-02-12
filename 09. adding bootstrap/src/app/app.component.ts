import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'this title is changed by me';
  IsActive = true;
  OurBackgroundColor = 'gray';
}

/**
 * to add bootstrap, go to terminal by clicking (ctrl + `) and write
 * npm install bootstrap --save
 * --save to add bootstrap as a dependency in package.json
 * now if you go to package.json you will find the dependency added like this '"bootstrap": "^4.1.3",'
 * these three numbers (4.1.3) represents (major.minor.patch)
 * the ^ means you can use the most recent major version so you can use version 4.2, 4.3, 4.9
 * but if there a new major version like version 5, they are not going to install that.
 *
 * Update npm 5:

    As of npm 5.0.0, installed modules are added as a dependency by default, so the --save option is no longer needed.
 *
 *
 * this package.json file is important when you for example want to push your project to github for example
 * you are not going to check in the node_modules folder (it includes lots of libraries) takes a fair
 * amount of space in the desk, so by listing all the dependencies inside package.json, any one who checks
 * this code from source control repository will simply go to the terminal and type
 * npm install
 * with this, npm looks at package.json and download all the dependencies in this machine

 * the last step is to import bootstrap in the main styles sheet or import it in angular.json styles array
 */
