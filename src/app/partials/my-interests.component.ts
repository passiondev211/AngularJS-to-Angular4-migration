import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../common/auth.guard';
import { Http, Response} from '@angular/http';
import { Config } from '../common/config';
import { ApiService } from '../shared/api.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
@Component({
  selector: 'lc-my-interests',
  templateUrl: './my-interests.component.html'
})
export class MyInterestsComponent implements OnInit {
  //UserPrefs:Object;
  interests: any[] = [];
  UserPrefs:any = {};
  UserProfile:any = {};
  UserProfile1:any = {};
  prefActs: any[] = [];
  tmp:Array<{tag: string, selected: boolean}>;
  private data: Observable<Response>;
  constructor(private authGuard : AuthGuard,public config:Config, private apiService:ApiService ) { }
  toggleInterestFilter(event){
    this.interests[event].selected = !this.interests[event].selected;
	this.data = this.apiService.userProfile();
	this.data.subscribe(observer => {
			this.UserProfile1 = observer.json();
			//console.log(this.UserProfile1);
			this.prefActs = [];
			for( var i = 0; i < this.interests.length; i ++){
				if(this.interests[i].selected && this.prefActs.indexOf(this.interests[i].tag)) {
					this.prefActs.push(this.interests[i].tag);
				}
			}
			this.UserProfile1.prefTag = this.prefActs;
			this.data = this.apiService.saveUserProfile(this.UserProfile1);
			this.data.subscribe(observer =>{
			});
		}
	);
	
	
  }
  ngOnInit() {
    if(this.authGuard.isLoggedIn()==true){
		this.data = this.apiService.userProfile();
		this.data.subscribe(observer => {
				this.UserProfile = observer.json().prefTag;
				this.data = this.apiService.getUserPrefs();
				this.data.subscribe(observer =>{
					this.UserPrefs.tags = observer.json().tag;  
					this.interests = [];
					for(let i in this.UserPrefs.tags){
						var isThere = false;
						if(this.UserProfile != null) {
							for(var j = 0; j < this.UserProfile.length; j++){
								if( this.UserProfile[j] == this.UserPrefs.tags[i]) {
									isThere = true;
								}
							}
						}
						this.interests.push({'tag':this.UserPrefs.tags[i],'selected':isThere});

					}
				});
			}
		);
		
    }
}
  
}
