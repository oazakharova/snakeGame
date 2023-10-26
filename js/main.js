window.addEventListener('load', () => {
    const settings = new Settings();
    const status = new Status();
    const snake = new Snake();
    const board = new Board();

    const food = new Food();

    settings.init({ speed: 5, winLength: 5 });
    board.init(settings, snake); // полю нужно передать настройки поля для отрисовки и змейку 
    food.init(settings, snake, board);

    board.renderBoard();
    board.renderSnake();

    food.setNewFood();

});