$(document).ready(function() {

    // var trivia = {
    //     question1: {
    //         choice1: 
    //     }
    // }


    // Evaluate clicked option
    $('.options').on('click', function() {
        console.log(this);
        console.log($(this).attr('id'));
        $('#answer-modal').modal('show');

    });
        
    // Create question & answers
    function questionSet() {

    }

    
});