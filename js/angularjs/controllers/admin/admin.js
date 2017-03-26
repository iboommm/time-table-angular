angular.module('app').controller('AdminController',['$scope','$state','$http','$queueFactory','adminService',"$localStorage","$sessionStorage",'Notification','$q','$timeout',function($scope,$state,$http,$queueFactory,adminService,$localStorage,$sessionStorage,Notification,$q,$timeout) {
    var self = this;
    var keypass = null;
    var permission = "ERROR";
    var page = {title:""};
    $scope.dataGetFromCloud = [];

    var queue = [1,2];
    var queue_now = 0;

    var getToken = function() {
//        $sessionStorage.token = "!$sessionStorage.token";
//        console.log($sessionStorage);
        var connect = adminService.getToken();
        connect.then(
            function(response) {
              console.log("admin.js");
              console.log(response);
              console.log("admin.js");
              if(response.status == 200) {
                $sessionStorage.token = response.data['token-key'];
                // console.log($sessionStorage.token);
              }else {
                $state.go("login");
              }

            }
        )
    }
    getToken();
    var getStatusFromBoard = function(data) {
      // console.log("queue_now : " + queue_now);
      var pin = queue[data];
      var connect = adminService.loadStatusFormCloud(pin);
      connect.then(
          function(response) {

            $("#loading-node"+pin).hide();
            $scope.dataGetFromCloud['node_' +pin] = response.data.return_value;
            $scope.dataGetFromCloud['node_' +pin].pin = pin;
              console.log($scope.dataGetFromCloud);
            // console.log($scope.dataGetFromCloud);
            queue_now++;
            console.log("queue_now " + queue_now);
            console.log($scope.dataGetFromCloud);
            if(queue_now < queue.length) {
              getStatusFromBoard(queue_now);
            }else {
              queue = [];
              queue_now = 0;
              console.log("queue & queue_now reset");
            }
          },
          function(reason){
              console.log('@@@');
          }
      )
    }

    var setStatusToBoard = function(pin,data) {
      $scope.dataGetFromCloud['node_' + pin] = null;
      console.log("pin = " + pin + " || data = " + data);
      console.log("node : " + pin);
      console.log(queue);
      var connect = adminService.setStatusToBoard(pin,data);
      connect.then(
          function(response) {
            queue.push(pin);
            getStatusFromBoard(0);
          }
      )
    }


    self.switch = function(pin) {
      console.log("config pin : " + pin);
        if($scope.dataGetFromCloud['node_' + pin] == 0) {
            console.log( 'node' + pin + " OFF" );
            setStatusToBoard(pin,1);
        }else {
          console.log("ON");
          setStatusToBoard(pin,0);
        }
        $("#loading-node" + pin).show();
    }

    self.load = function() {
      if(queue.length > 0)
        getStatusFromBoard(0);
    }

    self.load();

}]);
