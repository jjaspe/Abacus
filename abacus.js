var moveAbacusParts(){
	var jumbotronTop=$('.jumbotron').top + "px";
	$('.upper').css(
	{
	 position:"absolute";
	 top:jumbotronTop;
	 });	
}

var main=function(){
	$('.jumbotron').hide();
	moveAbacusParts();
	
}
	
$(document).ready(main);
	