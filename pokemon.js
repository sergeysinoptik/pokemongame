class Selectors {
    constructor(name) {
        this.elHP = document.getElementById(`health-${name}`);
        this.elProgressBar = document.getElementById(`progressbar-${name}`);
    }
}

class Pokemon extends Selectors {
    constructor({ name, hp, type, selectors, attacks = [] }) {
        super(selectors);

        this.name = name;
        this.hp = {
            current: hp,
            total: hp,
        };
        this.type = type;
        this.attacks = attacks;

        this.renderHP();
    }

    changeHP = (count, cb) => {
        this.hp.current -= count;

        if (this.hp.current <= 0) {
            this.hp.current = 0;
        }
        this.renderHP();
        cb && cb(count);
    };

    renderHP = () => {
        this.renderHPLife();
        this.renderProgressBarHP();
    };
    
    renderHPLife = () => {
        const { elHP, hp: { current, total } } = this;

        elHP.innerText = current + ' / ' + total;
    };
    
    renderProgressBarHP = () => {
        const { hp: { current, total }, elProgressBar } = this;

        const progressInPercents = (current * 100) / total;
        elProgressBar.style.width = progressInPercents + '%';
    };
};

export default Pokemon;