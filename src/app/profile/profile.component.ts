import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyInterestsComponent } from '../partials/my-interests.component';
import { MyOrganisationsComponent } from '../partials/my-organisations.component';
import { ProfileDetailComponent } from './profile-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService} from '../shared/api.service';

@Component({
  selector: 'lc-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
 Tab:boolean;
  someproperty1:boolean;
  someproperty2:boolean;
  constructor() {
    this.Tab= false;
    this.someproperty1 = false;
    this.someproperty2= false;
   }
  setTab($data){
    if($data){this.Tab= false;this.someproperty1 = false;this.someproperty2 = true;}
    else{this.Tab=true;this.someproperty1 = true;this.someproperty2 = false;}
  }

  ngOnInit() {
  
 }

}
