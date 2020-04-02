
$(function() {
	LoadMovies();
});
(function($) {
	function processForm(e) {
		var dict = {
			Title: this['title'].value,
			Director: this['director'].value,
			Genre: this['genre'].value,
			ImageURL: this['url'].value
		};

		$.ajax({
			url: 'https://localhost:44325/api/movie',
			dataType: 'json',
			type: 'post',
			contentType: 'application/json',
			data: JSON.stringify(dict),
			success: function(data, textStatus, jQxhr) {
				$('#movieTable').append(
					`<tr><td>${data[i]['title']}/td><td>${data[i]['genre']}</td><td>${data[i][
						'director'
					]}</td><td><button  onClick="GetImage('${data[i][
						'url'
					]}')">Image</button></td><td><button  onClick="Edit('${data[i]['movieId']}', '${data[i][
						'title'
					]}', '${data[i]['genre']}', '${data[i]['director']}', '${data[i][
						'url'
					]}')">Edit</button></td><td><button onClick="deleteMovie('${data[i][
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

	$('#my-form').submit(processForm);
})(jQuery);

function LoadMovies() {
	let data = {};
	$.get('https://localhost:44325/api/movie', function(data) {
		$('#movieTable').append(`<tr><th>Title</th><th>Genre</th><th>Director</th>ImageUrl<th></th><th></th></tr>`);
		for (let i = 0; i < data.length; i++) {
			$('#movieTable').append(
				`<tr><td>${data[i]['title']}</td><td>${data[i]['genre']}</td><td>${data[i][
					'director'
				]}</td><td><button  onClick="GetImage('${data[i]['url']}')">Image</button>
				</td><td><button  onClick="Edit('${data[i]['movieId']}', '${data[i][
					'title'
				]}', '${data[i]['genre']}', '${data[i]['director']}', '${data[i][
					'url'
				]}')">Edit</button></td><td></td><td><button onClick="deleteMovie('${data[i][
					'movieId'
				]}')">Delete</button></td></tr>`
			);
		}
	});
}

function Edit(id, title, genre, director, url) {
	console.log('Edit');
	id = parseInt(id);
	var dict = {
		MovieId: id,
		Title: title,
		Genre: genre,
		Director: director,
		Url: url
	};
	dict.Title = prompt('Enter in the new title:');
	dict.Genre = prompt('Enter in the new genre:');
	dict.Director = prompt('Enter in the new director:');
	dict.Url = prompt('Enter in the url image:');
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
function GetImage(url){
	window.open(url, "MoviePoster", "width=500, height=450");
}

$(document).ready(function() {
	$('#myInput').on('keyup', function() {
		var value = $(this).val().toLowerCase();
		$('#movieTable tr').filter(function() {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
		});
	});
});
