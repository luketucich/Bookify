// Initalizes library to store user's collection of books
const userLibrary = [];

// Object constructor for creating a new book
function Book(author, title, pages, hasRead) {
    this.author = author
    this.title = title
    this.pages = pages
    this.hasRead = hasRead
};

// 
function addBookToLibrary() {
  // do stuff here
}

document.getElementById('addBook').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    var userInput = document.getElementById('userInput').value;
    document.getElementById('modalText').textContent = userInput;

    var modal = document.getElementById('myModal');
    modal.style.display = 'block';
});

document.querySelector('.close').addEventListener('click', function() {
    var modal = document.getElementById('myModal');
    modal.style.display = 'none';
});

// Close the modal if the user clicks outside of it
window.addEventListener('click', function(event) {
    var modal = document.getElementById('myModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});