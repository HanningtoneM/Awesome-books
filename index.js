const listBooks = document.querySelector('.list-books');
const form = document.querySelector('.form-input');
const [title, author] = form.elements;

const inputBook = {};
let books = [];

if (localStorage.savedBooks) {
  books = JSON.parse(localStorage.getItem('savedBooks'));
}

title.addEventListener('change', () => {
  inputBook.title = title.value;
});

author.addEventListener('change', () => {
  inputBook.author = author.value;
});

function Book(title, author) {
  this.title = title;
  this.author = author;
}

const populateFields = () => {
  localStorage.setItem('savedBooks', JSON.stringify(books));
};

function removeBook(book) {
  const result = books.filter((b) => b !== book);
  books = result;
  populateFields();
}
