/**
 * Created by http://rhizomik.net/~roberto/
 */

(function(){
    var app = angular.module("weathercatJS", [/*"greetingTab","greetingForm"*/]);

    app.controller("WeathercatController", ["$http",
        function($http) {
            this.WEATHERCAT_REGIONS = "http://weathercat.herokuapp.com/regions";
            this.loading = false;
            var weathercatCtrl = this;

            this.isLoading = function(){
                return this.loading;
            };

            this.noGreetings = function(){
                return this.greetings === undefined;
            }

            this.listRegions = function(){
                this.loading = true;
                $http.get(this.WEATHERCAT_REGIONS)
                    .success(function (data) {
                        weathercatCtrl.regions = data;
                    });
            };

            this.addGreeting = function(){
                $http.post(this.GREETINGS_API, this.newGreeting)
                    .then(function(){
                        greetingCtrl.newGreeting = {'date': Date.now()};
                        greetingCtrl.listGreetings();
                    });
            };
        }]);
}());
