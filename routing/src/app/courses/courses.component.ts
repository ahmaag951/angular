import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    // when we want to get the required parameters we use this.route.paramMap
    // or we can use the snapshot if we don't have a scenario where the user can navigate back to
    // the same component
    // paramMap is the property that gives us all the params in this route it's an ovservable<ParamMap>,
    // so you can subscribe to them
    let idFromSnapshot = this.route.snapshot.paramMap.get('id');
    console.log('idFromSnapshot ' + idFromSnapshot);

    this.route.paramMap.subscribe(params => {
      console.log(params);
      // it contains keys and params, and three methods,
      // get to get a specefic param, get all to get all the params
      // has to check if there is a specefic param

      // to convert a string to number just put + before it
      let id: number = +params.get('id');
      console.log(id);
      // they are observables because angular will not destroy the component and recreate it
      // because sometimes you don't need that, for example when you in a page and you load
      // the same component each time but with different parameters, so angular will not destroy
      // that component and then recreate it just because the paramters changed, so it will be still
      // in the dom and only the parameters are changed, so that is why the params are observables
    });
    // this was for getting the required parameters
    // when we want to get the required parameters we use this.route.paramMap, or snapshot
    // when we want to get query parameters it's the same but instead we use queryParamMap
    this.route.queryParamMap.subscribe(queryParams => {
      console.log('from queryParams');
      console.log(queryParams);
    });
    // or using snapshot
    let order = this.route.snapshot.queryParamMap.get('order');
    console.log('from queryParams using snapshot');
    console.log(order);

    // when you send parameters like page and order you are mostly will come back to the same
    // component again, so in most cases you will need to subscribe to these parameters

    // what if we want to subcribe to multiple observables? queryParamMap, paramMap
    // we will create a new observable that combines the two of them using combine latest, then we
    // are going to subscribe to that observable
    // combineLatest takes an array of observables and combines them to one observable
    combineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ])
      .pipe(
        switchMap(combined => {
          // from here we can get all the required parameters
          let id = combined[0].get('id');
          // from here we can get all the optional query parameters
          let order = combined[1].get('order');

          console.log('from combined observable ' + id + ' ' + order);

          // what if we have another subscribe here to get data from the server for example
          // the code will be ugly, because you have subscribe inside subscribe,
          // but you can do this in a nicer way using map or switch map operators
          // the output of the map function, is the input to the subscribe method

          // combined type here in the next subscribe is void if map here didn't return anything, so here we returned the observable
          // but if we want this method to return the object itself instead of the observable, we use switchMap instead of map
          return combined;
        })
      )
      // here combined is an array of two elements, the first is the paramMap object and the second is
      // queryParamMap object
      .subscribe(combined => {
        console.log('combined...', combined);

      });

  }
  btnNavigateClick() {
    // the first argument is an array of link parameters, the same kind of array we use with the
    // router link directive and the 100 is the required parameters
    // and the second parameter is a navigation extra object
    this.router.navigate(['/courses', 100, 60], {
      queryParams: { page: 1, order: 'newest' }
    });
  }
}
