/**
 * Created by http://rhizomik.net/~roberto/
 */

(function () {
    var app = angular.module("weathercatJS", [/*"greetingTab","greetingForm"*/]);

    app.controller("WeathercatController", ["$http",
        function ($http) {
            this.WEATHERCAT_REGIONS = "http://weathercat.herokuapp.com/regions";
            this.loading = false;
            var weathercatCtrl = this;
            this.tab = 1;
            this.retrievedUser = false;

            this.isLoading = function () {
                return this.loading;
            };

            this.noGreetings = function () {
                return this.greetings === undefined;
            }

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

            this.addGreeting = function () {
                $http.post(this.GREETINGS_API, this.newGreeting)
                    .then(function () {
                        greetingCtrl.newGreeting = {'date': Date.now()};
                        greetingCtrl.listGreetings();
                    });
            };


            this.setTab = function (newValue) {
                this.tab = newValue;
            };

            this.isSet = function (tabName) {
                return this.tab === tabName;
            }

            this.retrieveUserAlerts = function (user) {
                weathercatCtrl.retrievedUser = true;
                $http.post(this.USERS_URL, user)
                    .success(function (user){
                        this.user = user;
                    })
                    .error(function (data, status, headers, config) {
                        this.error = status;
                    });
                this.userURL = this.USERS_URL + "/" + user.username;
                $http.get(this.userURL)
                    .success(function (user) {
                        this.user = user;
                        weathercatCtrl.userName = user("username");
                        weathercatCtrl.userEmail = user("email");
                        weathercatCtrl.userAlerts = user("alerts");
                    }).error(function (data, status, headers, config) {
                        this.error = status;
                    });
            };

            this.isRetrievedUser = function () {
                return this.retrievedUser;
            }
        }]);
}());
