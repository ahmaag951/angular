import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { TestComponentComponent } from './test-component/test-component.component';

/*
there are two problems in creating component with the previous approach (manually)

1. there are too many steps, and if you forgot the second (to register the component to the module) 
step your app will break and the error will be 'componentName' is not a known element
because you are using it, and angular doesn't know about it

the better approach is by using the cli
you can reach it by opening a new cmd terminal window, or 
you can open it here with pressing (ctrl + `) it's called backtek
and write 'ng g c ComponentName(like Courses)' g => generate, c=> component
this will automatically create 4 files for you, and register the component in the module. 
the spec file is for writing unit test for this component
now you can use this component where you want in any html markup
*/

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    TestComponentComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
