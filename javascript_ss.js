//if we click on the start/reset button
var playing = false;
var score, ans_index;
//document.getElementById("timeremaining").style.display = "block";//show countdown box

document.getElementById("startreset").onclick = function(){
    //if we are playing?
    if(playing == true) 
    {
        location.reload(); //reload page           
    }else{//if we are not playing 
        
        //set score to 0
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;
        
        //show countdown box
        show("timeremaining");
        
        //hide gameover
        hide("gameover");
        
        //reduce time by one sec
        var myCounter = setInterval(countdown, 1000);
        
        //change the button text to reset game
        document.getElementById("startreset").innerHTML = "Reset game";
        
        //generate qa
        ans_index = generate_qa();
    }
}


//document.getElementById("box1").onclick = function(){
//    if(ans_index = 0){//correct?
//        score +=score;
//    }
//    
//}

function hide(Id){
    document.getElementById(Id).style.display = "none";
}
function show(Id){
    document.getElementById(Id).style.display = "block";
}

function countdown(){
    var cur_val = Number(document.getElementById("timeremainingvalue").innerHTML);
    if(cur_val > 0){//time left?
        document.getElementById("timeremainingvalue").innerHTML = cur_val - 1;
    }else{ //no -> gameover and change button to start game
        //Gameover
        document.getElementById("gameover").innerHTML = "<p>Game Over!<p><p>Your score is " + score + ".";     
        show("gameover");
        
        //reset timer
        document.getElementById("timeremainingvalue").innerHTML = 60;
        clearInterval(myCounter);
        
        //reset view
        hide("timeremaining");
        hide("correct");
        hide("wrong");
        document.getElementById("startreset").innerHTML = "Start Game";
    }
}




function generate_qa(){
    var ans_index = Math.round(Math.random()*(3-0)+0);
    var rand_x, rand_y, qx, qy;
    var rand_ans = new Array(4);
    for(i=0;i<4;i++){
        rand_x = Math.round(Math.random()*(11-1)+1);
        rand_y = Math.round(Math.random()*(11-1)+1);
        rand_ans[i] = rand_x*rand_y;
        if(i==ans_index){
            qx = rand_x;
            qy = rand_y;            
        }
    }

    document.getElementById("box1").innerHTML = rand_ans[0];
    document.getElementById("box2").innerHTML = rand_ans[1];
    document.getElementById("box3").innerHTML = rand_ans[2];
    document.getElementById("box4").innerHTML = rand_ans[3];
    document.getElementById("question").innerHTML = qx + "x" + qy;
    
    return ans_index;
}


//show countdown box
//reduce time by one sec
//time left?
//yes -> continue
//no -> gameover and change button to start game
//change the button text to reset game
//generate new q n a

//if we click on the answer box (yes reload page)
    //are we playing?
        //correct?
            //yes
                //increase score by 1
                //show correct box for one sec
                //generate new qna
            //no
                //show try again for 1 sec

//if we click on the start/reset button