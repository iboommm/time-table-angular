angular.module('app').service('loginService',['$http',function($http,$q){
    var self = this;

    self.getToken = function() {
        return $http({
          url: "api/token/get",
          method: "GET",
          params: {page: "login"}
       });
    };

    self.login = function(data) {
        var data = {'data':data};
        return $http.post("api/login/post",data);
    };
}]);
