import { Injectable } from '@angular/core';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
// you will need this injectable only if this service has dependencies in its ctor like this for example
// constructor(logService: LogService) { }
// this tells angular that this class is injectable class
// but here we don't need it, but it's already generated for us
// the component decorator internally inclues this injectable decorator
// so if you commented the injectable and error will happen 'Can't resolve all parameters for CoursesService: (?).'
// because this service depends on another
export class CoursesService {

  getCourses() {
    return ["course1", "course2", "course3"];
  }
  constructor(logService: LogService) { }
}
