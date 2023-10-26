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
        this.body.unshift(newHeadCoords);
        this.body.pop();
    }
}