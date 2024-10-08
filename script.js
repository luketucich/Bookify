// Initalizes library to store user's collection of books
const libraryContainer = document.getElementById("booksContainer");
const mainForm = document.getElementById("mainForm");
const modal = document.getElementById("modal");
const booksMessage = document.getElementById("booksMessage");
const main = document.getElementById("main");

// Opens modal and inputs book information
document
  .getElementById("mainForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Sets main  display to none so it doesn't overlap on page
    main.style.display = "none";

    // Sets modal's form text to be user's input for the book title
    const bookTitle = document.getElementById("mainFormInput").value;
    document.getElementById("bookTitle").textContent = bookTitle;

    // Adjusts modal display style to be visible
    modal.style.display = "block";
  });

// Closes modal and resets forms
document.getElementById("closeModal").addEventListener("click", function () {
  modal.style.display = "none";
  main.style.display = "flex";
  document.getElementById("mainForm").reset();
  document.getElementById("modalForm").reset();
});

// Class for creating a new book
class Book {
  constructor(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
  }
}

// Class for creating a library of books
class Library {
  constructor() {
    this.userLibrary = [];
    this.haveAddedBooks = false;
  }

  addBook(author, title, pages, read) {
    const newBook = new Book(author, title, pages, read);
    this.userLibrary.push(newBook);

    if (!this.haveAddedBooks) {
      this.haveAddedBooks = true;
      while (libraryContainer.firstChild) {
        libraryContainer.removeChild(libraryContainer.firstChild);
      }
    }
  }
}

// Initializes user's library
const library = new Library();

// Adds book to library
function addBookToDOM() {
  // Grabs current book's information
  const currentBookIndex = library.userLibrary.length - 1;
  const currentBookAuthor = library.userLibrary[currentBookIndex].author;
  const currentBookTitle = library.userLibrary[currentBookIndex].title;
  const currentBookPageCount = library.userLibrary[currentBookIndex].pages;
  const currentBookRead = library.userLibrary[currentBookIndex].read;

  // Creates visual for current book in the user's library
  // Book's card
  const bookCardContainer = document.createElement("div");
  bookCardContainer.classList.add("book");
  libraryContainer.appendChild(bookCardContainer);

  // Card's title
  const bookCardTitle = document.createElement("div");
  bookCardTitle.textContent = currentBookTitle;
  bookCardTitle.className = "libraryBookTitle";
  bookCardContainer.appendChild(bookCardTitle);

  // Card's content container
  const bookCardContent = document.createElement("div");
  bookCardContent.className = "libraryBookContent";
  bookCardContainer.appendChild(bookCardContent);

  // Card's content (author, pages)
  // Author
  const bookCardAuthor = document.createElement("div");
  bookCardAuthor.textContent = currentBookAuthor;
  bookCardAuthor.className = "libraryBookAuthor";
  bookCardContent.appendChild(bookCardAuthor);
  // Page count
  const bookCardPageCount = document.createElement("div");
  bookCardPageCount.textContent = currentBookPageCount + " pages";
  bookCardPageCount.className = "libraryBookPageCount";
  bookCardContent.appendChild(bookCardPageCount);

  // Card's icon container
  const bookCardIcons = document.createElement("div");
  bookCardIcons.className = "libraryIconsContainer";
  bookCardContainer.appendChild(bookCardIcons);

  // Card's icons (read, trash)
  // Read
  const readIcon = document.createElement("i");
  if (currentBookRead == true) {
    readIcon.className = "animatedButton fa-solid fa-bookmark";
    readIcon.style.color = "#8B0000";
  } else {
    readIcon.className = "animatedButton fa-regular fa-bookmark";
  }
  bookCardIcons.appendChild(readIcon);
  // Trash
  const removeIcon = document.createElement("i");
  removeIcon.className = "animatedButton fa-regular fa-trash-can";
  bookCardIcons.appendChild(removeIcon);
}

// Submits modal form, adding book to user library, and resets forms
document
  .getElementById("modalForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    const bookAuthor = document.getElementById("bookAuthor").value;
    const bookTitle = document.getElementById("bookTitle").textContent;
    const bookPageCount = document.getElementById("bookPageCount").value;
    const bookRead = document.getElementById("bookRead").checked;

    // Adds book to user library
    library.addBook(bookAuthor, bookTitle, bookPageCount, bookRead);
    addBookToDOM();

    // Updates element displays and resets forms
    booksMessage.style.display = "none";
    modal.style.display = "none";
    main.style.display = "flex";
    document.getElementById("mainForm").reset();
    document.getElementById("modalForm").reset();
  });

// Allows user to remove books
document
  .getElementById("booksContainer")
  .addEventListener("click", function (event) {
    if (event.target && event.target.matches(".fa-trash-can")) {
      // Creates a list of books in the DOM
      const libraryBooksInDOM = Array.from(libraryContainer.children);

      // Selects the current book container element and index
      const selectedLibraryBook = event.target.parentElement.parentElement;
      const selectedLibraryBookIndex =
        libraryBooksInDOM.indexOf(selectedLibraryBook);

      // Removes the book from DOM and userLibrary array
      library.userLibrary.splice(selectedLibraryBookIndex, 1);
      selectedLibraryBook.remove();

      // Displays message in library if user has no books added
      if (library.userLibrary.length == 0) {
        booksMessage.style.display = "block";
      }
    }
  });

// Allows user to update book's read value and styling
document
  .getElementById("booksContainer")
  .addEventListener("click", function (event) {
    if (event.target && event.target.matches(".fa-bookmark")) {
      // Creates a list of books in the DOM
      const libraryBooksInDOM = Array.from(libraryContainer.children);

      // Selects the current book container element and index
      const selectedLibraryBook = event.target.parentElement.parentElement;
      const selectedLibraryBookIndex =
        libraryBooksInDOM.indexOf(selectedLibraryBook);

      // Changes read value in userLibrary and updates styling accordingly
      if (event.target.classList == "animatedButton fa-solid fa-bookmark") {
        event.target.classList = "animatedButton fa-regular fa-bookmark";
        event.target.style.color = "rgb(102, 102, 102)";
      } else {
        event.target.classList = "animatedButton fa-solid fa-bookmark";
        event.target.style.color = "#8B0000";
      }

      // Read value will only be updated on non-placeholder books
      try {
        if (library.userLibrary[selectedLibraryBookIndex].read == true) {
          library.userLibrary[selectedLibraryBookIndex].read = false;
        } else {
          library.userLibrary[selectedLibraryBookIndex].read = true;
        }
      } catch (error) {
        console.log("This is a placeholder book.");
      }
    }
  });
