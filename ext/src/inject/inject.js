chrome.extension.sendMessage({}, function(response) {

    var getRating = function(course) {
        $.ajax({
            type: 'GET',
            url: 'http://api.penncoursereview.com/v1/coursehistories/'+course+'?token=public',
            // data: {query: },
            dataType: 'json'
        })
        return data['result']['courses'][1];
    };


	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading

		if ($(".pitDarkDataTable").length > 0) {
			console.log("hello world");


			$(".pitDarkDataTable tr:first").append('<td style="background-color: #666666;font-weight: bold; color:#dcdcdc;">Rating</td>');
			var courseList = $('.pitDarkDataTable').children().children().next();

			$(courseList).each(function(){
				var courseId = $(this).find('td:nth-child(1)').text();
				var split = courseId.trim().slice(0,-4);
				// split = getRating(split);
				split = split.replace(/\s/g,''); 
				$(this).append("<td>"+split+"</td>");
			});
		/*var c = $(".pitDarkDataTable tr:first td").length;
		$(".pitDarkDataTable tr:first").append("<td><Col "+(c+1)+"</td>");
		$(".pitDarkDataTable tr:gt(0)").append("<td>Col</td>");*/
	}


		// ----------------------------------------------------------

	}
}, 10);
});