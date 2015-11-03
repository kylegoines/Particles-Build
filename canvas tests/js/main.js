var imageArray = [];
var cloudsCount = 29;
var imageLoadSet  = 0;
var cloudsWidth = 200;
var canvas;

var repulse = {
	radius: 10,
	xPos: 0,
	yPos: 0

}

window.onload = function() {

	canvas  = document.getElementById( 'canvasClouds' ); 

	canvasHeight = $( document ).height();
	canvasWidth = $( document ).width()

	$('canvas').attr( 'height', $( document ).height() );
	$('canvas').attr( 'width', $( document ).width() );

	context = canvas.getContext('2d');

	var cloud0 = new Image();
	cloud0.src = 'img/nanit.svg';

	var cloud1 = new Image();
	cloud1.src = 'img/nanit2.svg';

	cloud0.onload = function() {
		createCloud( 0, cloud0 ); imageLoadSet++;
		createCloud( 1, cloud0 ); imageLoadSet++;
		createCloud( 2, cloud0 ); imageLoadSet++;
		createCloud( 3, cloud0 ); imageLoadSet++;
		createCloud( 4, cloud0 ); imageLoadSet++;
		createCloud( 5, cloud0 ); imageLoadSet++;
		createCloud( 6, cloud0 ); imageLoadSet++;
		createCloud( 7, cloud0 ); imageLoadSet++;
		createCloud( 8, cloud0 ); imageLoadSet++;
	}

	cloud1.onload = function() {
		createCloud( 9, cloud1 ); imageLoadSet++;
		createCloud( 10, cloud1 ); imageLoadSet++;
		createCloud( 11, cloud1 ); imageLoadSet++;
		createCloud( 12, cloud1 ); imageLoadSet++;
		createCloud( 13, cloud1 ); imageLoadSet++;
		createCloud( 14, cloud1 ); imageLoadSet++;
		createCloud( 15, cloud1 ); imageLoadSet++;
		createCloud( 16, cloud1 ); imageLoadSet++;
		createCloud( 17, cloud1 ); imageLoadSet++;
		createCloud( 18, cloud1 ); imageLoadSet++;
		createCloud( 19, cloud1 ); imageLoadSet++;
		createCloud( 20, cloud1 ); imageLoadSet++;
		createCloud( 21, cloud1 ); imageLoadSet++;
		createCloud( 22, cloud1 ); imageLoadSet++;
		createCloud( 23, cloud1 ); imageLoadSet++;
		createCloud( 24, cloud1 ); imageLoadSet++;
		createCloud( 25, cloud1 ); imageLoadSet++;
		createCloud( 26, cloud1 ); imageLoadSet++;
		createCloud( 27, cloud1 ); imageLoadSet++;
		createCloud( 28, cloud1 ); imageLoadSet++;

	}

	initAnimation();

}

/////////////////////////////////////////////////////////////////////

//getting mouse movement
function hoverAction( elem ) {
	$('canvas').trigger('mousemove');
}

$('canvas').on('mousemove', function(evt){
	getMousePos(canvas, evt)
})

function getMousePos(canvas, evt) {

	var rect = canvas.getBoundingClientRect();
	
	var x = evt.clientX - rect.left;
	var y = evt.clientY - rect.top;

	updateRepulse( x, y );

}

function updateRepulse( x, y ){

	// if these are not numbers do not update repulse with broken stuff;
	if ( isNaN( x ) ||  isNaN( y ) ){
		return;
	}

	repulse.xPos = x;
	repulse.yPos = y;

}

function drawRepulse(){

	context.beginPath();
	context.arc(repulse.xPos, repulse.yPos, 20, 0, 2 * Math.PI, false);
	//context.stroke();

}

/////////////////////////////////////////////////////////////////////

function negOrPos( number ) {

	var modifier = Math.round( Math.random() )

	if ( modifier === 1 ) {
		return -(number)
	} else {
		return number
	}

}

function clamp( number, min, max ) {
	console.log(Math.min( Math.max( number, min ), max))
	return Math.min( Math.max( number, min ), max);
};


/////////////////////////////////////////////////////////////////////

function collide() {

	for ( var c=0; c < ( imageArray.length ); c++) {

		if ( (imageArray[c].xPos > repulse.xPos - 125 && imageArray[c].xPos < repulse.xPos + 125 ) && (imageArray[c].yPos > repulse.yPos - 125 && imageArray[c].yPos < repulse.yPos + 125 ) ) {
			
			var dx_mouse = imageArray[c].xPos - repulse.xPos,
				dy_mouse = imageArray[c].yPos - repulse.yPos,
				dist_mouse = Math.sqrt( dx_mouse * dx_mouse + dy_mouse * dy_mouse );

			var normVec = { x: dx_mouse / dist_mouse, 
							y: dy_mouse / dist_mouse 
							},
				repulseRadius = 125,
				velocity = 100,
				repulseFactor = clamp( ( 1 / repulseRadius ) * ( -1 * Math.pow( dist_mouse / repulseRadius, 2 ) + 1 ) * repulseRadius*velocity, 0, 50 );
			
			var pos = {
				x: imageArray[c].xPos + normVec.x * repulseFactor,
				y: imageArray[c].yPos + normVec.y * repulseFactor
			}

			if ( pos.x - 60 > 0 && pos.x + 60 < canvasWidth ) {
				imageArray[c].xPos = pos.x;	
			}

			if ( pos.y - 60 > 0 && pos.y + 60 < canvasHeight ) {
				imageArray[c].yPos = pos.y;	
			}

		}

	}

}

/////////////////////////////////////////////////////////////////////

function createCloud( number, image ) {

	var speedNum = Math.floor( Math.random() * 4 ) + 1;
	var speedNum2 = Math.floor( Math.random() * 4 ) + 1;

	imageArray[number]= {};
	imageArray[number].xPos   = ( Math.floor( Math.random() * canvasWidth ) + 1 );
	imageArray[number].yPos   = ( Math.floor( Math.random() * canvasHeight ) + 1 );
	imageArray[number].image  = image;
	imageArray[number].rotate = Math.floor( Math.random() * 360 ) + 1;
	imageArray[number].dx =  negOrPos( speedNum );
	imageArray[number].dy = negOrPos( speedNum2 );

	//normalize numbers if they dont jive well
	if ( imageArray[number].xPos + 60 > canvasWidth ) {
		imageArray[number].xPos = imageArray[number].xPos - 60;
	}

	if ( imageArray[number].yPos + 60 > canvasHeight ) {
		imageArray[number].yPos = imageArray[number].yPos - 60;
	}

}

/////////////////////////////////////////////////////////////////////

function initAnimation() {

	( function animLoop() {

		requestAnimationFrame( animLoop );

		render();
		update();
		collide();

	  } )();
}

/////////////////////////////////////////////////////////////////////

function update() {

	hoverAction();

	for ( var c=0; c < ( imageArray.length ); c++ ) {

		if ( imageArray[c].xPos < 0 || imageArray[c].xPos > canvasWidth - 60 ) {
			imageArray[c].dx = -imageArray[c].dx;
		}

		if ( imageArray[c].yPos < 0 || imageArray[c].yPos > canvasHeight - 60 ) {
			imageArray[c].dy = -imageArray[c].dy;
		}

		imageArray[c].xPos += imageArray[c].dx;
		imageArray[c].yPos += imageArray[c].dy;

	}

}

/////////////////////////////////////////////////////////////////////

function render() {

	context.clearRect( 0, 0, canvasWidth, canvasHeight );
 
 	drawRepulse();

	//rendering mouse circle

 	// rendering nanites
	for ( var c=0; c < ( imageArray.length ); c++) {

		if (  imageLoadSet >= cloudsCount ) {

		context.save()

		imageArray[c].xPos = imageArray[c].xPos;
		imageArray[c].yPos = imageArray[c].yPos;

		//first translate to the object
		context.translate( imageArray[c].xPos, imageArray[c].yPos );

		//then translate further. get to the center of the object
		context.translate( 30, 30 );

		//incriment and add rotate
		imageArray[c].rotate = imageArray[c].rotate + 1

		//rotate the canvas
		context.rotate( imageArray[c].rotate* Math.PI / 180 )

		//return the canvas to the orgional position
		//first image
		//half the center out
		//the negeative version of the second translate...
		context.drawImage( imageArray[c].image, -30, -30, 60, 60 );

		context.restore();

	  }
   }

}