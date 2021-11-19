const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const rowNum = 10, colNum = 10;

// start of class

class Field {
  constructor() {
    this._field = Array(rowNum).fill().map(() => Array(colNum));
    this._locationX = 0;
    this._locationY = 0;
    // Set the "home" position before the game starts
    this._field[0][0] = pathCharacter;
  }


  generateField(percentage) {
    for (let y = 0; y < rowNum; y++) {
      for (let x = 0; x < colNum; x++) {
        const prob = Math.random();
        this._field[y][x] = prob > percentage ? fieldCharacter : hole;
        this._field[this._locationY][this._locationX] = pathCharacter; // Update the character location
      }
    }
    // Set the "hat" location
    const hatLocation = {
      x: Math.floor(Math.random() * rowNum),
      y: Math.floor(Math.random() * colNum)
    };
    //make sure the "hat" is not at the starting point
    while (hatLocation.x === 0 && hatLocation.y === 0) {
      hatLocation.x = Math.floor(Math.random() * rowNum);
      hatLocation.y = Math.floor(Math.random() * colNum);
    }
    this._field[hatLocation.x][hatLocation.y] = hat;
    return this._field;
  }

  runGame() {
    let playing = true;
    console.log("Start Game");
    //print the field
    while (playing === true) {
      this.print(); //display string first 
      this.askQuestion(); // ask question below
      if (!this.Boundaries()) {
        console.log('Drop Out!'); //drop
        playing = false;
      } else if (this.IntoHole()) {
        console.log('In the hole you go!'); //drop
        playing = false;
      } else if (this.GetHat()) {
        console.log('Congrats, you got your hat!'); //win
        playing = false;
      }
      else { this._field[this._locationY][this._locationX] = pathCharacter; } // repeat till you win/lose
    }
  }

  print() {
    const displayString = this._field.map(row => {
      return row.join('');
    }).join('\n');

    console.log(displayString);
  }


  askQuestion() {
    const direction = prompt('Which way? ').toUpperCase();
    switch (direction) {
      case 'U':
        this._locationY -= 1;
        break;
      case 'D':
        this._locationY += 1;
        break;
      case 'L':
        this._locationX -= 1;
        break;
      case 'R':
        this._locationX += 1;
        break;
      default:
        console.log('Enter U - Up , D - Down , L - Left or R - Right.');
        this.askQuestion();
        break; // direction is up down left right
    }
  }

  Boundaries() {
    return (
      this._locationY >= 0 &&
      this._locationX >= 0 &&
      this._locationY < this._field.length &&
      this._locationX < this._field[0].length
    );
  } // boundaries

  GetHat() {
    return this._field[this._locationY][this._locationX] === hat; // win
  }

  IntoHole() {
    return this._field[this._locationY][this._locationX] === hole; //lose
  }

}   //End of Class


//Create an instance of field class object
const myfield = new Field();
myfield.generateField(0.2); //20% 
myfield.runGame();  //play