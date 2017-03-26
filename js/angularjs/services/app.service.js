app.service("indexService",function($http) {
    var self = this;
    self.test = "testService";
    
    self.getToken = function() {
        return $http.get("api/token/get");
    };
});