var getRandom = require('./modules/getRandomInt');
var shuffle = require('./modules/shuffle');
var slots = require('./modules/getInterviewSlots');
var sortByNum = require('./modules/sortByNum');
var getCombinations = require('./modules/getCombinations');
var scheduler = require('./modules/schedule');

var Tools = {
    combine: function(interviewers, students, cb){
        cb(getCombinations.generate(interviewers,students));
    },
    schedule: function(interviewSlots, interviewers, students, combinations, interviewMax, companyMax, cb){
        cb(scheduler.match(interviewSlots, interviewers, students, combinations, interviewMax, companyMax));
    },
    random: function(min, max, cb){
        cb(getRandom.between(min, max));
    },
    shuffle: function(array, cb){
        cb(shuffle.get(array));
    },
    getTotalSlots: function(eventDuration, interviewDuration, cb){
        cb(slots.get(eventDuration, interviewDuration));
    },
    sortHigh: function(array, cb){
        cb(sortByNum.high(array));
    },
    sortLow: function(array, cb){
        cb(sortByNum.low(array));
    }
};

module.exports = Tools;