import { ApiService } from '../shared/api.service';

export class Enrollment{
  public activityId: string;
  public userId: string;
  public childId: string;
  public date: Date;
  public token: string;
  public transType: string;
  public transMethod: string;
  public total;
  
  // private apiService: ApiService;
  TYPES = {
    PAYMENT: 'PAYMENT',
    REFUND: 'REFUND'
  };

  METHODS = {
    PAYPAL: 'PAYPAL',
    CASH: 'CASH'
  };
  constructor(activityId,private apiService:ApiService/*, token='', userId*/,private data) {
    if (!activityId) throw 'Both an activityId and a token are needed for enrollment';
    this.activityId = activityId;
    //this.userId = userId;
    this.childId;
    this.date;
    //this.token = token;
    this.transType = this.TYPES.PAYMENT;
    this.transMethod = this.METHODS.PAYPAL;
    this.total = 0;
    // this.apiService = new ApiService();
  };

  

  complete($enrollmentId){
    return this.apiService.completeEnrollment($enrollmentId);
  }

  reject($enrollmentId){
    return this.apiService.rejectEnrollment($enrollmentId);
  }

  send(){
    return this.apiService.activityEnrol(this.getJsonData());
  }

  getJsonData(){
    var d = {
      enrolment: {
        activityId: this.activityId,
        date: new Date()
      }
    }
console.log("total",this.total);
    if (this.total > 0) {
      d['bill'] = {
        transType: this.transType,
        transMethod: this.transMethod,
        transDate: new Date()
      }
    }

    if (this.userId) d.enrolment['userId'] = this.userId;
    if (this.childId) d.enrolment['childId'] = this.childId;

    return d;
  };
}