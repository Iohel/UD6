$(document).ready(function () {
    
    //general variables
    let postit;
    let i;
    //drop events
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

    //creating post it event
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

        $(".postit.red").draggable({
            drag:function(){
                postit = this;
                let color = "red";
                $(this).data("color", color);
            }
        });

        $(".postit.yellow").draggable({
            drag:function(){
                postit = this;
                let color = "yellow";
                $(this).data("color", color);
            }
        });

        $(".postit.green").draggable({
            drag:function(){
                postit = this;
                let color = "green";
                $(this).data("color",color);
            }
        });
        
        $(".cross").off();
        $(".minus").off();
        $(".square").off();
        
        

        $(".cross").on("click", function(){
            postit = this;
            $( "#dialog-confirm" ).dialog({
                dialogClass: "no-close",
                draggable: true,
                resizable: false,
                height: 100,
                width: 100,
                modal: true,
                buttons: {
                "Delete item": function() {
                    if($(postit).offsetParent().data("dropped")){
                        console.log($(postit).offsetParent());
                        let color = $(postit).offsetParent().data("color");
                        console.log(color);
                        let i = +($(".column."+color).find("h1").html());
                        console.log(i);
                        i--
                        $(".column."+color).find("h1").html(i);
                        $(postit).offsetParent().remove();
                    }else{
                        $(postit).offsetParent().remove();
                    }
                    $( this ).dialog( "close" );
                },
                Cancel: function() {
                  $( this ).dialog( "close" );
                }
              }
            });
            
            
            
        })
        $(".minus").on("click", function(){
            let parent = $(this).offsetParent();
            $(parent).addClass("minimized");
            $(this).attr("hidden", true);
            $(this).siblings(".square").attr("hidden", false);
            setTimeout(()=>{
                $(parent.children("textarea")).attr("hidden","");
            },950)
            
            
        })
        $(".square").on("click", function(){
            let parent = $(this).offsetParent();
            $(parent).removeClass("minimized");
            $(this).attr("hidden", true);
            $(this).siblings(".minus").attr("hidden", false);
            
            $(parent.children("textarea")).attr("hidden",false);
            
        })
    });
    

});