import { Sprite, initKeys, keyPressed } from 'kontra';

initKeys();

export default class Player {
    constructor() {
        return Sprite({
            type: 'player',
            x: 100,
            y: 100,
            radius: 3,
            render() {
                this.context.save();
                this.context.strokeStyle = 'white';
                this.context.translate(this.x, this.y);
                this.context.beginPath();  // start drawing a shape
                this.context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
                this.context.stroke();     // outline the circle
                this.context.restore();
            },
            update() {
                if (keyPressed('w')) {
                    this.y -= 1;
                }
                
                if (keyPressed('a')) {
                    this.x -= 1;
                }
                
                if (keyPressed('s')) {
                    this.y += 1;
                }
                
                if (keyPressed('d')) {
                    this.x += 1;
                }

                this.advance();
            }
        });
    }
}
