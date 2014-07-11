var app = require('express')();

function dateToIcalFormat(dt) {
    var y = dt.getFullYear();
    var m = dt.getMonth() >= 9 ? dt.getMonth() + 1 : "0" + (dt.getMonth()+1);
    var d = dt.getDate() >= 9 ? dt.getDate() : "0" + dt.getDate();

    return y + m + d + "T120000Z";
}

app.get('/', function(req, res){
    var startDate   = new Date(req.query.start);
    var endDate     = new Date(req.query.end);
    var currentDate = new Date();
    var location    = req.query.loc;
    var description = req.query.dsc;

    if (startDate != "Invalid Date" &&
        endDate != "Invalid Date" && location && description) {
        var ical = "BEGIN:VCALENDAR\n" +
                "VERSION:2.0\n" +
                "PRODID:-//hacksw/handcal//NONSGML v1.0//EN\n" +
                "BEGIN:VEVENT\n" +
                "DTSTAMP:" + dateToIcalFormat(currentDate) + "\n" +
                "LOCATION:" + location + "\n" +
                "DTSTART:" + dateToIcalFormat(startDate) + "\n" +
                "DTEND:" + dateToIcalFormat(endDate) + "\n" +
                "SUMMARY:" + description + "\n" +
                "END:VEVENT\n" +
                "END:VCALENDAR";
                
        res.send(ical);
    } else {
        res.status(404);
        res.send();
    }
});

app.listen(3000);