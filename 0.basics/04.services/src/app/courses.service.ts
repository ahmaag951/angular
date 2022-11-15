
// we don't have a decorator for services, so a service is a plain type script class
export class CoursesService {
    getCourses() {
        return ["course1 From Service", "course2 From Service", "course3 From Service"]
    }
    // with this implementation we can use this implementation and this logic in other places in our project
    // and this will seperate or decouple component from this logic

    // now we have a service how are we going to use it in our component
    
}