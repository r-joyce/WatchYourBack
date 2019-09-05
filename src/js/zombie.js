import { getCanvas, Sprite } from 'kontra';

export default class Zombie {
    constructor() {
        let canvas = getCanvas();
        return Sprite({
            type: 'zombie',
            x: Math.floor((Math.random() * canvas.width) + 1),
            y: Math.floor((Math.random() * canvas.height) + 1),
            dt: 0,
            radius: 6,
            rotation: 0,  // 0 degrees is to the right
            render() {
                this.context.save();
                this.context.strokeStyle = 'red';
                this.context.beginPath();  // start drawing a shape
                this.context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
                this.context.stroke();     // outline the circle
                this.context.restore();
            },
            update() {
                this.advance();
            }
        });
    }
}
