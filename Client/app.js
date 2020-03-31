(function($) {
	function processForm(e) {
		var dict = {
			Title: this['title'].value,
			Director: this['director'].value,
			Genre: this['genre'].value
		};

        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function( data, textStatus, jQxhr ){
                $('#title td').append( function(data){
                    data["title"];
                } );
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });

	$('#my-form').submit(processForm);
})(jQuery);

$(function(){
    let data = {}
    $.get('https://localhost:44325/api/movie', function(data){
        for(let i = 0; i < data.length; i++){    
            $("#title").append(`<tr><td>${data[i]["title"]}</td></tr>`);  
            $("#genre").append(`<tr><td>${data[i]["genre"]}</td></tr>`);
            $("#director").append(`<tr><td>${data[i]["director"]}</td></tr>`);
        }
    })
})
