 // get page one to page two 
 function showPage() {
     var page2 = document.getElementById("page2");
     var page1 = document.getElementById("page1");

     if (page2.style.display == "none") {
         page2.style.display = "block";
         page1.style.display = "none";
         $("body").css("background", "white")
     } else {
         page2.style.display = "none";
         page1.style.display = "block";
     }
 }
 // save all data for making url parameters
 var number;
 var state_short;
 var city;
 var street;
 var place;
 var zipCode;
 var latitude;
 var longitude;
 // Input Autocomplete
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
 // autocomplete function 
 function initAutocomplete() {
     // Create the autocomplete object, restricting the search to geographical
     // location types.
     autocomplete = new google.maps.places.Autocomplete(
         /** @type {!HTMLInputElement} */
         (document.getElementById('name-input')), { types: ['geocode'] });

     // When the user selects an address from the dropdown, populate the address
     // fields in the form.
     autocomplete.addListener('place_changed', fillInAddress);
     // page 2 autocomplete
     autocomplete2 = new google.maps.places.Autocomplete(
         /** @type {!HTMLInputElement} */
         (document.getElementById('name-input2')), { types: ['geocode'] });
 }
 // fill into the input box 
 function fillInAddress() {
     // Get the place details from the autocomplete object.
     place = autocomplete.getPlace();
     console.log(place);
     // updating address data 
     number = place.address_components[0].long_name;
     street = place.address_components[1].long_name;
     city = place.address_components[3].long_name;
     state_short = place.address_components[5].short_name;
     zipCode = place.address_components[7].long_name;
     // undating geocode data
     latitude = place.geometry.location.lat();
     longitude = place.geometry.location.lng();
     // page 2 autocomplete
     place2 = autocomplete2.getPlace();
     // replacing “ ” to "+" 
     number = number.replace(" ", "+");
     street = street.replace(" ", "+");
     city = city.replace(" ", "+");
     street = street.replace(" ", "+");
     zipCode = zipCode.replace(" ", "+");
 }


 // converting xml to Json format
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
         for (var i = 0; i < xml.childNodes.length; i++) {
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
 }
 // trigger button to generate three api calls and jump to page 2
 $("#addressInput").click(function(event, xml) {
     event.preventDefault();

     function promFunc() {
         var zillowKey = "X1-ZWz1930iltfqiz_35s1w";
         var queryURL = "http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=" + zillowKey + "&address=" +
             number + street + "&citystatezip=" + city + state_short + zipCode;

         var crimeKey = "privatekeyforspotcrimepublicusers-commercialuse-877.410.1607";
         var queryURL2 = "http://api.spotcrime.com/crimes.json?key=" + crimeKey + "&lat=" + latitude + "&lon=" + longitude + "&radius=50";

         var googleKey = "&key=AIzaSyCGlIx60fJjaUtHja6IujdQL-wg5PvT_OM";
         var queryURL3 = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?&location=" + latitude + "," + longitude + "&radius=10000&type=school" + googleKey;

         var queryURL4 = "https://maps.googleapis.com/maps/api/streetview?size=600x300&location=" + latitude + "," + longitude + googleKey;
         // console.log(queryURL4);
         // append property img
         var temp = $("<img class='img-responsive'>");
         temp.attr("src", queryURL4);
         $(".caption").html(temp);
         // append searhing property address
         var newDiv = $("<div>");
         var address = place.formatted_address;
         var p = newDiv.append("<p>");
         p.html("<h3>" + address + "</h3>");
         $(".caption").append(newDiv);
         return Promise.all([
             // Zillow Get Search Results API Call;
             $.ajax({
                 url: queryURL,
                 method: "GET",
                 success: function(data) {
                     // console.log(queryURL);
                     // console.log(xmlToJson(data));
                     // define result for further grabbing value from objects
                     var result = xmlToJson(data)["SearchResults:searchresults"].response.results.result;
                     // display property value 
                     var finalDiv = $("<div>");
                     var newDiv = $("<div id='value'>");
                     var value = result.zestimate.amount["#text"];
                     newDiv.html("Value: $" + value);
                     // $("#collapse1").html(newDiv);
                     // console.log("amount is: $" + value);
                     // display property Sqft;
                     var newDiv2 = $("<div id='land'>");
                     var lotSqft = result.lotSizeSqFt["#text"];
                     newDiv2.html("Land: " + lotSqft + "sqft");
                     // $("#conllapse1").html(newDiv2);
                     // console.log(lotSqft + "Sqft");
                     // property yeat of built
                     var newDiv3 = $("<div id='year'>");
                     var yearBuilt = result.yearBuilt["#text"];
                     newDiv3.html("Year of Built: " + yearBuilt);
                     // console.log("year: " + yearBuilt);
                     finalDiv.append(newDiv, newDiv2, newDiv3);
                     $("#zillow").html(finalDiv);
                 }
             }),
             // CrimeSpot API Call;
             $.ajax({
                 url: queryURL2,
                 method: "GET",
                 success: function(data) {
                     // console.log("link = " + queryURL2);
                     // console.log("this is ", data);
                     // generate crimespot details;
                     var crimes = data.crimes;
                     // loop crimespot object array;
                     for (i = 0; i < 10; i++) {
                         //data of crimespot
                         var type = crimes[i].type;
                         var date = crimes[i].date;
                         var addressCrime = crimes[i].address;
                         $("#crime > tbody").append("<tr><td>" + type + "</td><td>" + date + "</td><td>" + addressCrime + "</td></tr>");
                     }

                 }
             }),
             // Nearby school rating from google place nearbySearch API 
             $.ajax({
                 url: queryURL3,
                 method: "GET",
                 success: function(data) {
                     // console.log("this is ", queryURL3);
                     // console.log("this is ", data);
                     // console.log('')
                     var schoolResult = data.results;
                     for (i = 0; i < 5; i++) {
                         var rating = schoolResult[i].rating;
                         var schoolName = schoolResult[i].name;
                         // console.log(rating);
                         // console.log(schoolName);
                         $("#school > tbody").append("<tr><td>" + schoolName + "</td><td>" + rating + "</td></tr>");
                     }
                     showPage();
                 }
             })


         ]);
     }
     promFunc().then(() => {
         // console.log('hi')
         showPage();
     });

 });

 // $("#addressInput2").click(function(event, xml) {
 //      event.preventDefault();
 //      promFunc()
 //  });