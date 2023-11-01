class Snake {
    constructor() {
        this.possibleDirections = ['down', 'up', 'left', 'right'];

        // координаты расположения змейки
        this.body = [
            {
                x: 1,
                y: 1,
            },
            {
                x: 1,
                y: 2,
            },

        ];

        // направление змейки по умолчанию
        this.direction = 'down';
    }

    init(settings) {
        this.settings = settings
    }

    /**
     * Осуществление шага змейки через изменение координат - добавление ячейки перед существующим положением головы и удаление одной ячейки в хвосте
     */
    performStep() {
        let currentHeadCoords = this.body[0];
        let newHeadCoords = {
            x: currentHeadCoords.x,
            y: currentHeadCoords.y,
        };
        switch (this.direction) {
            case "down":
                newHeadCoords.y++;
                break;
            case "up":
                newHeadCoords.y--;
                break;
            case "left":
                newHeadCoords.x--;
                break;
            case "right":
                newHeadCoords.x++;
                break;
        }

        // Поведение змейки при достижении края доски
        //если голова уходит за правый край
        if (newHeadCoords.x > this.settings.colsCount) {
            newHeadCoords.x = 1;
        }
        //если голова уходит за нижний край
        if (newHeadCoords.y > this.settings.rowsCount) {
            newHeadCoords.y = 1;
        }
        //если голова уходит за левый край
        if (newHeadCoords.x == 0) {
            newHeadCoords.x = this.settings.colsCount;
        }
        //если голова уходит за верхний край
        if (newHeadCoords.y == 0) {
            newHeadCoords.y = this.settings.rowsCount;
        }

        this.body.unshift(newHeadCoords);
        this.body.pop();
    }

    /**
     * Изменение направления движения.
     * @param {string} newDirection - новое направление 
     * @throws {Error} - при передаче некорректного направления 
     */
    changeDirection(newDirection) {
        if (!this.possibleDirections.includes(newDirection)) {
            throw new Error('Передано неверное направление. Вы передали: ' + newDirection);
        }
        // не передали ли противоположное направление
        if (this.isPassedOppositeDirection(newDirection)) {
            return;
        }
        this.direction = newDirection;
    }

    /**
     * Проверка, является ли переданное направление противоположным тому, куда сейчас движется змейка.
     * @param {string} newDirection - новое направление
     * @returns {boolean} - true, если новое направление противоположно текущему
     */
    isPassedOppositeDirection(newDirection) {
        if (this.direction == 'down' && newDirection == 'up') {
            return true;
        }
        if (this.direction == 'up' && newDirection == 'down') {
            return true;
        }
        if (this.direction == 'left' && newDirection == 'right') {
            return true;
        }
        if (this.direction == 'right' && newDirection == 'left') {
            return true;
        }
        return false;
    }

    /**
     * Дублирование в массиве объектов  (тело змейки) последней ячейки, 
     * т.е. в массиве в конце оказываются два одинаковых объекта. 
     * Когда метод performStep в самом конце удаляет последний элемент массива, он удаляет задублированный объект, так растет тело змейки.
     */
    increaseBody() {
        let bodyLastCell = this.body[this.body.length - 1];
        let newBodyLastCell = {
            x: bodyLastCell.x,
            y: bodyLastCell.y,
        };
        this.body.push(newBodyLastCell);
    }
}