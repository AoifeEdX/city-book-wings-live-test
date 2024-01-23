// Search books when "Search" button is clicked...
function getBooks() {
	
	// Clear previous search results
	var bookResults = document.getElementById("bookResults");
	bookResults.innerHTML = "";

	// Fetch data from Open Library URL
	// TODO: Change URL to return more interesting / relevant books?
	fetch("https://openlibrary.org/search.json?q=" + document.getElementById("locationTo").value) // "q=" means query, and "locationTo" is the user input that is being queried on Open Library 
			.then(function (response) { // 'response' is the HTTP response object
					return response.json(); // Convert JSON in the response body to a JavaScript object
			})
			.then(function (parsedResponse) { // Use the parsed response to get the book info we want to show on the webpage 

					// Create a container div for the heading and cards
					var containerDiv = document.createElement("div");

					// Add the heading to the container
					containerDiv.innerHTML = '<h3 class="my-5 py-5 text-center">... and explore related books to read on your trip.</h3>';

					// Use slice to get the first 8 books from parsedResponse
					var books = parsedResponse.docs.slice(0, 8);

					// Build and display the cards in one row
					var rowDiv = document.createElement("div");
					rowDiv.className = "row";

					// Loop through each book's data
					books.forEach(function (book, index) {
						var title = book.title || "Unknown Title"; // If the book has no title on Open Library (not sure if that is possible), but the other info for the book matches the search, then it will say "Unknown Title"
						var author = book.author_name && book.author_name[0] || "Unknown Author"; // If there is no author named, then it will say "Unknown Author"
						var isbn = book.isbn && book.isbn[0] || "No ISBN"; // If the book has no ISBN listed on Open Library, then it will say "No ISBN" 
		
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
							'<img src="' + coverImageUrl + '" class="card-img-top book-cover" alt="Book Cover" style="height: 400px; object-fit: cover;">' +
							'<div class="card-body d-flex flex-column">' + // Use flex-column to make the body a flex container with a vertical direction
							'<h5 class="card-title">' + title + '</h5>' +
							'<p class="card-text flex-grow-1">Author: ' + author + '</p>' + // Use flex-grow-1 to make the text take up remaining space, s all cards are the same height
							'<a href="https://openlibrary.org/isbn/' + isbn + '" target="_blank" class="btn btn-primary mt-auto"> <i class="fa fa-book-open"></i> View Book</a>' +
							'</div>' +
							'</div>' +
							'</div>';		
		
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
					console.error("Error fetching data:", error);
					bookResults.innerHTML = '<p class="fs-4 my-3 text-danger text-center">Error loading data. Check console for details.</p>';
			});
}
