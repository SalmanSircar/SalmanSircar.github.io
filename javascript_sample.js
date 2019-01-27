var playing = false;
var score;
var action;
var timeremaining;
var correct_ans;

//if we click on the start/reset button
document.getElementById("startreset").onclick = function(){
//if we are playing?
    if(playing == true) 
    {
        location.reload(); //reload page           
    }else{//if we are not playing 
        //Transition into playing mode
        playing = true;
        
        //set score to 0
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;
        
        //show countdown box
        timeremaining = 60;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        show("timeremaining");
        
        //hide gameover
        hide("gameover");
        
        //start countdown
        startCountdown();
        
        //change the button text to reset game
        document.getElementById("startreset").innerHTML = "Reset game";
        
        //generate qa
        generate_qa();
    }
}


for(i=1; i<5; i++){
    //Clicking on answer box
    document.getElementById("box" + i).onclick = function(){
        //check if we are playing
        if(playing == true){//yes
            if(this.innerHTML == correct_ans){
                //corect answer

                //increase score by 1
                score++;
                document.getElementById("scorevalue").innerHTML = score;

                //hide wrong box and show correct box
                hide("wrong");
                show("correct");
                setTimeout(function(){
                    hide("correct");
                },1000);

                //generate new Q
                generate_qa();

            }else{
                //wrong answer
                //hide wrong box and show correct box
                hide("correct");
                show("wrong");
                setTimeout(function(){
                    hide("wrong");
                },1000);          
            }

        }
    }
}




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

function startCountdown(){
    action = setInterval(function(){
        timeremaining -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        if(timeremaining == 0){//game over
            stopCountdown();
            show("gameover");
            document.getElementById("gameover").innerHTML = "<p>Game Over!<p><p>Your score is " + score + ".";     
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game";
        }
    },1000);
}

function stopCountdown(){
    clearInterval(action);
}

function hide(Id){
    document.getElementById(Id).style.display = "none";
}
function show(Id){
    document.getElementById(Id).style.display = "block";
}

//generate multiple questions and answers
function generate_qa(){
    var ans_index = Math.round(Math.random()*3+1);
    var rand_x = Math.round(Math.random()*(11-1)+1);
    var rand_y = Math.round(Math.random()*(11-1)+1);
    correct_ans = rand_x*rand_y;
    document.getElementById("question").innerHTML = rand_x + "x" + rand_y;
    
    document.getElementById("box" + ans_index).innerHTML = correct_ans; //fill one box with the correct answer
    
    //fill other boxes with wrong answer
    
    var answers = [correct_ans];
    
    for(i=1; i<5; i++){
        if(i != ans_index){
            var wrongAnswer;
            do{
                wrongAnswer =  Math.round(Math.random()*(11-1)+1) *  Math.round(Math.random()*(11-1)+1);
            }
            while(answers.indexOf(wrongAnswer) > -1) //Only continue if unique answer
            document.getElementById("box" + i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }

    }
}
