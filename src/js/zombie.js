import { Sprite } from 'kontra';

export default class Zombie {
    constructor() {
        return Sprite({
            type: 'zombie',
            x: 200,
            y: 300,
            dt: 0,
            radius: 3,
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
