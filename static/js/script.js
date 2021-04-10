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
};
const YOU = blackJackGame['you'];
const DEALER = blackJackGame['dealer'];
const hitSound = new Audio('static/sounds/swish.m4a')
document.querySelector('#blackjack-hit').addEventListener('click',()=>{
    showCard(YOU);
});
function showCard(player){
    let cardImage = document.createElement('img');
    cardImage.src = 'static/images/QC.png';
    document.querySelector(player['div']).appendChild(cardImage);
    hitSound.play();
}
function blackJackDeal(){
    let yourImages = document.querySelector('#your-box').querySelectorAll('img')
}