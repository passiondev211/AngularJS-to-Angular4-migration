import { Component, OnInit } from '@angular/core';
import { Http ,Headers, Response} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Config } from '../common/config';
import { NgForm } from '@angular/forms';
import { AuthGuard } from '../common/auth.guard';
import { ApiService } from '../shared/api.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { MyInterestsComponent } from '../partials/my-interests.component';
import { MyOrganisationsComponent } from '../partials/my-organisations.component';
import {FormControl  } from '@angular/forms';
import { DatePickerComponent,IDatePickerConfig } from 'ng2-date-picker';
import { ImageCropperComponent, CropperSettings, Bounds} from 'ng2-img-cropper';
import { Enrollment } from './activity.enrollment';

@Component({
  selector: 'lc-activites',
  templateUrl: './activites.component.html'
})

export class ActivitesComponent implements OnInit {
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
 public enrollment : any;
 public paypal : any;
 public isEnrolled: boolean = false;
 public currency:string;
timeValue: Date ;
public date:Date = new Date;
 public initialValue: any = (new Date()).toLocaleString();
 public selectedDate1: Date=new Date;
 public initialValue1: any  = (new Date()).toLocaleString();
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
  amount:number;
  getFeedLength: number;
  getFeed: Object;
  numarray: number[];
  activityCount: number;
  loading:boolean;
  selectedDate: string;
  orgImage: string; id:string; orgName:string; userId: string; isOwner:Object; eposId:string; status:string; orgActivities:Object; 
  isLoggedIn: boolean; eventType:boolean; priceStatus:boolean; activityType:string;
  private editingOrg = false;
  private addingAct = false;
  selectedCurrency:string;
  getOrg:Object; UserPrefs:Object; currencies:Object;
  lat:number;lon:number;
  data2:any;
  file:File;
  file_name:string;
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
  selectedDays: Object[] = [false,false,false,false,false,false,false];
  originDays: Object[] = [false,false,false,false,false,false,false];
  cropperSettings2:CropperSettings;
  
  textLen:number;
  actName: string;
  getActivity:Object; getActProfileImgURI:Object; price:Object; tag:Object; MyOrgs:Object; feedItems:Object;curTag:string;
  private data: Observable<Response>;
  private feedData: Observable<Response>;

  constructor(public router: Router, private route: ActivatedRoute, private authGuard : AuthGuard, public config:Config, private apiService:ApiService) {
this.activityType = 'WEEKLY';
    this.eventType = false;
    this.priceStatus= true;
    this.isLoggedIn = authGuard.isLoggedIn();
    this.id = route.snapshot.params['id'];
    this.userId =  localStorage.getItem('userId');
    this.status = "false";
    this.isEnrolled = false;
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

    this.enrollment={};
    this.paypal={};
    this.data2 = {};
    this.timeValue = new Date();
    this.id = route.snapshot.params['id'];
    this.userId =  localStorage.getItem('userId');
  }
  changeValue($data, $data1, $data2 ,$data3,$data4,$data5,$data6,$data7,$data8) { 
        if($data ==null){
          this.eventType = false;
          this.date = new Date($data2);
          this.dateAvailable2 = this.date;
          this.date = new Date($data1);
          this.dateAvailable1 = this.date;

        }
        else{
          this.date = new Date($data);
          this.dateAvailable = this.date;
          this.eventType = true;
        }
        // console.log("eventType",this.eventType);
        // console.log("activityType", this.activityType);
        if(this.eventType==false){
          this.dateString = this.date.toUTCString().substring(18,22);
          this.initialValue1 = (new Date(this.date.toUTCString().replace(this.date.toUTCString().substring(17,22),$data4.toString()))).toUTCString();
          this.dateString = this.date.toUTCString().substring(18,22);
          this.initialValue = (new Date(this.date.toUTCString().replace(this.date.toUTCString().substring(17,22),$data3.toString()))).toUTCString();
        }else{
          this.dateString = this.date.toUTCString().substring(18,22);
          this.initialValue1 = (new Date(this.date.toUTCString().replace(this.date.toUTCString().substring(17,22),$data6.toString()))).toUTCString();
          this.dateString = this.date.toUTCString().substring(18,22);
          this.initialValue = (new Date(this.date.toUTCString().replace(this.date.toUTCString().substring(17,22),$data5.toString()))).toUTCString();
        }
        this.initialValue = this.initialValue.substring(0, 22);
        this.initialValue1 = this.initialValue1.substring(0, 22);
        this.amount = $data7;
      }
  eventT($data, $data1, $data2){
        this.date = new Date();
        this.dateString = this.date.toUTCString().substring(5,16);
        this.dateAvailable = this.dateString;
        this.dateAvailable1 = this.dateString;
        this.dateAvailable2 = this.dateString;
        if($data ==null){
          this.date = new Date($data2);
          this.dateAvailable2 = this.date;
          this.date = new Date($data1);
          this.dateAvailable1 = this.date;
        }
        else{
          this.date = new Date($data);
          this.dateAvailable = this.date;
        }
        // console.log(this.eventType);
        // console.log(this.dateAvailable);
        console.log("__________date______");
        this.eventType = !this.eventType;
        // console.log(this.eventType);
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
  getProfileImgURI($data){
      if($data){return this.config.mediaEndpoint+"/"+$data;}else{return this.config.mediaEndpoint+"/"+this.config.defaultImage;}
  }
  
  fileChange(form:NgForm, $event) {	
	var image:any = new Image();
    this.file = $event.target.files[0];
	this.file_name = form.value.statusImage;
  }
  
  textChange(form:NgForm, $event) {
	  this.textLen = form.value.status.length;
  }
  
  priceStat(){
        this.priceStatus= !this.priceStatus;
  }
  activityState(activityType){
    if(activityType.value)
      this.activityType = activityType.value;
  }
   toggleDay(i){
    this.selectedDays[i] = !this.selectedDays[i];
  }
  addAStatus(form1:NgForm, for1:NgForm){
	  this.loading = true;
	for1.value.author = {"id":this.id, "name":this.actName};
    for1.value.creator = "ACTIVITY";    
    for1.value.text = form1.value.status;
	//console.log(form1.value.statusImage);
    this.data = this.apiService.actCreateStatus(this.id, for1.value, this.file);
    this.data.subscribe(observer =>{
		 if(observer.status==200){
		/*	this.data = this.apiService.getFeed();
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
			});*/
		 }
    });
    
  }
  togglePrice(price){
    this.enrollment['price'] = price[0].amount;
    // console.log(price);
    // console.log(this.enrollment['price']);
  }
  createEnrollment(total) {
    var e = new Enrollment(this.id, this.apiService, this.data);
    e.userId = this.userId;
    e.total = total;
    return e;
  }
  sendGAEnrolAction(price, aid, method, currency) {
    // event('Activity', 'enrol', {
    //   'dimension2': aid,
    //   'dimension4': method,
    //   'dimension5': currency,
    //   'metric2': price,
    // });
    window.location.href = location.origin + '/actvityenrolled';
  }
  enroll() {
    if (this.enrollment['price'] > 0) {
      this.paypal = {};
    } else {
      var e = this.createEnrollment(this.enrollment['price']);
      console.log('e',e);
      this.data = e.send();
      this.data.subscribe(observer=>{
        if(observer.status == 200){
          this.sendGAEnrolAction(this.enrollment['price'],this.id,e.METHODS.CASH, 'USD');
          this.isEnrolled = true;
        }
      });
      // console.log(result);
      // if(result=='success'){//success
      //   sendGAEnrolAction(this.enrollment.price, this.aid, Enrollment.METHODS.CASH, 'USD');
      //   console.log('here is it');
      //   this.isEnrolled = true;
      // }
    }
  }
  
  enrollmentPayment(type,close){
    var d = {
      activityId: this.id,
      // amount: $scope.enrollment.price,
      currency: 'USD',
      epoType: 'PAYPAL' // In the future this could also be a credit enum
    };

    var e = this.createEnrollment(this.enrollment['price']);

    if (type == 'paypal') {
      this.data = e.send();
      this.data.subscribe(observer =>{
        console.log('observer', observer.json());
        if(observer.status ==200){
          this.paypal['paykey'] = observer.json().paykey;
          window.location.href = this.config.paypalEndpoint + '?cmd=_ap-payment&paykey=' + observer.json().payKey;
        }
      });
    } else if (type == 'cash') {
      e.transMethod = e.METHODS.CASH;
      this.data = e.send();
      this.data.subscribe(observer=>{
        if(observer.status == 201){
          this.sendGAEnrolAction(this.enrollment['price'], this.id, e.METHODS.CASH, 'USD');
        }
      });
    }
  }
  
ngOnInit() {
    //this.isOwner = true;
  this.currencies = ["EUR","USD","GBP","AUD","NZD","CHR"];
  this.loading = false;
  this.textLen = 0;
    console.log("start of ngOninit");
    this.originDays = [false,false,false,false,false,false,false];
    if(this.authGuard.isLoggedIn()==true){
     this.data = this.apiService.getUserPrefs();
      this.data.subscribe(observer =>{
          this.UserPrefs= observer.json().tag;
      });
      this.data = this.apiService.getActivity(this.id);
      this.data.subscribe(observer =>{
          this.getActivity= [observer.json()];
      //console.log(this.getActivity);
      this.actName = observer.json().name;
          this.isOwner = observer.json().adminId.indexOf(this.userId) > -1;
          this.getActProfileImgURI= observer.json().profileImgURI;
          if(observer.json().price){
            this.price = observer.json().price;
            // console.log("price", this.price[0].amount);
            this.enrollment['price'] = this.price[0].amount;
            // console.log("price2", this.enrollment['price']);
            //console.log(this.price);
          }else{ this.price="";}
          console.log("observerJson",observer.json());
          if(observer.json().tag)
          {
            this.tag = observer.json().tag;
            console.log("tag",observer.json().tag);
            this.curTag = this.tag[0];
            console.log("tag0",this.tag[0]);
          }else { this.tag={}; }
          //console.log(this.getActivity);
          if(observer.json().term){
            var tmp = observer.json().term;
            this.activityType = "WEEKLY";
            tmp = tmp.days;
            for(let i in tmp){
              var tmp_day = tmp[i].day;
              for(let j in this.weekDays){
                if(tmp_day == this.weekDays[j]){
                  this.selectedDays[j]=true;
                  this.originDays[j]=true;
                }
              }
            }
            console.log("very good", observer.json().term);
            // console.log("length of tag", this.tag._length);
          }else{
            this.activityType = "DAILY";
          }
      });
       this.data = this.apiService.getMyOrgs();
      this.data.subscribe(observer => {        
        this.MyOrgs = observer.json().orgSummary;
      });
      this.feedData = this.apiService.getActivityFeed(this.id);
      this.data.subscribe(observer =>{
        if(observer.status ==200){
          //this.feedItems = observer.json().event;
          //this.getFeedLength = observer.json().event.length;
          //console.log(this.getFeedLength);
        }else{
          //this.feedItems="";
          this.getFeedLength= 0;
        }
      });
    }else{
      this.data = this.apiService.getActivityAnonymous(this.id);
      this.data.subscribe(observer =>{
          this.getActivity= [observer.json()];
      this.actName = observer.json().name;
          this.getActProfileImgURI= observer.json().profileImgURI;
          if(observer.json().price){
            this.price = observer.json().price;
            this.enrollment['price'] = this.price[0].amount;
            //console.log(this.price);
          }else{ this.price="";}
          if(observer.json().tag)
          {
            this.tag = observer.json().tag;
            //console.log(this.tag);
          }else { this.tag={}; }
          //console.log(this.getActivity);
      });

    }
    this.data = this.apiService.getLocale();
    this.data.subscribe(observer =>{
        this.lat = observer.json().latitude;
        this.lon = observer.json().longitude;
    });
  }
  saveActivity(form:NgForm){
    console.log(this.initialValue);
    console.log("*********************************************");
    form.value.adminId = [localStorage.getItem('userId')];
    form.value.orgId = localStorage.getItem('orgId');
    form.value.location = { "lat": this.lat, "lon": this.lon   };
    this.dateString = this.initialValue;
    var tmp1:string = this.dateString;
    if(tmp1.length){
      tmp1 = tmp1.substring(17,22);
    }
    else{
      tmp1 = this.initialValue.toUTCString().substring(17,22);
    }
    this.dateString = this.initialValue1;
    var tmp2:string = this.dateString;
    if(tmp2.length){
      tmp2 = tmp2.substring(17,22);
    }
    else{
      tmp2 = this.initialValue1.toUTCString().substring(17,22);
    }
    if(this.eventType){
      if(!this.dateAvailable){
        this.dateAvailable = (new Date()).toUTCString();
      }
      var tmp = this.dateAvailable;
      form.value.oneDayDetails = { "date":tmp, "fromTime": tmp1, "toTime": tmp2};
    }else{
      console.log("form",form.value.repeats);
      //console.log("this",this.repeats);
      form.value.term = {"start":form.value.dateAvaliable1, "end":form.value.dateAvaliable2, "fromTime":tmp1, "toTime":tmp2, "repeats":this.activityType, "days": []}
      if(this.activityType == "DAILY"){
        delete form.value.term.days;
      }
      if(this.activityType == "WEEKLY"){
        for(let i in this.selectedDays){
          if(this.selectedDays[i]){
            form.value.term.days.push({"day":this.weekDays[i]});
          }
        }
        //console.log(form.value.term);
      }
    }
    if(form.value.amount!=""){
      if(!this.selectedCurrency)this.selectedCurrency = this.currencies[0];
      console.log(this.selectedCurrency);
      form.value.price = [{"amount":form.value.amount,"description": "Adult","currency": this.selectedCurrency}];
    }
    if(!form.value.amount){
      form.value.price = [{"amount":0, "description":"Adult", "currency":this.currencies[0]}];
    }
    if(form.value.tag != ""){
      //console.log("tag",this.tag);      
      form.value.tag = [form.value.tag];
      //console.log("tag", form.value.tag);
      //console.log("curTag", this.curTag);
    }
    delete form.value.activityType;
    delete form.value.dateAvaliable1;
    delete form.value.dateAvaliable2;
    if(form.value.maxAttenders == ""){
      delete form.value.maxAttenders;
    }
    delete form.value.dateAvaliable;
    delete form.value.initialValue;
    delete form.value.initialValue1;
    delete form.value.amount;
    
    delete form.value.currency;
    //delete form.value.tag;
    delete form.value.dateAvaliable1;
    delete form.value.dateAvaliable2;
    delete form.value.repeats;
    console.log(form.value);
    console.log('here is there');
    this.data = this.apiService.updateActivity(this.id,form.value);

    this.data.subscribe(observer =>{
      //console.log(observer);

      if(observer.ok==true){
        this.status = "Successfully Edited";
        this.data = this.apiService.getActivity(this.id);
        this.data.subscribe(observer =>{
          if(observer.status==200){
            this.ngOnInit();
            //this.orgActivities = observer.json().activitySummaries;
            //this.activityCount = Object.keys(this.orgActivities).length;
          }
        });
      }
    });
  }
}
