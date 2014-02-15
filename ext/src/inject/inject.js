

jQuery.ajax = (function(_ajax){
    
    var protocol = location.protocol,
        hostname = location.hostname,
        exRegex = RegExp(protocol + '//' + hostname),
        YQL = 'http' + (/^https/.test(protocol)?'s':'') + '://query.yahooapis.com/v1/public/yql?callback=?',
        query = 'select * from html where url="{URL}" and xpath="*"';
    
    function isExternal(url) {
        return !exRegex.test(url) && /:\/\//.test(url);
    }
    
    return function(o) {
        
        var url = o.url;
        
        if ( /get/i.test(o.type) && !/json/i.test(o.dataType) && isExternal(url) ) {
            
            // Manipulate options so that JSONP-x request is made to YQL
            
            o.url = YQL;
            o.dataType = 'json';
            
            o.data = {
                q: query.replace(
                    '{URL}',
                    url + (o.data ?
                        (/\?/.test(url) ? '&' : '?') + jQuery.param(o.data)
                    : '')
                ),
                format: 'xml'
            };
            
            // Since it's a JSONP request
            // complete === success
            if (!o.success && o.complete) {
                o.success = o.complete;
                delete o.complete;
            }
            
            o.success = (function(_success){
                return function(data) {
                    
                    if (_success) {
                        // Fake XHR callback.
                        _success.call(this, {
                            responseText: (data.results[0] || '')
                                // YQL screws with <script>s
                                // Get rid of them
                                .replace(/<script[^>]+?\/>|<script(.|\s)*?\/script>/gi, '')
                        }, 'success');
                    }
                    
                };
            })(o.success);
            
        }
        
        return _ajax.apply(this, arguments);
        
    };
    
})(jQuery.ajax);

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
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading



		if ($(".pitDarkDataTable").length > 0) {


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
				$.ajax({
					type: 'GET',
					url: 'http://api.penncoursereview.com/v1/coursehistories/'+split+'?token=public',
					dataType: 'json'
				}).done(function(data) {
					var info = data.result.courses.name;
                    $(that).append("<td>"+info+"</td>");
	

			}); 
		});
		
	} 

      $('.pitDarkDataTable').tablesorter({});

		// ----------------------------------------------------------

	}
}, 10);
});