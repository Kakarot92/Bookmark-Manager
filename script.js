let bookmarks = [];

let bookmarkForm = document.getElementById('bookmark-form');
let bookmarkList = document.getElementById('bookmark-list');
let bookmarkTitle = document.getElementById('bookmark-name');
let bookmarkUrl = document.getElementById('bookmark-url');
let categorySelect = document.getElementById('category-select');

bookmarkForm.addEventListener('submit', function(event) {
    event.preventDefault();
    console.log(bookmarkForm);
    console.log(bookmarkList);
    console.log(bookmarkTitle);
    console.log(bookmarkUrl);
    console.log(categorySelect);
});