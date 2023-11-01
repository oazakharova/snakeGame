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
        document.addEventListener('keydown', this.pressKeyHandler.bind(this));
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
        this.snake.performStep(); // перемещение змейки
        if (this.isGameLost()) {
            return;
        } // проверка, не проиграна ли игра
        if (this.board.isHeadOnFood()) {
            this.snake.increaseBody();
            this.food.setNewFood();
        } //если еда съедена, увеличить тело и установить новую еду
        this.board.clearBoard(); // очистка поля
        this.food.setFood(); // возврат еды
        this.board.renderSnake(); // отрисовка змейки с новыми координатами
    }

    /**
     * В зависимости от нажатой кнопки (вверх, вниз, влево, вправо) будет вызываться соответствующий метод.
     * @param {KeyboardEvent} event 
     */
    pressKeyHandler(event) {
        switch (event.key) {
            case "ArrowUp":
                this.snake.changeDirection('up');
                break;
            case "ArrowDown":
                this.snake.changeDirection('down');
                break;
            case "ArrowLeft":
                this.snake.changeDirection('left');
                break;
            case "ArrowRight":
                this.snake.changeDirection('right');
                break;
        }
    }

    /**
    * Проверка, проиграна ли игра, 
    * остановка игры в случае проигрыша, 
    * вывод сообщения о проигрыше.
    * @returns {boolean} если шаг в стену - true, иначе false.
    */
    isGameLost() {
        if (this.board.isNextStepToWall(this.snake.body[0])) {
            clearInterval(this.tickIdentifier);
            this.setMessage('Вы проиграли');
            return true;
        }
        return false;
    }

    /**
     * Вывод сообщения на странице.
     * @param {string} text 
     */
    setMessage(text) {
        this.messageEl.innerText = text;
    }
}