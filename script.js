// Initalizes library to store user's collection of books
const userLibrary = [];

// Object constructor for creating a new book
function Book(author, title, pages, hasRead) {
    this.author = author
    this.title = title
    this.pages = pages
    this.hasRead = hasRead
};

// Opens modal and inputs book title when user clicks right-arrow icon
document.getElementById('mainForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    console.log('test');
    // Sets modal's form text to be user's input for the book title
    var bookTitle = document.getElementById('mainFormInput').value;
    document.getElementById('bookTitle').textContent = bookTitle;

    // Adjusts modal display style to be visible
    var modal = document.getElementById('modal');
    modal.style.display = 'block';
});

// Closes modal and resets form when user clicks exit icon
document.getElementById('closeModal').addEventListener('click', function() {
    var modal = document.getElementById('modal');
    modal.style.display = 'none';
    document.getElementById('mainForm').reset();
    document.getElementById('modalForm').reset();
});