//Test JS link to page with an alert:
//alert('Hi!');


$(function(){
	populateButtons(searchArray,'searchButton', '#buttonArea');
	//console.log("Page Loaded");
})

var searchArray = ["Bearded Dragon", "Beta Fish", "Dachshund"];

function populateButtons(searchArray,classToAdd,areaToAddTo){
	$(areaToAddTo).empty();
	for(var i=0;i<searchArray.length;i++){
		var a = $('<button>');
		a.addClass(classToAdd);
		a.attr('dataType',searchArray[i]);
		a.text(searchArray[i]);
		$(areaToAddTo).append(a);
	}
}

//--------------------------------------------------------------


//This .on("click") function will trigger the AJAX Call
$(document).on("click",".submitButton",function(){
	//.empty removes the child nodes from the searchInput
	//$("#searchInput").empty();
	var type = $(this).data('type');
	var queryURL = ('http://api.giphy.com/v1/gifs/search?q='+type+'&api_key=p13Bc6Wtcp1okjFkvG7wUJtcb4LlFS80&limit=10');

	$.ajax({
		url: queryURL,
		method: 'GET'
	}).done(function(response){
		for(var i=0;i<response.data.length;i++){
			var searchDiv = $('<div class="search-item">');
			var rating = response.data[i].rating;
			var p = $('<p>').text('Rating: '+rating);
			var animated = response.data[i].images.fixed_height_still.url;
			var still = response.data[i].images.fixed_height_still.url;
			var image = $('<img>');
			image.attr('src',still);
			image.attr('data-still', still);
			image.attr('data-animated',animated);
			image.attr('data-state','still');
			image.addClass('searchImage');
			searchDiv.append(p);
			searchDiv.append(image);
			$('#searches').append(searchDiv);
		}
	});
});

//This code is supposed to animate and make the giphs still when clicked
$(document).on('click','.searchImage',function(){
	var state = $(this).data('state');
	if(state == 'still'){
		$(this).attr('src',$(this).data('animated'));
		$(this).attr('data-state','animated');
	} else{
		$(this).attr('src',$(this).data('still'));
		$(this).attr('data-state','still');
	}
	
});

//This code is supposed to add more search buttons when you click
//search
$('#addSearch').on('click',function(){
	var newSearch = $('input').eq(0).val();
	searchArray.push(newSearch);
	populateButtons(searchArray,'searchButton', '#buttonsArea');
	return false;
});


