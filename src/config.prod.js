var globalSettings = {}
globalSettings.configList = [];
var setGlobalConfig = function() {
// if(window.localStorage.getItem("tokenKey") !== null) && typeof window.localStorage.getItem("tokenKey") !== 'undefined')
    globalSettings.configList['tokenKey'] = (window.localStorage.getItem("tokenKey") !== null)?window.localStorage.getItem("tokenKey"):undefined; //  replace with token from authentication ajax call
    globalSettings.configList['userId'] = (window.localStorage.getItem("userId") !== null)?window.localStorage.getItem("userId"):undefined; //  replace with X-UserId from authentication ajax call
    globalSettings.configList['tokenType'] =  (window.localStorage.getItem("tokenType") !== null)?window.localStorage.getItem("tokenType"):undefined; //  replace with type from authentication ajax call default=Bearer
    globalSettings.configList['facebookAppId'] = '845381495501443'; // Facebook Application ID
    globalSettings.configList['GoogleAnalyticsId'] = 'UA-61202681-3'; // Google analytics ID
    globalSettings.configList['apiEndpoint'] = 'https://api.livup.co'; // Api Endpoint
    globalSettings.configList['authUrl.login'] = 'https://api.livup.co/heimdall/login'; // heimdall authentication gateway url
    globalSettings.configList['authUrl.logout'] = 'https://api.livup.co/heimdall/logout'; // heimdall authentication gateway url
    globalSettings.configList['mediaEndpoint'] = 'https://d3mmqa391ll2ue.cloudfront.net/unsafe/fit-in'; // media root utl
    globalSettings.configList['defaultImage'] = 'images/default.png'; // default image type
    globalSettings.configList['paypalEndpoint'] = 'https://www.paypal.com/cgi-bin/webscr'; // paypal endpoint url
}
globalSettings.get = function (key) {
    if (key in this.configList)
        return this.configList[key];
    else return undefined;
};
globalSettings.set = function (key,value) {
    if (key in this.configList)
        this.configList[key] = value;
    else
        console.log("no such key "+key+" in globalSettings");
};
console.log(globalSettings);
setGlobalConfig();
