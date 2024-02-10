// Search books when "Search" button is clicked...
function getBooks() {
	// Clear previous search results
	var bookResults = document.getElementById("bookResults");
	bookResults.innerHTML = "";

	// Fetch data from Open Library URL
	fetch(
		"https://openlibrary.org/search.json?q=" +
		document.getElementById("locationTo").value +
		"&subject=fiction"
	)
		.then(function (response) {
			// Convert JSON in the response body to a JavaScript object
			return response.json();
		})
		.then(function (parsedResponse) {
			// Use the parsed response to get the book info we want to show on the webpage

			var containerDiv = document.createElement("div");

			// Add the heading to the container
			containerDiv.innerHTML =
				'<h3 class="my-5 py-5 text-center">... and explore related books to read on your trip.</h3>';

			// Use slice to get the first 4 books from parsedResponse
			var books = parsedResponse.docs.slice(0, 4);

			// Build and display the cards in one row
			var rowDiv = document.createElement("div");
			rowDiv.className = "row";

			// Loop through each book's data
			books.forEach(function (book, index) {
				var title = book.title || "Unknown Title"; // If the book has no title on Open Library (not sure if that is possible), but the other info for the book matches the search, then it will say "Unknown Title"
				var author =
					(book.author_name && book.author_name[0]) || "Unknown Author"; // If there is no author named, then it will say "Unknown Author"
				var isbn = (book.isbn && book.isbn[0]) || "No ISBN"; // If the book has no ISBN listed on Open Library, then it will say "No ISBN"
				var numberOfPages = (book.number_of_pages_median) || "Page number unknown";
				var readingTime = Math.ceil((numberOfPages * 1.5) / 60)
				var sharableURL = 'https://openlibrary.org/isbn/' + isbn;

				// Check if the book has cover images
				if (book.cover_i) {
					var coverImageUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`; // Use Open Library's cover image if there is one
				} else {
					var placeholderImageUrl = `https://picsum.photos/200/300?seed=${index}`; // Use Picsum placeholder image if the book doesn't have a cover image on Open Librar
					var coverImageUrl = placeholderImageUrl;
				}

				// Format the data into Bootstrap cards for each book, with the book cover, title, author, and a button to view the book on Open Library
				var cardHtml =
					'<div class="col-md-3 mb-3">' +
					'<div class="card h-100">' +
					'<img src="' +
					coverImageUrl +
					'" class="card-img-top book-cover" alt="Book Cover" style="height: 400px; object-fit: cover;">' +
					'<div class="card-body d-flex flex-column">' +
					'<h5 class="card-title">' +
					title +
					"</h5>" +
					'<p class="card-text flex-grow-1"><strong>Author:</strong> ' +
					author +
					"<br>" +
					'<strong>Number of pages:</strong> ' +
					numberOfPages +
					"<br>" +
					'<strong>Average Reading Time:</strong> ' +
					readingTime + " hours" +
					"</p>" +
					'<a href="' + sharableURL + '" class="btn button_slide slide_down mt-auto" target="_blank"> <i class="fa fa-book-open"></i> View Book</a>' +
					'<button class="btn button_slide slide_save mt-3" onclick="saveBookToLocalStorage(\'' + coverImageUrl + '\', \'' + title + '\', \'' + author + '\', \'' + numberOfPages + '\', \'' + readingTime + '\', \'' + sharableURL + '\')"><i class="fas fa-save"></i> Save</button>' + // Add the Save button
					"</div>" +
					"</div>" +
					"</div>";


				// Append the book card to the row
				rowDiv.innerHTML += cardHtml;
			});

			// Append the rowDiv to the container
			containerDiv.appendChild(rowDiv);

			// Append the JS containerDiv to the HTML bookResults section
			bookResults.appendChild(containerDiv);
		})

		// If there is an error, console log it and show an error message on the webpage
		.catch(function (error) {
			bookResults.innerHTML =
				'<p class="fs-4 my-3 text-danger text-center">Error loading data. Check console for details.</p>';
		});
}

// Function to save book information to local storage
function saveBookToLocalStorage(coverImageUrl, title, author, numberOfPages, readingTime, sharableURL) {
	// Retrieve existing saved books from local storage or initialize an empty array
	var savedBooks = JSON.parse(localStorage.getItem('savedBooks')) || [];

	// Add the new book information to the array
	savedBooks.push({
			coverImageUrl: coverImageUrl,
			title: title,
			author: author,
			numberOfPages: numberOfPages,
			readingTime: readingTime,
			sharableURL: sharableURL
	});

	// Save the updated array back to local storage
	localStorage.setItem('savedBooks', JSON.stringify(savedBooks));
}
