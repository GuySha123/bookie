import books from '../data/booksListData.js';
import { updateBooksStatus } from '../helpers/lendingRecordsHandler.js';

function displayBooks() {
    updateBooksStatus(books); // Update the books' isLent status from localStorage

    const bookList = document.getElementById('bookList');
    let temp = '';

    for (let indx = 0; indx < books.length; indx++) {
        temp += `
        <tr>
            <td>${books[indx].bookName}</td>
            <td>${books[indx].author}</td>
            <td>${books[indx].isLent ? 'Unavailable' : 'Available'}</td>
        </tr>
        `;
    }
    bookList.innerHTML = temp;
}

document.addEventListener('DOMContentLoaded', displayBooks);
