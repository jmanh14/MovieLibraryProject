images = ["https://upload.wikimedia.org/wikipedia/en/8/8a/Dark_Knight.jpg", 
"https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg",
"https://m.media-amazon.com/images/M/MV5BMTY1MTE4NzAwM15BMl5BanBnXkFtZTcwNzg3Mjg2MQ@@._V1_UY1200_CR88,0,630,1200_AL_.jpg",
"https://m.media-amazon.com/images/M/MV5BZjRlNDUxZjAtOGQ4OC00OTNlLTgxNmQtYTBmMDgwZmNmNjkxXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg"];
$(function() {
	LoadMovies();
});
(function($) {
	function processForm(e) {
		var dict = {
			Title: this['title'].value,
			Director: this['director'].value,
            Genre: this['genre'].value,
            ImageURL: this['imageURL'].value
		};


		$.ajax({
			url: 'https://localhost:44325/api/movie',
			dataType: 'json',
			type: 'post',
			contentType: 'application/json',
			data: JSON.stringify(dict),
			success: function(data, textStatus, jQxhr) {
				$('#movieTable').append(
					`<tr><td ><a href=${dict.ImageURL}>${data['title']}</a></td><td>${data['genre']}</td><td>${data[
						'director'
					]}</td><td><button onClick="Edit('${data['movieId']}', '${data['title']}', '${data[
						'genre'
					]}', '${data['director']}')">Edit</button></td><td><button onClick="deleteMovie('${data[
						'movieId'
					]}')">Delete</button></td></tr>`
                );
                images.push(dict.ImageURL);
                
			},
			error: function(jqXhr, textStatus, errorThrown) {
				console.log(errorThrown);
			}
		});
		e.preventDefault();
	}

	$('#my-form').submit(processForm);
})(jQuery);

function LoadMovies() {
	let data = {};
	$.get('https://localhost:44325/api/movie', function(data) {
		$('#movieTable').append(`<tr><th>Title</th><th>Genre</th><th>Director</th><th></th><th></th></tr>`);
		for (let i = 0; i < data.length; i++) {
			$('#movieTable').append(
				`<tr><td><a href=${images[i]}>${data[i]['title']}</a></td><td>${data[i]['genre']}</td><td>${data[i][
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

$(document).ready(function(){
    $("#myInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#movieTable tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
});
$('a').each( function() {
    $(this).click( function(e) {
        var imgUrl = $(this).attr("href");
        alert(imgUrl);
        // display here the image where you want
        images[e];
        e.preventDefault();
        return false;
    })
})
