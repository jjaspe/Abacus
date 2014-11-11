

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
var calculateFigure=function()
{
 	var upperRow=$('.upper').children('.row');
	var figure=0,currentColumnArray,tens=1;
	for(var i=0;i<ballsPerRow;i++)
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
	$.each($('.upper').children('.row').children('.col-xs-1'),
	function(index,value)
	{
		if($(value).hasClass("up"))
			figure+=5*tens;
		tens=tens*10; 
	});	
	
	return figure;						
}

var isRight=function()
{
 	if(figure===calculateFigure())
	{
		$('.figure').children('p').css('innerText',"Win");
		return true;
		}
	else
	{
		$('.figure').children('p').css('innerText',"Lose");
		return false;
		}
}


var getNew=function()
{
 	figure=Math.floor(Math.random()*Math.pow(10,ballsPerRow-1)	+1);
	$('.figure').text(figure.toString());		 
}

var main=function(){
	moveBallsDown();
	setUpIds();		
}

var ballsPerRow=12;
var upperRows=1,lowerRows=4;
var figure=0;
	
$(document).ready(main);
	