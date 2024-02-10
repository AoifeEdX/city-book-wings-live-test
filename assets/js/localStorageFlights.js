// Function to load and display saved flights
function loadSavedFlights() {
	var savedFlightsContainer = document.getElementById('savedFlightsContainer');

	// Retrieve saved flights from localStorage
	var savedFlights = JSON.parse(localStorage.getItem('savedFlights'));

	// Check if there are saved flights
	if (savedFlights && savedFlights.length > 0) {
		// Clear previous content
		savedFlightsContainer.innerHTML = "";

		// Generate HTML for each saved flight and append it to the container
		savedFlights.forEach(function (flight) {
			var cardHtml =
				'<div class="col-md-3 mb-5">' +
				'<div class="card h-100">' +
				'<div class="card-body d-flex flex-column">' +
				'<h5 class="card-title">' +
				flight.airline + " - " + flight.flightName +
				'</h5>' +
				'<p class="card-text"><strong>From:</strong> ' +
				flight.airportFrom +
				"<br><strong>To:</strong> " +
				flight.airportTo +
				"<br><strong>Departure Time:</strong> " +
				flight.departureTime +
				"<br><strong>Arrival Time:</strong> " +
				flight.arrivalTime +
				"<br><strong>Price:</strong> £" +
				flight.price +
				'</p>' +
				'<a href="' + flight.sharableURL + '" class="btn button_slide slide_down mt-auto" target="_blank"><i class="fa fa-plane"></i> Book Flight</a>' +
				// Add Remove button
				'<button class="btn button_slide slide_remove mt-3" onclick="removeFlight(\'' + flight.flightName + '\')"><i class="fas fa-trash-alt"></i> Remove</button>' +
				'</div>' +
				'</div>' +
				'</div>';

			savedFlightsContainer.innerHTML += cardHtml;
		});
	} else {
		// Display a message if there are no saved flights
		savedFlightsContainer.innerHTML = '<h3 class="text-center text-danger mb-5">No saved flights found.</h3>';
	}
}

// Call the function to load and display saved flights when the page loads
window.onload = loadSavedFlights;

// Function to remove flight from local storage
function removeFlight(flightName) {
	// Retrieve saved flights from local storage
	var savedFlights = JSON.parse(localStorage.getItem('savedFlights'));

	// Filter out the flight to be removed
	var updatedFlights = savedFlights.filter(function (flight) {
		return flight.flightName !== flightName;
	});

	// Save the updated array back to local storage
	localStorage.setItem('savedFlights', JSON.stringify(updatedFlights));

	// Reload saved flights
	loadSavedFlights();
}
