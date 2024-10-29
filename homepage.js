$(document).ready(() => {

    quizzesList = $('.quizzes-list');
    $.getJSON('quizzes/quizzes.json', (quizzes) => {
        quizzes.forEach(quiz => {
            let link = $(`<li><a href="/quiz/?id=${quiz.id}">${quiz.name}</a></li>`);
            quizzesList.append(link);

        });
    })

})