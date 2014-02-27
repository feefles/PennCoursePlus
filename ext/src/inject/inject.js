chrome.extension.sendMessage({}, function(response) {

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
        //checks if we are on Penn InTouch website
        if (window.location.href.indexOf("pennintouch.apps.upenn.edu") > -1) {


            if (document.readyState === "complete") {
                clearInterval(readyStateCheckInterval);


                var title = $(document).find("title").text(); //grabs title of current page
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
                    //$(".pit thead tr").append('<th id="professor">Professor</th>');



                
                    //$('#professor').tooltipster({
                    //  content: "Average quality of professor; higher is better."
                    //});
                    $('#quality').tooltipster({
                        content: "Average quality of course; higher is better."
                    });
                    $('#difficulty').tooltipster({
                        content: "Difficulty of course; lower is better."
                    });

                    //fetches all courses in the course table
                    var courseList = $('.pit tbody').children();

                    //iterates through all courses in table      
                    $(courseList).each(function() { 

                        var that = this;
                        var courseId = $(this).find('td:first').text(); //grabs course name from table
                        var courseType = $(this).find('td:nth-child(3)').text(); //grabs course type (e.g. lecture, recitation)
                        
                        //sanitizes course information from table for lookup in JSON file
                        var inst = $(this).find('td:nth-child(4)').text().toLowerCase(); 
                        inst = inst.replace(/\./g, '');
                        var courseId = courseId.trim();
                        courseId = courseId.slice(0, -4).replace(/\s/g, '');
                        courseDept = courseId.slice(0, -4).toLowerCase();


                        if (courseType.trim() == 'Recitation' || courseType.trim() == 'Laboratory') {
                            //no ratings for recitations and laboratories 
                            $(that).append("<td>" + '' + "</td>");
                            $(that).append("<td>" + '' + "</td>");
                            // $(that).append("<td>" + '' + "</td>");


                        } else {


                            //gets rating data for each course
                            $item = $.getJSON(chrome.extension.getURL('src/config/ratings.json'),
                                function(ratings) {
                                    $(that).append("<td>" + ratings[courseId].difficulty + "</td>");
                                    $(that).append("<td>" + ratings[courseId].quality + "</td>");

                                });

                            $.ajax({
                                dataType: "json",
                                url: chrome.extension.getURL('src/config/ratings.json'),
                                async: false
                            }).done(function(data) {
                                if (data[courseId] !== undefined) { //adds course ratings to table
                                    $(that).append("<td>" + data[courseId].difficulty + "</td>");
                                    $(that).append("<td>" + data[courseId].quality + "</td>");
                                } else { //courses with no available data will be given value of "n/a"
                                    $(that).append("<td>" + "N/A" + "</td>");
                                    $(that).append("<td>" + "N/A" + "</td>");
                                }
                            });


                        }


                    });

                    //calls the tablesorter jquery plugin to allow for sorting of the course results

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
                $('.pitDarkDataTable').show();

            }
        }
    }, 10);
});