const listBooks = document.querySelector('.list-books');
const form = document.querySelector('.form-input');
const [title, author] = form.elements;
const [navList, navAdd, navContact] = document.querySelectorAll('.list-item');
const allBooks = document.querySelector('.allBooks');
const addBook = document.querySelector('.addBook');
const contact = document.querySelector('.contact');

const inputBook = {};
let books = [];

if (localStorage.savedBooks) {
  books = JSON.parse(localStorage.getItem('savedBooks'));
}

navList.addEventListener('click', () => {
  allBooks.classList.remove('hidden');
  addBook.classList.add('hidden');
  contact.classList.add('hidden');
});

navAdd.addEventListener('click', () => {
  addBook.classList.remove('hidden');
  allBooks.classList.add('hidden');
  contact.classList.add('hidden');
});

navContact.addEventListener('click', () => {
  contact.classList.remove('hidden');
  allBooks.classList.add('hidden');
  addBook.classList.add('hidden');
});

title.addEventListener('change', () => {
  inputBook.title = title.value;
});

author.addEventListener('change', () => {
  inputBook.author = author.value;
});

const populateFields = () => {
  localStorage.setItem('savedBooks', JSON.stringify(books));
};

const Book = class {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  static removeBook(book) {
    const result = books.filter((b) => b !== book);
    books = result;
    populateFields();
  }

  static addBook = (newBook) => {
    books.push(newBook);
    populateFields();
    this.displayBooks();
  };

  static displayBooks = () => {
    listBooks.innerHTML = '';
    books.map((book) => {
      const bookDiv = document.createElement('tr');
      const elementBook = document.createElement('td');
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Remove';

      elementBook.textContent = `"${book.title}" by ${book.author}`;

      bookDiv.classList.add('book-container');
      bookDiv.appendChild(elementBook);
      bookDiv.appendChild(deleteBtn);

      listBooks.appendChild(bookDiv);

      deleteBtn.addEventListener('click', () => {
        this.removeBook(book);
        listBooks.removeChild(bookDiv);
      });
      return listBooks;
    });
  };
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  Book.addBook(new Book(inputBook.title, inputBook.author));
  form.submit();
});

Book.displayBooks();
populateFields();
