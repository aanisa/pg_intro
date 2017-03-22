$(document).ready(function() {
  console.log("jQ sourced");

  $('#bookForm').on('submit', function(event) {
    event.preventDefault();
    var title = $('#title').val();
    var author = $('#author').val();
    console.log(title, author);

    $.ajax({
      type: "POST",
      url: "/books/add",
      data: {title: title, author: author},
      success: function(response) {

      }
    });
  });

  $.ajax({
    type: "GET",
    url: "/books",
    success: function(response) {
      console.log(response);
      for (var i = 0; i < response.length; i++) {
      var book =  response[i];
      $('#books').append('<tr></tr>');
      var $el = $('#books').children().last();
      $el.append('<td>' + book.id + '</td>');
      $el.append('<td>' + book.author + '</td>');
      $el.append('<td>' + book.title + '</td>');
      }
    }
    });
});
