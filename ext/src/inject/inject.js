
chrome.extension.sendMessage({}, function(response) {

    // var getRating = function(course) {
    //     $.ajax({
    //         type: 'GET',
    //         url: 'http://api.penncoursereview.com/v1/coursehistories/'+course+'?token=public',
    //         // data: {query: },
    //         dataType: 'json'
    //     })

    // )};


var readyStateCheckInterval = setInterval(function() {
	if (window.location.href.indexOf("pennintouch.apps.upenn.edu") > -1) {



		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

			// ----------------------------------------------------------
			// This part of the script triggers when page is done loading

			if ($(".pitDarkDataTable").length > 0) {


				$('.pitDarkDataTable tr:first').unwrap().wrap("<thead/>");


				$('.pitDarkDataTable tr:nth-child(2)').nextUntil(".pitDarkDataTable tr:last").andSelf().wrapAll("<tbody/>");

				$(".pitDarkDataTable thead tr").append('<th style="background-color: #666666;font-weight: bold; color:#dcdcdc;">Difficulty</th>');
				$(".pitDarkDataTable thead tr").append('<th style="background-color: #666666;font-weight: bold; color:#dcdcdc;">Quality</th>');
				$(".pitDarkDataTable thead tr").append('<th style="background-color: #666666;font-weight: bold; color:#dcdcdc;">Professor</th>');

				/*$(".pitDarkDataTable thead tr").append('<th>Difficulty</th>');
				$(".pitDarkDataTable thead tr").append('<th>Quality</th>');*/

				var courseList = $('.pitDarkDataTable tbody').children();

				$(courseList).each(function(){
					var that = this;
					var courseId = $(this).find('td:nth-child(1)').text();
					var courseType = $(this).find('td:nth-child(3)').text();
					var inst = $(this).find('td:nth-child(4)').text().toLowerCase();



					var courseId = courseId.trim();
					courseId = courseId.slice(0,-4).replace(/\s/g,''); 
					courseDept = courseId.slice(0,-4).toLowerCase();
					// split = getRating(split);
					$.ajax({
						type: 'GET',
						url: 'http://api.penncoursereview.com/v1/depts/'+courseDept+'/reviews?token=qL_UuCVxRBUmjWbkCdI554grLjRMPY',
						dataType: 'json'
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

          /* $('.pitDarkDataTable').tablesorter({
           	    theme : 'blue',
				format: function(s) { 
            // format your data for normalization 
            return s.toLowerCase().replace(/NA/,0); 
        }           });

           $('.tablesorter-headerRow').css("color", "black");

*/
		}
		}
	}
}, 10);
});