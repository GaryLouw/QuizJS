class Quiz{
    constructor(el, quiz){
        this.el = el;
        this.quiz = quiz;

        this.questionIndex = 0;
        this.correctAnswers = 0;
        this.initQuiz();
    }

    initQuiz(){
        this.el.innerHTML = `
            <div class="first-page">
                <h1>${this.quiz.quizName}</h1>
                <button>Start Quiz</button>
            </div>
            `;

        const startButton = this.el.querySelector('button');
        startButton.addEventListener('click', e =>{
            this.renderQuestion(this.questionIndex);
        });
    }

    renderAnswer(ans, question){
        return `
        <label data-correct="${ans.correct ? '1' : '0'}">
            <input type="radio" name="question_${question.id}"> ${ans.answer}
        </label>
        `;
    }

    renderQuestion(index){
        const question = this.quiz.questions[index];
        quizEl.innerHTML = `
        <h2>${question.title}</h2>
        <div class="answers">
            ${question.answers.map(ans => this.renderAnswer(ans, question)).join("")}
        </div>
        <br>
        <button>Next</button>
    `;
        const nextButton = this.el.querySelector('button');
        nextButton.onclick = e => {
            const checked = this.el.querySelector('.answers input:checked');
            //console.log(checked);
            if(!checked){
                return;
            }

            const label = checked.parentNode;
            const correct = label.dataset.correct === '1';
            console.log(correct);
            if(correct){
                this.correctAnswers++;
            }
            this.questionIndex++;
            //console.log(correctAnswers);
            if(this.questionIndex >= this.quiz.questions.length){
                console.log("Display result");
                this.renderResult();
                return;
            }
            this.renderQuestion(this.questionIndex);
        }
    }

    renderResult(){
        quizEl.innerHTML = `
            <div class="final=page">
                <h2>${this.quiz.quizName}</h2>
                <p>Your score is <b>${this.correctAnswers}</b> out of <b> ${this.quiz.questions.length}</b>.</p>

                <button>Restart Quiz</button>
            </div>
        `;

        const button = this.el.querySelector('button');
        button.onclick = e => {
            this.questionIndex = 0;
            this.correctAnswers = 0;
            this.renderQuestion(this.questionIndex);
        }
    }
}

const quizEl = document.getElementById('quiz');

fetch('quiz.json')
.then(response => response.json())
.then(quiz => new Quiz(quizEl, quiz));
