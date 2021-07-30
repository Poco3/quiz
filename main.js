"use strict";
  const webAPI = "https://opentdb.com/api.php?amount=10";

class Quiz {
  constructor(resJson) {
    this.resJson = resJson.results;
  }

  category(index) {
    return this.resJson[index - 1].category;
  }

  difficulty(index) {
    return this.resJson[index - 1].difficulty;
  }

  allquestion(index) {
    return this.resJson[index - 1].question;
  }

  incorrect_answers(index) {
    return this.resJson[index - 1].incorrect_answers;
  }

  correct_answer(index) {
    return this.resJson[index - 1].correct_answer;
  }
}

const div = document.getElementById("div");
const button = document.getElementById("start-button");
const title = document.getElementById("title");
const click = document.getElementById("click");
const questioncategory = document.getElementById("category");
const questiondifficulty = document.getElementById("difficulty");
const start_button = document.getElementById("start-button");
const answer = document.getElementById("answer");

let num = 0;
let num_1 = 0;

button.addEventListener("click", () => {
  resJson(1);
});

async function resJson(index) {
  try {
     title.textContent = "取得中";
     click.textContent = "少々お待ちください";
    const response = await fetch(webAPI);
    const resJson = await response.json();
    const quizconstructor = new Quiz(resJson);
    quizefunction(quizconstructor, index);
  } catch (error) {
    console.error('error');
  }
}
const quizefunction = (quizconstructor, index) => {
  title.innerHTML = `問題${index}`;
  questioncategory.innerHTML = `[ジャンル]${quizconstructor.category(index)}`;
  questiondifficulty.innerHTML = `[難易度]${quizconstructor.difficulty(index)}`;
  click.innerHTML = `${quizconstructor.allquestion(index)}`;

  const incorrect_answers = quizconstructor.incorrect_answers(index);
  const correct_answer = quizconstructor.correct_answer(index);
  incorrect_answers.push(quizconstructor.correct_answer(index));
  

  const shuffle = ([...array]) => {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const random_answer = shuffle(incorrect_answers);

  random_answer.forEach((incorrect_answers) => {
    const ul = document.createElement("ul");
    answer.appendChild(ul);
    const answerbutton = document.createElement("button");
    answerbutton.innerHTML = incorrect_answers;
    answer.appendChild(answerbutton);

    start_button.remove();

    answerbutton.addEventListener("click", () => {
      index++;
      if (answerbutton.innerHTML === correct_answer) {
        num_1++;
      }

      while (answer.firstChild) {
        answer.removeChild(answer.firstElementChild);
      }
      num++;
      
      if (num < 10) {
        quizefunction(quizconstructor, index);
      } else {
        title.textContent = `あなたの回答${num_1}です！！`;
        click.textContent = "再チャレンジしたい場合は下をクリック！！";
        questioncategory .remove();
        questiondifficulty.remove();
        const but = document.createElement("button");
        but.innerHTML = "ホームに戻る";
        answer.appendChild(but);
        but.addEventListener("click", () => {
          location.reload();
        });
      }
    });
  });
};
