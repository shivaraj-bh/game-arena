function ageInDays(){
    var birthyear = prompt("What year were you born?");
    var ageInDayss = (2020-birthyear)*365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are '+ageInDayss+' days');
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}
function reset(){
    document.getElementById('ageInDays').remove();
}

function generateCat(){
    var ts = new Date().getTime();
    var image = document.createElement('img');
    var div = document.getElementById('flex-cat-gen');
    image.src = "http://thecatapi.com/api/images/get?format=src&type=gif&size=small&timestamp="+ts;
    div.appendChild(image);
}

// Challenge 3

function rpsGame(humanChoice){
    humanChoice = humanChoice.id;
    humanChoice+='Div';
    var botChoice,result;
    botChoice = getChoice(generateRandom(3));
    result = decideWinner(humanChoice, botChoice);
    rpsResultDisplay(humanChoice,botChoice,result);
}
window.rpsData = {
    'rockDiv':document.getElementById('rockDiv'),
    'paperDiv':document.getElementById('paperDiv'),
    'scissorDiv':document.getElementById('scissorDiv')
}
function rpsResultDisplay(humanChoiceId, botChoiceId, result){
    for(const [key,value] of Object.entries(window.rpsData)){    
        $('#'+key).toggleClass('remove-div');
        $("#"+key)
        .on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
        function(e){
            // do something here
            $('#'+key).toggleClass('remove-div');
            value.parentNode.removeChild(value);
            $(this).off(e);
            if(key=='scissorDiv')
            finalRes(humanChoiceId,botChoiceId,result);
        });   
        
    }
}
function finalRes(humanChoiceId,botChoiceId,result){
    var cln = window.rpsData[humanChoiceId].cloneNode(true);
    cln.id = humanChoiceId+'-res';
    document.getElementById('rps-center').appendChild(cln);
    $('#'+cln.id).toggleClass('restore-div');
    $('#'+cln.id)
    .on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
    function(e){
        $(this).off(e);
        $(cln.id).toggleClass('restore-div');
    }); 
    var text = document.createElement('div');
    text.innerHTML = result;
    text.setAttribute('class','result-text');
    text.setAttribute('id','rps-res');
    document.getElementById('rps-center').appendChild(text);
    $('#'+text.id).toggleClass('restore-div');
    $('#'+text.id)
    .on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
    function(e){
        $(this).off(e);
        $(text.id).toggleClass('restore-div');
    }); 
    
    cln = window.rpsData[botChoiceId].cloneNode(true);
    cln.id = botChoiceId+'-res';
    document.getElementById('rps-center').appendChild(cln);
    $('#'+cln.id).toggleClass('restore-div');
    $('#'+cln.id)
    .on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
    function(e){
        $(this).off(e);
        $(cln.id).toggleClass('restore-div');
    }); 
    
    let child = [...document.getElementById('rps-center').childNodes];
    for(const c of child){
        if(c.hasChildNodes()){
            let grand_child = [...c.childNodes]
            for(const gc of grand_child){
                if(gc.nodeName=="IMG"){
                    gc.setAttribute('onclick','');
                    gc.style.cursor = 'initial';
                }
            }
        }
    }
    
}
function generateRandom(high){
    return Math.floor(Math.random()*high);
}
function getChoice(num){
    return ["rockDiv","paperDiv","scissorDiv"][num]
}
function decideWinner(humanChoice_id, botChoice_id){
    var res = [`It's a tie!`,`You lost!`,`You won!`]
    var rpsData = {
        'rockDiv': {
            'rockDiv':0,
            'paperDiv':1,
            'scissorDiv':2
        },
        'paperDiv': {
            'rockDiv':2,
            'paperDiv':0,
            'scissorDiv':1
        },
        'scissorDiv': {
            'rockDiv':1,
            'paperDiv':2,
            'scissorDiv':0
        }
    }
    return res[rpsData[humanChoice_id][botChoice_id]];
}
function resetRPS(){
    const parent = document.getElementById('rps-center');
    // parent.style.display='none';
    parent.innerHTML = '';
    for([key,value] of Object.entries(window.rpsData)){
        
        parent.appendChild(value);

    }
    // parent.style.display = 'flex';
    $('#rps-center').toggleClass('restore-div');
    $("#rps-center").on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
        function(e){
            // do something here
            $('#rps-center').toggleClass('restore-div');
            $(this).off(e);
        }
    );
}
let blackJackGame = {
    'you':{'scoreSpan':'#your-blackjack-result','div':'#your-box','score':0},
    'dealer':{'scoreSpan':'#dealer-blackjack-result','div':'#dealer-box','score':0},
    'cards':['2C','3C','4C','5C','6C','7C','8C','9C','10C','JC','KC','QC','AC'],
    'cardsMap':{'2C':2,'3C':3,'4C':4,'5C':5,'6C':6,'7C':7,'8C':8,'9C':9,'10C':10,'JC':10,'KC':10,'QC':10,'AC':[1,11]},
    'wins':0,
    'losses':0,
    'draws':0,
    'isStand':false,
    'turnsOver':false,

};
const YOU = blackJackGame['you'];
const DEALER = blackJackGame['dealer'];
const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const lossSound = new Audio('static/sounds/aww.mp3');
document.querySelector('#blackjack-hit').addEventListener('click',()=>{
    if(blackJackGame['isStand']===false){
        let card = randomCard();
        showCard(YOU,card);
        updateScore(card,YOU);
        showScore(YOU);
    }
});
document.querySelector('#blackjack-deal').addEventListener('click',()=>{
    blackJackDeal();
});
document.querySelector('#blackjack-stand').addEventListener('click',()=>{
    dealerLogic();
});

function showCard(player,card){
    if(player['score']<=21){
        let cardImage = document.createElement('img');
        cardImage.src = `static/images/${card}.png`;
        document.querySelector(player['div']).appendChild(cardImage);
        hitSound.play();
    }
}
function blackJackDeal(){
    if(blackJackGame['turnsOver']===true){
        blackJackGame['isStand'] = false;
        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
        for(var i=0;i<yourImages.length;i++){
            yourImages[i].remove();
        }
        for(var i=0;i<dealerImages.length;i++){
            dealerImages[i].remove();
        }
        YOU['score'] = 0;
        DEALER['score'] = 0
        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;
        document.querySelector('#your-blackjack-result').style.color='white';
        document.querySelector('#dealer-blackjack-result').style.color='white';
        document.querySelector('#blackjack-result').textContent = `Let's play`;
        document.querySelector('#blackjack-result').style.color = '#FB4264';
        blackJackGame['turnsOver'] = true;
    }

}
function randomCard(){
    let randomIndex = Math.floor(Math.random()*13);
    return blackJackGame['cards'][randomIndex];
}
function updateScore(card,activePlayer){
    if(card==='AC'){
        if(activePlayer['score']+blackJackGame['cardsMap'][card][1]<=21){
            activePlayer['score']+=blackJackGame['cardsMap'][card][1];
        }else{
            activePlayer['score']+=blackJackGame['cardsMap'][card][0];
        }
    }else{
        activePlayer['score']+=blackJackGame['cardsMap'][card];
    }
}
function showScore(activePlayer){
    if(activePlayer['score']>21){
        document.querySelector(activePlayer['scoreSpan']).textContent='BUST';
        document.querySelector(activePlayer['scoreSpan']).style.color='red';
    }else{
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}
function sleep(ms){
    return new Promise(resolve=>setTimeout(resolve,ms));
}
async function dealerLogic(){
    blackJackGame['isStand'] = true;
    while(DEALER['score']<16 && blackJackGame['isStand']===true){
        let card = randomCard();
        showCard(DEALER,card);
        updateScore(card,DEALER);
        showScore(DEALER);
        await sleep(1000);
    }
    blackJackGame['turnsOver'] = true; 
    showResult(computeWinner());
}
function computeWinner(){
    let winner;
    if(YOU['score']<=21){
        if(YOU['score']>DEALER['score']||(DEALER['score']>21)){
            blackJackGame['wins']++;
            winner = YOU;
        }else if(YOU['score']<DEALER['score']){
            blackJackGame['losses']++;
            winner = DEALER;
        }else if(YOU['score']===DEALER['score']){
            //Draw 
            blackJackGame['draws']++;
        }
    }else if(YOU['score']>21 && DEALER['score']<=21){
        winner = DEALER;
        blackJackGame['losses']++;
    }else if(YOU['score']>21&&DEALER['score']>21){
        //Draw
        blackJackGame['draws']++;
    }
    return winner;  
}
function showResult(winner){
    let message, messageColor;
    if(blackJackGame['turnsOver']===true){
        if(winner===YOU){
            document.querySelector('#wins').textContent = blackJackGame['wins'];
            message='You won!';
            messageColor = 'green';
            winSound.play();
        }else if(winner===DEALER){
            document.querySelector('#losses').textContent = blackJackGame['losses'];
            message = 'You lost!';
            messageColor = 'red';
            lossSound.play();
        }else{
            document.querySelector('#draws').textContent = blackJackGame['draws'];
            message='Draw!';
            messageColor = 'black';
        }
        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }
}