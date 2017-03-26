app.service("indexService",function() {
    var self = this;
    self.test = "testService";
    
    self.getToken = function() {
        return http.get("api/getToken");
    };
});