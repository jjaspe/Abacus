//Handler for clicking on images on the upper part
//IF it is down, brings it up and viceversa
var upperImageClick=function()
{ 	
	var imageBottom=$(this).position().top+$(this).height(),
	containerBottom=$('.upper').position().top+$('.upper').height();
	
	if(imageBottom===containerBottom)//It's bottom, move up
	{
	   //Make the tops match
	   var containerTop=$('.upper').position().top,currentTop=$(this).position().top;
	   $(this).css('top',0);
	}else//it's up, move down
	{
	 change=containerBottom-imageBottom; //change
	 $(this).css('position','relative');
	 $(this).css('top',change);//move image
	}
}  


//Handler for clicking on images on the lower part
//IF it is down, brings the clicked image up as well as all the images above it,
//if up, brings it down as well as those below it
var lowerImageClick=function()
{ 	
	var imageBottom=$(this).position().top+$(this).height(),
	containerBottom=$('.upper').position().top+$('.upper').height();
	
	if(imageBottom===containerBottom)//It's bottom, move up
	{
	   //Make the tops match
	   var containerTop=$('.upper').position().top,currentTop=$(this).position().top;
	   $(this).css('top',0);
	}else//it's up, move down
	{
	 change=containerBottom-imageBottom; //change
	 $(this).css('position','relative');
	 $(this).css('top',change);//move image
	}
}  


//Given an image with an id, return column number
var getColFromImage=function(image)
{
    var id=$(image).attr('id');
    
    //Since there are ballsPerRow balls per row, mode by that 
    // to get column number
    return id%ballsPerRow;
}

//Given a column number, return an array with all the images
//in that column, with the array starting at the top of the column
var getColumnArray=function(colNumber)
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