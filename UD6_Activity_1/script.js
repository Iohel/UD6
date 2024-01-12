$(document).ready(function () {
    console.log("loaded");    
    $("#button").on("click", function () {
        let input1 = $("#sumar1").val();
        let input2 = $("#sumar2").val();
        if(isNaN(+input1) || isNaN(+input2)){
            $("#result").text("One of the inputs in not a number.");
        }else{
            let sum = (+input1)+(+input2);
            console.log(sum);
            $("#result").text(sum);
        }
    });
});
