import Pokemon from './pokemon.js';
import random from './utils.js';

const player1 = new Pokemon({
    name: 'Pikachu',
    type: 'electric',
    hp: 500,
    selectors: 'character',
});

const player2 = new Pokemon({
    name: 'Charmander',
    type: 'fire',
    hp: 50,
    selectors: 'enemy',
});

function $getElById(id) {
    return document.getElementById(id);
}

const $btnKick = $getElById('btn-kick');
const $btnThunder = $getElById('btn-thunder');

const $logs = $getElById('logs');


/* const character = {
    name: 'Pikachu',
    hp: {
        default: 100,
        current: 100,
    },
    currentDamage: 0,

    elHP: $getElById('health-character'),
    elProgressBar: $getElById('progressbar-character'),
    changeHP: changeHP,
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressBarHP: renderProgressBarHP,
    generateLog: generateLog,
}; */

/* const enemy = {
    name: 'Charmander',
    hp: {
        default: 300,
        current: 300,
    },
    currentDamage: 0,

    elHP: $getElById('health-enemy'),
    elProgressBar: $getElById('progressbar-enemy'),
    changeHP: changeHP,
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressBarHP: renderProgressBarHP,
    //generateLog: generateLog,
}; */

const disableAllButtons = () => {
    const allButtons = Array.from(document.getElementsByClassName('button'));
    if (player1.hp.current <= 0 || player2.hp.current  <= 0) {
        allButtons.forEach(e => e.disabled = true);
    }
};

function countBtn(count = 6, elem) {
    const innerText = elem.innerText;
    elem.innerText = `${innerText} (${count})`;
    return function () {
        count -= 1;
        if (count === 0) {
            elem.disabled = true;
        }
        elem.innerText = `${innerText} (${count})`;
        return count;
    }
};

const countBtnJolt = countBtn(6, $btnKick);
const countBtnThunder = countBtn(10, $btnThunder);

$btnKick.addEventListener('click', function () {
    countBtnJolt();
    getKick();
    disableAllButtons();

});

$btnThunder.addEventListener('click', function () {
    countBtnThunder();
    getKick();
    disableAllButtons();

});

function getKick() {
    player1.changeHP(random(20), function(count) {
        generateLog(player1, player2, count);
        if (player1.hp.current <= 0) {
            generateMessage('finish', player1.name)
        };
    });
    player2.changeHP(random(20), function(count) {
        generateLog(player2, player1, count);
        if (player2.hp.current <= 0) {
            generateMessage('finish', player2.name)
        };
    });
};

function generateLog(person1, person2, count) {
    const $p = document.createElement('p');
    const $span = document.createElement('span');
    
    $span.classList.add('damage-log');

    const logs = [
        `${person1.name} вспомнил что-то важное, но неожиданно ${person2.name}, не помня себя от испуга, ударил в предплечье врага.`,
        `${person1.name} поперхнулся, и за это ${person2.name} с испугу приложил прямой удар коленом в лоб врага.`,
        `${person1.name} забылся, но в это время наглый ${person2.name}, приняв волевое решение, неслышно подойдя сзади, ударил.`,
        `${person1.name} пришел в себя, но неожиданно ${person2.name} случайно нанес мощнейший удар.`,
        `${person1.name} поперхнулся, но в это время ${person2.name} нехотя раздробил кулаком \<вырезанно цензурой\> противника.`,
        `${person1.name} удивился, а ${person2.name} пошатнувшись влепил подлый удар.`,
        `${person1.name} высморкался, но неожиданно ${person2.name} провел дробящий удар.`,
        `${person1.name} пошатнулся, и внезапно наглый ${person2.name} беспричинно ударил в ногу противника.`,
        `${person1.name} расстроился, как вдруг, неожиданно ${person2.name} случайно влепил стопой в живот соперника.`,
        `${person1.name} пытался что-то сказать, но вдруг, неожиданно ${person2.name} со скуки, разбил бровь сопернику.`,
    ];

    const damage = ` -${count}, ${person1.hp.current} / ${person1.hp.total}`;
    $p.innerText = logs[random(logs.length - 1)];
    $span.innerText = damage;
    $p.appendChild($span);

    $logs.insertBefore($p, $logs.children[0]);
    $logs.style.height = '250px';
};

function generateMessage(msg, name) {
    const $p = document.createElement('p');
    const $span = document.createElement('span');
    
    $span.classList.add('damage-log');

    if (msg === 'start') {
        $span.innerText = 'ДА НАЧНЕТСЯ БОЙ!';
        $p.appendChild($span);
    }
    if (msg === 'finish') {
        $span.innerText = `Бедный ${name} проиграл бой!`;
        $p.appendChild($span);
    }
    $logs.insertBefore($p, $logs.children[0]);
}

generateMessage('start');