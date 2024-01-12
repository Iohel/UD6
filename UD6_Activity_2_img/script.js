//Launches on load.
$(document).ready(function () {
    
    //Random number generation to determine amount of pairs.
    let pairs = Math.floor((Math.random()+1)*5);
    
    //Array to create the cards.
    let array = [];
    for (let i = 1; i <= pairs; i++) {
        
        array.push(i);
        array.push(i);
        
    }
    //This randomizes the order on how they are placed.
    array.sort(()=>{return 0.5 - Math.random();})
    
    //We create the container where we will house the game.
    $("body").append("<main></main>");

    //We create all the cards using append, element in this case is the id provided from the pairs above.
    array.forEach(element => {
        $("main").append("<div class='hidden'>"+"<img id='"+element+"'"+"src=./img/"+element+".png>"+"</div>");
        
    });
    
    //This creates the scorekeeper and message to the players.
    $("body").append("<section class = 'marcador'>"+
                        "<span class = 'rojo'>"+
                            "<p>Rojo: </p>"+
                            "<p id = 'rojo'>0</p>"+
                        "</span>"+
                        
                        "<span class = 'azul'>"+
                            "<p>Azul:</p>"+
                            "<p id = 'azul'>0</p>"+
                        "</span>"+
                     "</section>"+
                     "<section><p id='mensaje'>A</p></section>");
    
    //The following variables are used on the on the Click event below.
    let value1 = -1; //keeps track of the image value of the first flipped card.
    let value2 = -1; //keeps track of the image value of the second flipped card.
    let red = 0; //keeps track of the amount of pairs player red achieved.
    let blue = 0; //keeps track of the amount of pairs player blue achieved.
    let turn = 0; //keeps track of which player is taking the turn.

    /*
        The click event works on a 2 click system.
        First we get the first image value,
        on the second we get the value of the 2nd image
        and check if they are the same, in both cases after
        they do the yes or no parts of the code it resets,
        except for in case all pairs are discovered it moves to
        the end message.

    */
    $("div").on("click", function (e) {        
        if(value1 != -1){
            //2nd image clicked.
            value2 = e.target.id;

            //Check if image is the same.
            if(value1 == value2){
                //If same
                e.currentTarget.className = "cleared";
                e.target.className = "cleared";
                $("img.revealed").attr("class", "cleared");
                $("div.revealed").attr("class", "cleared");
                value1 = -1;
                value2 = -1;
                
                //We assign turns based if they are even or odd.
                if(turn % 2 == 0){
                    //red turn
                    //This updates the score.
                    red++
                    $("#rojo").text(red)
                    
                    //End Game check.
                    if(pairs === (red+blue)){
                        //Game finished.
                        if(red>blue){
                            $("#mensaje").text("Jugador Rojo ha Ganado")
                        }else if(blue>red){
                            $("#mensaje").attr("class", "azul");
                            $("#mensaje").text("Jugador Azul ha Ganado")
                        }else{
                            $("#mensaje").attr("class", "");
                            $("#mensaje").text("Empate")
                        }
                        
                        
                    }else{
                        //Game not finished.
                        turn++;
                        $("#mensaje").attr("class", "azul");
                        $("#mensaje").text("Correcto, Turno de Azul.");
                    }

                }else{
                    //blue turn
                    blue++
                    $("#azul").text(blue)
                    if(pairs === (red+blue)){
                        if(red>blue){
                            $("#mensaje").text("Jugador Rojo ha Ganado")
                        }else if(blue>red){
                            $("#mensaje").attr("class", "azul");
                            $("#mensaje").text("Jugador Azul ha Ganado")
                        }else{
                            $("#mensaje").attr("class", "");
                            $("#mensaje").text("Empate")
                        }
                    }else{
                        turn++;
                        $("#mensaje").attr("class", "rojo");
                        $("#mensaje").text("Correcto, Turno de Rojo.");
                    }
                }
            }else{
                //Not equal.
                e.currentTarget.className= "revealed";
                e.target.className = "revealed";
                
                setTimeout(()=>{
                    $("div.revealed").removeAttr("class");
                    $("img.revealed").removeAttr("class");
                },1000);
                
                value1 = -1;
                value2 = -1;

                if(turn % 2 == 0){
                    turn++;
                    $("#mensaje").attr("class", "azul");
                    $("#mensaje").text("Mal, Turno de Azul.");
                }else{
                    turn++;
                    $("#mensaje").attr("class", "rojo");
                    $("#mensaje").text("Mal, Turno de Rojo.");
                }
            }
        }else{
            //First image clicked.
            value1 = e.target.id;
            console.log(e.currentTarget);
            console.log(e.target);
            e.currentTarget.className= "revealed";
            e.target.className = "revealed";
            
        }
    });
});

