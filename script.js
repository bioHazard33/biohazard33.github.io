function search(){
	var s=$(".form-inline");
	s.toggleClass("search-display");
}

$("#search").keypress(function(event) {
	if(keyCode==13 && $("#search").val()!=null && $("#search".val()!=' '))	 document.getElementById('search').submit();
});

$("#feedback").keypress(function(event) {
	if(keyCode==13 && $("#feedback").val()!=null && $("#feedback".val()!=' '))	 document.getElementById('feedback').submit();
});

$("#newsletter").keypress(function(event) {
	if(keyCode==13 && $("#newsletter").val()!=null && $("#newsletter".val()!=' '))	 document.getElementById('newsletter	').submit();
});