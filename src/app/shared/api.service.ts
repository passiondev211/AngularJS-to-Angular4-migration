import { Injectable } from '@angular/core';
import { Http ,Headers, Response} from '@angular/http';
import { Config } from '../common/config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {
  public result: Object;
  constructor(public http: Http, public config:Config) {}

  userProfile(){ return this.oauthRequest('/user/me','GET','','');}
  saveUserProfile(data){ return this.oauthRequest('/user/me','PUT',data,'');}
  userUploadProfileImage(data){ return this.imageUpload('/user/me/images/profile',data);}
  getMyLikedActivities(){ return this.oauthRequest('/user/me/likes/activities', 'GET','','');}
  getOrgPayment(orgid){ return this.oauthRequest('/orgs/'+orgid+'/epos', 'GET','','');}
  myLikedActivitiesCount(){ return this.oauthRequest('/user/me/likes/activities/count', 'GET','','');}
  getUserPrefs(){ return this.oauthRequest('/activities/activitykeywords','GET','','');}
  changePassword(data){ return this.oauthRequest('/user/me/changepassword','POST',data,'');}
  getLocale(){ return this.http.get('//freegeoip.net/json/');}
  newOrg(data){ return this.oauthRequest('/orgs','POST',data,'');}
  getOrg(oid){ if(!oid || oid == 'undefined') return null; return this.oauthRequest('/orgs/' + oid+'/secure', 'GET','','');}
  getOrgAnonymous(oid){ if(!oid || oid == 'undefined') return null; return this.oauthRequest('/orgs/' + oid, 'GET','','');}
  updateOrg(oid, data){ if(!oid || oid == 'undefined') return null; return this.oauthRequest('/orgs/' + oid, 'PUT', data,'');}
  orgUploadProfileImage(id, data){ if (!id || id == 'undefined') return null; return this.imageUpload('/orgs/' + id + '/images/profile', data)}
  orgAddPaymentAccount(id, data){ if (!id || id == 'undefined') return null; return this.oauthRequest('/orgs/' + id + '/epos', 'POST', data,'');}
  orgEditPaymentAccount(id, eposId, data){ if (!id || id == 'undefined') return null; return this.oauthRequest('/orgs/' + id + '/epos/'+eposId, 'PUT', data,'');}
  getMyLikedOrgs(){ return this.oauthRequest('/user/me/likes/orgs','GET','','');}
  getMyOrgs(){ return this.oauthRequest('/user/me/admins/orgs','GET','','');}
  getOrgLikesCount(oid){ return this.oauthRequest('/orgs/' + oid + '/likers/count', 'GET','','');}
  getOrgMembersCount(oid){ return this.oauthRequest('/orgs/' + oid + '/members/count', 'GET','','');}
  getOrgActivitiesCount(oid){ return this.oauthRequest('/orgs/' + oid + '/activities/current/count', 'GET','','');}
  getOrgActivities(oid){ return this.oauthRequest('/orgs/' + oid + '/activities', 'GET','','');}
  orgCreateStatus(oid, data, image){

    var formData = new FormData();
    var statusUpdate = new Blob([JSON.stringify(data)], { type: "application/json"});
    formData.append("status",statusUpdate);
	if(image!==null)
       formData.append("upload",image);

    return this.oauthRequest('/orgs/' + oid + '/status', 'POST', formData, '');
  }
  getFeed(){ return this.oauthRequest('/user/me/feed','GET','','');}
  getOrgFeed(oid){ return this.oauthRequest('/orgs/' + oid + '/feed','GET','',''); }
  search(term){ return this.oauthRequest('/search?term=' + term, 'GET','','');}
  geoSearch(lat,lon){ return this.oauthRequest('/search/geo?lat=' + lat+'&lon='+lon, 'GET','','');}
  newActivity(data){ return this.oauthRequest('/activities', 'POST', data,'');}
  updateActivity(aid, data){ return this.oauthRequest('/activities/' + aid, 'PUT', data,'');}
  getActivity(aid){ return this.oauthRequest('/activities/' + aid + '/secure', 'GET','','');}
  getActivityFeed(aid){return this.oauthRequest('/activities' + aid + '/feed', 'GET','', '');}
  getActivityAnonymous(aid){ return this.oauthRequest('/activities/' + aid, 'GET','','');}
  activityUploadStatusImage(id, data){ return this.imageUpload('/activities/' + id + '/images/status', data);}


  completeEnrollment(eid){
    if(!eid) return false;
    return this.oauthRequest('/billing/completeEnrolment/'+eid, 'PUT','','');
  }
  rejectEnrollment(eid){
    if(!eid) return false;
    return this.oauthRequest('/billing/rejectEnrolment/'+eid, 'PUT','','');
  }
  activityEnrol(data){return this.oauthRequest('/billing/enrol', 'POST', data, '');}
  getActivityAmIEnrolled(aid) {
    if (!aid) return;
    return this.oauthRequest('/user/me/enrolments/' + aid, 'GET','','');
  }
  enroll(d) {
    if (!d) return false;
    return this.oauthRequest('/billing/enrol', 'POST', d, '');
  };
  actCreateStatus(aid, data, image){

    var formData = new FormData();
    var statusUpdate = new Blob([JSON.stringify(data)], { type: "application/json"});
    formData.append("status",statusUpdate);
	if(image!==null)
       formData.append("upload",image);

    return this.oauthRequest('/activities/' + aid + '/status', 'POST', formData, '');
  }
  oauthRequest(path,method,data,headers): Observable<Response> {
    headers = headers || {};
    headers['X-UserId'] = localStorage.getItem("userId");
    headers['Authorization'] = 'Bearer ' + localStorage.getItem("tokenKey");

    if (!headers['Accept']){
      headers['Accept'] = 'application/json';
      headers['X-ClientType'] = 'web';
    }
	
    if(method == "POST"){
        return this.http.post(this.config.apiendpointURL+path, data, { headers: headers });
    }
    else if(method == "GET"){
        return this.http.get(this.config.apiendpointURL+path, { headers: headers });
    }
    else if(method == "PUT"){
        return this.http.put(this.config.apiendpointURL+path, data, { headers: headers });
    }
  }

  imageUpload(url, data) {

	var formData = new FormData();
     formData.append("upload", data);
    return this.oauthRequest(url, 'POST', formData, '');
  }

}
