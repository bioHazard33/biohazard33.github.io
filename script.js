function search(){
	var s=$(".form-inline");
	s.toggleClass("search-display");
}
$("#search").keypress(function(event) {
	if(keyCode==13 && $("#search").val()!=null && $("#search".val()!=' '))	 document.getElementById('search').submit();
});
