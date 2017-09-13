import { Component, OnInit } from '@angular/core';
import { Http, Response} from '@angular/http';
import { Router } from '@angular/router';
import { Config } from '../common/config';
import { AuthGuard } from '../common/auth.guard';
import { ApiService } from '../shared/api.service';
import { MyInterestsComponent } from '../partials/my-interests.component';
import { MyOrganisationsComponent } from '../partials/my-organisations.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  selector: 'lc-feed',
  templateUrl: './feed.component.html',
  providers:[ApiService]
})
export class FeedComponent implements OnInit {
  getFeedLength:number;
  getFeed: Object; myLikedActivities: Object;
  userProfile : Object;
  firstname: string;
  statusDate:string;
  statusTime:string;
  days: Object[] = ["M","T","W","T","F","S","S"];
  months: Object[] = ["January","February", "March", "April","May","June","July","August","September","October","November","December"];
  weekDays: Object[] = ["Monday","Tuesday","Wednesday","Tursday","Friday","Saturday","Sunday"];
  
  private data: Observable<Response>;
  constructor(public router: Router, private authGuard : AuthGuard, public config:Config, private apiService:ApiService){ }
  
  getProfileImgURI(data){
      if(data){return this.config.mediaEndpoint+"/"+data;}else{return this.config.mediaEndpoint+"/"+this.config.defaultImage;}
  }
  getFeedInfo(timeStamp) {
	  var d = new Date(timeStamp);
	  this.statusDate = this.weekDays[d.getDay()-1]+', '+d.getDate()+' '+this.months[d.getMonth()]+' '+d.getFullYear();
	  var str;
	  var timehr = d.getUTCHours();
	  if (timehr > 12 )
	  {
		  timehr -= 12;
		  str = "PM";
	  }
	  else
		  str = "AM";
	  this.statusTime = timehr + ' ' + str;
	  return this.config.mediaEndpoint+"/"+this.config.defaultImage;
  }
  ngOnInit() {
    if(this.authGuard.isLoggedIn()==true){
        this.data = this.apiService.getFeed();
        this.data.subscribe(observer =>{
          if(observer.status ==200){
            this.getFeed = observer.json().event;
            this.getFeedLength = observer.json().event.length;
            //console.log(this.getFeed);
          }else{
            this.getFeed="";
            this.getFeedLength= 0;
          } 
        });

      this.data = this.apiService.getMyLikedActivities();
      this.data.subscribe(observer =>{
          this.myLikedActivities= observer.json(); 
          //console.log(this.myLikedActivities);
      });
    }
    
  }
}
