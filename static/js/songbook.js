function setResults(songResults) {  
  $('#results').html('');

  if (songResults.length == 0) {
    $('#results').html('<h1 class="mt-5">No Results</h1>');
    $('#loadingSpinner').addClass('display-none');
    $('#results').removeClass('display-none');
    return;
  }

  // Creates a new table from the results.
  var table = $('<table class="table table-striped">');
  table.append('<thead>').children('thead')
    .append('<tr />').children('tr')
    .append('<th>Artist</th><th>Song</th><th>ID</th>');

  var tbody = table.append('<tbody />').children('tbody');

  for (var i = 0; i < songResults.length; i++) {
    var song = songResults[i];
    tbody.append('<tr />').children('tr:last')
      .append('<td><b>'+song.artist+'</b></td>')
      .append('<td>'+song.name+'</td>')
      .append('<td><b>'+song.song_id+'</b></td>');
  }

  table.appendTo('#results');

  $('#loadingSpinner').addClass('display-none');
  $('#results').removeClass('display-none');
}


$(document).ready(function() {
  $('#formSongInput').on('input', function() {
    $('#formArtistInput, textarea').val('');
    var query = $('#formSongInput').val();
    if (query.length >= 2) {
      $('#results').addClass('display-none');
      $('#loadingSpinner').removeClass('display-none');
      $.getJSON('/api/v1/typeahead/song/' + encodeURIComponent(query), function(data) {
        var curQuery = $('#formSongInput').val();
        if (query == curQuery) {
          setResults(data);
        }
      });
    }
    if (query.length == 0) {
      $('#results').html('');
      $('#loadingSpinner').addClass('display-none');
    }
  });

  $('#formArtistInput').on('input', function() {
    $('#formSongInput, textarea').val('');
    var query = $('#formArtistInput').val();
    if (query.length >= 2) {
      $('#results').addClass('display-none');
      $('#loadingSpinner').removeClass('display-none');
      $.getJSON('/api/v1/typeahead/artist/' + encodeURIComponent(query), function(data) {
        var curQuery = $('#formArtistInput').val();
        if (query == curQuery) {
          setResults(data);
        }
      });
    }
    if (query.length == 0) {
      $('#results').html('');
      $('#loadingSpinner').addClass('display-none');
    }
  });
});
