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

const populateFields = () => {
  localStorage.setItem('savedBooks', JSON.stringify(books));
};



form.addEventListener('submit', (e) => {
  e.preventDefault();
  Book.addBook(new Book(inputBook.title, inputBook.author));
  form.submit();
});

Book.displayBooks();
populateFields();
