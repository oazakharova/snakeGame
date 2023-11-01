class Score {
    constructor() {
        this.currentEl = document.querySelector('.current');
        this.toWinEl = document.querySelector('.toWin');
    }

    /**
     * @param {Settings} settings
     */
    init(settings) {
        this.settings = settings;
    }

    /**
     * Метод устанавливает текущий счет игрока.
     * @param {string} text 
     */
    setCurrent(text) {
        this.currentEl.textContent = text;
    }

    /**
     * Метод устанавливает количество очков, необходимых
     * для выигрыша.
     * @param {string} text 
     */
    setToWin(text) {
        this.toWinEl.textContent = text;
    }
}