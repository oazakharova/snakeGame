class Board {
    // игровое поле
    constructor() {
        this.boardEl = document.getElementById('game');
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
        this.boardEl.innerHTML = '';
        for (let row = 0; row < this.settings.rowsCount; row++) {
            let tr = document.createElement('tr');
            this.boardEl.appendChild(tr);

            for (let col = 0; col < this.settings.colsCount; col++) {
                let td = document.createElement('td');
                tr.appendChild(td);
            }
        }
    }

    /**
     * Отрисовка змейки на игровом поле
     */
    renderSnake() {
        const snakeBodyElems = this.getSnakeBodyElems(this.snake.body);
        if (snakeBodyElems) {
            snakeBodyElems.forEach(function (tdEl) {
                tdEl.classList.add('snakeBody');
            })
        }
    }

    /**
     * Получение тела змейки = набора тегов td
     * @param {array} bodyCoords - массив объектов координат 
     * @returns {HTMLTableCellElement[] | null} - возвращает набор тегов td, если координаты были переданы
     */
    getSnakeBodyElems(bodyCoords) {
        if (bodyCoords.length > 0) {
            let bodyElems = [];
            for (let value of bodyCoords) {
                let elem = this.getCellEl(value.x, value.y);
                bodyElems.push(elem);
            }
            return bodyElems;
        }
        return null;
    }

    /**
     * Получение ячейки таблицы
     * @param {number} x - координата по Ох
     * @param {number} y - координата по Оу
     * @returns {HTMLTableCellElement} - тег td
     */
    getCellEl(x, y) {
        return this.boardEl.querySelector(`tr:nth-child(${y}) td:nth-child(${x})`);
    }

    /**
     * Отрисовка еды на игровом поле
     * @param {Food} coords - будущее расположение еды на поле
     * @param {number} coords.x - координата х
     * @param {number} coords.y - координата у
     */
    renderFood(coords) {
        const foodCell = this.getCellEl(coords.x, coords.y);
        foodCell.classList.add('food');
    }

    clearBoard() {
        const tdElems = document.querySelectorAll('td');
        tdElems.forEach(function (td) {
            td.className = "";
        });
    }
}