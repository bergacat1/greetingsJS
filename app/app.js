/**
 * Created by http://rhizomik.net/~roberto/
 */

(function () {
    var app = angular.module("weathercatJS", [/*"greetingTab","greetingForm"*/]);

    app.controller("WeathercatController", ["$http",
        function ($http) {
            this.WEATHERCAT_REGIONS = "http://weathercat.herokuapp.com/regions";
            this.USERS_URL = "http://weathercat.herokuapp.com/users";
            var weathercatCtrl = this;
            this.tab = 1;
            this.retrievedUser = false;
            var user;
            var alert;

            this.listRegions = function () {
                this.loading = true;
                $http.get(this.WEATHERCAT_REGIONS)
                    .success(function (data) {
                        weathercatCtrl.regions = data;
                    });
                this.loading = false;
            };

            this.getWeather = function (region) {
                weathercatCtrl.activeWeather = true;
                regionURL = this.WEATHERCAT_REGIONS + "/" + region;
                $http.get(regionURL)
                    .success(function (regionInfo) {
                        weathercatCtrl.regionWeatherName = regionInfo[0];
                        weathercatCtrl.regionWeatherWeather = regionInfo[1];
                        weathercatCtrl.regionWeatherImage = regionInfo[2];
                    });
            };

            this.isActiveWeather = function () {
                return weathercatCtrl.activeWeather;
            };

            this.setTab = function (newValue) {
                this.tab = newValue;
            };

            this.isSet = function (tabName) {
                return this.tab === tabName;
            }

            this.retrieveUserAlerts = function () {
                weathercatCtrl.retrievedUser = true;
                $http.post(this.USERS_URL, user)/*
                    .success(function (user){
                        this.user = user;
                    })
                    .error(function (data, status, headers, config) {
                        this.error = status;
                    })*/;
                this.retrieveUserInfo();

            };

            this.retrieveUserInfo = function(){
                this.user.alerts = "holaa";
                this.userURL = this.USERS_URL + "/" + this.user.username;
                $http.get(this.userURL)
                    .success(function (user) {
                        /*weathercatCtrl.userName = user.username;
                         weathercatCtrl.userEmail = user.email;*/
                        this.user.alerts = user.alerts;
                    });
            };

            this.isRetrievedUser = function () {
                return this.retrievedUser;
            };

            this.enable_disable_alert = function(){
                userAlert = this.userURL + "?enable_disable=0";
                this.user.enable_disable = "0";
                $http.post(this.USERS_URL, user);
                this.retrieveUserInfo();
            };

            this.deleteAlert = function(){
                userAlert = this.userURL + "?delete=0";
                this.user.delete = "0";
                $http.post(this.USERS_URL, user);
                this.retrieveUserInfo();
            };

            this.addAlert = function () {
                userAlert = this.userURL + "?addAlert=add";
                this.alert.addAlert = "add";
                this.alert.email = this.user.email;
                $http.post(userAlert, alert)/*
                 .success(function (user){
                 this.user = user;
                 })
                 .error(function (data, status, headers, config) {
                 this.error = status;
                 })*/;
                this.retrieveUserInfo();

            };
        }]);
}());
