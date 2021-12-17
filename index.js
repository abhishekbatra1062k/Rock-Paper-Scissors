function computerPlay(){
    const chooseOne = ['Rock','Paper','Scissors'];
    const random = Math.floor(Math.random() * chooseOne.length);
    return chooseOne[random].toUpperCase();
}

function playRound(playerChoice,computerChoice){
    if(!(playerChoice==='PAPER' || playerChoice==='ROCK' || playerChoice==='SCISSORS')){
        return {Winner: 'None', Output: "Invalid Input, Choose From 'Rock' , 'Paper' or 'Scissors' !"};        
    }
    let youWon='Computer';
    let reason=computerChoice + ' beats ' + playerChoice;
    if((playerChoice==='PAPER' && computerChoice==='ROCK') || (playerChoice==='SCISSORS' && computerChoice==='PAPER') || (playerChoice==='ROCK' && computerChoice==='SCISSORS')){
        youWon='Player';
        reason=playerChoice + ' beats ' + computerChoice;
    }else if(playerChoice===computerChoice){
        return {Winner: 'None', Output:'Tied, You Both Chose Same, LOL!'};
    }
    return {Winner: youWon, Output: 'You ' + (youWon=='Player'?'Won':'Lose') + ', ' + reason + '.'};
}

let yourScore=0;
let computerScore=0;
let highestScore=5;

const playBtn=document.getElementById('play');
const playDiv=document.querySelector('.play');
playDiv.style.cssText="display: none;";
playDiv.style.cssText="";

var resetBtn=document.getElementById('reset');
resetBtn.style.cssText="display: none;";

var score=document.createElement('h2');
var msg=document.createElement('h2');
const choices=document.querySelectorAll('.choice-btn');
choices.forEach(choice=>{
    choice.style.cssText="display: none;";
});
const output=document.querySelector('.output');


function reset(){
    score.remove();
    yourScore=0;
    computerScore=0;
}

playBtn.addEventListener('click',()=>{
    highestScore=Math.max(5,document.querySelector('#points').value);
    choices.forEach(choice=>{
        choice.style.cssText="";
    });
    playDiv.style.cssText="display: none;";
});

resetBtn.addEventListener('click',()=>{
    msg.remove();
    reset();
    playDiv.style.cssText="";   
    choices.forEach(choice=>{
        choice.style.cssText="display: none;";
    });
    resetBtn.style.cssText="display: none;";
});

choices.forEach(btn => {
    btn.addEventListener('click',()=>{
        resetBtn.style.cssText="display: none;";
        msg.remove();
        var playerChoice=btn.id.toUpperCase();
        var computerChoice=computerPlay();
        var res=playRound(playerChoice,computerChoice);
        msg.textContent=res.Output;
        output.prepend(msg);
        if(res.Winner=='Player'){
            score.style.cssText="color: green;";
            msg.style.cssText="color: green;";
            yourScore++;
        }else if(res.Winner=='Computer'){
            score.style.cssText="color: red;";
            msg.style.cssText="color: red;";
            computerScore++;
        }else{
            score.style.cssText="color: grey;";
            msg.style.cssText="color: grey;";
        }
        score.innerHTML='Your Score: ' + yourScore + '<br>' + 'Computer\'s Score: '+ computerScore;
        output.prepend(score);
        if(computerScore==highestScore){
            msg.remove();
            msg.textContent='Computer Won! Better Luck Next Time.';
            resetBtn.style.cssText="";
            output.prepend(msg);
            reset();
        }
        if(yourScore==highestScore){
            msg.remove();
            msg.textContent='You Won! You\'re a CHAMP!';
            output.prepend(msg);
            resetBtn.style.cssText="";
            reset();
        }
    });
});