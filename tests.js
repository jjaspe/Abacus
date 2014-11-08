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
  
  var testColumnLengthIsRight=function(column)
  {
    if(column.length===lowerRows)
   		console.log("lower rows column test passes");
	else
		console.log("lower rows column test fails" + column.length);
  }