import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
,  standalone: false})
export class LoadingComponent implements OnInit {

  isLoading: Subject<boolean>;
  constructor(private loaderService: LoaderService) {
    this.isLoading = this.loaderService.isLoading;
  }

  ngOnInit(): void {
  }

}

