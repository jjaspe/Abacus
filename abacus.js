

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
		 $(value2).click(lowerImageClick);
    	 });
		 
		 testLowerFirstIdIs(images[0],index*images.length);
		 testLowerLastIdIs(images[images.length-1],(index+1)*images.length-1);
	});
}





var main=function(){
	setUpIds();	
	moveBallsDown();
	//To set up the vertical distance shift, get the first image in the first row and 
	//get the diference in tops with '.upper'. 
	var lowerMovementDistance=$(".lower div.row:nth-child(1) div:nth-child(1)").position().top
	-$('.lower').position().top;
	console.log(lowerMovementDistance);
	var firstColumn=getArrayFromColumn(0);
	testIsColumnLengthRight(firstColumn);
}

var ballsPerRow=12;
var upperRows=1,lowerRows=4;
var lowerMovementDistance=0;
	
$(document).ready(main);
	