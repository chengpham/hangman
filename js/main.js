$(document).ready(()=>{
    const words = ['stranger', 'flower', 'grapes', 'donuts', 'wheel', 'chicken', 'turkey', 'america', 'homeland']
    const randomWord = ()=> words[Math.floor(Math.random()*words.length)].split('')
    const refreshImage = n=> $('#hang').replaceWith(`<img id="hang" src="./images/hangman-0${n}.png" />`)
    let winner = new Audio("audio/cheering.mp3"); loser = new Audio("audio/death1.wav");
    const keySound = () => new Audio(`audio/vintage-keyboard-${Math.ceil(Math.random() * 5)}.wav`)
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
    $(".key").on("click", function(e){
        keySound().play()
        if(!word.includes(this.innerText.toLowerCase()) && wrongGuess<6) wrongGuess+=1
        if(word.includes(this.innerText.toLowerCase())) guessed.push(this.innerText.toLowerCase())
        checkWord()
        if(word.join('')==results.join('') && wrongGuess<6){ winner.play(); setTimeout(()=>{
            if(confirm("Congratulation, you win!") ){restart(); wrongGuess=0; word=randomWord(); guessed=[]; results=word.map(i=>'__')} }, 500);}
        $(this).addClass("highlight");
        refreshImage(wrongGuess)
        if(wrongGuess>5){ loser.play(); setTimeout(()=>{
            if(confirm("Better luck next time...")){restart(); wrongGuess=0; word=randomWord(); guessed=[]; results=word.map(i=>'__') } }, 500);}
    })
    $(this).keypress(e=>{
        keySound().play()
        if(!word.includes(e.key.toLowerCase()) && wrongGuess<6) wrongGuess+=1
        if(word.includes(e.key.toLowerCase())) guessed.push(e.key.toLowerCase())
        checkWord()
        if(word.join('')==results.join('') && wrongGuess<6){ winner.play(); setTimeout(()=>{
            if(confirm("Congratulation, you win!") ){restart(); wrongGuess=0; word=randomWord(); guessed=[]; results=word.map(i=>'__')} }, 500);}
        $(`#${e.key.toUpperCase()}`).addClass('highlight')
        refreshImage(wrongGuess)
        if(wrongGuess>5){ loser.play(); setTimeout(()=>{
            if(confirm("Better luck next time...")){restart(); wrongGuess=0; word=randomWord(); guessed=[]; results=word.map(i=>'__') } }, 500);}
    })
})

            