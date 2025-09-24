export class Dice {
    public maxSize: number = 6
    public minSize: number = 1
    public rollAmount: number = 1
    constructor(maxSize: number = 6, minSize: number = 1, rollAmount: number = 1) {
        this.maxSize = maxSize
        this.minSize = minSize
        this.rollAmount = rollAmount
    }

    public roll() {
        let sum = [];

        for (let i = 0; i < this.rollAmount; i++) {
          const r = Math.floor(Math.random() * (this.maxSize - this.minSize + 1)) + this.minSize;
          sum.push(r);
        }

        return sum; 
    }
}