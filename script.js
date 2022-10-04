function searchMovie() {
    $('#movie-list').html('')
    $.ajax({
        url: 'http://www.omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': 'c6971c9e',
            's': $('#search-input').val()
        },
        success: function (result) {
            $('#search-input').val('')
            if(result.Response == "True") {
                let movies = result.Search;
                $.each(movies, function (i, data) {
                    $('#movie-list').append(`
                    <div class="col-md-4">
                        <div class="card mb-3">
                            <img class="card-img-top" src="`+ data.Poster +`" alt="Card image cap">
                            <div class="card-body">
                            <h5 class="card-title">`+ data.Title +`</h5>
                                <h6 class="card-subtitle mb-2 text-muted">`+ data.Year +`</h6>
                                <a href="#" class="card-link see-detail" data-id="`+ data.imdbID +`" data-toggle="modal" data-target="#exampleModal">Detail Movie</a>
                            </div>
                        </div>
                    </div>
                    `)
                });
            }else {
                $('#movie-list').html(`
                <div class="col">
                <h1 class="text-center">`+ result.Error +`</h1>
                </div>
                `)
            }
        }
    });
}
$('#search-button').on('click', function () {
    searchMovie();    
});

$('#search-input').on('keyup', function (e) {
    if(e.keyCode == 13){
        searchMovie();
    }
}) ;

$('#movie-list').on('click', '.see-detail', function() {
    $('.modal-body').html('')
    $.ajax({
        url: 'https://omdbapi.com',
        dataType: 'json',
        type: 'get',
        data: {
            'apikey': 'c6971c9e',
            'i': $(this).data('id')
        },
        success: function (movie) {
            if(movie.Response === "True") {
                $('.modal-body').html(`
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="`+ movie.Poster +`" class="img-fluid">
                        </div>
                        <div class="col-md-8">
                            <ul class="list-group">
                                <li class="list-group-item"><h3>`+ movie.Title +`</h3></li>   
                                <li class="list-group-item">Released: `+ movie.Released +`</li>   
                                <li class="list-group-item">Genre: `+ movie.Genre +`</li>   
                                <li class="list-group-item">Director: `+ movie.Director +`</li>   
                                <li class="list-group-item">Actors: `+ movie.Actors +`</li>   
                                <li class="list-group-item">Country: `+ movie.Country +`</li>   
                            </ul>
                        </div>
                    </div>
                </div>
                `)
            }
        }
    });
});