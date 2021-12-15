import Pokemon from './pokemon.js';
import random from './utils.js';
import { pokemons } from './pokemons.js';

let character = pokemons[random(0, pokemons.length - 1)];
let enemy = pokemons[random(0, pokemons.length - 1)];

const $namePlayer1 = document.getElementById('name-player1');
const $namePlayer2 = document.getElementById('name-player2');

$namePlayer1.innerText = character.name;
$namePlayer2.innerText = enemy.name;

const $imgPlayer1 = document.querySelector('div.pokemon.player1 img');
const $imgPlayer2 = document.querySelector('div.pokemon.player2 img');
$imgPlayer1.src = character.img;
$imgPlayer2.src = enemy.img;

const $control = document.querySelector('.control');

let player1 = new Pokemon({
    ...character,
    selectors: 'player1',
});

/* function getKick(player1, player2) {
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
}; */

player1.attacks.forEach(item => {
    const $btn = document.createElement('button');
    $btn.classList.add('button');
    $btn.innerText = item.name;
    const btnCount = countBtn(item.maxCount, $btn);

    $btn.addEventListener('click', () => {
        btnCount();
        let attack = enemy.attacks[0];
        player1.changeHP(random(attack.minDamage, attack.maxDamage), function(count) {
            generateLog(player1, player2, count);
            
            if (player1.hp.current <= 0) {
                generateMessage('finish', player1.name)
            };
            restartButton();
        });
        player2.changeHP(random(item.minDamage, item.maxDamage), function(count) {
            generateLog(player2, player1, count);
            if (player2.hp.current <= 0) {
                generateMessage('finish', player2.name)
            };
            nextLevelButton();
        });
    })
    $control.appendChild($btn);
})

let player2 = new Pokemon({
    ...enemy,
    selectors: 'player2',
});

const $logs = document.getElementById('logs');

/* const player1 = {
    name: 'Pikachu',
    hp: {
        default: 100,
        current: 100,
    },
    currentDamage: 0,

    elHP: $getElById('health-player1'),
    elProgressBar: $getElById('progressbar-player1'),
    changeHP: changeHP,
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressBarHP: renderProgressBarHP,
    generateLog: generateLog,
}; */

/* const player2 = {
    name: 'Charmander',
    hp: {
        default: 300,
        current: 300,
    },
    currentDamage: 0,

    elHP: $getElById('health-player2'),
    elProgressBar: $getElById('progressbar-player2'),
    changeHP: changeHP,
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressBarHP: renderProgressBarHP,
    //generateLog: generateLog,
}; */

const restartButton = () => {
    const allButtons = Array.from(document.getElementsByClassName('button'));
    if (player1.hp.current <= 0) {
        allButtons.forEach(e => e.remove());
        const $btn = document.createElement('button');
        $btn.classList.add('button');
        $btn.innerText = 'Restart Game';

        $btn.addEventListener('click', function() {
            window.location.reload();
        })

        $control.appendChild($btn);
    }
};

const nextLevelButton = () => {
    const allButtons = Array.from(document.getElementsByClassName('button'));
    if (player2.hp.current <= 0) {
        allButtons.forEach(e => e.style.display = 'none');
        const $btn = document.createElement('button');
        $btn.classList.add('button');
        $btn.innerText = 'Next Lvl';

        $btn.addEventListener('click', function() {
            enemy = pokemons[random(0, pokemons.length - 1)];
            console.log(enemy.name)
            $namePlayer2.innerText = enemy.name;
            $imgPlayer2.src = enemy.img;
            allButtons.forEach(e => e.style.display = 'block');
            $btn.remove();
            player2 = new Pokemon({
                ...enemy,
                selectors: 'player2',
            });
            


            player1.attacks.forEach(item => {
            
                $btn.addEventListener('click', () => {
                    let attack = enemy.attacks[0];
                    player1.changeHP(random(attack.minDamage, attack.maxDamage), function(count) {
                        generateLog(player1, player2, count);
                        
                        if (player1.hp.current <= 0) {
                            generateMessage('finish', player1.name)
                        };
                        restartButton();
                    });
                    player2.changeHP(random(item.minDamage, item.maxDamage), function(count) {
                        generateLog(player2, player1, count);
                        if (player2.hp.current <= 0) {
                            generateMessage('finish', player2.name)
                        };
                        nextLevelButton();
                    });
                })
            })

            
        });
        $control.appendChild($btn);
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
    $p.innerText = logs[random(0, logs.length - 1)];
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
};

generateMessage('start');