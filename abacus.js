

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
	 $(value).attr("id",index);
	 $(value).click(upperImageClick);
	 });
	 
	testUpperFirstIdIsZero(images[0]);
	testUpperLastIdIsEleven(images[ballsPerRow-1]);
	 
	 //DOnt redeclare in loop
	 var images = 0;
	//Do lower now, since it has several rows, do a .each on the rows, then a .each on the columns
	var rows=$('.lower').children('div');
	testRowsMoreThanZero(rows);
	
	$.each(rows,function(index,value)
	{	 
    	images=$(value).children('div');
    	testImagesMoreThanZero(images);
		testImagesRightLength(images,ballsPerRow);
		
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
    var top=$('.upper').position().top;
 	var bottom=top+$('.upper').height();	
	var ballHeight=$('.col-xs-1').outerHeight(true);
	var change=0,current=0;
	
	//This one has only one row,so just get all divs from that one
	var row=$('.upper').children('div');
	testRowsMoreThanZero(row);
 	var images=$(row).children('div');
	testImagesMoreThanZero(images);
	testImagesRightLength(images,ballsPerRow);
	
	//Find how much each image has to move by comparing the bottom of the image
	//and the bottom of the container. Then move the top of the image by that much
	//Since all images are at the same height we only need to find the change once
	
	current=$(images[0]).position().top+$(images[0]).outerHeight(true);//image's bottom
	change=bottom-current; //change
	
	$.each(images,function(index,value)
	{	 
	 $(value).css('position','relative');
	 $(value).css('top',change);//move image
	 });
	 
	 testFirstBallHeight($('.upper'),images[5]);
	 
	 
	 top=$('.lower').position().top;
	 bottom=top+$('.lower').height();	
	 
	 //DOnt redeclare in loop
	 var images = 0;
	 //Do lower now, since it has several rows, do a .each on the rows, then a .each on the columns
	 var rows=$('.lower').children('div');
	 testRowsMoreThanZero(rows);
	
	 //Here we need two .each, and since the top row is the first in the .each, we have to do decreaseInChange=rows.length-index-1
	 //to get the right vertical shift(so the balls at index=0 probably move up since decreaseInChange less than 0,
	 //while the balls at index =3, move down the maximum change since decreaseInChange=0
	 $.each(rows,function(index,value)
    	{	 
        	images=$(value).children('div');
        	testImagesMoreThanZero(images);
    		testImagesRightLength(images,ballsPerRow);
			
			//Get change for this row,if this row had to go to the bottom
    		current=$(images[0]).position().top+$(images[0]).height();//image's bottom
            change=bottom-current; //change
				 
    		//decrease change by rowNumbers*height because this row might not be going to the bottom
			change-=(rows.length-index-1)*ballHeight;
			
    		$.each(images,function(index2,value2)
        	{            	 
            	 $(value).css('position','relative');
            	 $(value).css('top',change);//move image
        	 });
    		 
    	});
}

var main=function(){
	setUpIds();	
	moveBallsDown();
	var firstColumn=getColumnArray(0);
	testColumnLengthIsRight(firstColumn);
}

var ballsPerRow=12;
var upperRows=1,lowerRows=4;
	
$(document).ready(main);
	