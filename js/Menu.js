class Menu {
    constructor() {
        this.startBtnEl = document.getElementById('startBtn');
        this.pauseBtnEl = document.getElementById('pauseBtn');
    }

    /**
     * Назначение переданных функций в качестве обработчиков на кнопки Старт и Пауза
     * @param {*} startBtnClickHandler 
     * @param {*} pauseBtnClickHandler 
     */
    addButtonsClickListeners(startBtnClickHandler, pauseBtnClickHandler) {
        this.startBtnEl.addEventListener('click', startBtnClickHandler);
        this.pauseBtnEl.addEventListener('click', pauseBtnClickHandler);
    }
}

