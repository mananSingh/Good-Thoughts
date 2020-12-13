var tags = ["Action","Behaviour", "Character", "Desire",
	"Destiny", "Devotion", "Divinity", "Duty", "Ego", "Faith", "Fate",
	"Gayatri", "God", "Happiness", "Health", "Human", "Ideal", "Karma",
	"Knowledge", "Life", "Love", "Mind", "Personality", "Relations", 
	"Religion", "Self", "Service", "Soul", "Spirituality",
	"Success", "Thoughts", "Time", "Willpower", "Wisdom", "World",
	"Worship"];

function allThoughtsGen(){
	var output="";
	$.each(tags, function(index, value){
		$.getJSON('json/'+value+'.json', function(data){
			$.each(data,function(key, val){
				output+='<p class="allThoughts4Search">';
				output+=val.content+'<br><em>('+val.header+')</em>';
				output+='</p>';
			});
		$('#allThoughts').html(output);
		});	
	});	
}

function browseThoughtsGen(){
	var output="";
	$.each(tags, function(index, value){
		output+='<a href="#thoughts" class="ui-btn ui-shadow ui-btn-inline ui-corner-all" onclick="showThoughts(';
		output+= "'"+value+"'";
		output+= ')">';
		output+=value;
		output+='</a>';		
	});	
	$('#cloud').html(output);
}

function showThoughts(tag){
	var output="";
	//the following request might seem redundant, and it is.
	//it's the result of careless design. take care, next time.
	$.getJSON('json/'+tag+'.json', function(data){
		var output="<h2>";
		output+=tag;
		output+="</h2>";
		$.each(data, function(key, val){
			output+='<p class="allThoughts4Search">';
			output+=val.content;
			output+='</p>';
			if(key!=data.length-1)
				output+='<hr>';
		});
		$('#thought-list').html(output);
	});
}
function randThoughtGen(){
	var output="";
	//// Returns a random integer between min (included)
	// and max (included)
	// Using Math.round() will give you a non-uniform distribution!
	//Math.floor(Math.random() * (max - min + 1)) + min;
	var randomTagNo = Math.floor(Math.random()*(tags.length-1-0+1)+0);
	$.getJSON('json/'+tags[randomTagNo]+'.json', function(data){			
		var randomThoughtNo = Math.floor(Math.random()*(data.length-1-0+1)+0);
		output=data[randomThoughtNo].content;
		$('#randomQuote').html(output);
	});
}

//on document ready...js...
$(document).ready(function(){

//Canvas Animation
var mainCanvas = document.querySelector("#myCanvas");
var mainContext = mainCanvas.getContext("2d");
var canvasHeight = mainCanvas.height;
var canvasWidth = mainCanvas.width;
var requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame || 
                            window.webkitRequestAnimationFrame || 
                            window.msRequestAnimationFrame;
var angle = 0;
var playing = true;
var circleid;

function drawCircle(){
	mainContext.clearRect(0, 0, canvasWidth, canvasHeight);
	//color in background
	//mainContext.fillStyle = "#eeeeee";
	//mainContext.fillRect(0,0,canvasWidth, canvasHeight);
	//draw circle
	mainContext.beginPath();
	var radius = 10 + 40 * Math.abs(Math.cos(angle));;
	mainContext.arc(canvasWidth/2, canvasHeight/2, radius, 0, Math.PI*2, false);
	mainContext.closePath();
	//color in circle
	mainContext.fillStyle="#006699";
	mainContext.fill();

	angle += Math.PI / 64;
	circleid = requestAnimationFrame(drawCircle);

}
drawCircle();

//Audio toggle
$('#myCanvas').click(function() {
    if (playing == false) {
        document.getElementById('player').play();
        playing = true;
        drawCircle();  //restart anim.Frame 
    } else {
        document.getElementById('player').pause();
        playing = false;
        cancelAnimationFrame(circleid); //stop anim.Frame
      }
  });

});  //document.ready ended


//$(document).ready(function(){
//
//});
