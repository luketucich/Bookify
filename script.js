// Initalizes library to store user's collection of books
const userLibrary = [];
const libraryContainer = document.getElementById('booksContainer');
const mainForm = document.getElementById('mainForm');
const removeBookButtons = document.getElementsByClassName('libraryRemoveBook');
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
    
    mainForm.style.display = 'none';

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
    mainForm.style.display = 'flex';
    document.getElementById('mainForm').reset();
    document.getElementById('modalForm').reset();
});

// Adds book to library
function addBookToLibrary(){
    // Grabs current book's information
    var bookTitle = document.getElementById('bookTitle').textContent;
    var bookAuthor = document.getElementById('bookAuthor').value;
    var bookPageCount = document.getElementById('bookPageCount').value;

    // Removes placeholder book elements
    if(haveAddedBooks == false){
        while (libraryContainer.firstChild) {
            libraryContainer.removeChild(libraryContainer.firstChild);
        }
    }

    // Updates haveAddedBooks value so placeholder books are no longer being attempted to remove
    haveAddedBooks = true; 

    // Adds book to library and updates DOM
    const libraryBook = document.createElement('div');
    libraryBook.classList.add('book');

    bookInfo = [bookTitle,bookAuthor,bookPageCount] // Current book's info
    libraryBookIDs = ['libraryBookTitle', 'libraryBookAuthor', 'libraryBookPageCount']; // Library book IDs for styling

    // Adds information to libraryBook with corresponding IDs for styling (title, author, page count)
    for (let i = 0 ; i < 3 ; i++){

        // Creates the library book div
        var libraryBookInfo = document.createElement('div');
        libraryBookInfo.setAttribute('id', libraryBookIDs[i]);
        
        if (i == 0){
            libraryBookInfo.textContent = bookInfo[i] // add title text content 
            libraryBook.appendChild(libraryBookInfo); // add info to library book

        } else if (i == 1){
            libraryBookInfo.textContent = bookInfo[i]; // add author text content

            // Create section in library book dedicated to book's info (author, pages, etc.)
            var libraryBookDescContainer = document.createElement('div');
            libraryBookDescContainer.setAttribute('id', 'libraryBookDescContainer');
            libraryBook.appendChild(libraryBookDescContainer);
            libraryBookDescContainer.appendChild(libraryBookInfo); // adds book info to dedicated section

        } else if (i == 2){
            libraryBookInfo.textContent = bookInfo[i] + ' pages'; // add page text content
            libraryBookDescContainer.appendChild(libraryBookInfo); // adds book info to dedicated section
        }
    }

    // Adds libraryBook to user's library
    libraryContainer.appendChild(libraryBook);
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

    // Updates modal display to none and resets forms
    modal.style.display = 'none';
    mainForm.style.display = 'flex';
    document.getElementById('mainForm').reset();
    document.getElementById('modalForm').reset();
});