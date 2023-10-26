class Game {
    constructor() {
        this.tickIdentifier = null;
        this.messageEl = document.getElementById('message');
    }

    init(settings, status, board, snake, menu, food) {
        this.settings = settings;
        this.status = status;
        this.board = board;
        this.snake = snake;
        this.menu = menu;
        this.food = food;
    }

    /**
     * Назначение обработчиков на кнопки Старт и Пауза
     */
    run() {
        this.menu.addButtonsClickListeners(this.start, this.pause)
        //document.addEventListener('keydown', this.)
    }

    start() {
        console.log('start');
    }

    pause() {
        console.log('pause');
    }
}