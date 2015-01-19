/**
 * Created by http://rhizomik.net/~roberto/
 */

(function () {
    var app = angular.module("weathercatJS", [/*"greetingTab","greetingForm"*/]);

    app.controller("WeathercatController", ["$http",
        function ($http) {
            this.WEATHERCAT_REGIONS = "http://weathercat.herokuapp.com/regions";
            var weathercatCtrl = this;
            this.tab = 1;

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

        }]);
}());
