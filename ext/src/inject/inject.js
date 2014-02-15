chrome.extension.sendMessage({}, function(response) {

	var getRating = function(course) {
		$.ajax({
			type: 'GET',
			url: 'http://api.penncoursereview.com/v1/coursehistories/'+course+'?token=public',
            // data: {query: },
            dataType: 'json'
        });
		return data['result']['courses'][1];
	};


	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading



		if ($(".pitDarkDataTable").length > 0) {
			console.log("hello world");



		$('.pitDarkDataTable tr:first').unwrap().wrap("<thead/>");
		//$('.pitDarkDataTable').wrapAll( "<tbody />");

		$('.pitDarkDataTable tr:nth-child(2)').nextUntil(".pitDarkDataTable tr:last").andSelf().wrapAll("<tbody/>");


		$(".pitDarkDataTable thead tr").append('<th style="background-color: #666666;font-weight: bold; color:#dcdcdc;">Difficulty</th>');
		$(".pitDarkDataTable thead tr").append('<th style="background-color: #666666;font-weight: bold; color:#dcdcdc;">Quality</th>');

		var courseList = $('.pitDarkDataTable tbody').children();
		$(courseList).each(function(){
			var courseId = $(this).find('td:first').text();
			$(this).append("<td>"+courseId+"</td>");
			$(this).append("<td>"+courseId+"</td>");

			var split = courseId.trim().slice(0,-4);
				// split = getRating(split);
				split = split.replace(/\s/g,''); 
				$(this).append("<td>"+split+"</td>");
				// $(this).append("<td>"+courseId+"</td>");
				// $(this).append("<td>"+courseId+"</td>");

			}); 
		
	} 

      $('.pitDarkDataTable').tablesorter({});


		// ----------------------------------------------------------

	}
}, 10);
});