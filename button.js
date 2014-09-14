$(document).ready(function() {
  
  //store reference to button in variable
  var $b = $("#button");
    $b.mouseenter(function() {
        $b.fadeTo("fast", .8);
    });
    $b.mouseleave(function() {
        $b.fadeTo("fast", 1);
    });
    $b.click(function(){
    	
        //click only advances the animals if no one has won
        if(!winnerExists) {
               winnerExists = timeStep();
        }
    });
});
