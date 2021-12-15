function $getElById(id) {
    return document.getElementById(id);
}

const $btnKick = $getElById('btn-kick');
const $btnThunder = $getElById('btn-thunder');

const $logs = $getElById('logs');


const character = {
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
};

const enemy = {
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
    generateLog: generateLog,
};

function countOfClicks(btn, num = 6) {
    function slice() {
        if (num < 9) {
            return `${btn.innerText.slice(0, -3)} [${num}]`;
        } else {
            return `${btn.innerText.slice(0, -4)} [${num}]`
        }
    }
    btn.innerText = slice();
    return function () {
        console.log(num);
        num -= 1;
        btn.innerText = slice();
        if (num === 0) {
            btn.disabled = true;
        }
    } 
}

const disableBtnKick = countOfClicks($btnKick);
const disableBtnThunder = countOfClicks($btnThunder, 10)

$btnKick.addEventListener('click', function () {
    console.log('Jolt');
    getKick();
    disableBtnKick();
});

$btnThunder.addEventListener('click', function () {
    console.log('Thunder');
    getKick();
    disableBtnThunder()
});

const random = (num) => Math.ceil(Math.random() * num);

function init() {
    character.renderHP();
    enemy.renderHP();
    generateLog('start');
};

function renderHP() {
    this.renderHPLife();
    this.renderProgressBarHP();
};

function renderHPLife() {
    this.elHP.innerText = this.hp.current + ' / ' + this.hp.default;
};

function renderProgressBarHP() {
    const progressInPercents = (this.hp.current * 100) / this.hp.default;
    this.elProgressBar.style.width = progressInPercents + '%';
};

function changeHP(count) {
    const secondPerson = this === character ? enemy : character;
    if (secondPerson.hp.current === 0) {
        this.renderHP();
    } else {
        this.hp.current -= count;
        this.currentDamage = count;
        this.generateLog();
        if (this.hp.current <= 0) {
            this.hp.current = 0;
            this.generateLog('finish');
            $btnThunder.disabled = true;
            $btnKick.disabled = true;
        } 
        this.renderHP();
    } 
};

function getKick() {
    character.changeHP(random(20));
    enemy.changeHP(random(20));
};

function generateLog(str) {
    const $p = document.createElement('p');
    const $span = document.createElement('span');
    
    $span.classList.add('damage-log');
    
    
    if (str && str === 'start') {
        $span.innerText = 'ДА НАЧНЕТСЯ БОЙ!';
        $p.appendChild($span);
    } else if (str && str === 'finish') {
        $span.innerText = `Бедный ${this.name} проиграл бой!`;
        $p.appendChild($span);
    } else {
        const secondPerson = this === character ? enemy : character;
        const logs = [
            `${this.name} вспомнил что-то важное, но неожиданно ${secondPerson.name}, не помня себя от испуга, ударил в предплечье врага.`,
            `${this.name} поперхнулся, и за это ${secondPerson.name} с испугу приложил прямой удар коленом в лоб врага.`,
            `${this.name} забылся, но в это время наглый ${secondPerson.name}, приняв волевое решение, неслышно подойдя сзади, ударил.`,
            `${this.name} пришел в себя, но неожиданно ${secondPerson.name} случайно нанес мощнейший удар.`,
            `${this.name} поперхнулся, но в это время ${secondPerson.name} нехотя раздробил кулаком \<вырезанно цензурой\> противника.`,
            `${this.name} удивился, а ${secondPerson.name} пошатнувшись влепил подлый удар.`,
            `${this.name} высморкался, но неожиданно ${secondPerson.name} провел дробящий удар.`,
            `${this.name} пошатнулся, и внезапно наглый ${secondPerson.name} беспричинно ударил в ногу противника.`,
            `${this.name} расстроился, как вдруг, неожиданно ${secondPerson.name} случайно влепил стопой в живот соперника.`,
            `${this.name} пытался что-то сказать, но вдруг, неожиданно ${secondPerson.name} со скуки, разбил бровь сопернику.`,
        ];
        const damage = ` -${this.currentDamage}, ${this.hp.current} / ${this.hp.default}`;
        
        $p.innerText = logs[random(logs.length - 1)];
        $span.innerText = damage;
        $p.appendChild($span);
    }
    
    $logs.insertBefore($p, $logs.children[0]);
    $logs.style.height = '250px';
};

init();