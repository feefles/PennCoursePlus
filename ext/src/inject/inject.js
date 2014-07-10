
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

            if (firstWord == 'Grades') { //checks if user is on the grades page


              //inputs grade, outputs corresponding GPA
              var gradeToGPA = function(grade) {
                grade = grade.trim();
                if (grade == "A+"){
                  return 4.0;
                } else if (grade == "A"){
                  return 4.0;
                } else if (grade == "A-"){
                  return 3.7;
                } else if (grade == "B+"){
                  return 3.3;
                } else if (grade == "B"){
                  return 3.0;
                } else if (grade == "B-"){
                  return 2.7;
                } else if (grade == "C+"){
                  return 2.3;
                } else if (grade == "C"){
                  return 2.0;
                } else if (grade == "C-"){
                  return 1.7;
                } else if (grade == "D+"){
                  return 1.3;
                } else if (grade == "D"){
                  return 1.0;
                } else if (grade == "F"){
                  return 0.0;
                } else {
                  return 0.0;
                }
              };

              //tags classes with grades and classes without
              var gradeCells = $(".pitDarkDataTable tbody tr td:nth-child(4)");
              gradeCells.each(function( index ){
                if ($( this ).text().trim()==""){
                  $( this ).addClass("emptyGrade");
                  }
                else{
                  $( this ).addClass("nonEmptyGrade");
                }
              });



            //creates the dictionary for classes currently being taken
            var classDict = {};

            //adds dropdows to select grades for current classes
            $(".emptyGrade").each(function ( index ){
              var classDropDown = $( this ).prev().prev().text(); //gets name of class
              var classDropDown = classDropDown.replace(/ /g,''); //removes whitespace from name
              $( this ).append('<td class="gradeInputCell">' +
                  '<select class="gradeInput" id="'+classDropDown+'"><option disabled selected></option>'+
                  '<option value="4.0">A+</option><option value="4.0">A</option><option value="3.7">A-</option>'+
                  '<option value="3.3">B+</option><option value="3.0">B</option>  <option value="2.7">B-</option>'+
                  '<option value="2.3">C+</option><option value="2.0">C</option><option value="1.7">C-</option>'+
                  '<option value="1.3">D+</option><option value="1.0">D</option><option value="0">F</option></select>'+
                  '</td>');
              classDict[classDropDown]; //adds class to dict

            });

            }
            var gradesCum = []; //array of GPA grades for classes already taken
            $(".nonEmptyGrade").each(function( index ){
              gradesCurr.push((gradeToGPA($( this ).text())));
            });
            console.log(grades);
            var sumCum = 0;
            for (var i = 0; i<gradesCum.length; i++){
              sumCum += grades[i];
            }
            var avgCum = sumCum/gradesCum.length; //calcualtes cumulative GPA, excluding current classes
            console.log(avgCum);

        var avgCurr = ''; //current average GPA


        $(".headerRed").append("<br> Cumulative GPA: <span id='cumulative'>"+ avgCum.toFixed(2) +"</span> <br>GPA for current: <span id='current'>"+ avgCurr +" </span><br>Projected GPA: <span id='cumulative'></span>");


        $(document).on('change', '.gradeInput', function(e) {
          var currGrades = [];
          
          console.log(this.options[e.target.selectedIndex].value);
          console.log(e.target.id);
          classDict[e.target.id] = this.options[e.target.selectedIndex].value;
          console.log(classDict);

          for (var key in classDict) {
          if (classDict.hasOwnProperty(key)) {
            console.log(classDict[key]);
             currGrades.push(classDict[key]);
           }
}
      console.log(currGrades);
      avgCurr = 0;
      var sum = 0;
      for (var i = 0; i<currGrades.length; i++){
        sum += currGrades[i];
      }
      avgCurr = sum/(currGrades.length);
      console.log(avgCumulative);
      $("#current").text(avgCurr);

  });

      console.log(classDict);

            }
        // }
    }, 50);
