function $getElById(id) {
    return document.getElementById(id);
}

const $btnKick = $getElById('btn-kick');
const $btnThunder = $getElById('btn-thunder');

const character = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: $getElById('health-character'),
    elProgressBar: $getElById('progressbar-character'),
    changeHP: changeHP,
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressBarHP: renderProgressBarHP,
};

const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: $getElById('health-enemy'),
    elProgressBar: $getElById('progressbar-enemy'),
    changeHP: changeHP,
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressBarHP: renderProgressBarHP,
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
    this.elHP.innerText = this.damageHP + ' / ' + this.defaultHP;
};

function renderProgressBarHP() {
    this.elProgressBar.style.width = this.damageHP + '%';
};

function changeHP(count) {
    this.damageHP -= count;
    
    if (this.damageHP <= 0) {
        this.damageHP = 0;
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

init();