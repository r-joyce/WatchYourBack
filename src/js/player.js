import { Sprite, initKeys, initPointer, keyPressed, pointerPressed } from 'kontra';

let mouse = {
    x:0,
    y:0
}
const setMouse = (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
}

document.addEventListener('mousemove', setMouse);

export default class Player {
    constructor(addSprite) {
        initKeys();
        initPointer();
        return Sprite({
            type: 'player',
            x: 100,
            y: 100,
            dt: 0,
            radius: 3,
            rotation: 0,  // 0 degrees is to the right
            render() {
                this.context.save();
                this.context.strokeStyle = 'white';
                this.context.beginPath();  // start drawing a shape
                this.context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
                this.context.stroke();     // outline the circle
                this.context.restore();
            },
            update() {
                if (keyPressed('w') || keyPressed('up')) {
                    this.y -= 1;
                }
                
                if (keyPressed('a') || keyPressed('left')) {
                    this.x -= 1;
                }
                
                if (keyPressed('s') || keyPressed('down')) {
                    this.y += 1;
                }
                
                if (keyPressed('d') || keyPressed('right')) {
                    this.x += 1;
                }

                this.advance();

                // allow the player to fire no more than 1 bullet every 1/4 second
                this.dt += 1/60;
                if (keyPressed('space') || pointerPressed('left')) {
                    if (this.dt > 0.25) {
                        this.dt = 0;
                        let bullet = Sprite({
                            type: 'bullet',
                            x: this.x,
                            y: this.y,
                            dx: (mouse.x - this.x) *.1,
                            dy: (mouse.y - this.y) *.1,
                            ttl: 50,
                            width: 2,
                            height: 2,
                            color: 'white'
                        });
                        addSprite(bullet);
                    }
                }
            }
        });
    }
}
