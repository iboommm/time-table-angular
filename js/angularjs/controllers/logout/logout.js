angular.module('app').controller('LogoutController',['$scope','$state','$http','logoutService',"$localStorage","$sessionStorage",'Notification',function($scope,$state,$http,logoutService,$localStorage,$sessionStorage,Notification) {
    var self = this;
    var keypass = null;
    var permission = "ERROR";
    var page = {title:""};

    var getToken = function() {
//        $sessionStorage.token = "!$sessionStorage.token";
//        console.log($sessionStorage);
        var connect = logoutService.getToken();
        connect.then(
            function(response) {
              console.log(response);
              if(response.status == 200) {
                $sessionStorage.token = response.data['token-key'];
                var logout = logoutService.logout();
                logout.then(
                  function(response) {
                    console.log(response.data);
                  }
                )
                // console.log($sessionStorage.token);
              }else if(response.status == 201) {
                location.reload();
              }else {
                $state.go("login");
              }
            }
        )
    }

    getToken();

    $scope.goLogin = function() {
      $state.go('login');
    }

    $scope.callNotify = function() {
      Notification("test");
    }

}]);
