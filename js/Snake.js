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
            }
        ];

        // направление змейки по умолчанию
        this.direction = 'down';
    }
}