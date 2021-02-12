$(document).ready(()=>{
    const words = ['stranger', 'flower', 'grapes', 'donuts', 'wheel', 'chicken', 'turkey', 'america', 'homeland', 'butterfly', 'television', 'codecore', 'programming', 'hacker', 'kitchen', 'dragon']
    const randomWord = ()=> words[Math.floor(Math.random()*words.length)].split('')
    const refreshImage = n=> $("#hang").attr("src",`./images/hangman-0${n}.png`);
    let winner = new Audio("audio/cheering.mp3"); 
    const loser = ()=> new Audio(`audio/death${Math.ceil(Math.random() * 6)}.wav`);
    const keySound = ()=> new Audio(`audio/vintage-keyboard-${Math.ceil(Math.random() * 5)}.wav`)
    let word = randomWord(); guessed = []; wrongGuess=0; results=[]
    results = word.map(i=>'__')
    $('.blank').append(`<span id="blank" class="px-2"><h1>${word.map(i=>'__').join(' ')}</h1></span>`)
    const restart = ()=>{
        refreshImage(0)
        results = word.map(i=>'__')
        $('.key').removeClass('highlight')
        $("#blank").replaceWith(`<span id="blank" class="px-2"><h1>${word.map(i=>'__').join(' ')}</h1></span>`);
    }
    function checkWord(){
        for (let i = 0; i < word.length; i++){
            for (let j = 0; j < guessed.length; j++){
                if (word[i] == guessed[j]) results[i] = word[i];
            }
        }
        $("#blank").replaceWith(`<span id="blank" class="px-2"><h1>${results.join(' ').toUpperCase()}</h1></span>`);
    }
    function mainCall(arg){
        keySound().play()
        if(!word.includes(arg.toLowerCase()) && wrongGuess<6) wrongGuess+=1
        if(word.includes(arg.toLowerCase())) guessed.push(arg.toLowerCase())
        checkWord()
        if(word.join('')==results.join('') && wrongGuess<6){ winner.play(); setTimeout(()=>{
            if(confirm("Congratulation, you win!") ){restart(); wrongGuess=0; word=randomWord(); guessed=[]; results=word.map(i=>'__')} }, 500);}
        $(`#${arg.toUpperCase()}`).addClass('highlight')
        refreshImage(wrongGuess)
        if(wrongGuess>5){ loser().play(); setTimeout(()=>{
            if(confirm("Better luck next time...")){restart(); wrongGuess=0; word=randomWord(); guessed=[]; results=word.map(i=>'__') } }, 500);}
    }
    $(".key").on("click", function(e){
        mainCall(this.innerText)
    })
    $(this).keypress(e=>{
        mainCall(e.key)
    })
})

            