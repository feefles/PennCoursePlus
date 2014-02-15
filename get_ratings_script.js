$(document).ready(function()) {
    function getRating(instructor,course) {


        $.ajax({
            type: 'GET',
            url: 'http://api.penncoursereview.com/v1/coursehistories/CIS-120?token=public',
            data: {'quaity' : rCourseQuality},
            dataType: 'json'
        });
    }
}