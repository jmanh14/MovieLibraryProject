let movies = [];
let moviesLoaded = [];
$(function() {
	LoadMovies();
});
(function($) {
	function processForm(e) {
		var dict = {
			Title: this['title'].value,
			Director: this['director'].value,
			Genre: this['genre'].value
		};

<<<<<<< HEAD
        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function( data, textStatus, jQxhr ){
                $("#movieTable").append(`<tr><td>${data['title']}</td><td>${data["genre"]}</td><td>${data["director"]}</td><td><button onClick="Edit('${data["movieId"]}', '${data["title"]}', '${data["genre"]}', '${data["director"]}')">Edit</button><button onClick="DeleteMovie('${data["movieId"]}')">Delete</button></td></tr>`);
                movies.push(data);  
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });
        e.preventDefault();
    }
=======
		$.ajax({
			url: 'https://localhost:44325/api/movie',
			dataType: 'json',
			type: 'post',
			contentType: 'application/json',
			data: JSON.stringify(dict),
			success: function(data, textStatus, jQxhr) {
				$('#movieTable').append(
					`<tr><td>${data['title']}</td><td>${data['genre']}</td><td>${data[
						'director'
					]}</td><td><button onClick="Edit('${data['movieId']}', '${data['title']}', '${data[
						'genre'
					]}', '${data['director']}')">Edit</button><button onClick="deleteMovie('${data[
						'movieId'
					]}')">Delete</button></td></tr>`
				);
			},
			error: function(jqXhr, textStatus, errorThrown) {
				console.log(errorThrown);
			}
		});
		e.preventDefault();
	}
>>>>>>> 782bc1f739786ea780d18543b36d400caba2a100

	$('#my-form').submit(processForm);
})(jQuery);

function LoadMovies() {
	let data = {};
	$.get('https://localhost:44325/api/movie', function(data) {
		$('#movieTable').append(`<tr><th>Title</th><th>Genre</th><th>Director</th><th></th><th></th></tr>`);
		for (let i = 0; i < data.length; i++) {
			$('#movieTable').append(
				`<tr><td>${data[i]['title']}</td><td>${data[i]['genre']}</td><td>${data[i][
					'director'
				]}</td><td><button  onClick="Edit('${data[i]['movieId']}', '${data[i]['title']}', '${data[i][
					'genre'
				]}', '${data[i]['director']}')">Edit</button></td><td><button onClick="deleteMovie('${data[i][
					'movieId'
				]}')">Delete</button></td></tr>`
			);
		}
	});
}

function Edit(id, title, genre, director) {
	console.log('Edit');
	id = parseInt(id);
	var dict = {
		MovieId: id,
		Title: title,
		Genre: genre,
		Director: director
	};
	dict.Title = prompt('Enter in the new title:');
	dict.Genre = prompt('Enter in the new genre:');
	dict.Director = prompt('Enter in the new director:');
	$.ajax({
		url: 'https://localhost:44325/api/movie',
		dataType: 'text',
		type: 'PUT',
		contentType: 'application/json',
		data: JSON.stringify(dict),
		success: function(data) {
			document.getElementById('movieTable').innerHTML = '';
			LoadMovies();
		},
		error: function(jqXhr, textStatus, errorThrown) {
			console.log(errorThrown);
		}
	});
}
//Delete
function deleteMovie(id) {
	id = parseInt(id);
	$.ajax({
		url: 'https://localhost:44325/api/movie/' + id,
		dataType: 'text',
		type: 'delete',
		contentType: 'application/json',
		data: JSON.stringify(id),
		success: function(data) {
			alert("Movie will be deleted from Library once you click 'OK'");
			document.getElementById('movieTable').innerHTML = '';
			LoadMovies();
		},
		error: function(errorThrown) {
			console.log(errorThrown);
		}
	});
}
<<<<<<< HEAD
function LoadMovies(){
    let data = {}
    $.get('https://localhost:44325/api/movie', function(data){
        $("#movieTable").append(`<tr><th>Title</th><th>Genre</th><th>Director</th></tr>`); 
        for(let i = 0; i < data.length; i++){     
            $("#movieTable").append(`<tr><td>${data[i]["title"]}</td><td>${data[i]["genre"]}</td><td>${data[i]["director"]}</td><td><button onClick="Edit('${data[i]["movieId"]}', '${data[i]["title"]}', '${data[i]["genre"]}', '${data[i]["director"]}')">Edit</button></td><td><button onClick="DeleteMovie('${data[i]["movieId"]}')">Delete</button></td></tr>`); 
            movies.push(data[i]); 
        }
    })
}

function LoadMovie(movie){
    let data = movie;
    
    $("#movieTable").append(`<tr><th>Title</th><th>Genre</th><th>Director</th></tr>`);
    for(let i = 0; i < data.length; i++){
            $.get('https://localhost:44325/api/movie/' + data[i].movieId, function(data){
                if(!moviesLoaded.includes(moviesLoaded[i])){
                    $("#movieTable").append(`<tr><td>${data.title}</td><td>${data.genre}</td><td>${data.director}</td><td>
                    <button onClick="Edit('${data.movieId}', '${data.title}', '${data.genre}', '${data.director}')">Edit</button></td>
                    <td><button onClick="DeleteMovie('${data.movieId}')">Delete</button></td></tr>`); 
                    moviesLoaded.push(data);
                }
            })
        
    }

}

(function($) {
	function processForm(e) {
        dict = {
            Title: this['title'].value,
			Director: this['director'].value,
			Genre: this['genre'].value
        };
        moviesToGet = GetMovies(dict.Title, dict.Genre, dict.Director, movies);
        for(i = 0; i < moviesToGet.length; i++){
            data = moviesToGet[i];
        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'get',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function( data, textStatus, jQxhr ){
                document.getElementById("movieTable").innerHTML = "";
                LoadMovie(moviesToGet);
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });
    }
        e.preventDefault();
    }

	$('#search-form').submit(processForm);
})(jQuery);

function GetMovies(title, genre, director, movies){
   let moviesSearched = [];
    for(let i = 0; i < movies.length; i++){
        if(title === movies[i].title || genre == movies[i].genre || director === movies[i].director){
            moviesSearched.push(movies[i]);
        }
    }
    return moviesSearched;
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
=======
>>>>>>> 782bc1f739786ea780d18543b36d400caba2a100
