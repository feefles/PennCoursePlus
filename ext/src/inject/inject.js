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
    9. don't check recitations
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
                    $(".pit thead tr").append('<th id="quality">Quality</th>');
                    $(".pit thead tr").append('<th id="professor">Professor</th>');

                    $('#professor').tooltipster({
                        content: "Average quality of professor; higher is better."
                    });
                    $('#quality').tooltipster({
                        content: "Average quality of course; higher is better."
                    });
                    $('#difficulty').tooltipster({
                        content: "Difficulty of course; lower is better."
                    });

                    var courseList = $('.pit tbody').children();
                    // var ratings = require('./ratings');


                    $(courseList).each(function() {

                        var that = this;
                        var courseId = $(this).find('td:first').text();
                        var courseType = $(this).find('td:nth-child(3)').text();
                        var inst = $(this).find('td:nth-child(4)').text().toLowerCase();
                        inst = inst.replace(/\./g, '');

                       

                        var courseId = courseId.trim();
                        courseId = courseId.slice(0, -4).replace(/\s/g, '');
                        courseDept = courseId.slice(0, -4).toLowerCase();


                        // console.log(rate);
                        // console.log(ratings[courseId]);
                        // split = getRating(split);

                        if (courseType.trim() == 'Recitation' || courseType.trim() == 'Laboratory') {

                            $(that).append("<td>" + '' + "</td>");
                            $(that).append("<td>" + '' + "</td>");
                            $(that).append("<td>" + '' + "</td>");


                        } else {
                            // $item = $.getJSON(chrome.extension.getURL('src/config/ratings.json', async = false),
                            $.ajax({
                                dataType: "json", 
                                url: chrome.extension.getURL('src/config/ratings.json'),
                                async: false
                            }).done(function(data) {
                                if (data[courseId] != undefined) {
                                    $(that).append("<td>" + data[courseId]['difficulty'] + "</td>");
                                    $(that).append("<td>" + data[courseId]['quality'] + "</td>");
                                }
                                else {
                                    $(that).append("<td>" + "N/A" + "</td>");
                                    $(that).append("<td>" + "N/A"+ "</td>");
                                }
                            });

                            // function(ratings) {
                                // if (ratings[courseId] != undefined) {
                                //     $(that).append("<td>" + ratings[courseId]['difficulty'] + "</td>");
                                //     $(that).append("<td>" + ratings[courseId]['quality'] + "</td>");
                                // }
                                // else {
                                //     $(that).append("<td>" + "N/A" + "</td>");
                                //     $(that).append("<td>" + "N/A"+ "</td>");
                                // }
                            // });

                       
                        }


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
                            }, // non - numeric content is treated as a MAX value
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