angular.module('app').service('logoutService',['$http',function($http,$q){
    var self = this;

    self.getToken = function() {
        return $http({
          url: "api/token/get",
          method: "GET",
          params: {page: "login"}
       });
    };

    self.logout = function(data) {
        return $http.get("api/logout/get");
    };
}]);
