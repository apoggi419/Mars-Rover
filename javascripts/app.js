//---Main--------------------------------------------------------->
var obstacles = [
  [null, "rock", null, null, null, "rock", null, null, null, null],
  [null, null, null, null, null, "tree", null, null, "rock", null],
  [null, "rock", "tree", null, null, null, null, null, null, null],
  [null, null, null, null, "rock", null, null, "tree", null, null],
  ["rock", "rock", null, null, null, null, null, null, null, null],
  [null, null, null, null, "tree", "tree", null, null, null, null],
  [null, null, "tree", null, null, "tree", null, null, null, null],
  ["rock", null, null, "tree", null, null, null, null, null, null],
  ["rock", null, null, "tree", null, null, null, null, null, null],
  [null, "tree", null, null, null, "rock", null, null, null, null],
];
var commands = "rlfflfffffrffrflrlflrllflrfflrllfllrrrffflflllfrlflrflrlflffflrrfllflrff";
var rover1 = new Rover("N",0,0,[],[],[]);
var rover2 = new Rover("N",10,10,[],[],[]);
startGame(rover1, rover2, commands);
//---Main--------------------------------------------------------->
function Rover(direction, x, y, travelLog, obstacleLog){
  this.direction = direction;
  this.x = x;
  this.y = y;
  this.travelLog = travelLog;
  this.obstacleLog = obstacleLog;
  this.currentPosition = [x,y];
}
function startGame(rover1, rover2, commands){
  var i = 0;
  while(commands[i]){
    if(i % 2 == 0){
      console.log("rover1 receives a command!");
      callCommands(rover1,commands[i]);
    } else{
      console.log("rover2 receives a command!");
      callCommands(rover2,commands[i]);
    }
    i++;
  }
  console.log("\nTravel Log of rover1:\n" + rover1.travelLog +"\nObstacle Log of rover1:\n" + rover1.obstacleLog + "\nTravel Log of rover2:\n" + rover2.travelLog +"\nObstacle Log of rover2:\n" + rover2.obstacleLog);
  return;
}
function callCommands(rover,command){

  switch (command) {
    case "r":
    turnRight(rover);
    break;
    case "l":
    turnLeft(rover);
    break;
    case "f":
    moveForward(rover);
    break;
    case "b":
    moveBackwards(rover);
    break;
    default:
    console.log("ERROR: Invalid command!");
    break;
  }
  return;
}
function turnLeft(rover){
  console.log("turnLeft was called!");
  switch (rover.direction) {
    case "N":
    rover.direction = "W";
    break;
    case "W":
    rover.direction = "S";
    break;
    case "S":
    rover.direction = "E";
    break;
    case "E":
    rover.direction = "N";
    break;
  }
  console.log("The rover is now moving " + rover.direction + "!");
  return;
}

function turnRight(rover){
  console.log("turnRight was called!");
  switch (rover.direction) {
    case "N":
    rover.direction = "E";
    break;
    case "E":
    rover.direction = "S";
    break;
    case "S":
    rover.direction = "W";
    break;
    case "W":
    rover.direction = "N";
    break;
  }
  console.log("The rover is now moving " + rover.direction + "!");
  return;
}

function moveForward(rover){
  console.log("moveForward was called!");
  var previousX = rover.x;
  var previousY = rover.y;
  if(rover.direction == "N" && rover.y < 10){
    rover.y++;
  }else if(rover.direction == "W" && rover.x > 0){
    rover.x--;
  }else if(rover.direction == "S" && rover.y > 0){
    rover.y--;
  }else if(rover.direction == "E" && rover.x < 10){
    rover.x++;
  }else{
    console.log("ERROR: Your rover is attempting to go out of bounds!");
    return;
  }
  if(obstacles[rover.x][rover.y]){
    console.log("A " + obstacles[rover.x][rover.y] + " is blocking your path!\n" + obstacles[rover.x][rover.y] + " has been logged at (" + rover.x + "," + rover.y + ")");
    rover.obstacleLog.push("(" + rover.x + "," + rover.y + ")");
    rover.x = previousX;
    rover.y = previousY;
    return;
  }
  if((rover.x == rover1.currentPosition[0] && rover.y == rover1.currentPosition[1]) || (rover.x == rover2.currentPosition[0] && rover.y == rover2.currentPosition[1])){
    console.log("Another rover is blocking your path!");
    rover.x = previousX;
    rover.y = previousY;
    return;
  }
  console.log("The rover has moved forward! The new position is (" + rover.x + "," + rover.y + ")!" );
  rover.travelLog.push("(" + rover.x + "," + rover.y + ")");
  rover.currentPosition[0] = rover.x;
  rover.currentPosition[1] = rover.y;
  return;
}
function moveBackwards(rover){
  console.log("moveBackwards was called!");
  var previousX = rover.x;
  var previousY = rover.y;
  if(rover.direction == "N" && rover.y > 0){
    rover.y--;
  }else if(rover.direction == "W" && rover.x < 10){
    rover.x++;
  }else if(rover.direction == "S" && rover.y < 10){
    rover.y++;
  }else if(rover.direction == "E" && rover.x > 0){
    rover.x--;
  }else{
    console.log("ERROR: Your rover is attempting to go out of bounds!");
    return;
  }
  if(obstacles[rover.x][rover.y]){
    console.log("A " + obstacles[rover.x][rover.y] + " is blocking your path!\n" + obstacles[rover.x][rover.y] + " has been logged at (" + rover.x + "," + rover.y + ")");
    rover.obstacleLog.push("(" + rover.x + "," + rover.y + ")");
    rover.x = previousX;
    rover.y = previousY;
    return;
  }
  if((rover.x == rover1.currentPosition[0] && rover.y == rover1.currentPosition[1]) || (rover.x == rover2.currentPosition[0] && rover.y == rover2.currentPosition[1])){
    console.log("Another rover is blocking your path!");
    rover.x = previousX;
    rover.y = previousY;
    return;
  }
  console.log("The rover has moved backwards! The new position is (" + rover.x + "," + rover.y + ")!" );
  rover.travelLog.push("(" + rover.x + "," + rover.y + ")");
  rover.currentPosition[0] = rover.x;
  rover.currentPosition[1] = rover.y;
  return;
}
