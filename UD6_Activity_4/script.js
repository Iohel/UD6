$(document).ready(function () {
    
    function clickEvents(){

        $("button i.cross").on("click", function(){
            
            console.log($(this).offsetParent());
        })
        $("button i.minus").on("click", function(){
            
            let parent = $(this).offsetParent();
            parent.addClass("minimized");
            $(parent.children("textarea")).attr("hidden", "");
            let posthead = parent.children("div.posthead");
            let buttons = posthead.children("button");
            let icon = buttons.children("i.minus");
            icon.toggleClass("fi-br-minus minus",false);
            icon.toggleClass("fi-br-square square",true);
            
            
        })
        $("button i.square").on("click", function(){
            
            console.log("test");
            let parent = $(this).offsetParent();
            parent.removeClass("minimized");
            $(parent.children("textarea")).attr("hidden", null);
            let posthead = parent.children("div.posthead");
            let buttons = posthead.children("button");
            let icon = buttons.children("i.square");
            icon.toggleClass("fi-br-square square",false);
            icon.toggleClass("fi-br-minus minus",true);
            
        })
    }
    let postit;
   // clickEvents();
    $(".column.red").droppable({
        accept: ".postit.red",
        drop: function(){
            if (!$(postit).data("dropped")) {
                $(postit).data("dropped", true);
                let i = $(this).find("h1").html();
                i++;
                $(this).find("h1").html(i);  
            }
        },
        out: function(){
            if($(postit).data("dropped")){
                $(postit).removeData("dropped");
                let i = +($(this).find("h1").html());
                i--;
                $(this).find("h1").html(i);
            }  
        }
    })
    $(".column.yellow").droppable({
        accept: ".postit.yellow",
        drop: function(){
            if (!$(postit).data("dropped")) {
                $(postit).data("dropped", true);
                let i = $(this).find("h1").html();
                i++;
                $(this).find("h1").html(i);  
                 
            }
        },
        out: function(){
            if($(postit).data("dropped")){
                $(postit).removeData("dropped");
                let i = +($(this).find("h1").html());
                i--;
                $(this).find("h1").html(i);
            }
            
        }
    })
    $(".column.green").droppable({
        accept: ".postit.green",
        drop: function(){
            if (!$(postit).data("dropped")) {
                $(postit).data("dropped", true);
                let i = $(this).find("h1").html();
                i++;
                $(this).find("h1").html(i);  
                 
            }
        },
        out: function(){
            $(postit).removeData("dropped");
            let i = +($(this).find("h1").html());
            i--;
            $(this).find("h1").html(i);
        }
    })
    $("#create").on("click", function () {
        let a = $("#title").val().toUpperCase();
        
        $("body").append(

            "<div class='postit yellow'>"+
            "<div class='posthead'>"+
                "<h6>"+a+"</h6>"+
                "<button><i class='fi fi-br-minus minus'></i></button>"+
                "<button><i class='fi fi-br-cross cross'></button>"+
            "</div>"+
            "<textarea name='a' id='' maxlength='175'></textarea>"+
            "</div>"
        );
        $(".postit").draggable({
            drag:function(){
                postit = this;
            }
        });
        
    });
    $(document).on("click", function(){
        console.log("click");
        $(".postit button").off();
        
        clickEvents();
    })
});