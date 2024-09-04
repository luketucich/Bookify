// Initalizes library to store user's collection of books
const userLibrary = [];

// Object constructor for creating a new book
function Book(author, title, pages, hasRead) {
    this.author = author
    this.title = title
    this.pages = pages
    this.hasRead = hasRead
};

document.getElementById('addBook').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    var bookTitle = document.getElementById('bookTitle').value;
    document.getElementById('modalText').textContent = bookTitle;

    var modal = document.getElementById('myModal');
    modal.style.display = 'block';
});

document.querySelector('.close').addEventListener('click', function() {
    var modal = document.getElementById('myModal');
    modal.style.display = 'none';
    document.getElementById('addBook').reset();
    document.getElementById('modalAddBook').reset();
});