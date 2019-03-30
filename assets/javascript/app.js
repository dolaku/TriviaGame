$(document).ready(function () {

    var gameStart = false;

    var triviaCount = 0;
    var correctCount = 0;
    var wrongCount = 0;
    var correctOption;
    var userInput;

    var timerDisplay = $('#timer-display');
    var timer = 20;

    // Array of question objects 
    var trivia = [
        {
            question: 'Which state is the birthplace of cheeseburgers?',
            returnQ: ' is the birthplace of cheeseburgers.',
            options: ['California', 'Colorado', 'Texas', 'New York'],
            answer: 1
        }, {
            question: 'Which US state is the only one that grows coffee beans?',
            returnQ: ' is the only US state where coffee beans are grown.',
            options: ['Hawaii', 'Florida', 'Nevada', 'California'],
            answer: 0
        }, {
            question: 'What is the state fruit of New York?',
            returnQ: ' is the fruit state of New York',
            options: ['Watermelon', 'Kiwi', 'Apple', 'Banana'],
            answer: 2
        }
    ]

    if (!gameStart) {

        $('#start-btn').on('click', function() {
            $(this).addClass('d-none');
            questionSet();
            evalInput();
            startTimer();
        });
        
        gameStart = true;
    }

    // Timer
    function startTimer() {
        $('#timer-display').html(timer + ' seconds');
    }


    // Create question & answers
    function questionSet() {
        var setNum = 'set' + triviaCount;
        var random = Math.floor(Math.random() * trivia.length);
        var randomSet = trivia[random];
        correctOption = randomSet.answer;

        // generate question
        $('#question').html(randomSet.question);
        console.log(random);
        console.log(correctOption);

        // generate answers
        for (var i = 0; i < 4; i++) {
            var idName = i;
            $('<div>')
                .addClass('options')
                .attr('id', idName)
                .html(randomSet.options[i])
                .appendTo('#options-wrapper');
        }

        // set up modal to display answer
        $('#correct-answer').html(randomSet.options[randomSet.answer]);
        $('#question-return').html(randomSet.returnQ);

        triviaCount++;
    }

    // Evaluate clicked option
    function evalInput(){
        $('.options').on('click', function () {
            console.log(this);
            console.log($(this).attr('id'));
            userInput = $(this).attr('id');
            
            // modal popup to display status - correct || incorrect
            $('#answer-modal').modal('show');
            if (userInput == correctOption) {
                $('#modal-status').html('Correct!');
                $('#correct-answer').addClass('text-info');
            } else {
                $('#modal-status').html('Incorrect!');
                $('#correct-answer').addClass('text-danger');
            }    
        });
    }


});