function getDateTime() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth();
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    var am_pm = "";
    if (month.toString().length == 1) {
        month = '0' + month;
    }
    if (day.toString().length == 1) {
        day = '0' + day;
    }
    if (hour > 12) {
        hour = hour - 12;
        am_pm = "PM";
    } else {
        am_pm = "AM";
    }
    if (hour.toString().length == 1) {
        hour = '0' + hour;
    }
    if (minute.toString().length == 1) {
        minute = '0' + minute;
    }
    if (second.toString().length == 1) {
        second = '0' + second;
    }
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const d = new Date();

    const weekday = new Array(7);
    weekday[0] = "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thu";
    weekday[5] = "Fri";
    weekday[6] = "Sat";

    let day_name = weekday[d.getDay()];
    var dateTime = day_name + ' | ' + day + ' ' + monthNames[month] + ' ' + year + ' | ' + hour + ':' + minute + ':' + second + ' ' + am_pm;
    return dateTime;
}


setInterval(function () {
    currentTime = getDateTime();
    document.getElementById("time").innerHTML = currentTime;
}, 1000);
