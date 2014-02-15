

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


				$(".pitDarkDataTable tr:first").append('<td style="background-color: #666666;font-weight: bold; color:#dcdcdc;">Difficulty</td>');
				$(".pitDarkDataTable tr:first").append('<td style="background-color: #666666;font-weight: bold; color:#dcdcdc;">Quality</td>');

				var courseList = $('.pitDarkDataTable').children().children().next();

				$(courseList).each(function(){
					var that = this;
					var courseId = $(this).find('td:nth-child(1)').text();
					// $(this).append("<td>"+courseId+"</td>");
					// $(this).append("<td>"+courseId+"</td>");

					var split = courseId.trim().slice(0,-4);
					split = split.replace(/\s/g,''); 
					// split = getRating(split);
					$.ajax({
						type: 'GET',
						url: 'http://api.penncoursereview.com/v1/coursehistories/'+split+'?token=public',
						dataType: 'json'
					}).done(function(data) {
						var info = data['result']['courses'][1]['name'];
						 $(that).append("<td>"+info+"</td>");
					// $(this).append("<td>"+courseId+"</td>");
					// $(this).append("<td>"+courseId+"</td>");
					});
				});
			/*var c = $(".pitDarkDataTable tr:first td").length;
			$(".pitDarkDataTable tr:first").append("<td><Col "+(c+1)+"</td>");
			$(".pitDarkDataTable tr:gt(0)").append("<td>Col</td>");*/
		}


			// ----------------------------------------------------------

		}
	}
}, 10);
});