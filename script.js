// Initalizes library to store user's collection of books
const userLibrary = [];
const libraryContainer = document.getElementById('booksContainer');
const mainForm = document.getElementById('mainForm');
const modal = document.getElementById('modal');
const booksMessage = document.getElementById('booksMessage');

let haveAddedBooks = false;

 // Object constructor for creating a new book
function addBook(author, title, pages) {
    this.author = author
    this.title = title
    this.pages = pages

};

// Opens modal and inputs book information
document.getElementById('mainForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    
    // Sets main form display to none so it doesn't overlap on page
    mainForm.style.display = 'none';

    // Sets modal's form text to be user's input for the book title
    const bookTitle = document.getElementById('mainFormInput').value;
    document.getElementById('bookTitle').textContent = bookTitle;

    // Adjusts modal display style to be visible
    modal.style.display = 'block';
});

// Closes modal and resets forms
document.getElementById('closeModal').addEventListener('click', function() {
    modal.style.display = 'none';
    mainForm.style.display = 'flex';
    document.getElementById('mainForm').reset();
    document.getElementById('modalForm').reset();
});

// Adds book to library
function addBookToArray(){

    // Creates new book object
    const bookAuthor = document.getElementById('bookAuthor').value;
    const bookTitle = document.getElementById('bookTitle').textContent;
    const bookPageCount = document.getElementById('bookPageCount').value;
    const newBook = new addBook(bookAuthor, bookTitle, bookPageCount);

    // Adds book to library
    userLibrary.push(newBook);

    // Removes placeholder book elements
    if (haveAddedBooks == false){
        haveAddedBooks = true; 
        while (libraryContainer.firstChild) {
            libraryContainer.removeChild(libraryContainer.firstChild);
        }
    }
};

// Adds book to library
function addBookToDOM(){
    // Grabs current book's information
    const currentBookIndex = userLibrary.length - 1;
    const currentBookAuthor = userLibrary[currentBookIndex].author;
    const currentBookTitle = userLibrary[currentBookIndex].title;
    const currentBookPageCount = userLibrary[currentBookIndex].pages;

    // Creates visual for current book in the user's library
    // Book's card
    const bookCardContainer = document.createElement('div');
    bookCardContainer.classList.add('book');
    libraryContainer.appendChild(bookCardContainer);

    // Card's title
    const bookCardTitle = document.createElement('div');
    bookCardTitle.textContent = currentBookTitle;
    bookCardTitle.setAttribute('id', 'libraryBookTitle');
    bookCardContainer.appendChild(bookCardTitle);

    // Card's content container
    const bookCardContent = document.createElement('div');
    bookCardContent.setAttribute('id', 'libraryBookContent');
    bookCardContainer.appendChild(bookCardContent);

    // Card's content (author, pages, etc)
        // Author
    const bookCardAuthor = document.createElement('div');
    bookCardAuthor.textContent = currentBookAuthor;
    bookCardAuthor.setAttribute('id', 'libraryBookAuthor');
    bookCardContent.appendChild(bookCardAuthor);
        // Page count
    const bookCardPageCount = document.createElement('div');
    bookCardPageCount.textContent = currentBookPageCount + ' pages';
    bookCardPageCount.setAttribute('id', 'libraryBookPageCount');
    bookCardContent.appendChild(bookCardPageCount);
        // Remove button
    const removeIcon = document.createElement('i');
    removeIcon.className = 'fa-solid fa-trash-can'; 
    bookCardContent.appendChild(removeIcon);
};

// Submits modal form, adding book to user library, and resets forms
document.getElementById('modalForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Adds book to user library
    addBookToArray();
    addBookToDOM();

    // Updates element displays and resets forms
    booksMessage.style.display = 'none';
    modal.style.display = 'none';
    mainForm.style.display = 'flex';
    document.getElementById('mainForm').reset();
    document.getElementById('modalForm').reset();

});

// Allows user to remove books
document.getElementById('booksContainer').addEventListener('click', function(event){
    if(event.target && event.target.matches('.fa-trash-can')) {

        // Creates a list of books in the DOM 
        const libraryBooksInDOM = Array.from(libraryContainer.children);

        // Selects the current book container element and index
        const selectedLibraryBook = event.target.parentElement.parentElement;
        const selectedLibraryBookIndex = libraryBooksInDOM.indexOf(selectedLibraryBook);

        // Removes the book from DOM and userLibrary array
        userLibrary.splice(selectedLibraryBookIndex, 1);
        selectedLibraryBook.remove();

        // Displays message in library if user has no books added
        if(userLibrary.length == 0){
            booksMessage.style.display = 'block';
        }
    }

});

