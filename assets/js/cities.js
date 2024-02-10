//create var for cities
//make sure each one matches the city name verbatim as configured in the API.
var cities = [
	"Berlin, Germany",
	"Chennai (Madras), India",
	"Dublin, Ireland",
	"London, United Kingdom",	
	"Los Angeles, USA, California",
	"Paris, France",	
	"Rome, Italy",
	"Shanghai, China",
	"Stockholm, Sweden",
	"Tokyo, Japan",
];

// Function to populate dropdown
function populateDropdown(selectId, defaultOptionIndex) {
	var selectElement = document.getElementById(selectId);

	cities.forEach(function (city, index) {
		var option = document.createElement("option");
		option.value = city;
		option.text = city;
		selectElement.add(option);

		if (index === defaultOptionIndex) {
			option.selected = true;
		}
	});
}

// Populate the "From" dropdown
populateDropdown("locationFrom", 3);

// Populate the "To" dropdown 
populateDropdown("locationTo", 5);