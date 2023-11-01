class Game {
    constructor() {
        this.tickIdentifier = null;
        this.messageEl = document.getElementById('message');
    }

    init(settings, status, board, snake, menu, food, score) {
        this.settings = settings;
        this.status = status;
        this.board = board;
        this.snake = snake;
        this.menu = menu;
        this.food = food;
        this.score = score;
    }

    /**
     * Назначение обработчиков на кнопки Старт и Пауза
     */
    run() {
        this.score.setToWin(this.settings.winLength);
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
        this.score.setCurrent(this.snake.body.length);
        if (this.isSnakeSteppedOntoItself()) {
            return;
        }
        /**if (this.isGameLost()) {
            return;
        } // проверка, не проиграна ли игра*/ //устаревшая проверка, не нашла ли змейка на стену, так как теперь она это умеет
        if (this.isGameWon()) {
            return
        }
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
     * @deprecated метод больше не используется, так как змейка умеет проходить сквозь стены
     * 
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
     * Проверка, выиграна ли игра, 
     * останавовка игры,
     * вывод сообщения о выигрыше.
     * @returns {boolean} если длина змейки достигла длины, нужной для победы, - true, иначе false.
     */
    isGameWon() {
        if (this.snake.body.length == this.settings.winLength) {
            clearInterval(this.tickIdentifier);
            this.setMessage('Вы выиграли');
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

    /**
     * Проверка, не съела ли змейка сама себя - если змейка наступила, то будут совпадающие координаты тела с головой
     * @returns {boolean}
     */
    isSnakeSteppedOntoItself() {
        let cellArr = this.snake.body.map(function (cellCoords) {
            return cellCoords.x.toString() + cellCoords.y.toString();
        });
        let head = cellArr.shift();
        if (cellArr.includes(head)) {
            clearInterval(this.tickIdentifier);
            this.setMessage('Вы проиграли');
            return true;
        }
        return false;

        /* map:
        [
            {x: 1, y: 1}
            {x: 1, y: 2}
            {x: 1, y: 3}
        ]
        [
            "11", "12", "13"
        ]
        */
    }
}