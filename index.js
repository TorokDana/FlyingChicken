const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

const background = new Image();
background.src = 'hatter.png'
let bgInd = 0;

let birdie = {

    bodyCoordX:canvas.width/2,
    bodyCoordY:100,

    vx : 150, //100px/s
    flapping: 0,
    inGround : false,


}



function draw()
{
    context.clearRect(0, 0, canvas.width ,canvas.height)
    context.drawImage(background,
    bgInd, 0, 600, 400,   
    0, 0, canvas.width ,canvas.height)


    //fej és test
    context.fillStyle = '#FFDE00'
    context.beginPath();
    if(birdie.inGround)
    {
        context.arc(birdie.bodyCoordX, birdie.bodyCoordY, 32, 0, 2 * Math.PI); 
        context.fill();
    }else{
        context.beginPath();
        context.arc(birdie.bodyCoordX, birdie.bodyCoordY, 30, 0, 2 * Math.PI);
        context.fill();
    }
    
    context.arc(birdie.bodyCoordX+25, birdie.bodyCoordY-25, 15, 0, 2 * Math.PI);
    context.fill();

    //szárny
    if(birdie.flapping<=0){
    context.fillStyle = 'orange'
    context.beginPath();
    context.arc(birdie.bodyCoordX-15, birdie.bodyCoordY-14, 30, 0, Math.PI/2);
    context.fill(); 
    }
    else{
        context.fillStyle = 'orange'
        context.beginPath();
        context.arc(birdie.bodyCoordX-15, birdie.bodyCoordY-14, 30, Math.PI+Math.PI/6, Math.PI/6-Math.PI/6 );
        context.fill();
        
    }
   

    //szemek
    context.fillStyle = "black"
    context.beginPath();
    context.arc(birdie.bodyCoordX+21, birdie.bodyCoordY-30, 2, 0, 2 * Math.PI);
    context.fill();
    context.beginPath();
    context.arc(birdie.bodyCoordX+30, birdie.bodyCoordY-30, 2, 0, 2 * Math.PI);
    context.fill();
    
    //csőr
    context.beginPath();
    context.moveTo(birdie.bodyCoordX+20, birdie.bodyCoordY-25);
    context.lineTo(birdie.bodyCoordX+25, birdie.bodyCoordY-20);
    context.lineTo(birdie.bodyCoordX+30, birdie.bodyCoordY-25);
    context.strokeStyle = "red";
    context.stroke();

    
    if (birdie.inGround)
    {
    context.beginPath();
   // context.moveTo(birdie.bodyCoordX-5, birdie.bodyCoordY+19);
    context.rect(birdie.bodyCoordX-5, birdie.bodyCoordY+17, 15 , 3 );
    context.fillStyle = "red";
    context.fill();
    }
    else{
    context.beginPath();
    context.moveTo(birdie.bodyCoordX-5, birdie.bodyCoordY+30);
    context.lineTo(birdie.bodyCoordX-5, birdie.bodyCoordY+40);
    context.stroke();

    context.beginPath();
    context.moveTo(birdie.bodyCoordX+5, birdie.bodyCoordY+30);
    context.lineTo(birdie.bodyCoordX+5, birdie.bodyCoordY+40);
    context.stroke();

    }
    


    //föld
    context.beginPath();
    context.rect(0,canvas.height-20, canvas.width,canvas.height );
    context.fillStyle = "green";
    context.fill();

}



let lastTime = performance.now()

function gameLoop(now=performance.now())
{
    const dt = (now - lastTime)/1000;
    lastTime=now;
    update(dt)
    draw()
    window.requestAnimationFrame(gameLoop)
}

function update(dt)
{   
    if (birdie.bodyCoordY<canvas.height-40){
        birdie.bodyCoordY += birdie.vx * dt
    }
    else{
        birdie.inGround = true;
    }
    if(birdie.inGround === false)
    {
        if(bgInd<2200)
       {
           bgInd += 100*dt;
       } 
        else{
            bgInd=0;
        }
    }
    if(birdie.flapping>0)
        {
            birdie.flapping-=1;
        }
    
    
}



gameLoop();

document.addEventListener('click', onkeydown)

function onkeydown()
{
   // console.log(e.key)
    
    birdie.bodyCoordY -=50;
    birdie.inGround = false;
    birdie.flapping+=7;
}

document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        birdie.bodyCoordY -=50;
        birdie.inGround = false;
        birdie.flapping+=7;
    }
}