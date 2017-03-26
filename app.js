var app = angular.module("app", []);

app.controller("indexController", function($http, $scope) {
    var self = this;
    var day = [];
    var dataFromJSON = [];
    var table = [];
    $scope.max = 0;
    $scope.min = 24;

    var convertTable = function() {
        var i = 0;
        while (i < 5) {
            var startDiv = "<div class='col-md-12'>";
            var endDiv = "</div>";
            $("div#table").append(startDiv);
            addTableDay(i);
            $("div#table").append(endDiv);
            i++;
        }

    }

    var addTableDay = function(day) {
        var arr = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
        var str = "<div class='col-table-1'>" + arr[day] + "</div>";
        $("div#table").append(str);
        if (table[arr[day]].length > 0) {
            checkBlock(table[arr[day]]);
        } else {
            var i = $scope.min;
            while (i < $scope.max) {
                var str = "<div class='col-table-1'></div>"
                $("div#table").append(str);
                i++;
            }
        }

    }

    var checkTime = function(day) {
        console.log(day);
        if (day.start_half) {
            return ((day.end - day.start) - 1) + "-5";
        }
        if (day.end_half) {
            return ((day.end - day.start)) + "-5";
        }
        return day.end - day.start;
    }

    var checkBlock = function(day) {
        var block = day.start;
        $.each(day, function(key, value) {
            var timeCound = null;
            if (value.start == $scope.min) {
                timeCound = checkTime(value);
                if (value.start_half) {
                    var str = "<div class='col-table-0-5'></div>"
                    $("div#table").append(str);
                }
                var str = "<div class='col-table-" + timeCound + "'>" + dataFromJSON[value.sub_id].sub_name + "</div>"
                $("div#table").append(str);
                if (value.end_half) {
                    var str = "<div class='col-table-0-5'></div>"
                    $("div#table").append(str);
                }
                console.log("add " + dataFromJSON[value.sub_id].sub_name);
                day[key + 1] = day[key + 1] || null;
                if (day[key + 1] != null) {
                    var i = value.end;
                    block = day[key + 1].start;
                    while (i <= (day[key + 1].start) - 1) {
                        var str = "<div class='col-table-1'></div>"
                        $("div#table").append(str);
                        i++;
                    }
                } else if ($scope.max - value.end > 0) {
                    console.log("AAA");
                    var i = value.end;
                    while (i < $scope.max) {
                        var str = "<div class='col-table-1'></div>"
                        $("div#table").append(str);
                        i++;
                    }
                }
            } else {
                // console.log(value.start_half);
                if (day.start == value.start) {
                    var i = $scope.min;
                    while (i <= value.start - 1) {
                        var str = "<div class='col-table-1'></div>"
                        $("div#table").append(str);
                        i++;
                    }
                    if (value.start_half) {
                        var str = "<div class='col-table-0-5'></div>"
                        $("div#table").append(str);
                    }
                }
                timeCound = checkTime(value);
                var str = "<div class='col-table-" + timeCound + "'>" + dataFromJSON[value.sub_id].sub_name + "</div>"
                $("div#table").append(str);
                console.log("add " + dataFromJSON[value.sub_id].sub_name);
                if (value.end_half) {
                    var str = "<div class='col-table-0-5'></div>"
                    $("div#table").append(str);
                }
                day[key + 1] = day[key + 1] || undefined;
                console.log(day[key + 1]);
                if (day[key + 1] != null) {
                    var i = value.end;
                    block = day[key + 1].start;
                    if (value.end_half) {
                        i++;
                    }
                    while (i <= (day[key + 1].start) - 1) {
                        var str = "<div class='col-table-1'></div>"
                        $("div#table").append(str);
                        i++;
                    }
                } else if ($scope.max - value.end > 0) {
                    var i = value.end;
                    if (value.end_half) {
                        i++;
                    }
                    while (i < $scope.max) {
                        var str = "<div class='col-table-1'></div>"
                        $("div#table").append(str);
                        i++;
                    }
                }
            }

        });
        console.log("complate Day")
    }



    var loadJSON = function() {
        var connect = $http.get("time.json");
        connect.then(
            function(response) {
                // console.log(response.data);
                dataFromJSON = response.data;
                convertToTable();
                console.log(table);
                convertTable();
            }
        )
    }

    var convertToTable = function() {
        // console.log(dataFromJSON[0]);
        var size = dataFromJSON.length;
        var sub_id = 0;
        var tmp = "";
        while (size != 0) {
            tmp = dataFromJSON[size - 1].time_txt;
            foundDay(size - 1, tmp);
            size--;
        }
        convertToStartEnd();
        $scope.exportTable = table;
    }

    var foundDay = function(id, txt) {
        var tmp = txt.match(/((Mo)|(Tu)|(We)|(Th)|(Fr)|(Sa)|(Su))(\d{2})([:])(\d{2})([-])(\d{2})([:])(\d{2})/g);
        var tmp_sub = [];
        var timeSplit = [];
        $.each(tmp, function(key, value) {
            txt = txt.replace(value, "|");
        });
        tmp_sub = txt.split("| ");
        tmp_sub.shift();
        // console.log(txt);
        // console.log(tmp_sub);
        for (var i = 0; i < tmp.length; i++) {
            timeSplit.push({
                "time": tmp[i],
                "room": tmp_sub[i]
            });
        }

        dataFromJSON[id].time_txt = timeSplit;
        // console.log(dataFromJSON[id]);
        addTimeToStack(id);
    }

    var addTimeToStack = function(index) {
        var day = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
        console.log(dataFromJSON[index]);
        $.each(day, function(key, value) {
            table[value] = table[value] || [];
            $.each(dataFromJSON[index].time_txt, function(key2, value2) {
                if (value2.time.search(value) != -1) {
                    table[value].push({
                        "sub_id": index,
                        "time": value2.time,
                        "room": value2.room
                    });
                }
            });
            table[value].sort(function(a, b) {
                var nameA = a.time.toUpperCase();
                var nameB = b.time.toUpperCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });
        });
    }

    var convertToStartEnd = function() {
        var day = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
        var tmp_txt = "";
        $.each(day, function(key, value) {
            table[value]['start'] = 24;
            table[value]['end'] = 0;
            $.each(table[value], function(key2, value2) {
                var tmp = value2.time.match(/\d{2}[:]\d{2}/g);
                tmp_txt = value2.time;
                tmp_txt = tmp_txt.replace(/[:]/g, ".");
                var tmp2 = tmp_txt.match(/\d{2}.\d{2}/g);
                table[value][key2].start = parseInt(tmp[0]);
                table[value][key2].end = parseInt(tmp[1]);
                if (parseInt(tmp[0]) < table[value]['start']) {
                    table[value]['start'] = parseInt(tmp[0]);
                    var halfTime = parseFloat(tmp2[0] * 10 % 10);
                    if (halfTime > 0) {
                        table[value][key2]['start_half'] = true;
                    }
                    if ($scope.min > table[value]['start']) {
                        $scope.min = table[value]['start'];
                    }
                }
                if (parseInt(tmp[1]) > table[value]['end']) {
                    table[value]['end'] = parseInt(tmp[1]);
                    var halfTime = parseFloat(tmp2[1] * 10 % 10);
                    if (halfTime > 0) {
                        table[value][key2]['end_half'] = true;
                    }
                    if ($scope.max < table[value]['end']) {
                        $scope.max = table[value]['end'];
                    }
                }
                delete(table[value][key2]['time']);
            });
        });
    }

    loadJSON();

});
app.filter('range', function() {
    return function(n) {
        var res = [];
        for (var i = 0; i < n; i++) {
            res.push(i);
        }
        return res;
    };
});
