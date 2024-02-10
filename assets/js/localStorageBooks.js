// Function to load and display saved books
function loadSavedBooks() {
	var savedBooksContainer = document.getElementById('savedBooksContainer');

	// Retrieve saved books from localStorage
	var savedBooks = JSON.parse(localStorage.getItem('savedBooks'));

	// Check if there are saved books
	if (savedBooks && savedBooks.length > 0) {
		// Clear previous content
		savedBooksContainer.innerHTML = "";

		// Generate HTML for each saved book and append it to the container
		savedBooks.forEach(function (book) {
			var cardHtml =
				'<div class="col-md-3 mb-5">' +
				'<div class="card h-100">' +
				'<img src="' + book.coverImageUrl + '" class="card-img-top book-cover" alt="Book Cover" style="height: 400px; object-fit: cover;">' +
				'<div class="card-body d-flex flex-column">' +
				'<h5 class="card-title">' + book.title + '</h5>' +
				'<p class="card-text"><strong>Author:</strong> ' + book.author + '<br>' +
				'<strong>Number of pages:</strong> ' + book.numberOfPages + '<br>' +
				'<strong>Average Reading Time:</strong> ' + book.readingTime + ' hours</p>' +
				'<a href="' + book.sharableUrl + '" target="_blank" class="btn button_slide slide_down mt-auto"> <i class="fa fa-book-open"></i> View Book</a>' +
				'<button class="btn button_slide slide_remove mt-3" onclick="removeBook(\'' + book.title + '\')"><i class="fas fa-trash-alt"></i> Remove</button>' + // Add the Remove button
				'</div>' +
				'</div>' +
				'</div>';

			savedBooksContainer.innerHTML += cardHtml;
		});
	} else {
		// Display a message if there are no saved books
		savedBooksContainer.innerHTML = '<h3 class="text-center text-danger mb-5">No saved books found.</h3>';
	}
}

// Call the function to load and display saved books when the page loads
window.onload = loadSavedBooks;


// Function to remove book from local storage
function removeBook(title) {
	// Retrieve saved Books from local storage
	var savedBooks = JSON.parse(localStorage.getItem('savedBooks'));

	// Filter out the book to be removed
	var updatedBooks = savedBooks.filter(function (book) {
		return book.title !== title;
	});

	// Save the updated array back to local storage
	localStorage.setItem('savedBooks', JSON.stringify(updatedBooks));

	// Reload saved Books
	loadSavedBooks();
}