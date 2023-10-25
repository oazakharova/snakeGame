class Board {
    // игровое поле
    constructor() {
        this.boardEL = document.getElementById('game');
    }

    /**
     * Получение параметров настроек сложности и змейки
     * @param {Settings} settings - объект настроек 
     * @param {Snake} snake - объект змейки
     */
    init(settings, snake) {
        this.settings = settings;
        this.snake = snake;
    }

    /**
     * Отрисовка игрового поля
     */
    renderBoard() {
        this.boardEL.innerHTML = '';
        for (let row = 0; row < this.settings.rowsCount; row++) {
            let tr = document.createElement('tr');
            this.boardEL.appendChild(tr);

            for (let col = 0; col < this.settings.colsCount; col++) {
                let td = document.createElement('td');
                tr.appendChild(td);
            }
        }
    }
}