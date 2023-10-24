class Settings {
    /**
     * @param {Object} params - параметры игры
     * @param {number} params.rowsCount - количество строк игрового поля
     * @param {number} params.colsCount - количество колонок игрового поля
     * @param {number} params.speed - скорость движения змейки
     * @param {number} params.winLength - длина змейки для победы
     * @throws {Error} - ошибка, в случае если переданы неверные настройки
     */

    init(params) {
        let defaultParams = { rowsCount: 21, colsCount: 21, speed: 2, winLength: 50 };
        Object.assign(defaultParams, params); //assign - копирование с заменой справа налево в случае совпадения

        if (defaultParams.rowsCount < 10 || defaultParams.rowsCount > 30) {
            throw new Error('Неверные настройки, значение rowsCount должно быть в диапазоне от 10 до 30')
        }
        this.rowsCount = defaultParams.rowsCount;

        if (defaultParams.colsCount < 10 || defaultParams.colsCount > 30) {
            throw new Error('Неверные настройки, значение colsCount должно быть в диапазоне от 10 до 30')
        }
        this.colsCount = defaultParams.colsCount;

        if (defaultParams.speed < 1 || defaultParams.speed > 10) {
            throw new Error('Неверные настройки, значение speed должно быть в диапазоне от 1 до 10')
        }
        this.speed = defaultParams.speed;

        if (defaultParams.winLength < 5 || defaultParams.colsCount > 50) {
            throw new Error('Неверные настройки, значение winLength должно быть в диапазоне от 5 до 50')
        }
        this.winLength = defaultParams.winLength;
    }
}