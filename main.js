function $getElById(id) {
    return document.getElementById(id);
}

const $btnKick = $getElById('btn-kick');
const $btnThunder = $getElById('btn-thunder');

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
        default: 100,
        current: 100,
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

$btnKick.addEventListener('click', function () {
    console.log('Jolt');
    getKick();
});

$btnThunder.addEventListener('click', function () {
    console.log('Thunder');
    getKick();
});

const random = (num) => Math.ceil(Math.random() * num);

function init() {
    character.renderHP();
    enemy.renderHP();
};

function renderHP() {
    this.renderHPLife();
    this.renderProgressBarHP();
};

function renderHPLife() {
    this.elHP.innerText = this.hp.current + ' / ' + this.hp.default;
};

function renderProgressBarHP() {
    this.elProgressBar.style.width = this.hp.current + '%';
};

function changeHP(count) {
    this.hp.current -= count;
    this.currentDamage = count;
    console.log(this.generateLog());
    if (this.hp.current <= 0) {
        this.hp.current = 0;
        alert('Бедный ' + this.name + ' проиграл бой!');
        $btnThunder.disabled = true;
        $btnKick.disabled = true;
    }
    this.renderHP();
};

function getKick() {
    character.changeHP(random(20));
    enemy.changeHP(random(20));
};

function generateLog() {
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

    return logs[random(logs.length - 1)] + damage;
};

init();