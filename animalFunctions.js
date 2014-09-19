//function is called when user clicks on button, returns true if a winner is found
function timeStep() {

	//clears the racetrack
	refreshTable();

	//moves animals one timestep forward
	animalsAdvance(allAnimals, numAnimals);

	//display animals
	printAnimals(allAnimals, numAnimals);
	
	//checks to see if any two animals are in the same location
	for (var i = 0; i < numAnimals; i++) {
		for (var j = 0; j < i; j++) {
			if (course.sameLocation(allAnimals[i], allAnimals[j]) && allAnimals[i].isRacing && allAnimals[j].isRacing)
			{	

				printAnimals(allAnimals, numAnimals);
				crash(allAnimals[i].location);
		
				$b.text("Oh no! " + allAnimals[i].name + " and " + allAnimals[j].name + " collided and have been disqualified!");
				//removes the crashed animals from the race.
				allAnimals[i].isRacing = false;
				allAnimals[j].isRacing = false;

				//display animals
				printAnimals(allAnimals, numAnimals);

			}
		}
	}

	//checks to see if the rabbit is next to the wolf
	if (course.adjacentLocation(rabbit.location, wolf.location) && rabbit.isRacing && wolf.isRacing) {
		$b.html("Oh no, the wolf and rabbit got too close to each other! \n The wolf has eaten the rabbit and been disqualified.");
		wolf.isRacing = false;
		rabbit.isRacing = false;
	}
	
	//checks to see if the turtle is next to the elephant
	if (course.adjacentLocation(elephant.location, turtle.location) && elephant.isRacing && turtle.isRacing) {
			$b.html("Oh no, the elephant didn't notice the turtle! \n The elephant has stepped on the turtle and been disqualified.");
			console.log(elephant.location.getDistance()+" " + elephant.location.getLane() + " " +turtle.location.getDistance()+" " + turtle.location.getLane() );
			elephant.isRacing = false;
			turtle.isRacing = false;
	}

	//checks to see if a winner exists
	winnerExists = checkAndPrintWinner(allAnimals, numAnimals);

	return winnerExists;

}

//advances all the animals, if applicable
function animalsAdvance(animalArray, numAnimals) {

	var counter;

	for (var counter = 0; counter < numAnimals; counter++) {
		if (animalArray[counter].isRacing) {
					animalArray[counter].advance();
			}
	}
}

//prints all 4 animals
function printAnimals(animalArray, numAnimals) {
	
	var counter;

	for (counter = 0; counter < numAnimals; counter++) {	
		disp(animalArray[counter]);
	}

}

//checks for winner and alerts user if a winner exists
function checkAndPrintWinner(animalArray, numAnimals) {
	var winnerString = '';
	var counter;
	var winnerExists = false;

	//cycles through all animals and checks for a winner
	for (counter = 0; counter < numAnimals; counter++) {	
		if (animalArray[counter].isWinner)
		{
			winnerString = winnerString + animalArray[counter].name + " wins! ";
			winnerExists = true;
		}
	}

	//prints message if all animals have stopped racing
	if (!animalArray[0].isRacing && !animalArray[1].isRacing && !animalArray[2].isRacing && !animalArray[3].isRacing) {
		winnerString = "The race is over since all participants are dead or disqualified!"
	}

	//displays winner string, if applicable
	if (winnerString != ""){
		$b.html(winnerString);
	}

	//returns true if an animal has won the race
	return winnerExists;

}

//updates the display for an animal
function disp(aType) {

	if(aType.isRacing) { //animal is only displayed if it is still in the race
		this.tableCell = document.getElementById("racetrack").rows[aType.location.getLane()].cells;
		tableCell[aType.location.getDistance()].innerHTML=aType.abbrev;
	}
}

//displays kaboom graphic if animals have collided
function crash(location) {

	this.tableCell = document.getElementById("racetrack").rows[location.getLane()].cells;
	tableCell[location.getDistance()].innerHTML="<img src='https://openclipart.org/people/DevynCJohnson/explode_1.svg' height='20' width='20'/>";
}

//Location object
function Location(laneNumber, distance) {

	var laneNumber = laneNumber;
	var distance = distance;
	this.getLane = function() {
		return laneNumber;
	};
	this.getDistance = function() {
		return distance;
	};
	this.moveForward = function() {
		distance++;
		if (distance == courseLength)
		{
			return true;
		}
		else {
			return false;
		}
	};
	this.moveLeft = function() {
		if (laneNumber !=0) {
		laneNumber--;
		}
	};
	this.moveRight = function() {
		if (laneNumber !=numLanes-1) {
			laneNumber++;
		}
	};
	this.printLocation = function() {
		console.log("lane: " + laneNumber + ", distance: " + distance + " meters.");
	};

	this.setLaneNumber = function(newLaneNumber) {
		laneNumber = newLaneNumber;
	};
}

//Course constructor
function Course(courseLength, numLanes) {

	this.courseLength = length;
	this.numLanes = numLanes;
	//this.winner = false;
	
	//determines if two locations are the same
	this.sameLocation = function(animal1, animal2) {
			if (animal1.location.getLane() == animal2.location.getLane() && animal1.location.getDistance() == animal2.location.getDistance()) {
				return true;
			}
			else {
				return false;
			}
		};

		//Determines if 2 locations are adjacent, returns true or false
	this.adjacentLocation = function(location1, location2) {
		if ((location1.getLane() == location2.getLane() && 
			location1.getDistance() >= location2.getDistance() - 1 &&  location1.getDistance() <= location2.getDistance() + 1) ||

			(location1.getLane() == location2.getLane() - 1 && 
			location1.getDistance() >= location2.getDistance() -1 &&  location1.getDistance() <= location2.getDistance() + 1) ||

			(location1.getLane() == location2.getLane() + 1 && 
			location1.getDistance() >= location2.getDistance() -1 && location1.getDistance() <= location2.getDistance() + 1)) {
			return true;
		}
		else {
			return false;
		}	
	};
}

//Animal constructor
function Animal(name, begLane, probMovingFW, probMovingSS, abbrev) {
	this.name = name;
	this.location = new Location(begLane, 0);
	this.abbrev = abbrev;
	this.isRacing = true;
	
	//sets the probability fo the animal moving forward or side to side (probability in [0,1])
	this.probMovingFW = probMovingFW;
	this.probMovingSS = probMovingSS;
	this.isWinner = false;

	//moves the animal one timestep
	this.advance = function() {
		
		//moves forward, if applicable
		if (Math.random() < this.probMovingFW) {
				this.isWinner = this.location.moveForward();
		}

		//moves side to side, if applicable 
		if (Math.random() < this.probMovingSS) {
			var leftOrRight = Math.floor(Math.random()*2);
			if (leftOrRight == 0) {
				this.location.moveRight();
			}
			else { //leftOrRight must be 1
				this.location.moveLeft();
			}
		}
	};

	//removes animal from race
	this.remove = function() {
		this.location = {};
	};
}


//refreshes racetrack
function refreshTable() {
	var table;
	var numRows = numLanes;
	var numCols = courseLength+5;

	tableString = "";

	//forms table with i rows and j columns
	for(var i = 0; i < numRows; i++){
	   tableString += "<tr>";
	   for (var j = 0; j < numCols; j++){
	      
	      //displays vertical bar at finish line
	      if( j == courseLength ) {
	      	tableString += '<td id="finish"></td>';
	      }
	      //displays empty cell
	      else
	      {
	      	tableString += '<td></td>';
	      }
	   }
	   tableString += '</tr>'
	}

	tableString += '</table>'

	$("#racetrack").html(tableString);
}