import books from '../data/booksListData.js';
import {
    updateBooksStatus,
    saveLendingRecord,
} from '../helpers/lendingRecordsHandler.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('lendForm');
    const selectElement = document.getElementById('booksDropdown');
    const errorMessage = document.getElementById('errorMessage');

    // Update isLent status in books array based on local storage data
    updateBooksStatus(books);

    // Populate the dropdown with books that are not currently lent
    books.forEach((book) => {
        if (!book.isLent) {
            selectElement.innerHTML += `<option value="${book.bookName}">${book.bookName}</option>`;
        }
    });

    // Manually handle form submission to prevent default browser validation
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Clear any previous error messages
        errorMessage.textContent = '';

        // Retrieve data from the form using FormData
        const formData = new FormData(form);
        const firstName = formData.get('firstName').trim();
        const lastName = formData.get('lastName').trim();
        const bookName = formData.get('bookName');

        // Validate form inputs
        if (!firstName || !lastName || !bookName) {
            errorMessage.textContent = 'Please fill in all required fields.';
            return;
        }
        if (firstName.length < 3 || lastName.length < 3) {
            errorMessage.textContent = 'Name is too short';
            return;
        }

        // Update book status and save the record
        saveLendingRecord({ firstName, lastName, bookName });

        // Provide feedback and redirect
        errorMessage.textContent = 'Book borrowed successfully!';
        errorMessage.style.color = 'green';
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 2000);
    });
});
