
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

				console.log("hello world");


				$('.pitDarkDataTable tr:first').unwrap().wrap("<thead/>");


				$('.pitDarkDataTable tr:nth-child(2)').nextUntil(".pitDarkDataTable tr:last").andSelf().wrapAll("<tbody/>");


				$(".pitDarkDataTable thead tr").append('<th style="background-color: #666666;font-weight: bold; color:#dcdcdc;">Difficulty</th>');
				$(".pitDarkDataTable thead tr").append('<th style="background-color: #666666;font-weight: bold; color:#dcdcdc;">Quality</th>');

				var courseList = $('.pitDarkDataTable tbody').children();

				$(courseList).each(function(){
					var that = this;
					var courseId = $(this).find('td:nth-child(1)').text();


					var courseId = courseId.trim();
					courseId = courseId.slice(0,-4).replace(/\s/g,''); 
					courseDept = courseId.slice(0,3).toLowerCase();
					// split = getRating(split);
					$.ajax({
						type: 'GET',
						url: 'http://api.penncoursereview.com/v1/depts/'+courseDept+'/reviews?token=VUFSbua5RgR7Ers7wrivV0MklE48sP',
						dataType: 'json'
					}).done(function(data) {
						// console.log(data)
						var classes = data.result.values;
						var qualityavg = 0;
						var difficultyavg = 0;
						var numcourses = 0;
						classes.forEach(function(name) {
							var alias = name.section.primary_alias.trim().slice(0,-4);
							alias = alias.replace(/\s/g,'');
							if (courseId == alias) {
								qualityavg+=parseInt(name.ratings.rCourseQuality);
								difficultyavg+=parseInt(name.ratings.rDifficulty);
								numcourses++;
							}
						});
						qualityavg = (qualityavg/numcourses).toFixed(2);
						difficultyavg = (difficultyavg/numcourses).toFixed(2);
						if (isNaN(qualityavg)) {
							qualityavg = "N/A";
						}
						if (isNaN(difficultyavg)) {
							difficultyavg = "N/A";
						}
						$(that).append("<td>"+qualityavg+"</td>");
						$(that).append("<td>"+difficultyavg+"</td>");
				});
				});

		}






			/*var courseId = $(this).find('td:first').text();
			$(this).append("<td>"+courseId+"</td>");
			$(this).append("<td>"+courseId+"</td>");

			var split = courseId.trim().slice(0,-4);
				// split = getRating(split);

				split = split.replace(/\s/g,''); 
				$.ajax({
					type: 'GET',
					url: 'http://api.penncoursereview.com/v1/coursehistories/'+split+'?token=public',
					dataType: 'json'
				}).done(function(data) {
					var info = data.result.courses.name;
                    $(that).append("<td>"+info+"</td>");
	
                    ////////////// */


                    $('.pitDarkDataTable').tablesorter({});

			// ----------------------------------------------------------

		}
	}
}, 10);
});