'use strict';
const webAPI ='https://opentdb.com/api.php?amount=10';

class  Quiz {
    constructor(resJson){
        this.resJson = resJson.results
        // console.log(this.resJson)
    }

    quizcategory(){
      return  this.resJson[1].category;
      }
    
     quizdifficulty(){
         return this.resJson[1].difficulty;
     } 

     quizeallquestion(){
         return this.resJson[1].question;
     }

     quizeincorrect_answers(){
        return this.resJson[1].incorrect_answers
     }
}


const div = document.getElementById("div")
const button = document.getElementById('start-button');
const title = document.getElementById('title')
const click = document.getElementById('click');
const question = document.getElementById('question');
const question_2 = document.getElementById('question_2');
const start_button = document.getElementById("start-button")
const answer1 = document.getElementById("answer1");
const num = 0;


button.addEventListener('click', () => {
    resJson(1);
    
});

 async function resJson(index){
   
     title.textContent = '取得中';
     click.textContent = '少々お待ちください';

    const response = await fetch(webAPI);
    const resJson = await response.json();
    console.log(resJson)
    const quizconstructor = new Quiz(resJson);
    quizefunction(quizconstructor,index);
}



const quizefunction = (quizconstructor,index) =>{
  
     title.innerHTML = `問題${index}`;
    
    question.innerHTML = `[ジャンル]${quizconstructor.quizcategory()}`
    question_2.innerHTML =`[難易度]${quizconstructor.quizdifficulty()}`
    click.innerHTML = `[クイズ]${quizconstructor.quizeallquestion()}`
    
    const answerbutton = document.createElement('button');
    const answer = quizconstructor.quizeincorrect_answers()
    answerbutton.innerHTML = answer;
    answer1.appendChild(answerbutton)
    start_button.remove();
    answerbutton.addEventListener('click',() =>{
     answer1.removeChild(answer1.firstChild);
      quizefunction(quizconstructor,index);
       console.log(quizefunction(quizconstructor,index))
    })

  }