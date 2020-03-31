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
			success: function(data) {
				$('#response pre').html(data);
			},
			error: function(errorThrown) {
				console.log(errorThrown);
			}
		});
		e.preventDefault();
	}

	$('#my-form').submit(processForm);
})(jQuery);
