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
        let game = this;
        let newStartFn = this.start.bind(game); // bind фиксирует/привязывает this к функции - нужно потому, что функцию вызывают кнопки, а значит без привязки thisом будут они, а не игра
        this.menu.addButtonsClickListeners(newStartFn, this.pause.bind(this)); //аналоги
        //document.addEventListener('keydown', this.)
    }

    start() {
        if (this.status.isPaused()) {
            this.status.setPlaying();
            this.tickIdentifier = setInterval(this.doTick.bind(this), 1000 / this.settings.speed);
        }
    }

    pause() {
        if (this.status.isPlaying()) {
            this.status.setPaused();
            clearInterval(this.tickIdentifier); // прекратить вызовы по переданному идентификатору
        }
    }

    /**
     * Ежесекундно:
     * 1. перемещение змейки
     * 2. проверка статуса игры (выиграна/проиграна)
     * 3. увеличение размера змейки при поглащении еды
     * 4. отрисовка змейки и еды
     */
    doTick() {
        console.log('tick');
        console.log(this);
    }
}