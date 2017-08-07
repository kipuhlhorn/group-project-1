	var number;
	var state_short;
	var city;
	var street;
	var place;
	var zipCode;
	var latitude;
	var longitude;

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. 
	var placeSearch, autocomplete;
	var componentForm = {
	street_number: 'short_name',
	route: 'long_name',
	locality: 'long_name',
	administrative_area_level_1: 'short_name',
	country: 'long_name',
	postal_code: 'short_name'
	};

	function initAutocomplete() {
	// Create the autocomplete object, restricting the search to geographical
	// location types.
		autocomplete = new google.maps.places.Autocomplete(
	    /** @type {!HTMLInputElement} */
	    (document.getElementById('name-input')),
	    {types: ['geocode']});

	// When the user selects an address from the dropdown, populate the address
	// fields in the form.
		autocomplete.addListener('place_changed', fillInAddress);
	}
		function fillInAddress() {
	// Get the place details from the autocomplete object.
			place = autocomplete.getPlace();
	        console.log(place);

	}
	        
	// variables for zillow API to generate calling
		 number= place.address_components[0].long_name;
		 street = place.address_components[1].long_name;
		 city = place.address_components[2].long_name;
		 state_short = place.address_components[4].short_name;
		 zipCode = place.address_components[6].long_name;

		// variables for crimespot API to generate calling;
		latitude = place.geometry.location.lat();
		longitude = place.geometry.location.lng();

// replacing space to "+" 
		 street = street.replace(" ","+");
		 console.log(street);

		 city = city.replace(" ","+");

// trigger click event to call zillow API;
$("button").on("click", function(event){
	event.preventDefault();
// zillow API calling 
		 var queryURL = "http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=X1-ZWz1930iltfqiz_35s1w&address=" 
	+ number + street + "&citystatezip=" + city + state_short;

	$.ajax({
		url:queryURL,
		method: "GET"
	}).done(function(data){
		console.log(queryURL);
		console.log(data);
	})；




});



        
     