$(document).ready(function () {
    //All body
    let pairs = Math.floor((Math.random()+1)*5);
    console.log(pairs);
    let array = [];
    for (let i = 1; i <= pairs; i++) {
        
        array.push(i);
        array.push(i);
        
    }
    array.sort(()=>{return 0.5 - Math.random();})
    let id = 0;
    $("body").append("<main></main>");
    array.forEach(element => {
        $("main").append("<div class='hidden' id="+id+">"+element+"</div>");
        id++;
    });
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

    let value1 = -1;
    let value2 = -1;
    let red = 0;
    let blue = 0;
    let turn = 0;
    $("div").on("click", function (e) {
        if(value1 != -1){
            value2 = e.target.innerText;
            if(value1 == value2){
                console.log("correcte");
                e.target.className = "cleared";
                $(".revealed").attr("class", "cleared");
                value1 = -1;
                value2 = -1;
                              
                if(turn % 2 == 0){
                    red++
                    $("#rojo").text(red)
                    
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
                        $("#mensaje").attr("class", "azul");
                        $("#mensaje").text("Correcto, Turno de Azul.");
                    }

                }else{
                    blue++
                    $("#azul").text(blue)
                    console.log(pairs);
                    console.log(red+blue);
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
                e.target.className = "revealed";
                console.log("wrong");
                setTimeout(()=>{
                    $(".revealed").removeAttr("class");
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
            value1 = e.target.innerText;
            e.target.className = "revealed";
            
        }
    });
});

