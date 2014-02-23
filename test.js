$(function() {

var ratings = [];

$.getJSON("registrar.json", function(data) {
    // console.(data);
    // data is a JavaScript object now. Handle it as such

    // data.forEach(function(course) {
    //     var courseDept = course['dept'];
    //     var num = course['courseNumber'];
    //     var courseType = course['type'];
    //     $.ajax({
    //         type: 'GET',
    //         url: 'http://api.penncoursereview.com/v1/depts/' + courseDept + '/reviews?token=qL_UuCVxRBUmjWbkCdI554grLjRMPY',
    //         dataType: 'json',
    //     }).done(function(data) {
    //         courseId = courseDept + '-' + num;
    //          if (courseType.trim() !== 'REC' && courseType.trim() !== 'LAB') {
    //             var classes = data.result.values;
    //             var qualityavg = 0;
    //             var difficultyavg = 0;
    //             var numcourses = 0;

    //             profavg = 0;
    //             numprofcourses = 0;
                

    //             classes.forEach(function(name) {
    //                 var instructor = name.instructor.name.toLowerCase();
    //                 instructor = instructor.replace(/\./g, '');

    //                 // if (instructor.trim() == inst.trim()) {
    //                 //     profavg += parseFloat(name.ratings.rInstructorQuality);
    //                 //     numprofcourses++;
    //                 // }



    //                 var alias = name.section.primary_alias.trim().slice(0, -4);
    //                 alias = alias.replace(/\s/g, '');
    //                 if (courseId == alias) {
    //                     qualityavg += parseFloat(name.ratings.rCourseQuality);
    //                     difficultyavg += parseFloat(name.ratings.rDifficulty);
    //                     numcourses++;
    //                 }
    //             });


    //             qualityavg = (qualityavg / numcourses).toFixed(2);
    //             difficultyavg = (difficultyavg / numcourses).toFixed(2);
    //             // profavg = (profavg / numprofcourses).toFixed(2);
    //             if (isNaN(qualityavg)) {
    //                 qualityavg = "N/A";
    //             }
    //             if (isNaN(difficultyavg)) {
    //                 difficultyavg = "N/A";
    //             }
    //             // if (isNaN(profavg)) {
    //             //     profavg = "N/A";
    //             // }
    //             ratings.push({
    //                 courseId: courseDept + '-' + num,
    //                 quality: qualityavg,
    //                 difficulty: difficultyavg, 
    //                 // prof: profavg
    //             });
    //             // console.log(ratings);
    //         }
    //     });
    // });
    ratings = [{a: 'a'}];

});
// var requirejs = require('requirejs');
var fs = require('min-fs');
fs.write('./ratings.json', JSON.stringify(ratings));

});
