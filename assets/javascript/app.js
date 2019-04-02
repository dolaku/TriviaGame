$(document).ready(function () {

    var correctCount = 0;
    var wrongCount = 0;
    var skippedCount = 0;
    var triviaCount = 0;
    var correctOption;
    var userInput;

    var timer = 21;
    var intervalId;

    // Array of question objects
    var data = JSON.stringify([
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
            returnQ: ' is the state fruit of New York.',
            options: ['Watermelon', 'Kiwi', 'Apple', 'Banana'],
            answer: 2
        }, {
            question: 'How many flowers are in the design stamped on each side of an Oreo cookie?',
            returnQ: ' flowers, each with four petals, are stamped on each Oreo cookie.',
            options: ['4', '15', '8', '12'],
            answer: 3
        }, {
            question: 'What is the most widely eaten fish in the world?',
            returnQ: ' is the most widely eaten fish in the world',
            options: ['Herring', 'Salmon', 'Tuna', 'Black cod'],
            answer: 0
        }, {
            question: 'What nation produces two thirds of the world\'s vanilla?',
            returnQ: ' produces two thirds of the world\'s vanilla',
            options: ['Mexico', 'Guatamala', 'Madagascar', 'Tahiti'],
            answer: 2
        }, {
            question: 'What falling fruit supposedly inspired Isaac Newton to write the laws of gravity?',
            returnQ: ' inspired Newton to write the laws of gravity',
            options: ['A watermelon', 'A pear', 'A dragon fruit', 'An apple'],
            answer: 3
        }, {
            question: 'How many sizes of chicken eggs does the USDA recognize?',
            returnQ: ' <br>Jumbo<br>Extra-large<br>Large<br>Medium<br>Small<br>Peewee',
            options: ['Eight', 'Six', 'Five', 'Four'],
            answer: 1
        }, {
            question: 'How many taste buds do we have?',
            returnQ: '<br>Sweet<br>Sour<br>Salty<br>Bitter<br>Umami',
            options: ['Three', 'Four', 'Five', 'Six'],
            answer: 2
        }, {
            question: 'Which ripe fruit bounces like rubber balls?',
            returnQ: ' that are ripe will bounce like rubber balls.',
            options: ['Cherries', 'Cranberries', 'Watermelon', 'Jackfruit'],
            answer: 1
        }, {
            question: 'What phobia is known as the fear of cooking?',
            returnQ: ' is the fear of cooking.',
            options: ['Mageirocophobia', 'Cibophobia', 'Xocolatophobia', 'Consecotaleophobia'],
            answer: 0
        }, {
            question: 'What is the name of the tall chef\'s hat?',
            returnQ: ' is a tall chef\'s hat.',
            options: ['Toque', 'Top hat', 'Gatsby', 'Beret'],
            answer: 0
        }, {
            question: 'What food item means \'large pearl\' in Latin?',
            returnQ: ' is Latin for \'large pearl\'.',
            options: ['Mochi', 'Egg', 'Mozzerella', 'Onion'],
            answer: 3
        }, {
            question: 'What can be used (in emergencies) as a substitute for blood plasma?',
            returnQ: ' can be used (in emergencies) as a substitute for blood plasma.',
            options: ['Olive oil', 'Salt water', 'Coconut water', 'Chicken broth'],
            answer: 2
        }, {
            question: 'What is a food that will never rot?',
            returnQ: ' will never rot.',
            options: ['Chocolate', 'Honey', 'Coconut', 'Kimchi'],
            answer: 1
        }, {
            question: 'What can be used to make dynamite?',
            returnQ: ' can be used to make dynamite.',
            options: ['Peanuts', 'Pickles', 'Corn', 'Coconuts'],
            answer: 0
        }, {
            question: 'What can you do whilst chopping an onion to stop your eyes from watering?',
            returnQ: ' whilst chopping an onion will stop your eyes from watering.',
            options: ['Biting a wooden spoon ', 'Yawning', 'Standing on one leg', 'Blinking really fast'],
            answer: 0
        }, {
            question: 'What fast food restaurant boasts that you can "Have it your way"?',
            returnQ: ' - have it your way.',
            options: ['Subway', 'Papa John\'s', 'Arby\'s', 'Burger King'],
            answer: 3
        }
        // ,{
        //     question: '?',
        //     returnQ: ' ',
        //     options: ['', '', '', ''],
        //     answer: 2
        // }
    ]);

    // Clone of array question sets - to be manipulated
    var trivia = JSON.parse(data);


    $('.start-btn').on('click', function () {
        $(this).addClass('d-none');
        runGame();
    });

    // After closing a modal,
    $('#answer-modal').on('hidden.bs.modal', function () {
        timer = 21;
        $('#options-wrapper').empty();
        $('#correct-answer')
            .removeClass('text-info')
            .removeClass('text-danger');
        $('#modal-status')
            .removeClass('text-info')
            .removeClass('text-danger');

        runGame();
        triviaCount++;
        evalEnd();
    });

    // 10 question trivia
    function evalEnd() {
        if (triviaCount === 10) {
            stop();

            // show score
            $('#modal-status').html('Your Score:');
            $('#correct-answer').empty().addClass('d-none');
            $('#question-return').empty().addClass('d-none');;
            $('<div>')
                .appendTo('#status')
                .addClass('scores-wrapper')
                .html(`
                    <h3>Correct: <span class="text-info">${correctCount}</span></h3>
                    <h3>Incorrect: <span class="text-danger">${wrongCount}</span></h3>
                    <h3>Unanswered: <span class="text-danger">${skippedCount}</span></h3>
                `);


            // allow reset - create Play Again button
            $('<button>')
                .appendTo('.modal-body')
                .attr('type', 'button')
                .addClass('btn btn-info start-btn')
                .html('Play Again');
            $('.modal-footer').addClass('d-none');
            $('.close').addClass('d-none');
            $('#answer-modal').modal('show');

            // reset all counts and empty html
            $('.start-btn').on('click', function () {
                $(this).addClass('d-none');
                $('#answer-modal').modal('hide');
                $('#options-wrapper').empty();
                $('.modal-footer').removeClass('d-none');
                $('.close').removeClass('d-none');
                $('#correct-answer').removeClass('d-none');
                $('#question-return').removeClass('d-none');
                $('.scores-wrapper').remove();
                correctCount = 0;
                wrongCount = 0;
                skippedCount = 0;
                triviaCount = -1;

                runGame();
            });
        }
    }


    // Timer started
    function runTimer() {
        $('#timer-display').html(timer + ' seconds left');
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
    }

    // Timer stopped
    function stop() {
        clearInterval(intervalId);
    }

    // Timer counting down
    function decrement() {
        timer--;
        $('#timer-display')
            .css('color', '#bfe2ff')
            .html(timer + ' seconds left');

        // Once number hits zero, show modal with correct answer
        if (timer === 0) {
            $('#timer-display')
                .css('color', '#eee')
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

    function runGame() {
        questionSet();
        runTimer();
        decrement();
        evalInput();
    }

    // Create question & answers
    function questionSet() {
        // chooses a random index to generate question set
        var randomIndex = Math.floor(Math.random() * trivia.length);
        
        // pulls question from cloned-library to eliminate duplicate questions
        var removedArr = trivia.splice(randomIndex, 1);
        var randomSet = removedArr[0];
        
        // generate question
        $('#question').html(randomSet.question);
        
        
        
        // generate answer choices
        for (var i = 0; i < 4; i++) {
            var idName = i;
            $('<div>')
                .addClass('options')
                .attr('id', idName)
                .html(randomSet.options[i])
                .appendTo('#options-wrapper');
        }
        correctOption = randomSet.answer;

        // set up modal to display answer
        $('#correct-answer').html(randomSet.options[randomSet.answer]);
        $('#question-return').html(randomSet.returnQ);
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