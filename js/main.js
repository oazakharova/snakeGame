window.addEventListener('load', () => {
    const settings = new Settings();
    const status = new Status();
    const snake = new Snake();
    const board = new Board();

    settings.init({ speed: 5, winLength: 5 });
    board.init(settings, snake); // полю нужно передать настройки поля для отрисовки и змейку 

    board.renderBoard();
    board.renderSnake();
});