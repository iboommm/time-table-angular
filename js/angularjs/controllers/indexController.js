app.controller("indexController",function($scope,$sessionStorage,indexService) {
    var sc = $scope;
    var self = this;

//    $sessionStorage.token = sc.$storage;

    sc.test = indexService.test;

    var getToken = function() {
//        $sessionStorage.token = "!$sessionStorage.token";
//        console.log($sessionStorage);
        var connect = indexService.getToken();
        connect.then(
            function(response) {
              console.log(response);
                $sessionStorage.token = response.data['token-key'];
                console.log($sessionStorage.token);
            }
        )
    }
    getToken();

});
