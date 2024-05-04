export function updateBooksStatus(books) {
    const lendingRecords =
        JSON.parse(localStorage.getItem('lendingRecords')) || [];
    lendingRecords.forEach((record) => {
        const bookIndex = books.findIndex(
            (book) => book.bookName === record.bookName
        );
        if (bookIndex !== -1 && record.isLent) {
            books[bookIndex].isLent = true;
        }
    });
}

export function saveLendingRecord(record) {
    const lendingRecords =
        JSON.parse(localStorage.getItem('lendingRecords')) || [];
    lendingRecords.push({
        ...record,
        borrowedDate: new Date().toISOString().split('T')[0], // "YYYY-MM-DD"
        isLent: true,
    });
    localStorage.setItem('lendingRecords', JSON.stringify(lendingRecords));
}
