//set course length in meters and create course
var courseLength = 20;
var numLanes = 9;
var course = new Course(courseLength, numLanes);

//declare/initialize animals
var rabbit = new Animal("Peter Rabbit",  1, 0.7, 0.8,"<img src='https://openclipart.org/people/rones/Rabbit_by_Rones.svg' height='20' width='20'/>");
var turtle = new Animal("Myrtle the Turtle", 3, 0.8, 0.2, "<img src='https://openclipart.org/people/valessiobrito/valessiobrito_Green_sea_turtle.svg' height='20' width='20'/>");
var wolf = new Animal("Ralph the Wolf",    5, 0.8, 0.5, "<img src='https://openclipart.org/people/worldlabel/Lone%20Wolf.svg' height='20' width='20'/>");
var elephant = new Animal("Elsa the Elephant", 7, 0.7, .3, "<img src='https://openclipart.org/people/lemmling/lemmling_2D_cartoon_elephant.svg' height='20' width='20'/>");
var allAnimals =[rabbit, turtle, wolf, elephant];
var numAnimals = allAnimals.length;
  
var winnerExists = false;



//displays animals in starting positions before race begins
refreshTable();
printAnimals(allAnimals, numAnimals);

