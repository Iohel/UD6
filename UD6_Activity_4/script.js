$(document).ready(function () {
    
    //global variables
    let postit; //Stores the postit thats being dragged.
    let colors = ["red","yellow","green"]; //Values used later for the creation of postits.
    let i; //counter to keep track on which color start.
    //Drop Events
    /*
    
    The following drop events works the same, after one of the columns detect a postit with the accepted class,
    it checks if the postit was already inside the container in case its not it add the data drop to keep track of it
    and we increase the counter by searching on the h1 element which contains the number of the same.

    For the case of out is reversed removing the drop tag and minusing the number.

    */
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
        
        /*
            The following switch is used to determine the color of the post it that will generate, 
            it follows a sequence like a for loop, once it goes above 2,
             it will restart by putting the counter to 0 and generating a case 0. 
        */

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


        //obtain the title and reset the value.
        let a = $("#title").val().toUpperCase();
        $("#title").val("");
        
        //We generate the postit with the aformentioned color and title.
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
        
        //We desactivate every on click generated previously, to avoid for multiple of them to be called.
        $(".cross").off();
        $(".minus").off();
        $(".square").off();
        
        //Eliminating post it.
        /*
            When it clicks it generates a jquery ui modem dialog, if we can cancel it will just close the dialog,
            in case we do delete the item we check if the postit that is trying to delete is dropped in a column,
            if that is the case we get the color data that was being saved everytime the postit was dragged,
            we use the same operation as an out and then remove the postit itself and closes the dialog,
            in case is not in a column it just deletes and closes the dialog. 
        */
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
                        let color = $(postit).offsetParent().data("color");
                        let i = +($(".column."+color).find("h1").html());
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

        /*
            The following on clicks are for the minimization and opening of postit,
            the general idea for both is to take the postit add/remove the class minimized
            which includes the general aspect of the minimized postit, 
            Then we hide the button used and unhide the other one to look like the button swaps.
            Then while the animation of both are playing after a small delay we either reveal or hide the textarea,
            so it ends in theyr final forms.


        */

        $(".minus").on("click", function(){
            let parent = $(this).offsetParent();
            $(parent).addClass("minimized");
            $(this).attr("hidden", true);
            $(this).siblings(".square").attr("hidden", false);
            setTimeout(()=>{
                $(parent.children("textarea")).attr("hidden","");
            },750)  
        })

        $(".square").on("click", function(){
            let parent = $(this).offsetParent();
            $(parent).removeClass("minimized");
            $(this).attr("hidden", true);
            $(this).siblings(".minus").attr("hidden", false);
            setTimeout(()=>{
                $(parent.children("textarea")).attr("hidden",false);
            },100)
        })

        //The following checks if one of the the postits is being dragged and saves data to be used above.
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

    });
    
    

});