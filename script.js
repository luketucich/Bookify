// Initalizes library to store user's collection of books
const userLibrary = [];
const libraryContainer = document.getElementById('booksContainer');
var haveAddedBooks = false;

 // Object constructor for creating a new book
function addBook(author, title, pages) {
    this.author = author
    this.title = title
    this.pages = pages
};

// Opens modal and inputs book title when user clicks right-arrow icon
document.getElementById('mainForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    
    // Sets modal's form text to be user's input for the book title
    var bookTitle = document.getElementById('mainFormInput').value;
    document.getElementById('bookTitle').textContent = bookTitle;

    // Adjusts modal display style to be visible
    var modal = document.getElementById('modal');
    modal.style.display = 'block';
});

// Closes modal and resets forms
document.getElementById('closeModal').addEventListener('click', function() {
    var modal = document.getElementById('modal');
    modal.style.display = 'none';
    document.getElementById('mainForm').reset();
    document.getElementById('modalForm').reset();
});

// Adds book to library
function addBookToLibrary(){
    // Grabs current book's title
    var bookTitle = document.getElementById('bookTitle').textContent;

    // Removes placeholder book elements
    if(haveAddedBooks == false){
        while (libraryContainer.firstChild) {
            libraryContainer.removeChild(libraryContainer.firstChild);
        }
    }

    // Updates haveAddedBooks value so placeholder books are no longer being attempted to remove
    haveAddedBooks = true; 

    // Adds book to library
    const div = document.createElement('div');
    div.classList.add('book');
    div.textContent = bookTitle;
    libraryContainer.appendChild(div);
};

// Submits modal form, adding book to user library, and resets forms
document.getElementById('modalForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Grabs relavent elements by ID and assigns to variables
    var modal = document.getElementById('modal');
    var bookTitle = document.getElementById('bookTitle').textContent;
    var bookAuthor = document.getElementById('bookAuthor').value;
    var bookPageCount = document.getElementById('bookPageCount').value;

    // Adds book to library
    addBook(bookAuthor, bookTitle, bookPageCount);
    addBookToLibrary();
    modal.style.display = 'none';
    document.getElementById('mainForm').reset();
    document.getElementById('modalForm').reset();
});

