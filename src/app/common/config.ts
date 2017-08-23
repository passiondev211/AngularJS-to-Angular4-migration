import { isDevMode } from '@angular/core';
export class Config {
    public facebookAppId: string;
    public facebookAppVersion: string;
    public GoogleAnalyticsId: string;
    public apiLoginURL: string;
    public apiendpointURL: string;
    public apiLogoutURL: string;
    public mediaEndpoint: string;
    public defaultImage: string;
    public paypalEndpoint: string;
    
    constructor() {
        if(isDevMode()){
            this.facebookAppId= '936047059768219'; // Facebook Application ID
            this.facebookAppVersion= 'v2.8'; // Facebook Application Version
            this.GoogleAnalyticsId = 'UA-61202681-2'; // Google analytics ID
            this.apiLoginURL = 'http://10.168.1.7:8001/heimdall/login'; 
            this.apiendpointURL = 'http://10.168.1.7:8001';// Api Endpoint
            this.apiLogoutURL = 'http://10.168.1.7:8001/heimdall/logout'; // heimdall authentication gateway url
            this.mediaEndpoint = 'http://10.168.1.10/unsafe/fit-in'; // media root utl
            this.defaultImage = 'images/default.png'; // default image type
            this.paypalEndpoint = 'https://www.sandbox.paypal.com/cgi-bin/webscr'; // paypal endpoint url
        }else{
            this.facebookAppId= '845381495501443'; // Facebook Application ID
            this.facebookAppVersion= 'v2.8'; // Facebook Application Version
            this.GoogleAnalyticsId = 'UA-61202681-3'; // Google analytics ID
            this.apiLoginURL = "https://api.livup.co/heimdall/login"; 
            this.apiendpointURL = "https://api.livup.co";// Api Endpoint
            this.apiLogoutURL = 'https://api.livup.co/heimdall/logout'; // heimdall authentication gateway url
            this.mediaEndpoint = 'https://d3mmqa391ll2ue.cloudfront.net/unsafe/fit-in'; // media root utl
            this.defaultImage = 'images/default.png'; // default image type
            this.paypalEndpoint = 'https://www.paypal.com/cgi-bin/webscr'; // paypal endpoint url 
        }
    }
}