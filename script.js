$(document).ready(() => {
    let credit;

    do {
        credit = +prompt('Insert Credit', 500);
    } while (isNaN(credit) || credit <= 0 || credit % 100 !== 0);

    $('#num').html(credit);

    const firstPic = $('#first img');
    const secondPic = $('#second img');
    const thirdPic = $('#third img');

    const pix = [
        'img/apple.png',
        'img/bar.png',
        'img/bell.png',
        'img/cherry.png',
        'img/grape.png',
        'img/heart.png',
        'img/lemon.png',
        'img/seven.png',
        'img/waterm.png'
    ];

    const sound1 = new Audio('sounds/win.mp3');
    const sound2 = new Audio('sounds/loose.mp3');
    const sound3 = new Audio('sounds/jackpot.mp3');
    const sound4 = new Audio('sounds/push.mp3');

    const generateRandom = () => Math.floor(Math.random() * pix.length);

    const updateCredit = (amount) => {
        credit += amount;
        $('#num').html(credit);
    };

    const displayResult = (message, color) => {
        $('#rez').html(message).css('color', color).css('font-weight', 'bold');
    };

    const handleSpinResult = () => {
        if (rand1 === rand2 && rand2 === rand3) {
            displayResult('JACKPOT!! YOU WON 1500 &euro;!!', 'green');
            updateCredit(1500);
            $('#spin').attr('disabled', false);
            sound3.play();
        } else if (
            (rand1 === rand2 && rand2 !== rand3) ||
            (rand2 === rand3 && rand1 !== rand3) ||
            (rand1 === rand3 && rand1 !== rand2)
        ) {
            displayResult('YOU WON 200 &euro;!', 'blue');
            updateCredit(200);
            $('#spin').attr('disabled', false);
            sound1.play();
        } else {
            displayResult('You Lost 100 &euro;', 'black');
            updateCredit(-100);
            $('#spin').attr('disabled', false);
            sound2.play();
        };

        if (credit === 0) {
            $('#spin').attr('style', 'display: none;');
            $('#newGame').attr('style', 'display: inline-block;');
            $('#rez').html('GAME OVER!');
            $('#rez').css('color', 'red').css('font-size', '50px').css('font-weight', 'bold');
        };
    };

    $('#spin').click(() => {
        $('#spin').attr('disabled', true);

        if (credit > 0) {
            sound4.play();
            const interval = setInterval(() => {
                rand1 = generateRandom();
                rand2 = generateRandom();
                rand3 = generateRandom();

                firstPic.attr('src', pix[rand1]);
                secondPic.attr('src', pix[rand2]);
                thirdPic.attr('src', pix[rand3]);
            }, 100);

            $('#rez').html('');

            setTimeout(() => {
                handleSpinResult();
                clearInterval(interval);
            }, 3500);
        };
    });

    $('#newGame').click(() => {
        location.reload();
    });
});
