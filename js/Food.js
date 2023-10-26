class Food {
    constructor() {

        // координаты расположения еды
        this.x = null;
        this.y = null;
    }

    /**
     * Получение других объектов для работы
     * @param {Settings} settings - объект настроек
     * @param {Snake} snake - объект змейки
     * @param {Board} board - объект игрового поля 
     */
    init(settings, snake, board) {
        this.settings = settings;
        this.snake = snake;
        this.board = board;
    }

    /**
     * Генерация нового случайного положения еды на поле
     */
    setNewFood() {
        const food = this.generateRandomCoordinates();
        this.board.renderFood(food);
    }

    /**
     * Отрисовка еды на поле по текущим координатам
     */
    setFood() {
        this.board.renderFood(this);
    }

    /**
     * Генерация случайного нового объекта еды в случайном месте поля, не занятом змейкой
     * @returns {Food}
     */
    generateRandomCoordinates() {
        while (true) {
            this.x = Math.floor(Math.random() * this.settings.colsCount) + 1; // this.settings.colsCount выступает в качестве ограничителя, чтобы случайная координата не оказалась за пределами заданного игрового поля. +1, тк нет нулевой ячейки, как и в getCellEl, в котором нумерация начинается с 1 из-за nth
            this.y = Math.floor(Math.random() * this.settings.rowsCount) + 1;
            let cell = this.board.getCellEl(this.x, this.y); // = td

            if (cell.classList.contains('snakeBody')) {
                continue;
            }
            return this; //26:53
        }
    }


}