$(document).ready(function () {

    var gameStart = false;

    var correctCount = 0;
    var wrongCount = 0;
    var skippedCount = 0;
    var triviaCount = correctCount + wrongCount + skippedCount;
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
        },{
            question: 'Which US state is the only one that grows coffee beans?',
            returnQ: ' is the only US state where coffee beans are grown.',
            options: ['Hawaii', 'Florida', 'Nevada', 'California'],
            answer: 0
        },{
            question: 'What is the state fruit of New York?',
            returnQ: ' is the state fruit of New York.',
            options: ['Watermelon', 'Kiwi', 'Apple', 'Banana'],
            answer: 2
        },{
            question: 'How many flowers are in the design stamped on each side of an Oreo cookie?',
            returnQ: ' flowers, each with four petals, are stamped on each Oreo cookie.',
            options: ['4', '15', '8', '12'],
            answer: 3
        },{
            question: 'What is the most widely eaten fish in the world?',
            returnQ: ' is the most widely eaten fish in the world',
            options: ['Herring', 'Salmon', 'Tuna', 'Black cod'],
            answer: 0
        },{
            question: 'What nation produces two thirds of the world\'s vanilla?',
            returnQ: ' produces two thirds of the world\'s vanilla',
            options: ['Mexico', 'Guatamala', 'Madagascar', 'Tahiti'],
            answer: 2
        },{
            question: 'What falling fruit supposedly inspired Isaac Newton to write the laws of gravity?',
            returnQ: ' inspired Newton to write the laws of gravity',
            options: ['A watermelon', 'A pear', 'A dragon fruit', 'An apple'],
            answer: 3
        },{
            question: 'How many sizes of chicken eggs does the USDA recognize?',
            returnQ: ' <br>Jumbo<br>Extra-large<br>Large<br>Medium<br>Small<br>Peewee',
            options: ['Eight', 'Six', 'Five', 'Four'],
            answer: 1
        },{
            question: 'How many taste buds do we have?',
            returnQ: ' - sweet, sour, salty, bitter, umami.',
            options: ['Three', 'Four', 'Five', 'Six'],
            answer: 2
        },{
            question: 'Which ripe fruit bounces like rubber balls?',
            returnQ: ' , when ripe, will bounce like rubber balls.',
            options: ['Cherries', 'Cranberries', 'Watermelon', 'Jackfruit'],
            answer: 1
        },{
            question: 'What phobia is known as the fear of cooking?',
            returnQ: ' is the fear of cooking.',
            options: ['Mageirocophobia', 'Cibophobia', 'Xocolatophobia', 'Consecotaleophobia'],
            answer: 0
        },{
            question: 'What is the name of the tall chef\'s hat?',
            returnQ: ' is a tall chef\'s hat.',
            options: ['Toque', 'Top hat', 'Gatsby', 'Beret'],
            answer: 0
        },{
            question: 'What food item means \'large pearl\' in Latin?',
            returnQ: ' is Latin for \'large pearl\'.',
            options: ['Mochi', 'Egg', 'Mozzerella', 'Onion'],
            answer: 3
        },{
            question: 'What can be used (in emergencies) as a substitute for blood plasma?',
            returnQ: ' can be used (in emergencies) as a substitute for blood plasma.',
            options: ['Olive oil', 'Salt water', 'Coconut water', 'Chicken broth'],
            answer: 2
        },{
            question: 'What is a food that will never rot?',
            returnQ: ' is a food that will never rot.',
            options: ['Chocolate', 'Honey', 'Coconut', 'Kimchi'],
            answer: 1
        },{
            question: 'What can be used to make dynamite?',
            returnQ: ' can be used to make dynamite.',
            options: ['Peanuts', 'Pickles', 'Corn', 'Coconuts'],
            answer: 0
        },{
            question: 'What can you do whilst chopping an onion will stop your eyes from watering?',
            returnQ: ' whilst chopping an onion will stop your eyes from watering.',
            options: ['Biting a wooden spoon ', 'Yawning', 'Standing on one leg', 'Blinking really fast'],
            answer: 0
        },{
            question: 'What fast food restaurant boasts that you can "Have it your way"?',
            returnQ: ', have it your way.',
            options: ['Subway', 'Papa John\'s', 'Arby\'s', 'Burger King'],
            answer: 3
        }
        // ,{
        //     question: '?',
        //     returnQ: ' ',
        //     options: ['', '', '', ''],
        //     answer: 2
        // }
    ]


    $('#start-btn').on('click', function () {
        $(this).addClass('d-none');
        questionSet();
        runTimer();
        decrement();
        evalInput();
    });

    $('#answer-modal').on('hidden.bs.modal', function () {
        $('#options-wrapper').empty();
        $('#correct-answer')
            .removeClass('text-info')
            .removeClass('text-danger');
        $('#modal-status')
            .removeClass('text-info')
            .removeClass('text-danger');
        timer = 21;

        questionSet();
        runTimer();
        decrement();
        evalInput();
        console.log(triviaCount);
    });

    // 10 question trivia 
    if ( triviaCount === 10 ) {
        // show score
        console.log('10 Questions');
        // allow reset
    }


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

        // Once number hits zero, show modal with correct answer
        if (timer === 0) {
            $('#timer-display')
                .css('color', '#aaa')
                .html("Time's up!");
            $('#modal-status')
                .addClass('text-danger')
                .html('Incorrect!');
            $('#correct-answer')
                .addClass('text-danger');
            $('#answer-modal').modal('show');
            stop();
            skippedCount++;
        }
    }


    // Create question & answers
    function questionSet() {
        var random = Math.floor(Math.random() * trivia.length);
        var randomSet = trivia[random];
        correctOption = randomSet.answer;

        // generate question
        $('#question').html(randomSet.question);

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
            userInput = $(this).attr('id');

            // modal popup to display status - correct || incorrect
            $('#answer-modal').modal('show');
            if (userInput == correctOption) {
                stop();
                correctCount++;
                $('#modal-status')
                    .addClass('text-info')
                    .html('Correct!');
                $('#correct-answer')
                    .addClass('text-info');
            } else {
                stop();
                wrongCount++;
                $('#modal-status')
                    .addClass('text-danger')
                    .html('Incorrect!');
                $('#correct-answer')
                    .addClass('text-danger');
            }
        });
    }



});