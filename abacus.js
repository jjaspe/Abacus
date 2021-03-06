

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

//Calculates the number represented in abacus. Each column counts one more decimal point
//Decimals start at right and go up by ten to the left
var calculateFigure=function()
{
 	var upperRow=$('.upper').children('.row');
	var figure=0,currentColumnArray,tens=1;
	for(var i=ballsPerRow-1;i>=0;i--)
	{
	 	currentColumnArray=getArrayFromColumn(i);
		//Walk throuch each of the images in this column, for each one that is up add 10^i (=tens)
		$.each(currentColumnArray,function(index,value)
				{
				 	if($(value).hasClass("up"))
					   figure+=tens;					
				});
		tens=tens*10; 
	}
	
	tens=1;
	//Walk through top images, for each one that is up add 5*10^i (=5*tens)
	$.each($('.upper').children('.row').children('.col-xs-1').get().reverse(),
	function(index,value)
	{
		if($(value).hasClass("up"))
			figure+=5*tens;
		tens=tens*10; 
	});	
	
	return figure;						
}

//Checks if number in abacus is the same as goal number and displays appropriate message
var isRight=function()
{
 	if(figure===calculateFigure())
	{
	    $('.result').text("Correct!");
		return true;
		}
	else
	{
	 	$('.result').text("Incorrect. Try Again");
		return false;
		}
}

//Gets a new number to find and resets result text
//The possible numbers can have as many figures as there are balls in a row
var getNew=function()
{
 	figure=Math.floor(Math.random()*Math.pow(10,ballsPerRow)	+1);
	$('.number').text(figure.toString());
	$('.result').text(defaultResultText);		 
}

var main=function(){
    
    $('.result').text(defaultResultText);
	getNew();
	moveBallsDown();
	setUpIds();
}

var test=function()
{
 	switch(testNumber)
	{
	 case 0:
        figure=1;
    	testIsFigureCorrect(1);
		break;
	 case 1:
	    figure=3;
    	testIsFigureCorrect(3);
		break;
		}
	testNumber++;
}

var ballsPerRow=12;
var upperRows=1,lowerRows=4,testNumber=0;
var figure=0;
var defaultResultText="Find the number in abacus";
	
$(document).ready(main);
	