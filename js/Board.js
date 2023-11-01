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

        snakeBodyElems.forEach(function (tdEl) {
            tdEl.classList.add('snakeBody');
        });
    }

    /**
     * Получение тела змейки = набора тегов td
     * @param {Array} bodyCoords массив объектов с координатами
     * @throws {Error} если координаты не будут переданы, то будет выброшена ошибка
     * @returns {HTMLTableCellElement[]}
     */
    getSnakeBodyElems(bodyCoords) {
        if (bodyCoords.length === 0) {
            throw new Error("Не переданы координаты тела змейки.");
        }

        let bodyElems = [];
        for (let coordinate of bodyCoords) {
            let td = this.getCellEl(coordinate.x, coordinate.y);
            bodyElems.push(td);
        }
        return bodyElems;
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

    /**
     * Проверка, съедена ли еда
     * @returns {boolean} true, если змейка находится на еде, иначе false
     */
    didSnakeEatFood() {
        return this.boardEl.querySelector('.food').classList.contains('snakeBody');
    }

    /**
     * @deprecated метод больше не используется, так как змейка умеет проходить сквозь стены
     * 
     * Является ли следующий шаг шагом в стену.
     * @param {Object} nextCellCoords - координаты ячейки, куда змейка собирается сделать шаг.
     * @param {number} nextCellCoords.x
     * @param {number} nextCellCoords.y
     * @returns {boolean}
     */
    isNextStepToWall(nextCellCoords) {
        let nextCell = this.getCellEl(nextCellCoords.x, nextCellCoords.y);
        return nextCell === null;
    }
}