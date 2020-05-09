    
// Using Javascript   (YOU CAN DO THIS WITH JS ALSO AND WITH JQUERY ALSO)
    const rulesBtn = document.getElementById("rules-btn");
    const closeBtn = document.getElementById("close-btn");
    const rules = document.getElementById("rules");
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    
    

    //Show the rules on click
    rulesBtn.addEventListener('click', ()=>{
        rules.classList.add('show');
    });

    //Hide the rules on click
    closeBtn.addEventListener('click', ()=>{
        rules.classList.remove('show');
    });



 // Using jQuery -  

    // To Show the rules on click
    // $('#rules-btn').click(()=>{
    //     $('#rules').addClass('show')
    // });
    // To remove the rules on click 
    // $('#close-btn').click(()=>{
    //     $('#rules').removeClass('show')
    // });


    /*-------------------------------------END OF BUTTON CLICK FUNCTIONS-----------------------------------------------------*/

    let score = 0;
     
    const brickRowCount = 12;
    const brickColumnCount = 7;



//Create ball props

  const ball = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      size: 10,
      speed: 4,
      dx: 4,
      dy: -4
  }

  // Create paddle props
  const paddle = {
      x: canvas.width / 2 - 40,
      y:canvas.height - 20,
      w: 110,
      h: 12,
      speed: 5,
      dx:0

  }

  // Creat brick prop

  const brickInfo = {
      w: 70,
      h: 20,
      padding: 10,
      offsetX: 45,
      offsetY:  60,
      visible: true
  }
  // Create bricks
  
  const bricks = [];
  for(let i =0; i < brickRowCount; i++){
      bricks[i] = []
      for(let j =0; j < brickColumnCount; j++){
        const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
        const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
        bricks[i][j] = {x,y, ...brickInfo};
    }
  }
//console.log(bricks);


  // Draw ball on canvas
function drawBall(){
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fillStyle = '#0095dd';
    ctx.fill();
    ctx.closePath();
}

// Draw paddle on canvas

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h)
    ctx.fillStyle = '#0095dd';
    ctx.fill();
    ctx.closePath();
}

// Draw bricks on canvas
function drawBricks(){
    bricks.forEach(column =>{
        column.forEach(brick =>{
            ctx.beginPath();
            ctx.rect(brick.x, brick.y, brick.w, brick.h);
            ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
            ctx.fill();
            ctx.closePath();
        })
    })
}

// Move paddle on canvas

function movePaddle(){
    paddle.x += paddle.dx;


    if(paddle.x + paddle.w > canvas.width){
        paddle.x  = canvas.width - paddle.w - 10;
    }

    if(paddle.x < 0){
        paddle.x = 10;
    }
}


function draw(){

    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawScore();
    drawBricks();

}

// Draw score on canvas

 function drawScore(){
     ctx.font = '20px Arial'
     ctx.fillText(`Score: ${score}`, canvas.width - 100,canvas.height / 2 - 310);
 }

function update(){

    movePaddle();
    // draw everything
    draw();
    requestAnimationFrame(update);
}

update();


// Keydown event
function keyDown(e){
    if(e.key === 'Right'|| e.key === 'ArrowRight'){
        paddle.dx = paddle.speed;
    }else if(e.key === 'Left' || e.key === 'ArrowLeft'){
        paddle.dx = -paddle.speed;
    }

}

// Keyup event
function keyUp(e){
    if(e.key === 'Right'|| e.key === 'ArrowRight' ||
     e.key === 'Left'||
     e.key === 'ArrowLeft'){
        paddle.dx = 0;
    }
    
}

// Keyboard event
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp)



    
