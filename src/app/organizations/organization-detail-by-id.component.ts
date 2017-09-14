import { Component, ViewChild, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Config } from '../common/config';
import { ApiService } from '../shared/api.service';
import { AuthGuard } from '../common/auth.guard';
import { ImageCropperComponent, CropperSettings, Bounds} from 'ng2-img-cropper';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { MyInterestsComponent } from '../partials/my-interests.component';
import { MyOrganisationsComponent } from '../partials/my-organisations.component';
import { DatePickerComponent,IDatePickerConfig } from 'ng2-date-picker';

import {FormControl  } from '@angular/forms';

@Component({
  selector: 'lc-organization-detail-by-id',

  templateUrl: './organization-detail-by-id.component.html'
})
export class OrganizationDetailByIdComponent implements OnInit {
private today = new Date();
private dd: any = this.today.getDate();
private mm: any = this.today.getMonth()+1;
private year: any = this.today.getFullYear();
 public dateAvailable: any;
 public dateExpires : any;
 public dateAvailable1: any;
 public dateExpires1 : any;
 public dateAvailable2: any;
 public dateExpires2 : any;

dateString:string;
timeValue: Date ;
public date:Date = new Date;
 public initialValue: Date=new Date;
 public selectedDate1: Date=new Date;
 public initialValue1: Date=new Date;
 timePickerControl:FormControl;
 hourStep : number = 1;
 minuteStep : number = 1;
 showMeridian : boolean = true;
 mousewheel :boolean = true ;
 arrowkeys : boolean = true ;
 showSpinners : boolean = false;
 min : Date;
 max : Date;
 initDate:Date;
  getFeedLength: number;
  getFeed: Object;
  numarray: number[];
  activityCount: number;
  loading:boolean;
  selectedDate: string;
  orgImage: string; id:string; orgName:string; userId: string; isOwner:Object; eposId:string; status:string; orgActivities:Object; MyOrgs:Object;
  isLoggedIn: boolean; eventType:boolean; priceStatus:boolean; activityType:'DAILY';
  private editingOrg = false;
  private addingAct = false;
  selectedCurrency:string;
  getOrg:Object; UserPrefs:Object; currencies:Object;
  private data: Observable<Response>;
  lat:number;lon:number;
  data2:any;
  file:File;
  file_name:string;
  textLen: number;
  textInputEn: boolean;
  statusDate:string;
  statusTime:string;
  edited:boolean;
  edited1;boolean;
  date1:Date;
  date2:Date;
  datepickeroptions :IDatePickerConfig;
  formatDate:string;
  days: Object[] = ["M","T","W","T","F","S","S"];
  months: Object[] = ["January","February", "March", "April","May","June","July","August","September","October","November","December"];
  weekDays: Object[] = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  selectedDays: Object[] = [false,false,false,false,false,false,false];;
  cropperSettings2:CropperSettings;
  @ViewChild('cropper', undefined) cropper:ImageCropperComponent;
  @ViewChild('imageModal') imgModal:any;

  constructor(public config:Config, private apiService:ApiService, private router: Router, private route: ActivatedRoute, private authGuard : AuthGuard) {
	this.activityType = 'DAILY';
    this.eventType = true;
    this.priceStatus= true;
    this.isLoggedIn = authGuard.isLoggedIn();
    this.id = route.snapshot.params['id'];
    this.userId =  localStorage.getItem('userId');
    this.status = "false";
    //Cropper settings 2
    this.cropperSettings2 = new CropperSettings();
    this.cropperSettings2.width = 200;
    this.cropperSettings2.height = 200;
    this.cropperSettings2.keepAspect = false;

    this.cropperSettings2.croppedWidth = 200;
    this.cropperSettings2.croppedHeight = 200;

    this.cropperSettings2.canvasWidth = 500;
    this.cropperSettings2.canvasHeight = 300;

    this.cropperSettings2.minWidth = 100;
    this.cropperSettings2.minHeight = 100;

    this.cropperSettings2.rounded = true;
    this.cropperSettings2.minWithRelativeToResolution = false;

    this.cropperSettings2.cropperDrawSettings.strokeColor = 'rgba(255,125,125,1)';
    this.cropperSettings2.cropperDrawSettings.strokeWidth = 2;
    this.cropperSettings2.noFileInput = true;

    //console.log('event_type',this.eventType);

    this.data2 = {};
    this.timeValue = new Date();
  }

  eventT(){
    this.eventType = !this.eventType;
     this.date = new Date();
        this.dateString = this.date.toUTCString().substring(5,16);
        this.dateAvailable = this.dateString;
        this.dateExpires1 = this.dateString;
        this.dateAvailable1 = this.dateString;
        this.dateExpires2 = this.dateString;
        this.dateAvailable2 = this.dateString;
        //console.log(this.dateAvailable);
        //console.log("__________date______");
  }
  public showTimepicker1(){
            if( this.edited == true )
                        this.edited = false;
              else this.edited = true;
  }
  public showTimepicker2(){
              if( this.edited1 == true )
                          this.edited1 = false;
                else this.edited1 = true;
    }

  activityState(activityType){
    this.activityType = activityType.value;
  }
  priceStat(){
        this.priceStatus= !this.priceStatus;

        /*this.date = new Date();
        this.dateString = this.date.toUTCString().substring(5,16);
        this.dateAvailable = this.dateString;
        this.dateExpires1 = this.dateString;
        this.dateAvailable1 = this.dateString;
        this.dateExpires2 = this.dateString;
        this.dateAvailable2 = this.dateString;*/
        //console.log(this.dateAvailable);
  }
  toggleDay(i){
    this.selectedDays[i] = !this.selectedDays[i];
  }

  getProfileImgURI(data){
      if(data){return this.config.mediaEndpoint+"/"+data;}else{return this.config.mediaEndpoint+"/"+this.config.defaultImage;}
  }

  likeOrg(id){
  }

  edit(){this.editingOrg = !this.editingOrg;}

  cancel(){this.editingOrg = false;}

  saveOrg(form:NgForm){
    form.value.id = this.id;
    form.value.adminId = [localStorage.getItem('userId')];
    form.value.contact = { "telephone":form.value.telephone, "email": form.value.email   };
    delete form.value.email;
    delete form.value.telephone;
    this.data = this.apiService.updateOrg(this.id,form.value);
    this.data.subscribe(observer =>{
      if(observer.ok == true){
        this.editingOrg = false;
      }else{
        this.status="Error";
      }
    });
  }

  saveActivity(form:NgForm){
    form.value.adminId = [localStorage.getItem('userId')];
    form.value.location = { "lat": this.lat, "lon": this.lon   };
    var tmp1 = this.initialValue.toUTCString().substring(17,22);
    var tmp2 = this.initialValue1.toUTCString().substring(17,22);
    if(this.eventType){
      if(!this.dateAvailable){
        this.dateAvailable = (new Date()).toUTCString();
      }
      var tmp = this.dateAvailable;
            
      form.value.oneDayDetails = { "date":tmp, "fromTime": tmp1, "toTime": tmp2};
    }else{      
    console.log(this.dateAvailable1);
      console.log(form.value.dateAvailable1);
      form.value.term = {"start":form.value.dateAvaliable1, "end":form.value.dateAvaliable2, "fromTime":tmp1, "toTime":tmp2, "repeats":form.value.repeats, "days": []}
      if(form.value.repeats == "DAILY"){
        //delete form.value.term.days;
      }

      if(form.value.repeats == "WEEKLY"){
        for(let i in this.selectedDays){
          if(this.selectedDays[i]){
            form.value.term.days.push({"day":this.weekDays[i]});
          }
        }
      }
    }
    if(form.value.amount!=""){
      form.value.price = [{"amount":form.value.amount,"description": "Adult","currency": form.value.currency}];
    }
    if(!form.value.amount){
      form.value.price = [{"amount":0, "description":"Adult", "currency":"USD"}];
    }
    if(form.value.tag != ""){
      form.value.tag = [form.value.tag];
    }
    delete form.value.activityType;
    delete form.value.fromDate;
    delete form.value.toDate;
    if(form.value.maxAttenders == ""){
      delete form.value.maxAttenders;
    }
    delete form.value.date;
    delete form.value.fromTime;
    delete form.value.toTime;
    delete form.value.amount;
    
    delete form.value.currency;
    //delete form.value.tag;
    delete form.value.fromDate;
    delete form.value.toDate;
    delete form.value.repeats;
//console.log(form.value);
    this.data = this.apiService.newActivity(form.value);

    this.data.subscribe(observer =>{
      //console.log(observer);

      if(observer.ok==true){
        this.status = "Successfully Added";
        this.data = this.apiService.getOrgActivities(this.id);
        this.data.subscribe(observer =>{
          if(observer.status==200){
            this.orgActivities = observer.json().activitySummaries;
			this.activityCount = Object.keys(this.orgActivities).length;
          }
        });
      }
    });

  }

  viewAll(){

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
  
  textChange(form:NgForm, $event) {
	this.textLen = form.value.status.length; 
  }
  
  fileChange(form:NgForm, $event) {	
	var image:any = new Image();
    this.file = $event.target.files[0];
	this.file_name = form.value.statusImage;
    var myReader:FileReader = new FileReader();
    var that = this;
    myReader.onloadend = function (loadEvent:any) {
        image.src = loadEvent.target.result;
        that.cropper.setImage(image);
    };
    myReader.readAsDataURL(this.file);
}

  addAStatus(form1:NgForm, for1:NgForm){
	  this.loading = true;
	  
	for1.value.author = {"id":this.id, "name":this.orgName};
    for1.value.creator = "ORG";    
    for1.value.text = form1.value.status;
	//console.log(form1.value.statusImage);
    this.data = this.apiService.orgCreateStatus(this.id, for1.value, this.file);
    this.data.subscribe(observer =>{
		 if(observer.status==200){
			this.data = this.apiService.getFeed();
			this.data.subscribe(observer =>{
			  if(observer.status==200){
				this.getFeed = observer.json().event;
				this.getFeedLength = observer.json().event.length;
				this.file_name = "";
				this.file = null;
			  }else{
				this.getFeed = "";
				this.getFeedLength = 0;
				this.file_name = "";
				this.file = null;
				form1.value.status = "";
			  }
			  this.loading = false;
			});
		 }
    });
    
  }

  activity_left_show() {
	if( this.numarray[0] > 0 )
	{
		this.numarray[0] --;this.numarray[1] --; this.numarray[2] --;
	}
  }
  activity_right_show() {
	if( this.numarray[2] < this.activityCount - 1 )
	{
		this.numarray[0] ++;this.numarray[1] ++; this.numarray[2] ++;
	}
	
  }
  
  onSubmit(form:NgForm){
    //console.log(form.value);
    if(form.value.status == "add"){
     var data3 = {
        type: 'PAYPAL',
        optionFields: [{
          field: 'paypalEmail',
          value: form.value.email
        }]
      };
      this.data = this.apiService.orgAddPaymentAccount(this.id, data3);
      this.data.subscribe(observer =>{
        if(observer.ok==true){
          //console.log(this.isOwner);
          this.status = "Successfully Added";
        }
      });
    }else{

      this.data = this.apiService.getOrgPayment(this.id);
      this.data.subscribe(observer =>{
        if(observer.ok == true){
          this.eposId = observer.json().option[0].id;
          var data3 = {
            id: this.eposId,
            type: 'PAYPAL',
            optionFields: [{
              field: 'paypalEmail',
              value: form.value.email
            }]
          };
          this.data = this.apiService.orgEditPaymentAccount(this.id, this.eposId, data3);
          this.data.subscribe(observer =>{
            if(observer.ok== true){
              //console.log(observer);
              this.status = "Successfully Updated";
            }
          });
        }
      });


    }
  }

  cropped(bounds:Bounds) {
     //console.log(bounds);
  }

  fileChangeListener($event) {
      var image:any = new Image();
      this.file = $event.target.files[0];
      var myReader:FileReader = new FileReader();
      var that = this;
      myReader.onloadend = function (loadEvent:any) {
          image.src = loadEvent.target.result;
          that.cropper.setImage(image);
      };
      myReader.readAsDataURL(this.file);
  }

  uploadImg(){
    var fb:any = this.file.name;

    this.data = this.apiService.orgUploadProfileImage(this.id, this.file);
    this.data.subscribe(observer =>{
        console.log(observer.json());
		this.orgImage = this.getProfileImgURI(observer.json().uri);
		this.imgModal.hide();
	});
  }

  ngOnInit() {
        this.formatDate = "DD-MMMM-YYYY";
        this.datepickeroptions ={
            firstDayOfWeek : "mo",
            format : "DD MMMM YYYY"  ,
            monthFormat : "MMMM-YYYY" ,
            yearFormat : "YYYY" ,
        }            ;
        this.date = new Date();
        this.dateString = this.date.toUTCString().substring(5,16);
        this.dateExpires = this.dateString;
        this.dateAvailable = this.dateString;
        this.dateExpires1 = this.dateString;
        this.dateAvailable1 = this.dateString;
        this.dateExpires2 = this.dateString;
        this.dateAvailable2 = this.dateString;
        console.log("here");
        this.selectedDate1 = new Date();
        this.initDate = new Date();
        this.initialValue = new Date();
        this.initialValue1 = new Date();
	    this.textLen = 0;
	    this.loading = false;
    if(this.authGuard.isLoggedIn()==true){
      if(this.id){
        this.data = this.apiService.getOrg(this.id);
        this.data.subscribe(observer =>{
          if(observer.ok==true){
            this.getOrg= [observer.json()];
			//console.log(this.getOrg);
			this.orgName = observer.json().name;
            this.isOwner = observer.json().adminId.indexOf(this.userId) > -1;
            if(observer.json().profileImgURI){
              this.orgImage = this.getProfileImgURI(observer.json().profileImgURI);
            }else{
              this.orgImage = this.getProfileImgURI('');
            }
          }
        });

        this.data = this.apiService.getOrgActivities(this.id);
        this.data.subscribe(observer =>{
          if(observer.status==200){
            this.orgActivities = observer.json().activitySummaries;
			this.numarray = [0, 1, 2];
			this.activityCount = Object.keys(this.orgActivities).length;
          }
        });

        this.data = this.apiService.getFeed();
        this.data.subscribe(observer =>{
          if(observer.status==200){
            this.getFeed = observer.json().event;
			//console.log(this.getFeed);
            this.getFeedLength = observer.json().event.length;
          }else{
            this.getFeed = "";
            this.getFeedLength = 0;
          }
        });
      }else{
        this.getOrg = "Error";
      }

      this.data = this.apiService.getMyOrgs();
      this.data.subscribe(observer => {
        this.MyOrgs = observer.json().orgSummary;
      });

      this.data = this.apiService.getUserPrefs();
      this.data.subscribe(observer =>{
          this.UserPrefs= observer.json().tag;
      });
    }else{
      if(this.id){
        this.data = this.apiService.getOrgAnonymous(this.id);
        this.data.subscribe(observer =>{
          if(observer.ok==true){
            this.getOrg= [observer.json()];
            this.isOwner = "";
			this.orgName = observer.json().name;
            if(observer.json().profileImgURI){
              this.orgImage = this.getProfileImgURI(observer.json().profileImgURI);
            }else{
              this.orgImage = this.getProfileImgURI('');
            }
          }
        });

        this.data = this.apiService.getOrgActivities(this.id);
        this.data.subscribe(observer =>{
          if(observer.status==200){
            this.orgActivities = observer.json().activitySummaries;
          }
        });
      }else{
        this.getOrg = "Error";
      }
    }

    this.currencies = ["EUR","USD","GBP","AUD","NZD","CHR"];
    this.data = this.apiService.getLocale();
    this.data.subscribe(observer =>{
        this.lat = observer.json().latitude;
        this.lon = observer.json().longitude;
    });
    localStorage.setItem("orgId", this.id);
  }

}
