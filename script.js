let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

let bookmarkForm = document.getElementById('bookmark-form');
let bookmarkList = document.getElementById('bookmark-list');
let bookmarkTitle = document.getElementById('bookmark-name');
let bookmarkUrl = document.getElementById('bookmark-url');
let categorySelect = document.getElementById('category-select');

function renderBookmarks() {
    bookmarkList.innerHTML = '';
    bookmarks.forEach(function(bookmark) {
        let listItem = document.createElement('li');
        let link = document.createElement('a');
        let deleteBtn = document.createElement('button');
        let categoryLabel = document.createElement('span');
        categoryLabel.textContent = ' - ' + bookmark.category;
        deleteBtn.textContent = 'Delete';
        link.href = bookmark.url;
        link.textContent = bookmark.title;
        listItem.appendChild(link);
        listItem.appendChild(categoryLabel);
        listItem.appendChild(deleteBtn);
        bookmarkList.appendChild(listItem);
    });
}

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

    renderBookmarks();

    console.log('Bookmark added:', bookmark);
});

renderBookmarks();
