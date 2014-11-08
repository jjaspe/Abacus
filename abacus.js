  var testUpperFirstIdIsZero = function(el)
  {
   	if (el.id==="0")
  	   console.log( "First Id Test passes");
  	else
  		console.log( "First ID Test fails. " + $(el).attr('id'));
  }
  
  var testUpperLastIdIsEleven = function(el)
  {
   	if (el.id==="11")
  	   console.log( "Last Id Test passes");
  	else
  		console.log( "Last ID Test fails. " + $(el).attr('id'));
  }
  
  var testLowerFirstIdIs = function(el,value)
  {
   	if(el.id===value.toString())
	  		console.log( "First Id Test passes");
  	else
  		console.log( "First ID Test fails. " + $(el).attr('id'));
  }
  
  var testLowerLastIdIs = function(el,value)
  {
   	  if(el.id===value.toString())
	  		console.log( "Last Id Test passes");
  	else
  		console.log( "LastID Test fails. " + $(el).attr('id'));
  }		   	   	   
  
  var testImagesMoreThanZero = function(el)
  {
   	if (el.length>0)
  	   console.log( "Images Test passes " + el.length);
  	else
  		console.log( "Images Test fails. " );
  }
  
  var testImagesRightLength = function(el,length)
  {
   	if (el.length===length)
  	   console.log( "Images Right length Test passes " );
  	else
  		console.log( "Images Right length Test fails. " + el.length);
  }
  
  var testRowsMoreThanZero = function(el)
  {
   	if (el.length>0)
  	   console.log( "Rows Test passes " + el.length);
  	else
  		console.log( "Rows Test fails. " );
  }
  
  var testGetInLoopFourTimes = function(times)
  {
   if(times===4)
   				console.log("TImes in loop test passes");
	else
		console.log("Times in loop test fails" + times);
	}
	
  var testFirstBallHeight=function(parent,ball)
  {
   if($(parent).position().top+$(parent).outerHeight(true)===($(ball).position().top+$(ball).outerHeight(true)) )
   		console.log("First ball Height test passes");
	else
		console.log("First ball Height test fails " + ($(ball).position().top+$(ball).outerHeight(true)));
	
  }

/* Gives ids to all divs containing images so we identify them */
var setUpIds=function()
{
 	//This one has only one row,so just get all divs from that;
	var row=$('.upper').children('div');
	testRowsMoreThanZero(row);
 	var images=$(row).children('div');
	testImagesMoreThanZero(images);
	
	$.each(images,function(index,value)
	{
	 $(value).attr("id",index);;
	 });
	 
	testUpperFirstIdIsZero(images[0]);
	testUpperLastIdIsEleven(images[11]);
	 
	 //DOnt redeclare in loop
	 var images = 0;
	//Do lower now, since it has several rows, do a .each on the rows, then a .each on the columns
	var rows=$('.lower').children('div');
	testRowsMoreThanZero(rows);
	
	$.each(rows,function(index,value)
	{	 
    	images=$(value).children('div');
    	testImagesMoreThanZero(images);
		testImagesRightLength(images,12);
		
		//index will be rowNumber*rowSize + columnNumber
		$.each(images,function(index2,value2)
    	{
    	 $(value2).attr("id",index*images.length+index2);
    	 });
		 
		 testLowerFirstIdIs(images[0],index*images.length);
		 testLowerLastIdIs(images[images.length-1],(index+1)*images.length-1);
	});
}

var moveBallsDown=function()
{
 	var bottom=$('.upper').position().top+$('.upper').outerHeight(true);
	var ballHeight=$('.col-xs-1').outerHeight(true);
	
	//This one has only one row,so just get all divs from that;
	var row=$('.upper').children('div');
	testRowsMoreThanZero(row);
 	var images=$(row).children('div');
	testImagesMoreThanZero(images);
	testImagesRightLength(images,12);
	
	$.each(images,function(index,value)
	{
	 var left=$(value).position().left;
	 $(value).css('position','absolute');
	 $(value).css('top',bottom-ballHeight);
	 $(value).css('left',left);
	 });
	 
	 testFirstBallHeight($('.upper'),images[5]);
}

var main=function(){
	setUpIds();	
	moveBallsDown();
}
	
$(document).ready(main);
	