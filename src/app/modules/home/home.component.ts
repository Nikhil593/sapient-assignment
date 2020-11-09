import {Component , OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { SpacexDetails } from '../models/spaceX-model';
import { HomeService } from './home.service';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
  })
  export class HomeComponent implements OnInit ,OnDestroy {
    appliedYear: string;
    isLaunched: string;
    isLanded: string;
    recordLimit: number;
    subscriptions: Subscription[]=[];
    launchList: SpacexDetails[] = [];
constructor(private homeService: HomeService,
  private route : ActivatedRoute,
  private router: Router
  ){

}
ngOnInit(){
 this.getQueryParameters();
}
// fetch spacex launches details
fetchSpaceXdetails(){
  this.subscriptions.push(this.homeService.getLaunches(this.appliedYear,
    this.isLaunched,
    this.isLanded,
    this.recordLimit).subscribe((res : SpacexDetails[]) => this.launchList = res))
}

getQueryParameters() {
  this.recordLimit = 50;
  this.route.queryParamMap.subscribe((params) => {
    this.appliedYear = params.get('year');
    this.isLanded = params.get('landSucess');
    this.isLaunched = params.get('launchSucess');
    this.fetchSpaceXdetails();
  });
}
applyFilters(payload) {
  this.genericFilter(payload);
}

 genericFilter(payload) {
  this[payload.propertyName] = payload.selection.isSelected
    ? payload.selection.value
    : undefined;
  this.goToFiltersPage();
  this.fetchSpaceXdetails();
}
goToFiltersPage() {
  this.router.navigate(['/filter'], {
    queryParams: {
      year: this.appliedYear,
      launchSucess: this.isLaunched,
      landSucess: this.isLanded,
    },
  });
}
ngOnDestroy() {
  if(this.subscriptions){
    this.subscriptions.forEach(subscription =>  {if (subscription) {subscription.unsubscribe()}});
  }
   }
}