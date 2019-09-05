import { getCanvas, Sprite } from 'kontra';

export default class Zombie {
    constructor(player) {
        let canvas = getCanvas();
        return Sprite({
            type: 'zombie',
            x: Math.floor((Math.random() * canvas.width) + 1),
            y: Math.floor((Math.random() * canvas.height) + 1),
            dx: 0,
            dy: 0,
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
                this.dt += 1/60;

                // Delay chsing the player for a second
                if (this.dt > 1) {
                    if (player.x > this.x) {
                        this.dx = 1.5;
                    } else {
                        this.dx = -1.5;
                    }

                    if (player.y > this.y) {
                        this.dy = 1.5;
                    } else {
                        this.dy = -1.5;
                    }
                }

                this.advance();
            }
        });
    }
}
