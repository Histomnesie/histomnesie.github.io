import {questionPatterns} from './question_patterns.js';

const quizId = new URLSearchParams(document.location.search).get('id');

$(document).ready(() => {
    $.when(
        $.getJSON('/quizzes/quizzes.json'),
        $.getJSON(`/quizzes/${quizId}.json`),
    ).done((quizzeslist_, quiz_, layouts_) => {
        quiz = quiz_[0];
        initQuiz();
    }).fail(() => {
        alert("Ce quiz n'existe pas (＞﹏＜)");
        document.location.href = '/';
    })
});

let $prompt, $responseArea;
let quiz, question, thisPattern;

let currentQuestion = 0;

function initQuiz() {
    $prompt = $('.quiz-form .prompt')
    $responseArea = $('.quiz-form .response-area')

    $('.quiz-form').on('submit', handleFormSubmission);

    chooseQuestion();
}

function chooseQuestion() {
    if (currentQuestion >= quiz.questions.length) {
        alert('End');
        document.location.href = '/';
    }

    displayQuestion(currentQuestion++);
}

function displayQuestion(index) {
    question = quiz.questions[index];
    thisPattern = questionPatterns[question.type];
    question.answer = thisPattern.unpack(question.answer);

    $prompt.text(question.prompt);
    $responseArea.empty();

    let isFirstInput = true;
    forLayout(
        text => {
            $responseArea.append(text);
        },
        (name, attrs) => {
            let $input = $('<input>', attrs);
            $input.attr('name', name);
            $input.attr('required', true);
            $responseArea.append($input);
            if (isFirstInput) {
                $input.focus();
                isFirstInput = false;
            }
        }
    )
}

function forLayout(onText, onField) {
    thisPattern.layout.split(/({[^}]+})/g).forEach(item => {
        if (item != '') {
            if (item.startsWith('{') && item.endsWith('}')) {
                let name = item.slice(1, -1)
                onField(name, thisPattern.fields[name]);
            } else {
                onText(item);
            }
        }
    });
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    let form = $(this)[0];

    let correct = thisPattern.checkAnswer(form, question.answer);
    // for (const key in question.answer) {
    //     console.log(form[key].value,  question.answer[key]);
    //     if (form[key].value != question.answer[key]) {
    //         correct = false;
    //         break;
    //     }
    // }

    if (!correct) {
        showCorrection(form);
    }

    chooseQuestion();
}

function showCorrection(form) {
    let submission = [];
    forLayout(
        text => {
            submission.push(text);
        },
        (name, attrs) => {
            submission.push(form[name].value);
        }
    );

    let correction = [];
    forLayout(
        text => {
            correction.push(text);
        },
        (name, attrs) => {
            correction.push(question.answer[name]);
        }
    );

    alert(`~${submission.join('')}~\n${correction.join('')}`);
}