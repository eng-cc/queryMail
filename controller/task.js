var later = require('later');

//var sched = later.parse.text('every 5 second'),
//occure = later.schedule(sched).next(10);

/*for (var i = 10; i >= 0; i--) {
	console.log(occure[i]);
};*/

/*later.setInterval(function(){
	console.log('scc')
},sched);*/

var laterRun = function(hour, fn) {

    var sched = {
        schedules: [{
            h: hour,
            m: [0]
        }]
    };
    later.date.localTime();
    later.setInterval(fn, sched);
}

module.exports = laterRun;
