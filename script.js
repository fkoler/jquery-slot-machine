document.addEventListener("DOMContentLoaded", () => {
    const firstPix = document.querySelector("#first img");
    const secondPix = document.querySelector("#second img");
    const thirdPix = document.querySelector("#third img");
    let credit = parseInt(prompt("Insert Credit", 500));
    const numElement = document.querySelector("#num");
    const rezElement = document.querySelector("#rez");

    numElement.innerHTML = credit;

    const pix = [
        "img/apple.png", "img/bar.png", "img/bell.png", "img/cherry.png",
        "img/grape.png", "img/heart.png", "img/lemon.png", "img/seven.png", "img/waterm.png"
    ];

    let rand1;
    let rand2;
    let rand3;

    const generateRandom = () => {
        rand1 = Math.floor(Math.random() * pix.length);
        rand2 = Math.floor(Math.random() * pix.length);
        rand3 = Math.floor(Math.random() * pix.length);
        console.log(`${rand1} ${rand2} ${rand3}`);
        firstPix.setAttribute("src", pix[rand1]);
        secondPix.setAttribute("src", pix[rand2]);
        thirdPix.setAttribute("src", pix[rand3]);
    };

    const playSound = (soundSrc) => {
        const sound = new Audio(soundSrc);
        sound.play();
    };

    document.querySelector("#spin").addEventListener("click", () => {
        if (credit > 0) {
            const interval = setInterval(generateRandom, 100);
            rezElement.innerHTML = "";

            const sound4Src = "sounds/push.mp3";
            playSound(sound4Src);

            setTimeout(() => {
                if (rand1 === rand2 && rand2 === rand3) {
                    console.log("JACKPOT!! YOU WON 1500!!");
                    rezElement.innerHTML = "JACKPOT!! YOU WON 1500 &euro;!!";
                    credit += 1500;
                    playSound("sounds/jackpot.mp3");
                } else if ((rand1 === rand2 && rand2 !== rand3) ||
                    (rand2 === rand3 && rand1 !== rand3) ||
                    (rand1 === rand3 && rand1 !== rand2)) {
                    console.log("YOU WON 200!");
                    rezElement.innerHTML = "YOU WON 200 &euro;!";
                    credit += 200;
                    playSound("sounds/win.mp3");
                    rezElement.style.color = "blue";
                    rezElement.style.fontWeight = "bold";
                } else {
                    console.log("You Lost 100");
                    rezElement.innerHTML = "You Lost 100 &euro;";
                    credit -= 100;
                    playSound("sounds/loose.mp3");
                    rezElement.style.color = "black";
                    rezElement.style.fontWeight = "bold";
                }
                numElement.innerHTML = credit;
                clearInterval(interval);
            }, 3500);
        } else {
            rezElement.innerHTML = "GAME OVER !";
            document.querySelector("#spin").setAttribute("disabled", "true");
            rezElement.style.color = "red";
            rezElement.style.fontSize = "50px";
            rezElement.style.fontWeight = "bold";
        }
    });

    document.querySelector("#newGame").addEventListener("click", () => {
        location.reload();
    });
});
