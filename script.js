$(document).ready(function() {
    var firstPix = $("#first img");
    var secondPix = $("#second img");
    var thirdPix = $("#third img");
    var credit = parseInt(prompt("Insert Credit", 500));
    $("#num").html(credit);

    var pix = ["img/apple.png", "img/bar.png", "img/bell.png", "img/cherry.png", "img/grape.png", "img/heart.png", "img/lemon.png", "img/seven.png", "img/waterm.png"];

    var rand1;
    var rand2;
    var rand3;

    function generateRandom() {
        rand1 = Math.floor(Math.random() * pix.length);
        rand2 = Math.floor(Math.random() * pix.length);
        rand3 = Math.floor(Math.random() * pix.length);
        console.log(rand1 + " " + rand2 + " " + rand3);
        firstPix.attr("src", pix[rand1]);
        secondPix.attr("src", pix[rand2]);
        thirdPix.attr("src", pix[rand3]);
    };

    $("#spin").click(function() {       

        if(credit > 0){
            var interval = setInterval(generateRandom, 100);
            $("#rez").html("");

            var sound1 = {
                push: new Howl({
                    src: ["sounds/win.mp3"]
                })
            };
            
            var sound2 = {
                push: new Howl({
                    src: ["sounds/loose.mp3"]
                })
            };
            
            var sound3 = {
                push: new Howl({
                    src: ["sounds/jackpot.mp3"]
                })
            };
            
            var sound4 = {
                push: new Howl({
                    src: ["sounds/push.mp3"]
                })
            };

            sound4.push.play();

            setTimeout(function() {
                if(rand1 == rand2 && rand2 == rand3) {
                    console.log("JACKPOT!! YOU WON 1500!!");
                    $("#rez").html("JACKPOT!! YOU WON 1500 &euro;!!");
                    credit += 1500;
                    sound3.push.play();
                    $("#num").html(credit);
                } else if ((rand1 == rand2 && rand2 != rand3) || 
                (rand2 == rand3 && rand1 != rand3) ||
                (rand1 == rand3 && rand1 != rand2)) {
                    console.log("YOU WON 200!");
                    $("#rez").html("YOU WON 200 &euro;!");
                    credit += 200;
                    sound1.push.play();
                    $("#num").html(credit);
                    $("#rez").css("color", "blue").css("font-weight", "bold");
                } else {
                    console.log("You Lost 100");
                    $("#rez").html("You Lost 100 &euro;");
                    credit -= 100;
                    sound2.push.play();
                    $("#num").html(credit);
                    $("#rez").css("color", "black").css("font-weight", "bold");
                };
                clearInterval(interval);
            }, 3500);
            
        } else {
            $("#rez").html("GAME OVER !");
            $("#spin").attr("disabled", "true");
            $("#rez").css("color", "red").css("font-size", "50px").css("font-weight", "bold");
        };

        $("#newGame").click(function() {
            location.reload();
        });

    });
});
