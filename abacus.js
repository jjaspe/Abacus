  var testUpperFirstIdIsZero = function(el)
  {
   	if (el.id==="0")
  	   console.log( "First Id Test passes");
  	else
  		console.log( "First ID Test fails. " + $(el).attr('id'));
  }
  
  var testUpperLastIdIsZero = function(el)
  {
   	if (el.id==="11")
  	   console.log( "Last Id Test passes");
  	else
  		console.log( "Last ID Test fails. " + $(el).attr('id'));
  }
  
  var testImagesMoreThanZero = function(el)
  {
   	if (el.length>0)
  	   console.log( "Images Test passes " + el.length);
  	else
  		console.log( "Images Test fails. " );
  }
  
  var testRowsMoreThanZero = function(el)
  {
   	if (el.length>0)
  	   console.log( "Rows Test passes " + el.length);
  	else
  		console.log( "Rows Test fails. " );
  }
  

/* Gives ids to all divs containing images so we identify them */
var setUpIds=function()
{
 	//This one has only one row,so just get all divs from that;
	var row=$('.upper').children('div');
 	var images=$(row).children('div');
	
	$.each(images,function(index,value)
	{
	 $(value).attr("id",index);;
	 });
}

var main=function(){
	var row=$('.upper').children('div');
	testRowsMoreThanZero(row);
	
 	var images=$(row).children('div');
	testImagesMoreThanZero(images);
	
	setUpIds();	
	testUpperFirstIdIsZero(images[0]);
	testUpperLastIdIsZero(images[11]);
}
	
$(document).ready(main);
	