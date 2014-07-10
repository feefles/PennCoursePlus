
// if (window.location.href.indexOf("pennintouch.apps.upenn.edu") > -1) {
//             var $button = $('<input type="button" value="classes" />');
//             $button.appendTo($('body'));

//             $button.on('click', function() {
//                 console.log(chrome);

//                window.create({'url': 'schedule.html', 'type': 'popup'}, function(window) {
//                });

//             });
// }



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

//keep checking if state is ready
    var readyStateCheckInterval = setInterval(function() {
        //checks if we are on Penn InTouch website
        // if (window.location.href.indexOf("pennintouch.apps.upenn.edu") > -1) {


            if (document.readyState === "complete") {
                clearInterval(readyStateCheckInterval);

                var $button = $('<input type="button" value="classes" />');
                $button.appendTo($('body'));

            $.ajax({
                url: "https://esb.isc-seo.upenn.edu/8091/open_data/course_info/ACCT/101",
                type: 'GET',
                crossDomain:true,
                dataType: "json",
                headers: {
            "Authorization-Bearer": 'UPENN_OD_emtz_1000643',
            "Authorization-Token": 'o448e5mnbutjcji5ufofo630ur'
                }

            });


                var $courseCart = $('.studentRightRailTableData .fastButtonLinkText');
                console.log($courseCart.length);
                for (var i = 0; i < $courseCart.length; i++) {
                    console.log($courseCart[i].innerHTML);
                }


                var title = $(document).find("title").text(); //grabs title of current page
                var firstWord = title.split(' ')[0]; //grabs second word of the title
                var secondWord = title.split(' ')[1]; //grabs second word of the title

                if (secondWord == 'Search') { //checks if user is on the course search page

                    //formats table so it can be sorted using TableSorter plugin
                    $('.pitDarkDataTable tr:first').unwrap().wrap("<thead/>");
                    $('thead').children().children().children().children().unwrap().wrap("<span/>");
                    $('.pitDarkDataTable').children().unwrap().wrapAll("<table class='tablesorter pit'/>");
                    $('.pit tr:nth-child(2)').nextUntil(".pit tr:last").andSelf().wrapAll("<tbody/>");


                    //adds columns to table
                    $(".pit thead tr").append('<th id="difficulty">Difficulty</th>');
                    $(".pit thead tr").append('<th id="quality">Quality</th>');
                    $(".pit thead tr").append('<th id="professor">Professor</th>');


                    //$('#professor').tooltipster({
                    //  content: "Average quality of professor; higher is better."
                    //});
                    $('#quality').tooltipster({
                        content: "Average quality of course; higher is better."
                    });
                    $('#difficulty').tooltipster({
                        content: "Difficulty of course; lower is better."
                    });
                    $('#professor').tooltipster({
                        content: "Quality of Professor of course; higher is better."
                    });

                    //fetches all courses in the course table
                    var courseList = $('.pit tbody').children();
                    $(courseList).each(function(){
                    var that = this;
                    var courseId = $(this).find('td:nth-child(1)').text();
                    var courseType = $(this).find('td:nth-child(3)').text();
                    var inst = $(this).find('td:nth-child(4)').text().toLowerCase();



                    courseId = courseId.trim();
                    courseId = courseId.slice(0,-4).replace(/\s/g,'');
                    courseDept = courseId.slice(0,-4).toLowerCase();
                    // split = getRating(split);
                    $.ajax({
                        type: 'GET',
                        url: 'http://api.penncoursereview.com/v1/depts/'+courseDept+'/reviews?token=qL_UuCVxRBUmjWbkCdI554grLjRMPY',
                        dataType: 'json'
                    }).done(function(data) {
                        console.log(data);
                        if (courseType.trim() !== 'Recitation' && courseType.trim() !== 'Laboratory') {
                            var classes = data.result.values;
                            var qualityavg = 0;
                            var difficultyavg = 0;
                            var numcourses = 0;

                            profavg = 0;
                            numprofcourses = 0;
                            classes.forEach(function(name) {
                                var instructor = name.instructor.name.toLowerCase();
                                if (instructor.trim() == inst.trim()) {
                                    profavg += parseFloat(name.ratings.rInstructorQuality);
                                    numprofcourses++;
                                }



                                var alias = name.section.primary_alias.trim().slice(0,-4);
                                alias = alias.replace(/\s/g,'');
                                if (courseId == alias) {
                                    qualityavg+=parseFloat(name.ratings.rCourseQuality);
                                    difficultyavg+=parseFloat(name.ratings.rDifficulty);
                                    numcourses++;
                                }
                            });
                            qualityavg = (qualityavg/numcourses).toFixed(2);
                            difficultyavg = (difficultyavg/numcourses).toFixed(2);
                            profavg = (profavg/numprofcourses).toFixed(2);
                            if (isNaN(qualityavg)) {
                                qualityavg = "N/A";
                            }
                            if (isNaN(difficultyavg)) {
                                difficultyavg = "N/A";
                            }
                            if (isNaN(profavg)) {
                                profavg = "N/A";
                            }

                                $(that).append("<td>"+difficultyavg+"</td>");
                                $(that).append("<td>"+qualityavg+"</td>");
                                $(that).append("<td>"+profavg+ "</td>");
                        }

                        else {
                        $(that).append("<td>"+" "+"</td>");
                        $(that).append("<td>"+" "+"</td>");
                        $(that).append("<td>"+" "+ "</td>");
                        }

                     });
                });


                    $(".pit").tablesorter({
                        headers: {
                            7: {
                                sorter: "false", //prevents sorting of "add to cart" column
                            },
                            8: {
                                sorter: "digit", //data in this column will be sorted numericall
                                string: "bottom" //all non-numeric values will be pushed below sorted results
                            },
                            9: {
                                sorter: "digit",
                                string: "bottom"
                            },
                        },
                        // theme: "default"
                    });

                    $('.pit').show();


                }
                 document.styleSheets[0].insertRule('.pitDarkDataTable'+ ' {display: inline !important}', 0)

        
        // }
    }, 50);
