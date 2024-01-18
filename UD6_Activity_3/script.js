$(document).ready(function(){
    //function use
    $.fn.countCharacters = function(){
        
        //using this variable to access both paragraph and not print
        //every time it launches.
        let i = 0;
        
        //using a for each to access each text area present.
        $(this).toArray().forEach(e => {

            //get the amount of letters inside the textarea
            let size = $(e).val().length;

            //Checks if the p element has been created if not it updates
            //setting a check to say the element has been created
            //and creating the p element with the content.
            //if it exists we just update the element
            if ($(e).data("check") === 1) {
                $("#"+i).text(size+" characters");
            }else{
                $(e).data("check", 1);
                $(e).after("<p id="+i+">"+size+" characters"+"</p>");
            }
            i++;
        });
    }
    //once a key is press launch function
    $("textarea").on("keyup", function () {
        $("textarea").countCharacters();
    });

    $("textarea").countCharacters();
});