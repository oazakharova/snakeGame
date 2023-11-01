class Status {
    constructor() {
        this.setPaused();
    }

    setPaused() {
        this.condition = 'paused';
    }

    setPlaying() {
        this.condition = 'playing';
    }

    /**
     * @return {boolean} 
     */
    isPaused() {
        return this.condition === 'paused';
    }
    isPlaying() {
        return this.condition === 'playing';
    }


}