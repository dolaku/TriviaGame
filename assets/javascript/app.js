$(document).ready(function () {

    var gameStart = false;

    var triviaCount = 0;
    var correctCount = 0;
    var wrongCount = 0;
    var unanswered = 0;
    var correctOption;
    var userInput;

    var timerRunning = false;
    var timer = 21;
    var intervalId;

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


    $('#start-btn').on('click', function () {
        $(this).addClass('d-none');
        questionSet();
        runTimer();
        decrement();
        evalInput();
    });

    $('#answer-modal').on('hidden.bs.modal', function (e) {
        $('#options-wrapper').empty();
        questionSet();
        runTimer();
        decrement();
        evalInput();
    });


    // Timer started
    function runTimer() {
        $('#timer-display').html(timer + ' seconds left');
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
        timerRunning = true;
    }

    // Timer stopped
    function stop() {
        timerRunning = false;
        clearInterval(intervalId);
    }

    // Timer counting down
    function decrement() {
        timer--;
        $('#timer-display')
            .css('color', '#777')
            .html(timer + ' seconds left');

        // Once number hits zero
        if (timer === 0) {
            $('#timer-display')
                .css('color', '#aaa')
                .html("Time's up!");
            $('#answer-modal').modal('show');
            stop();
            unanswered++;
        }
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
    function evalInput() {
        $('.options').on('click', function () {
            
            console.log(this);
            console.log($(this).attr('id'));
            userInput = $(this).attr('id');
            
            // modal popup to display status - correct || incorrect
            $('#answer-modal').modal('show');
            if (userInput == correctOption) {
                stop();
                correctCount++;
                $('#modal-status').html('Correct!');
                $('#correct-answer').addClass('text-info');
            } else {
                stop();
                wrongCount++;
                $('#modal-status').html('Incorrect!');
                $('#correct-answer').addClass('text-danger');
            }
        });
    }



});