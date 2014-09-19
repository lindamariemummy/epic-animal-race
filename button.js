$(document).ready(function() {
  
  //store reference to button in variable
  var $body = $("body");

  $body.on("click", function(){
  	
    //click only advances the animals if no one has won
    if(!winnerExists) {
      winnerExists = timeStep();
    }
  });
});
