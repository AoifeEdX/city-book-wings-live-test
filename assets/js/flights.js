// Search flights when "Search" button is clicked...
function getFlights() {

	// Clear previous search results
	var flightResults = document.getElementById('flightResults');
	flightResults.innerHTML = '';

	// Read user inputs from the form
	var locationFrom = document.getElementById('locationFrom').value;
	var locationTo = document.getElementById('locationTo').value;
	var departureDate = document.getElementById('departureDate').value;

	// Log user entries to the console
	console.log('---- Search input: ----');
	console.log('From:', locationFrom);
	console.log('To:', locationTo);
	console.log('Date:', departureDate);
	console.log('-- Getting results (please wait...): --');

	// Fetch exchange rate data
	//? API documentation: https://www.exchangerate-api.com/docs/pair-conversion-requests
	var exchangeRateAPIKey = 'a4e7dfed1a6162f81c023788';
	var exchangeRateURL = 'https://v6.exchangerate-api.com/v6/' + exchangeRateAPIKey + '/pair/USD/GBP';

	fetch(exchangeRateURL)
		.then(function (response) {
			return response.json();
		})
		.then(function (exchangeRateData) {
			var exchangeRate = exchangeRateData.conversion_rate;

			//? API documentation: https://rapidapi.com/ntd119/api/booking-com13
			//? This next snippet of code is from the API site:
			const url = 'https://booking-com13.p.rapidapi.com/flights/one-way?location_from=' + encodeURIComponent(locationFrom) + '&location_to=' + encodeURIComponent(locationTo) + '&departure_date=' + departureDate + '&number_of_stops=NonstopFlights';

			const options = {
				method: 'GET',
				headers: {
					'X-RapidAPI-Key': '3f71436c3cmshf2e0a17479ecd54p1955a7jsnee17f1837d3e',
					'X-RapidAPI-Host': 'booking-com13.p.rapidapi.com'
				}
			};

			// Fetch data from the flight API using the constructed URL and options
			fetch(url, options)
				.then(function (response) { // 'response' is the HTTP response object
					return response.json(); // Convert JSON in the response body to a JavaScript object
				})
				.then(function (data) {
					console.log(data); // Console log the data
					updateflightResults(data, exchangeRate); // Use the exchange rate API to convert the prices from USD to GBP
				})
				.catch(function (error) {
					console.error(error); // If there is an error with the exchange rate URL, console log it 
				});
		})
		.catch(function (error) {
			console.error(error); // If there is an error with the Booking.com URL, console log it 
		});
};

// Function to update the search results on the webpage
function updateflightResults(results, exchangeRate) {

	// Create a container div for the heading and cards
	var containerDiv = document.createElement('div');

	// Add the heading to the container
	containerDiv.innerHTML = '<h2 class="my-5 py-5 text-center">Find flights to your travel destination...</h2>';

	if (results.status && results.data && results.data.flights) {
		var flights = results.data.flights.slice(0, 8); // Extract the first eight flight results

		if (flights.length > 0) {
			// Clear previous results in the container
			flightResults.innerHTML = '';

			// Create a row div to hold flight cards
			var rowDiv = document.createElement('div');
			rowDiv.className = 'row';

			// Sort flights array by price in ascending order
			flights.sort(function (a, b) {
				var priceA = a.travelerPrices[0].price.price.value;
				var priceB = b.travelerPrices[0].price.price.value;
				return priceA - priceB;
			});

			// Loop through each flight result
			flights.forEach(function (flight) {
				// Extract relevant information from the flight data
				var flightName = flight.bounds[0].segments[0].flightNumber;
				var airline = flight.bounds[0].segments[0].operatingCarrier.name;
				var airportFrom = flight.bounds[0].segments[0].origin.cityName;
				var airportTo = flight.bounds[0].segments[0].destination.cityName;
				var departureTime = new Date(flight.bounds[0].segments[0].departuredAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
				var arrivalTime = new Date(flight.bounds[0].segments[0].arrivedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

				var price = flight.travelerPrices[0].price.price.value;

				// Convert the price to a string
				var priceString = price.toString();

				// Insert a decimal point before the last two digits
				var modifiedPriceString = priceString.slice(0, -2) + '.' + priceString.slice(-2);

				// Convert the modified string back to a numeric format
				var modifiedPrice = parseFloat(modifiedPriceString);

				// Convert the price to GBP using the exchange rate
				var priceInGBP = (modifiedPrice * exchangeRate).toFixed(2);

				// Format the data into Bootstrap cards for each flight, with the airline, flight number, departure and arrival airports, departure and arrival times, and a button to view the flight on Booking.com
				// TODO: Currently shows the city names instead of the airport names; need to find airport values (or change search inputs to airports rather than cities?)
				// TODO: Update button to link to the flight on Booking.com
				var cardHtml =
					'<div class="col-md-3 mb-3">' +
					'<div class="card h-100">' +
					'<div class="card-body d-flex flex-column">' +
					'<h5 class="card-title">' + airline + ' - ' + flightName + '</h5>' +
					'<p class="card-text">From: ' + airportFrom + '<br>To: ' + airportTo + '<br>Departure Time: ' + departureTime + '<br>Arrival Time: ' + arrivalTime + '<br>Price: £' + priceInGBP + '</p>' +
					'<a href="#" class="btn btn-primary mt-auto"><i class="fa fa-plane"></i> Book Flight</a>' +
					'</div>' +
					'</div>' +
					'</div>';

				// Append the card to the row
				rowDiv.innerHTML += cardHtml;
			});

			// Append the row to the container
			containerDiv.appendChild(rowDiv);

			// Append the JS containerDiv to the HTML flightResults section
			flightResults.appendChild(containerDiv);
		} else {
			flightResults.innerHTML = '<p class="fs-4 my-3 text-danger text-center">No flights found.</p>'; // Display a message if no flights are found
		}
	} else {
		flightResults.innerHTML = '<p class="fs-4 my-3 text-danger text-center">Error loading data. Check console for details.</p>'; // Display an error message if the API response is unexpected
	}
}


