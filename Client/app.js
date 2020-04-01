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
                    $("#title").append(`<tr><td>${data["title"]}</td></tr>`);  
                    $("#genre").append(`<tr><td>${data["genre"]}</td></tr>`);
                    $("#director").append(`<tr><td>${data["director"]}\t<button onClick="Edit()">Edit</button>\t<button onClick="Delete()">Delete</button></td></tr>`);
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });
    }

	$('#my-form').submit(processForm);
})(jQuery);

$(function(){
    LoadMovies();
})

function LoadMovies(){
    let data = {}
    $.get('https://localhost:44325/api/movie', function(data){
        $("#movieTable").append(`<tr><th>Title</th><th>Genre</th><th>Director</th><th>Edit</th></tr>`); 
        for(let i = 0; i < data.length; i++){     
            $("#movieTable").append(`<tr><td>${data[i]["title"]}</td><td>${data[i]["genre"]}</td><td>${data[i]["director"]}</td><td><button  onClick="Edit('${data[i]["movieId"]}', '${data[i]["title"]}', '${data[i]["genre"]}', '${data[i]["director"]}')">Edit</button></td></tr>`);  
        }
    })
}

    function Edit(id, title, genre, director){
        console.log("Edit");
        id = parseInt(id);
        var dict = {
            MovieId: id,
            Title: title,
            Genre: genre,
            Director: director
        };
        dict.Title = prompt("Enter in the new title:");
        dict.Genre= prompt("Enter in the new genre:");
        dict.Director = prompt("Enter in the new director:");
            $.ajax({
                url: 'https://localhost:44325/api/movie',
                dataType: 'text',
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(dict),
                success: function(data, textStatus, jQxhr){  
                    document.getElementById("movieTable").innerHTML = "";
                    LoadMovies();
                    
                },  
                error: function( jqXhr, textStatus, errorThrown ){
                    console.log( errorThrown );
                }
            });
            
    }
