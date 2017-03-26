angular.module('app').controller('LoginController',['$scope','$state','$http','loginService',"$localStorage","$sessionStorage",'Notification',function($scope,$state,$http,loginService,$localStorage,$sessionStorage,Notification) {
    var self = this;
    var keypass = null;
    var permission = "ERROR";
    var page = {title:""};

    var getToken = function() {
//        $sessionStorage.token = "!$sessionStorage.token";
//        console.log($sessionStorage);
        var connect = loginService.getToken();
        connect.then(
            function(response) {
              console.log(response);
              if(response.status == 200) {
                $sessionStorage.token = response.data['token-key'];
                // console.log($sessionStorage.token);
              }else if(response.status == 201) {
                location.reload();
              }else {
                $state.go("login");
              }
            }
        )
    }

    $scope.login = function() {
      var data = {username:$scope.username,password:$scope.password,token:$sessionStorage.token};
      // console.log("--------");
      // console.log(data);
      // console.log("--------");
      var connect = loginService.login(data);
      connect.then(
          function(response) {
              console.log("login.js");
              console.log(response);
              console.log("login.js");
              if(response.status == 200) {
                $state.go("admin");
                console.log($sessionStorage.token);
              }else if(response.status == 201) {
                location.reload();
              }else {
                $state.go("login");
              }

          }
      )
    }

    getToken();

    $scope.callNotify = function() {
      Notification("test");
    }

}]);
