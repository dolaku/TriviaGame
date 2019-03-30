$(document).ready(function () {

    var questionCount = 0;
    var correctCount = 0;
    var wrongCount = 0;
    var userInput = '';
    
    var timerDisplay = $('#timer-display');
    var timer = 20;

    // Array of question objects 
    var trivia = [
        {
            question: 'Which state is the birthplace of cheeseburgers?',
            options: ['California', 'Colorado', 'Texas', 'New York'],
            answer: 1
        }, {
            question: 'Which US state is the only one that grows coffee?',
            options: ['Hawaii', 'Florida', 'Nevada', 'California'],
            answer: 0
        }, {
            question: 'What is the state fruit of New York?',
            options1: ['Watermelon', '', 'Apple','Banana'],
            answer: 3
        }
    ]

    questionSet();

    // Evaluate clicked option
    $('.options').on('click', function () {
        console.log(this);
        console.log($(this).attr('id'));
        $('#answer-modal').modal('show');

    });

    // Create question & answers
    function questionSet() {
        var setNum = 'set' + questionCount;
        var random = Math.floor(Math.random() * trivia.length);
        var randomSet = trivia[random];

        // generate question
        $('#question').html(randomSet.question);

        // generate answers
        for (var i = 0; i < 4; i++) {
            var idName = 'choice' + i;
            $('<div>')
                .addClass('options')
                .attr('id', idName)
                .html(randomSet.options[i])
                .appendTo('#options-wrapper');
        }

        questionCount++;
    }


});