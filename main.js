const $btn = document.getElementById('btn-kick');

const character = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressBar: document.getElementById('progressbar-character'),
};

const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressBar: document.getElementById('progressbar-enemy'),
};

$btn.addEventListener('click', function () {
    console.log('Kick');
    changeHP(random(20), character);
    changeHP(random(20), enemy);
});

const random = (num) => Math.ceil(Math.random() * num);

function init() {
    renderHP(character);
    renderHP(enemy);
    
};

function renderHP(person) {
    renderHPLife(person);
    renderProgressBarHP(person);
};

function renderHPLife(person) {
    person.elHP.innerText = character.damageHP + ' / ' + character.defaultHP;
};

function renderProgressBarHP(person) {
    person.elProgressBar.style.width = person.damageHP + '%';
};

function changeHP(count, person) {
    if (person.damageHP < count) {
        person.damageHP = 0;
        alert('Бедный ' + person.name + ' проиграл бой!');
        $btn.disabled = true;
    } else {
        person.damageHP -= count;
    }
    renderHP(person);
}

init();