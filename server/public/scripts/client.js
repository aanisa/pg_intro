var editing = false;
var bookID = 0;

$(document).ready(function() {
    console.log("jQ sourced");


    $('#books').on('click', '.edit', function() { //stashing this data so it can fill in information later
        editing = true;
        $('#formTitle').text("you are now editing...");
        bookID = $(this).data('book'); //define it here so it's attached to the finding the data book. reuse this variable in PUT request
        var editTitle = $('#title').val($(this).data('title')); //immediately adds author name into input field
        var editAuthor = $('#author').val($(this).data('author'));
        var editYear = $('#year').val($(this).data('year'));
        var editPublisher = $('#publisher').val($(this).data('publisher'));

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

            $.ajax({
                type: 'PUT',
                data: {title: title, author: author, year: year, publisher:publisher , id: bookID},
                url: '/books/edit',
                success: function(response) {
                  getBooks();  //run the function again so page refreshes - deletes and reads new books
                }
            });

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
                    getBooks();
                }
            });
        }
        $('#title').val('');
        $('#author').val(''); //empty inputs
        $('#year').val('');
        $('#publisher').val('');
    });

    $('#books').on('click', '.delete', function() {
        // console.log('Delete' + $(this).data('book')); ///able to delete book with specific id. check to make sure it's refering to right id
        bookID = $(this).data('book');

        $.ajax({
            type: 'DELETE',
            url: 'books/delete/' + bookID,
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
            //when click edit, all inputs will be auto filled
                $el.append('<td><button class="edit" data-book="' + book.id +
                    '" data-author="' + book.author +
                    '" data-title="' + book.title +
                    '" data-year="' + book.year +
                    '" data-publisher="' + book.publisher +
                    '" >Edit</button></td>');
            }
        }
    });
}
