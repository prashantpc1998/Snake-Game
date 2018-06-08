var cvs =document.getElementById('canvas');
var ctx = cvs.getContext('2d');
var scores=document.getElementById('scoreBoard');
var container=document.getElementById('container');
const snakew=10;  //snake width
const snakeh=10;  // snake height
var left=39,up=38,right=37,down=40; //key code of left,right,up&down button
var dir=left;
var snake = []; //array snake stores the coordinates of parts of snake
var food = [];  //array food stores the coordinates of food
var i,j,g,h,q=0,p,a,b,score=0,flag=0,eat,dead,leftm,rightm,upm,downm;

eat = new Audio();
eat.src = "eat.mp3";
dead = new Audio();
dead.src = "dead.mp3";
leftm = new Audio();
leftm.src = "left.mp3";
rightm = new Audio();
rightm.src = "right.mp3";
upm = new Audio();
upm.src = "up.mp3";
downm= new Audio();
downm.src = "down.mp3";
//eat,dead,upm,downm,leftm,rightm all are audio objects
//responsible for playing audio when events eat,dead,turn left,turm right,turn up,turn down occur
snake.pop();
food.pop();
a=Math.floor((Math.random()*40+2) )*snakew; //generates a random integer 2<=value<42 
b=Math.floor(   (Math.random()*40+2))*snakeh;
food.push({x:a,y:b});
a=Math.floor(   (Math.random()*40+2) )*snakew;
b=Math.floor(   (Math.random()*40+2))*snakeh;
snake.push({x:a,y:b});
snake.push({x:(a-1),y:b});

//draw snake function draw body parts of snake one rectangle for 1 pair(x,y)
function drawSnake(x,y){
	ctx.fillStyle="green";
	ctx.fillRect(x*snakew,y*snakeh,snakew,snakeh);
    ctx.fillStyle="white";
    ctx.strokeRect(x*snakew,y*snakeh,snakew,snakeh);
}



//newfood() function decides the new position of food when snake eats the existing food
//it stores the co-ordinates of new food in food array
function newfood(){
	
	a=Math.floor(   (Math.random()*40+2) )*snakew;
	b=Math.floor(   (Math.random()*40+2))*snakeh;
	food.push({x:a,y:b});
}
//CheckScore() checks that the head of snake hit food or not
//in case snake hits the food it increases the score by 1
function checkScore(){
	if(snake[0].x*snakew==food[0].x && snake[0].y*snakeh==food[0].y)
	{
		
		food.pop();
		ctx.clearRect(0,0,cvs.width,cvs.height);
		newfood();
		increaseSize();
		score++;
		eat.play();
		for(j=0;j<snake.length;j++)
	{
		drawSnake(snake[j].x,snake[j].y);
	}
    drawFood();
		//document.write('score++');
		
		
	}
   scores.innerHTML="Score "+score;
}
//increasSize() function increases the size of snake when the score increase
function increaseSize(){
	
	a=snake[snake.length-1].x;
	b=snake[snake.length-1].y;

	if(dir==left)
	{
	  a++;
	}
	else if(dir==right)
	{
		a--;
	}
	else if(dir==up)
	{
		b++;
	}
	else if(dir==down)
	{
		b--;
	}
	snake.push({x:a,y:b});
}
//drawFood() function draws the new food at its new location
function drawFood(){
	ctx.fillStyle="red";
	ctx.fillRect(food[0].x,food[0].y,snakew,snakeh);
	ctx.fillStyle="pink";
	ctx.strokeRect(food[0].x,food[0].y,snakew,snakeh);
}
/*swap function makes the snake enter the game area from opposite when snake
 crosses the boundary */ 
function swap(){
 if(snake[0].x<0)
 {
 	
 	g=snake[0].x+45;
 	h=snake[0].y;
 	var newHead = {x:g,y:h};
 	snake[0]=newHead;
 }
 else if(snake[0].y<0)
 {
 	
 	g=snake[0].x;
 	h=snake[0].y+45;
 	var newHead = {x:g,y:h};
 	snake[0]=newHead;
 }
 else if(snake[0].x>45)
 {
 		
 	g=snake[0].x-45;
 	h=snake[0].y;
 	var newHead = {x:g,y:h};
 	snake[0]=newHead;
    
 }
 else if(snake[0].y>45)
 {
 	g=snake[0].x;
 	h=snake[0].y-45;
 	var newHead = {x:g,y:h};
 	snake[0]=newHead;
 }

}
//checks that the snake has crossed the boundary
//calls swap function if snake has crossed the boundary
function checkSwap(){
	if(snake[0].x<0 || snake[0].y<0 || snake[0].x>45 || snake[0].y>45)
	{
		//console.log('swap functin is called');
		swap();
		
	}

}
/*game is the main function that gets execute and checks calls isDead() function and 
drawfood function */
function game(){

	
   if(flag==0 && score>2)
   {
   	isDead();
   }
	ctx.clearRect(0,0,cvs.width,cvs.height);
	for(var j=0;j<snake.length;j++)
	{
		drawSnake(snake[j].x,snake[j].y);
	}
    drawFood();
	snakex=snake[0].x;
	snakey=snake[0].y;
	if(dir==left)
	{
      snakex++;
	}
	else if(dir==right)
	{
		snakex--;
	}
	else if(dir==up)
	{
		snakey--;
	}
	else if(dir==down)
	{
		snakey++;
	}
	snake.unshift({x:snakex,y:snakey});
	snake.pop();
}
//eventListener keydown gets triggered when any key is down 
//it identifies the key which is down and getDirection function is called
window.addEventListener("keydown",getDirection);
/*getDirection() function decides the new direction of motion of snake when any key is down */
function getDirection(key){
	if(key.keyCode==left && dir!=right)
     {
     	dir=left;
     	leftm.play();
     }
     else if(key.keyCode==right && dir!=left)
     {

     	dir=right;
     	rightm.play();
     }
      else if(key.keyCode==up && dir!=down)
     {
     	dir=up;
     	upm.play();
     }
      else if(key.keyCode==down && dir!=up)
     {
     	dir=down;
     	downm.play();
     }
}
/*when the snake bite itself this gameOver() is called and the game terminate */
function gameOver(){
	window.location.href="gameover.html";
}
//checks that the snake bite itself or not
function isDead(){
	
	i=1;
	while(flag==0&&i<snake.length)
     {
		
		if( snake[0].x==snake[i].x && snake[0].y==snake[i].y)
		{
			
			
			 flag=1;
            dead.play();
             snake = [];
             food = [];
              ctx.clearRect(0,0,cvs.width,cvs.height);
             window.clearInterval(check1);
             window.clearInterval(check2);
             window.clearInterval(check3);
            setTimeout(gameOver,1000);
             break;
		}
		else
		{
			i++;
		}
	}
}
var check1=setInterval(checkScore,1);
var check2=setInterval(checkSwap,1);
var check3=setInterval(game,100);
