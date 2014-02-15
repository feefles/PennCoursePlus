chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");

		var c = $(".pitDarkDataTable tr:first td").length;
		$(".pitDarkDataTable tr:first").append("<td><a href=''>Delete</a> Col "+(c+1)+"</td>");
		$(".pitDarkDataTable tr:gt(0)").append("<td>Col</td>");
		// ----------------------------------------------------------

	}
	}, 10);
});