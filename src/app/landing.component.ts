import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { AuthGuard } from './common/auth.guard';
import { ApiService } from './shared/api.service';
import { Config } from './common/config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'lc-landing',
  templateUrl: './landing.component.html'
})
export class LandingComponent implements OnInit {

  lat: number; lon: number; 
  isSearch: boolean; 
  searchError:string; 
  dataCamp:string;
  awsUrl:string;
  suppliedUrl:string;
  captionStr:Array<string>;
  searchHits: Object; searchTotal:number;
  private data: Observable<Response>; private res: Observable<Response>;
  
  constructor(public router: Router, private config:Config, private apiService:ApiService, private authGuard:AuthGuard, private sanitizer: DomSanitizer) {
    this.searchTotal=0;
  }

  getProfileImgURI(data){
      if(data){return this.config.mediaEndpoint+"/"+data;}else{return this.config.mediaEndpoint+"/"+this.config.defaultImage;}
  }
 
  selectSection(event) {
	this.awsUrl = this.captionStr[event];
  }
  ngOnInit() {
    if(this.authGuard.isLoggedIn()==true){
      this.router.navigate(['/feed']);
    }
    else{
		//Catch supplied URL
		// ...
		
		
		this.suppliedUrl = "cmpId1";
		
		if(this.suppliedUrl == "cmpId1") {
			this.dataCamp = "cmpId1";
			
		}
		else if(this.suppliedUrl == "cmpId2") {
			this.dataCamp = "cmpId2";
		}
		else {
			this.dataCamp = "";
		}
		
		this.captionStr = ["AL", "YG", "PL", "SS", "KZ", "BC", "MA", "CC", "TN"];
		this.awsUrl = this.captionStr[0];
		
	  this.data = this.apiService.getLocale();
      this.data.subscribe(observer =>{
        //this.lat = 51.6;
        //this.lon = -0.6333;
        this.lat = observer.json().latitude; 
        this.lon = observer.json().longitude;
        this.res = this.apiService.geoSearch(this.lat,this.lon);
          this.res.subscribe(observer =>{
            if(observer.json().hits.total==0){
              this.searchError = "Not Found";
              this.isSearch = false;
            }else{
              this.isSearch = true;
              this.searchHits = observer.json().hits.hits;
              for(let entry of observer.json().hits.hits) {
                  if(entry._type=='activitySummary'){
                    this.searchTotal++; 
                  }
              }
            }
        }); 

      });
    }
  }

}
