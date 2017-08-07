 function showPage(){
    console.log("ok");
    var page2=document.getElementById("page2");
    var page1=document.getElementById("page1");

    if  (page2.style.display=="none"){
		page2.style.display="block";
		page1.style.display="none";
		}
    else 
        {page2.style.display="none";
        page1.style.display="block";
		}}


$("#address input").click(showPage)

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
	var autocomplete2;
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

		autocomplete2 = new google.maps.places.Autocomplete(
	    /** @type {!HTMLInputElement} */
	    (document.getElementById('name-input2')),
	    {types: ['geocode']});

	// When the user selects an address from the dropdown, populate the address
	// fields in the form.
		autocomplete.addListener('place_changed', fillInAddress);
	}

	function fillInAddress() {
	// Get the place details from the autocomplete object.
			place = autocomplete.getPlace();
			console.log(place);
	// variables for zillow API to generate calling
		 number= place.address_components[0].long_name;
		 street = place.address_components[1].long_name;
		 city = place.address_components[3].long_name;
		 state_short = place.address_components[5].short_name;
		 zipCode = place.address_components[7].long_name;	        
		// variables for crimespot API to generate calling;
		latitude = place.geometry.location.lat();
		longitude = place.geometry.location.lng();

	// Get the place details from the autocomplete object.
			place2 = autocomplete2.getPlace();
			console.log(place);
	// variables for zillow API to generate calling
		 number2= place2.address_components[0].long_name;
		 street2 = place2.address_components[1].long_name;
		 city2 = place2.address_components[3].long_name;
		 state_short2 = place2.address_components[5].short_name;
		 zipCode2 = place2.address_components[7].long_name;	        
		// variables for crimespot API to generate calling;
		latitude2 = place2.geometry.location.lat();
		longitude2 = place2.geometry.location.lng();

// replacing “ ” to "+" 
		number = number.replace(" ", "+");
		street = street.replace(" ", "+");
		city = city.replace(" ", "+");
		street = street.replace(" ", "+");
		city = city.replace(" ", "+");
		zipCode = zipCode.replace(" ", "+");

		number2 = number.replace(" ", "+");
		street2 = street.replace(" ", "+");
		city2 = city.replace(" ", "+");
		street2 = street.replace(" ", "+");
		city2 = city.replace(" ", "+");
		zipCode2 = zipCode.replace(" ", "+");

	}

// // trigger click event to call zillow API;
$("button").on("click", function(event){
	console.log("on click event");
	console.log("number = " + number);
	console.log("street = " + street);
	console.log("city = " + city);
	console.log("state_short = " + state_short);
	console.log("zipCode = " + zipCode);
	event.preventDefault();
	showPage()


function xmlToJson(xml) {
    
    // Create the return object
    var obj = {};
    if (xml.nodeType == 1) { // element
        // do attributes
        if (xml.attributes.length > 0) {
        obj["@attributes"] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType == 3) { // text
        obj = xml.nodeValue;
    }
    // do children
    if (xml.hasChildNodes()) {
        for(var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
            if (typeof(obj[nodeName]) == "undefined") {
                obj[nodeName] = xmlToJson(item);
            } else {
                if (typeof(obj[nodeName].push) == "undefined") {
                    var old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xmlToJson(item));
            }
        }
    }
    return obj;
};

	var queryURL = "http://www.zillow.com/webservice/GetUpdatedPropertyDetails.htm?zws-id=X1-ZWz1930iltfqiz_35s1w&address=" 
	+ number + street + "&citystatezip=" + city + state_short + zipCode;

	$.ajax({
		url:queryURL,
		method: "GET"
	}).done(function(data){
		console.log(queryURL);
		console.log(xmlToJson(data));
		var result = xmlToJson(data).response.results.result;
		// var zindexValue = result


			});


// 

});

        
     