// Initialize bookmarks from localStorage or start with an empty array
let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
let editingId = null;
let newBookmarkId = null;
// Get references to DOM elements
let bookmarkForm = document.getElementById("bookmark-form");
let darkLightBtn = document.getElementById("light-dark-mode");
let bookmarkList = document.getElementById("bookmark-list");
let bookmarkTitle = document.getElementById("bookmark-name");
let bookmarkUrl = document.getElementById("bookmark-url");
let searchInput = document.getElementById("search-input");
let categorySelect = document.getElementById("category-select");
// Function to render bookmarks on the page
function renderBookmarks(list) {
  bookmarkList.innerHTML = "";
  list.forEach(function (bookmark) {
    let listItem = document.createElement("li");
    if ( bookmark.id === newBookmarkId) { 
      // Add a special class to the most recently added bookmark for animation
      listItem.classList.add("new-bookmark");
      newBookmarkId = null; // Reset newBookmarkId after applying the animation
    }
    let link = document.createElement("a");
    let editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    let categoryLabel = document.createElement("span");
    categoryLabel.textContent = " - " + bookmark.category;
    editBtn.textContent = "Edit";
    editBtn.dataset.id = bookmark.id;
    // Event listener for edit button
    editBtn.addEventListener("click", function () {
      let id = parseInt(this.dataset.id);
      editBookmark(id);
    });
    deleteBtn.textContent = "Delete";
    link.href = bookmark.url;
    link.target = "_blank";
    deleteBtn.dataset.id = bookmark.id;
    // Event listener for delete button
    deleteBtn.addEventListener("click", function () {
      // Get the id of the clicked bookmark
      let id = parseInt(this.dataset.id);
      // Remove the bookmarks from array based on the id
      bookmarks = bookmarks.filter((b) => b.id !== id);
      // Update localStorage with the new bookmarks array
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

      renderBookmarks(bookmarks);
    });
    link.textContent = bookmark.title;
    listItem.appendChild(link);
    listItem.appendChild(categoryLabel);
    listItem.appendChild(editBtn);
    listItem.appendChild(deleteBtn);
    bookmarkList.appendChild(listItem);
  });
}

//Function to edit a bookmark

function editBookmark(id) {
  let bookmark = bookmarks.find((b) => b.id === id);
  bookmarkTitle.value = bookmark.title;
  bookmarkUrl.value = bookmark.url;
  categorySelect.value = bookmark.category;
  editingId = id;
}

// Event listener for form submission to add a new bookmark
bookmarkForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let title = bookmarkTitle.value.trim();
  if (!title) {
    alert("Please enter a bookmark name.");
    return;
  }
  let url = bookmarkUrl.value.trim();
  // Simple URL validation
  if (!url || !/^https?:\/\/\S+$/.test(url)) {
    // Check if URL starts with http:// or https://
    alert("Please enter a valid URL (starting with http:// or https://).");
    // If the URL doesn't start with http:// or https://, prepend http:// return to prevent invalid URLs
    return;
  }
  //Editing an existing bookmark if editingId is set, otherwise add a new bookmark
  if (editingId) {
    // Find the bookmark being edited by its id
    let bookmark = bookmarks.find((b) => b.id === editingId);
    bookmark.title = title;
    bookmark.url = url;
    bookmark.category = categorySelect.value;
    editingId = null;
  } else {
    let category = categorySelect.value;

    let bookmark = {
      id: Date.now(),
      title: title,
      url: url,
      category: category,
    };
    // Store the id of the newly added bookmark to apply animation in renderBookmarks
    newBookmarkId = bookmark.id;
    // Add the new bookmark to the bookmarks array
    bookmarks.push(bookmark);
  }
  // add title and url validation

  // Create a new bookmark object with a unique id, title, url, and category

  // Save the updated bookmarks array to localStorage
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  // re-render the bookmarks to reflect the new addition
  renderBookmarks(bookmarks);
  bookmarkTitle.value = "";
  bookmarkUrl.value = "";

  console.log("Bookmark added:", bookmark);
});
// Initial render of bookmarks on page load
renderBookmarks(bookmarks);

searchInput.addEventListener("input", function () {
  let filteredBookmarks = bookmarks.filter(
    (bookmark) =>
      bookmark.title.includes(searchInput.value) ||
      bookmark.url.includes(searchInput.value),
  );
  renderBookmarks(filteredBookmarks);
});

darkLightBtn.addEventListener("click", function () {
  document.body.classList.toggle("light-mode");
  darkLightBtn.textContent = document.body.classList.contains("light-mode")
    ? "🌙"
    : "☀️";
});

let categoryButtons = document.querySelectorAll(".category-btn");
categoryButtons.forEach((button) => {
  button.addEventListener("click", function () {
    // Remove active class from all buttons
    categoryButtons.forEach((btn) => btn.classList.remove("active"));
    // Add active class to clicked button
    this.classList.add("active");
    // Filter bookmarks by category
    let category = this.dataset.category;
    let filteredBookmarks = category === "All" ? bookmarks : bookmarks.filter((b) => b.category === category);
    renderBookmarks(filteredBookmarks);
  });
});
