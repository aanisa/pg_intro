var editing = false;
var bookID = 0;

$(document).ready(function() {
    console.log("jQ sourced");

    $('#books').on('click', '.delete', function() {
        console.log('Delete' + $(this).data('book')); ///able to delete book with specific id. check to make sure it's refering to right id

        $.ajax({
          type: 'DELETE',
          url: 'books/delete' ,
          success: function (response) {
            console.log('delete this book');
            console.log(response);
          }
        });
        getBooks();
    });


    $('#books').on('click', '.edit', function() { //stashing this data so it can fill in information later
        editing = true;
        $('#formTitle').text("you are now editing...");
        var editTitle = $('#title').val($(this).data('title'));      //immediately adds author name into input field
        var editAuthor = $('#author').val($(this).data('author'));

        $.ajax({
          type: 'PUT',
          url: '/books/edit',
          success: function(response) {
            console.log('edit edit edit');
            console.log(response);
          }
        });
    });

    $('#bookForm').on('submit', function(event) {
        event.preventDefault();
        var title = $('#title').val();
        var author = $('#author').val();
        var year = $('#year').val();
        var publisher = $('#publisher').val();
        console.log(title, author, year, publisher);

        if (editing) {
          editing = false;
          $('#formTitle').text("Add new entry");
            // $.ajax
            // type: 'PUT', //to UPDATE the DB. use data object and req.body not url

        } else {
            $.ajax({
                type: "POST",
                url: "/books/add",
                data: {
                    title: title,
                    author: author,
                    year: year,
                    publisher: publisher
                },
                success: function(response) {
                    console.log(response);
                    getBooks();
                }
            });
        }
        $('#title').val('');
        $('#author').val(''); //empty inputs
    });

    getBooks();
});

function getBooks() {
    $.ajax({
        type: "GET",
        url: "/books",
        success: function(response) {
            $('#books').empty();
            for (var i = 0; i < response.length; i++) {
                var book = response[i];
                $('#books').append('<tr></tr>');
                var $el = $('#books').children().last();
                $el.append('<td>' + book.id + '</td>');
                $el.append('<td>' + book.author + '</td>');
                $el.append('<td>' + book.title + '</td>');
                $el.append('<td>' + book.year + '</td>');
                // $el.append('<td>' + book.publisher + '</td>');
                $el.append('<td><button class="delete" data-book="' +
                    book.id + '">Delete</button></td>');
                $el.append('<td><button class="edit" data-book="' + book.id +
                    '" data-author="' + book.author + '" data-title="' + book.title + '" >Edit</button></td>');
            }
        }
    });
}
