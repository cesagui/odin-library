const myLibrary = [];
const libraryDiv = document.querySelector('.library');

function Book(title, author, pageCount, read){
    if (!new.target){
        return Error("Please use the new keyword when instantiating this Page Object");
    }
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.read = read;
    this.readString = 'not read yet.';
    this.id = crypto.randomUUID();
    
    this.info = function(){
        if (read){
            this.readString = 'read already.';
        }
        return (title + " by " + author + ", " + pageCount + " pages, " + this.readString);
    }
}

function createNewBookButton(){
    const header = document.querySelector('.header');
    const newBookButton = document.createElement('button');
    newBookButton.id = 'new-book';
    newBookButton.innerHTML = 'NEW BOOK';
    header.appendChild(newBookButton);
}

function addBookToLibrary(title, author, pageCount, read){
    let newBook = new Book(title, author, pageCount, read);
    myLibrary.push(newBook);
}

function displayForm(){
    const headerDiv = document.querySelector('.header');
    const bookForm = document.createElement('form');

    const titleLabel = document.createElement('label');
    titleLabel.setAttribute('for', 'title');
    titleLabel.innerHTML = 'Title';
    const titleInput = document.createElement('input');
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('id', 'title');
    titleInput.setAttribute('name', 'book-title');
    const titleDiv = document.createElement('div');
    titleDiv.appendChild(titleLabel);
    titleDiv.appendChild(titleInput);

    const authorLabel = document.createElement('label');
    authorLabel.setAttribute('for', 'author');
    authorLabel.innerHTML = 'Author';
    const authorInput = document.createElement('input');
    authorInput.setAttribute('type', 'text');
    authorInput.setAttribute('id', 'author');
    authorInput.setAttribute('name', 'book-author');
    const authorDiv = document.createElement('div');
    authorDiv.appendChild(authorLabel);
    authorDiv.appendChild(authorInput);

    const pageCountLabel = document.createElement('label');
    pageCountLabel.setAttribute('for', 'page-count');
    pageCountLabel.innerHTML = 'Page Count:';
    const pageCountInput = document.createElement('input');
    pageCountInput.setAttribute('type', 'number');
    pageCountInput.setAttribute('id', 'page-count');
    pageCountInput.setAttribute('name', 'book-page-count');
    const pageCountDiv = document.createElement('div');
    pageCountDiv.appendChild(pageCountLabel);
    pageCountDiv.appendChild(pageCountInput);

    const readLabel = document.createElement('label');
    readLabel.setAttribute('for', 'read');
    readLabel.innerHTML = 'Read?';
    const readInput = document.createElement('input');
    readInput.setAttribute('type', 'checkbox');
    readInput.setAttribute('id', 'read');
    readInput.setAttribute('name', 'book-read');
    readInput.setAttribute('value', 'read-value');
    const readDiv = document.createElement('div');
    readDiv.appendChild(readLabel);
    readDiv.appendChild(readInput);
    
    const submitButton = document.createElement('input');
    submitButton.id = 'submit-button';
    submitButton.setAttribute('type', 'submit');
    submitButton.setAttribute('value', 'SUBMIT');


    bookForm.appendChild(titleDiv);
    bookForm.appendChild(authorDiv);
    bookForm.appendChild(pageCountDiv);
    bookForm.appendChild(readDiv);
    bookForm.appendChild(submitButton);
    
    bookForm.addEventListener('submit', (event) =>{
        event.preventDefault();
        console.log('event submitted');
        const formElement = document.querySelector('form');
        const formData = new FormData(formElement);
        
        let formValues = formData.values();
        formValues = Array.from(formValues);
        if (formValues[3]){
            addBookToLibrary(formValues[0], formValues[1], formValues[2], true);
        } else {
            addBookToLibrary(formValues[0], formValues[1], formValues[2], false);
        }
        displayLibrary();
    });
    headerDiv.appendChild(bookForm);
}

function createBook(event){

}
function displayLibrary(){
    libraryDiv.textContent = '';

    myLibrary.forEach((book) => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');

        const titleDiv = document.createElement("div");
        titleDiv.classList.add('title');
        titleDiv.append(book.title);

        const authorDiv = document.createElement("div");
        authorDiv.classList.add('author');
        authorDiv.append(book.author);

        const pageCountDiv = document.createElement("div");
        pageCountDiv.classList.add('page-count');
        pageCountDiv.append(book.pageCount + " pages");

        const removeButton = document.createElement("button");
        removeButton.classList.add('remove-button');
        // removeButton.addEventListener("click", onClick());
        removeButton.append("X");

        const readButton = document.createElement("button");
        readButton.classList.add('read-button');
        readButton.append("✓");
        
        bookDiv.appendChild(removeButton);
        bookDiv.appendChild(titleDiv);
        bookDiv.appendChild(authorDiv);
        bookDiv.appendChild(pageCountDiv);
        bookDiv.appendChild(readButton);
        

        if (book.read){
            bookDiv.classList.add('read');
        }
        
        libraryDiv.appendChild(bookDiv);
    });
    
}

createNewBookButton();

addBookToLibrary("The Hobbit", "J.R.R. Tolkein", 295, false);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, false);
addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 432, false);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, true);
addBookToLibrary("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 309, false);
addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", 277, true);
addBookToLibrary("Lord of the Flies", "William Golding", 224, false);
addBookToLibrary("Jane Eyre", "Charlotte Brontë", 507, false);
addBookToLibrary("The Chronicles of Narnia: The Lion, the Witch and the Wardrobe", "C.S. Lewis", 206, true);
addBookToLibrary("Of Mice and Men", "John Steinbeck", 112, false);
addBookToLibrary("Romeo and Juliet", "William Shakespeare", 96, true);
addBookToLibrary("The Da Vinci Code", "Dan Brown", 454, false);

// addBookToLibrary("The Hobbit", "J.R.R. Tolkein", 295, false);
// addBookToLibrary("The Hobbit", "J.R.R. Tolkein", 295, false);
// addBookToLibrary("The Hobbit", "J.R.R. Tolkein", 295, false);

displayLibrary();
displayForm();

