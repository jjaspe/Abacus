//Moves all the ball images down to their natural position
//Also creates an attribute "defaultTop" so we can keep track of wher the balls should be
//when they go down
var moveBallsDown=function()
{
    var top=$('.upper').position().top,
	    containerHeight=$('.upper').height(),
 		bottom=top+containerHeight,
		ballHeight=$('.col-xs-1').height();
	
	//This one has only one row,so just get all divs from that one
	var row=$('.upper').children('div');
	testRowsMoreThanZero(row);
 	var images=$(row).children('div');
	testImagesMoreThanZero(images);
	testImagesRightLength(images,ballsPerRow);
	
	//Find how much each image has to move by comparing the bottom of the image
	//and the bottom of the container. Then move the top of the image by that much
	//Since all images are at the same height we only need to find the change once	
	var currentBottom=$(images[0]).position().top+$(images[0]).outerHeight(true);//image's bottom
	var change=bottom-currentBottom; //difference in bottoms
	
	$.each(images,function(index,value)
	{	 
	 //Use change to push to bottom of .upper
     value.bottomPush=change;
	 //Use bottomPush to push to bottom, then subtract heigth of .upper to push to top of upper, 
	 //then add ballHeight to move down below 'upper',then add border to move down
	 value.topPush=value.bottomPush-containerHeight+ballHeight+parseInt($('.upper').css('border-top-width'));
	 $(value).css('position','relative');
	 $(value).css('top',value.bottomPush);//move image down
	 $(value).addClass("down");
	});
	 
	 
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
			
			//Get difference between this image's bottom and the container's bottom
    		currentBottom=$(images[0]).position().top+ballHeight;
            change=bottom-currentBottom; 
			
			
    		$.each(images,function(index2,value2)
        	{            	 
				 //Use change to push to bottom then back up with (rows.length-index-1)*ballHeight
				 value2.bottomPush=change-(rows.length-index-1)*ballHeight;
				 //Use change to push to bottom then -lowerHeight to push back up above lower, 
				 //then +(index+1)*ballHeight back down however many levels are needed
				 //Add width so it ball doesnt cut into border
				 value2.topPush=change-$('.lower').innerHeight()+(index+1)*ballHeight+parseInt($('.lower').css('border-top-width'));
            	 $(value2).css('top',value2.bottomPush);
				 value2.defaultTop=Math.floor($(value2).position().top);
				 $(value2).addClass("down");				 
        	 });
			 testIsDefaultTopCorrect(images[0],$(images[0]).position().top);
    		 
     });
}

//Moves all balls down
var reset=function()
{ 
 var images=$('.abacus').children('.upper,.lower').children('.row').children('div');
 testResetGetsAllImages(images);
   $.each(images,function(index,value)
   {
    	$(value).css('top',value.bottomPush);
		$(value).addClass("down");
		$(value).removeClass("up");
   });
   
}



//Handler for clicking on images on the upper part
//IF it is down, brings it up and viceversa
var upperImageClick=function()
{ 	
	var imageBottom=Math.floor($(this).position().top+$(this).height()),
	containerBottom=$('.upper').position().top+$('.upper').height();
	
	if(imageBottom===containerBottom)//It's bottom, move up
	{	   
	   $(this).css('top',this.topPush);
	   $(this).addClass("up");
	   $(this).removeClass("down");
	}else//it's up, move down
	{
	 $(this).css('top',this.bottomPush);
	 $(this).addClass("down");
	 $(this).removeClass("up");
	}
}  


//Handler for clicking on images on the lower part
//IF it is down, brings the clicked image up as well as all the images above it,
//if up, brings it down as well as those below it
var lowerImageClick=function()
{ 	
	//First get the array of all images in the same column as this one
	var column=getColumnFromImage(this);
	testIsColumnValid(column);
	var columnArray=getArrayFromColumn(column);
	testIsColumnLengthRight(columnArray);
	
	var actualTop=Math.floor($(this).position().top);
	
	if(actualTop===this.defaultTop)//It's bottom, move up
	{
	  $.each(columnArray,function(index,value)
	  {
          if($(value).position().top<=actualTop)
		  {
              $(value).css('top',value[0].topPush);
			  $(value).addClass("up");
			  $(value).removeClass("down");
		  }
      }
       );
	}else//it's up, move down
	{
	 $.each(columnArray,function(index,value)
	  {
          if($(value).position().top>=actualTop)
		  {
		   	  $(value).css('top',value[0].bottomPush);
			  $(value).addClass("down");
			  $(value).removeClass("up");
		  }
      }
       );
	}
}  


//Given an image with an id, return column number
var getColumnFromImage=function(image)
{
    var id=$(image).attr('id');
    
    //Since there are ballsPerRow balls per row, mode by that 
    // to get column number
    return id%ballsPerRow;
}

//Given a column number, return an array with all the images
//in that column, with the array starting at the top of the column
var getArrayFromColumn=function(colNumber)
{
 	//We could do this in one line but I want to make sure that
	//the divs are added to the array in the right order so I 
	//will add them one by one
 	var colArray=[];
	
	//Loop through rows of lower	
	$('.lower').children('.row').each(function(index,value)
    	{
    	 //Find the nth div of current row, add it to array
		 colArray.push( $(value).find("div:eq("+colNumber+")") );
    	}
	);
	return colArray;
	
    //return $(".lower div.row div:nth-child("+(colNumber+1)+")");  One liner version
}