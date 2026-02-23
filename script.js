let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

let bookmarkForm = document.getElementById('bookmark-form');
let bookmarkList = document.getElementById('bookmark-list');
let bookmarkTitle = document.getElementById('bookmark-name');
let bookmarkUrl = document.getElementById('bookmark-url');
let categorySelect = document.getElementById('category-select');

bookmarkForm.addEventListener('submit', function(event) {
    event.preventDefault();
    let title = bookmarkTitle.value.trim();
    let url = bookmarkUrl.value.trim();
    let category = categorySelect.value;

    let bookmark = {
        id: Date.now(),
        title: title,
        url: url,
        category: category
    };

    bookmarks.push(bookmark);

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    console.log('Bookmark added:', bookmark);

});