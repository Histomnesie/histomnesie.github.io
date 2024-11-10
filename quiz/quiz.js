import {Question} from './question.js';

const quizId = new URLSearchParams(document.location.search).get('id');

$(document).ready(() => {
    $.when(
        $.getJSON('/quiz/data/quizzes.json'),
        $.getJSON(`/quiz/data/${quizId}.json`),
    )
    .done(initQuiz)
    .fail(e => {
        alert(`${e.status}\nCe quiz n'existe pas (＞﹏＜)`);
        document.location.href = '/';
    })
});

let $form, $prompt, $responseArea;
let quiz, question;

function initQuiz(quizzesList_, quiz_) {
    quiz = quiz_[0];
    quiz.questions = quiz.questions.map(q => new Question(q));

    main();
}

async function waitForEvent($element, eventType) {
    return new Promise(resolve => {
        $element.one(eventType, e => {
            e.preventDefault();
            resolve();
        });
    });
}

async function main() {
    $form = $('.quiz-form');
    $prompt = $('.quiz-form .prompt');
    $responseArea = $('.quiz-form .response-area');

    for (let currentQuestion = 0; currentQuestion < quiz.questions.length; currentQuestion++) {
        question = quiz.questions[currentQuestion];

        if (question.type.startsWith('//')) continue;
        
        $responseArea.empty();
        let prompt = question.pattern.build(question, $responseArea);
        $prompt.text(prompt);
        $responseArea.find('input, select').first().focus();

        await waitForEvent($form, 'submit');

        if (question.pattern.check(question, $form[0])) {}
        else {
            question.pattern.correct(question);
        }
    }

    alert('end');
    document.location.href = '/';
}