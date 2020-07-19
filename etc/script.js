function search(){
	let s=$(".form-inline");
	s.toggleClass("search-display");
}

$("#search").keypress(function(event) {
	if(keyCode==13 && $("#search").val()!=null && $("#search".val()!=' '))	 document.getElementById('search').submit();
});

$(document).keydown(function(e){
if (e.keyCode==27){
	let s=$(".form-inline");
    s.removeClass("search-display");
	}
});

$("#feedback").keypress(function(event) {
	if(keyCode==13 && $("#feedback").val()!='' && $("#feedback".val()!=' '))	 document.getElementById('feedback').submit();
});

$("#newsletter").keypress(function(event) {
	if(keyCode==13 && $("#newsletter").val()!='' && $("#newsletter".val()!=' '))	 document.getElementById('newsletter').submit();
});