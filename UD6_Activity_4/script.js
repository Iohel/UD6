$(document).ready(function () {
    let postit = $(".postit").draggable();
    
    
    
    $(".column.red").droppable({
        accept: ".postit.red",
        drop: function(e){
            if (!postit.data("dropped")) {
                postit.data("dropped", true);
                let i = $(this).find("h1").html();
                i++;
                $(this).find("h1").html(i);  
                console.log(postit); 
            }else{
                console.log("x");
            }
        },
        out: function(){
            postit.removeData("dropped");
            let i = +($(this).find("h1").html());
            i--;
            $(this).find("h1").html(i);
            console.log(postit); 
        }
    })


});