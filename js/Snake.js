class Snake {
    constructor() {
        this.possibleDirections = ['down', 'up', 'left', 'right'];

        // координаты расположения змейки
        this.body = [
            {
                x: 1,
                Y: 1,
            }
            {
                x: 1,
                Y: 2,
            }
        ];

        // направление змейки по умолчанию
        this.direction = 'down';
    }
}