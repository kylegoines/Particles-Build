var nanits = {
  color: "#ecefcf",
  x: 220,
  y: 270,
  width: 32,
  height: 32,
  velocity: 5,
  direction: [1, -1],
  rotate: 0,
  draw: function() {
    canvas.fillStyle = this.color;
    drawUpdatedParticle(this.x, this.y, 50, 50, this.rotate )
  },
  update: function(){
	this.rotate += 2,
	this.x = this.x + this.direction[0]
	
	this.y = this.y + this.direction[1]
  }
};

var nanits2 = {
  color: "#ecefcf",
  x: 100,
  y: 100,
  width: 32,
  height: 32,
  velocity: 5,
  direction: [-2, 2],
  rotate: 0,
  draw: function() {
    canvas.fillStyle = this.color;
    drawUpdatedParticle(this.x, this.y, 50, 50, this.rotate )
  },
  update: function(){
	this.rotate += 3,
	this.x = this.x + this.direction[0]
	
	this.y = this.y + this.direction[1]
  }
};

var nanits3 = {
  color: "#ecefcf",
  x: 600,
  y: 500,
  width: 32,
  height: 32,
  velocity: 5,
  direction: [3, 1],
  rotate: 0,
  draw: function() {
    canvas.fillStyle = this.color;
    drawUpdatedParticle(this.x, this.y, 50, 50, this.rotate )
  },
  update: function(){
	this.rotate += 1,
	this.x = this.x + this.direction[0]
	
	this.y = this.y + this.direction[1]
  }
};

var context;

var CANVAS_WIDTH = $(document).width();
var CANVAS_HEIGHT = $(document).height();

function initCanvas() {

	$( '#page' ).attr( 'height', CANVAS_HEIGHT );
	$( '#page' ).attr( 'width', CANVAS_WIDTH );
	$( '#page' ).css( 'background', '#c8e8ea' );
	canvas = $("#page")[0].getContext('2d');

	// This makes the game go, lets run at 30 frames a second
	var FPS = 30;
	setInterval( function() {
		update();
		draw();
	}, 1000 / FPS );

}	




function update() {

	nanits.update();
	nanits2.update();
	nanits3.update();
  
}

function drawUpdatedParticle( currentPositonX, currentPositonY, width, height, degrees ) {

	canvas.save();

    canvas.translate( currentPositonX + width/2, currentPositonY + height/2 );
    canvas.rotate(degrees*Math.PI/180);

    canvas.fillRect( -width/2, -height/2, width, height);	
    canvas.restore();

}


function draw() {

	canvas.clearRect( 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT );
	nanits.draw();
	nanits2.draw();
	nanits3.draw();

}



initCanvas();