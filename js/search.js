(function(){

	$('#map, #search-area').height( $(window).height() - 75);

	// instantiate the address suggestion engine
	var addressPicker = new AddressPicker({
		autocompleteService: {
			types: ['(cities)'],
			componantRestrictions: {country: 'US'}
		}
	});
	// instantiate typeahead UI
	$('#address').typeahead(null, {
	  displayKey: 'description',
	  source: addressPicker.ttAdapter()
	});

	// get city data on select
	addressPicker.bindDefaultTypeaheadEvent($('#address'))
	$(addressPicker).on('addresspicker:selected', function (event, result) {
	    lat = result.lat();
	    lng = result.lng();
	    
	    console.log("Lat: lat " + lat + " Lng: " + lng);
	});

	// handle submit
	$('#search').on('submit', function(e){
		// prevent page reload
		e.preventDefault();

		// update map
		map.setView([lat, lng], 12);

		// remove search area
		$('#search-area')
			.addClass('animated zoomOut')
			.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){ this.remove(); });
	});
})();