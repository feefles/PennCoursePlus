chrome.extension.sendMessage({}, function(response) {

    // var getRating = function(course) {
    //     $.ajax({
    //         type: 'GET',
    //         url: 'http://api.penncoursereview.com/v1/coursehistories/'+course+'?token=public',
    //         // data: {query: },
    //         dataType: 'json'
    //     })

    // )};


    /*
To implement
	1. Link to PCR site
    2. Remove links from default headers in table
    3. Fix styling
    4. Make it easy to find easy classes that fulfill requirements
    5. Quality to ease ratio
    6. Fix "NA" rating
    7. double countring for sectors and foundation
    8. Make PCR headings more clear
*/

    var readyStateCheckInterval = setInterval(function() {
        if (window.location.href.indexOf("pennintouch.apps.upenn.edu") > -1) {



            if (document.readyState === "complete") {
                clearInterval(readyStateCheckInterval);

                // ----------------------------------------------------------
                // This part of the script triggers when page is done loading

                if ($(".pitDarkDataTable").length > 0) {

                    $('.pitDarkDataTable tr:first').unwrap().wrap("<thead/>");

                    $('thead').children().children().children().children().unwrap().wrap("<span/>");


                    $('.pitDarkDataTable').children().unwrap().wrapAll("<table class='tablesorter pit'/>");

                    $('.pit tr:nth-child(2)').nextUntil(".pit tr:last").andSelf().wrapAll("<tbody/>");

                    // $(".pitDarkDataTable thead tr").append('<th style="background-color: #666666;font-weight: bold; color:#dcdcdc;">Difficulty</th>');
                    // $(".pitDarkDataTable thead tr").append('<th style="background-color: #666666;font-weight: bold; color:#dcdcdc;">Quality</th>');
                    // $(".pitDarkDataTable thead tr").append('<th style="background-color: #666666;font-weight: bold; color:#dcdcdc;">Professor</th>');

                    $(".pit thead tr").append('<th id="difficulty">Difficulty</th>');
                    $(".pit thead tr").append('<th>Quality</th>');
                    $(".pit thead tr").append('<th>Professor</th>');

                    $('#difficulty').tooltipster({
                        content: "Awesome title!"
                    });

                    var courseList = $('.pit tbody').children();

                    $(courseList).each(function() {

                        var that = this;
                        var courseId = $(this).find('td:first').text();
                        var courseType = $(this).find('td:nth-child(3)').text();
                        var inst = $(this).find('td:nth-child(4)').text().toLowerCase();
                        inst = inst.replace(/\./g, '');

                        //$('body').append('<div id="pageTwo"></div>');

                        // $("#pageTwo").load("https://pennintouch.apps.upenn.edu/pennInTouch/jsp/fast2.do?fastButtonId=R1U83DVL");

                        var courseId = courseId.trim();
                        courseId = courseId.slice(0, -4).replace(/\s/g, '');
                        courseDept = courseId.slice(0, -4).toLowerCase();
                        // split = getRating(split);
                        $.ajax({
                            type: 'GET',
                            url: 'http://api.penncoursereview.com/v1/depts/' + courseDept + '/reviews?token=qL_UuCVxRBUmjWbkCdI554grLjRMPY',
                            dataType: 'json',
                            async: false
                        }).done(function(data) {

                            if (courseType.trim() !== 'Recitation' && courseType.trim() !== 'Laboratory') {
                                var classes = data.result.values;
                                var qualityavg = 0;
                                var difficultyavg = 0;
                                var numcourses = 0;

                                profavg = 0;
                                numprofcourses = 0;
                                classes.forEach(function(name) {
                                    var instructor = name.instructor.name.toLowerCase();
                                    instructor = instructor.replace(/\./g, '');

                                    if (instructor.trim() == inst.trim()) {
                                        profavg += parseFloat(name.ratings.rInstructorQuality);
                                        numprofcourses++;
                                    }



                                    var alias = name.section.primary_alias.trim().slice(0, -4);
                                    alias = alias.replace(/\s/g, '');
                                    if (courseId == alias) {
                                        qualityavg += parseFloat(name.ratings.rCourseQuality);
                                        difficultyavg += parseFloat(name.ratings.rDifficulty);
                                        numcourses++;
                                    }
                                });
                                qualityavg = (qualityavg / numcourses).toFixed(2);
                                difficultyavg = (difficultyavg / numcourses).toFixed(2);
                                profavg = (profavg / numprofcourses).toFixed(2);
                                if (isNaN(qualityavg)) {
                                    qualityavg = "N/A";
                                }
                                if (isNaN(difficultyavg)) {
                                    difficultyavg = "N/A";
                                }
                                if (isNaN(profavg)) {
                                    profavg = "N/A";
                                }


                                $(that).append("<td>" + difficultyavg + "</td>");
                                $(that).append("<td>" + qualityavg + "</td>");
                                $(that).append("<td>" + profavg + "</td>");
                            } else {
                                $(that).append("<td>" + '' + "</td>");
                                $(that).append("<td>" + '' + "</td>");
                                $(that).append("<td>" + '' + "</td>");
                            }

                        });
                    });



                    $(".pit").tablesorter({
                        headers: {
                            7: {
                                sorter: "false",
                            },
                            8: {
                                sorter: "digit",
                                string: "bottom"
                            },
                            9: {
                                sorter: "digit",
                                string: "bottom"
                            }, // non-numeric content is treated as a MAX value
                            10: {
                                sorter: "digit",
                                string: "bottom"
                            } // non-numeric content is treated as a MIN value
                        },
                        // theme: "default"
                    });


                }

            }
        }
    }, 10);
});