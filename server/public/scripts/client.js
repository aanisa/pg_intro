$(document).ready(function() {
  console.log("jQ sourced");

  $('#bookForm').on('submit', function(event) {
    event.preventDefault();
    var title = $('#title').val();
    var author = $('#author').val();
    var year = $('#year').val();
    var publisher = $('#publisher').val();
    console.log(title, author, year, publisher);

    $.ajax({
      type: "POST",
      url: "/books/add",
      data: {title: title, author: author, year: year, publisher: publisher},
      success: function(response) {
        console.log(response);
        getBooks();
      }
    });
  });
getBooks();
});

function getBooks() {
  $.ajax({
    type: "GET",
    url: "/books",
    success: function(response) {
      // $('#books').empty();
      for (var i = 0; i < response.length; i++) {
      var book =  response[i];
      $('#books').append('<tr></tr>');
      var $el = $('#books').children().last();
      $el.append('<td>' + book.id + '</td>');
      $el.append('<td>' + book.author + '</td>');
      $el.append('<td>' + book.title + '</td>');
      $el.append('<td>' + book.year + '</td>');
      $el.append('<td>' + book.publisher + '</td>');
      }
    }
    });
}
