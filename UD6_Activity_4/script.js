$(document).ready(function () {
    
    /* 
        Pending:
        Es mostra dialog / modal amb opcions per confirmar o cancel·lar.

        S'ha emprat efecte en maximitzar i minimitzar un post-it.

        Comentaris, explicació codi, codi entenedor, codi no repetit, ús de funcions, etc.
    */
    let postit;
    let colors = ["red","yellow","green"];
    let i;
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

        let color;
        switch (i) {
            case 0:
                color = colors[i];  
                i++
                break;
            case 1:
                color = colors[i];
                i++
                break;
            case 2:
                color = colors[i];
                i++
                break;
            default:
                i = 0;
                color = colors[i];
                i++
                break;
        }

        let a = $("#title").val().toUpperCase();
        $("#title").val("");
        
        $("body").append(
            
            `<div class='postit ${color}'>`+
                "<div class='posthead'>"+
                    "<h6>"+a+"</h6>"+
                    "<button class = 'minus'><i class='fi fi-br-minus'></i></button>"+
                    "<button class = 'square' hidden><i class='fi fi-br-square'></i></button>"+
                    "<button class = 'cross'><i class='fi fi-br-cross'></i></button>"+
                "</div>"+
                "<textarea name='a' id='' maxlength='175'></textarea>"+
            "</div>"
        );
        $(".postit").draggable({
            drag:function(){
                postit = this;
            }
        });
        $(".cross").off();
        $(".minus").off();
        $(".square").off();
        

        $(".cross").on("click", function(){  
            
            if($(this).offsetParent().data("dropped")){
                console.log($(this).offsetParent());
                let i = +($(".column.").find("h1").html());
                console.log(i);
                i--;
                $(".column.yellow").find("h1").html(i);
                $(this).offsetParent().remove();
            }else{
                $(this).offsetParent().remove();
            }
        })
        $(".minus").on("click", function(){
            let parent = $(this).offsetParent();
            $(parent).addClass("minimized");
            $(parent.children("textarea")).attr("hidden","");
            $(this).attr("hidden", true)
            $(this).siblings(".square").attr("hidden", false)
            
        })
        $(".square").on("click", function(){
            let parent = $(this).offsetParent();
            $(parent).removeClass("minimized");
            $(parent.children("textarea")).attr("hidden",false);
            $(this).attr("hidden", true)
            $(this).siblings(".minus").attr("hidden", false)
            
        })
    });
    
});