// Show loading spinner when "Search" button is clicked...
function loadingIcon() {
	var loading = document.getElementById("loading");
	
	// Display the loading spinner by removing the Bootstrap class "d-none" (display-none)
	loading.classList.remove("d-none");

	// Hide the loading spinner after a few seconds by re-adding the Bootstrap class "d-none" (display-none)
	setTimeout(function () {
			loading.classList.add("d-none");
	}, 12000);
}