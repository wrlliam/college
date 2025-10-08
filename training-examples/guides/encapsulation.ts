class Car {
    x: number = 0
    y: number = 0
    constructor(engineSize: number, colour: string) {}

    public async drive() {
        this.x =+ 1
        this.y =+ 1
    }
}

const car = new Car(1.2, "red")
car.drive()