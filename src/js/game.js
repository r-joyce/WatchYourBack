class Game {
    constructor() {
        kontra.init();
        kontra.initKeys();
        let sprites = [];
    }
}



function createAsteroid(x, y, radius) {
    let asteroid = kontra.Sprite({
        type: 'asteroid',
        x: x,
        y: y,
        radius: radius,
        dx: Math.random() * 4 - 2,
        dy: Math.random() * 4 - 2,
        render() {
            this.context.strokeStyle = 'white';
            this.context.beginPath();  // start drawing a shape
            this.context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
            this.context.stroke();     // outline the circle
        }
    });
    sprites.push(asteroid);
}

for (var i = 0; i < 4; i++) {
    createAsteroid(100, 100, 30);
}

let ship = kontra.Sprite({
    type: 'ship',
    x: 300,
    y: 300,
    width: 6,       // we'll use this later for collision detection
    rotation: 0,    // 0 degrees is to the right
    dt: 0,          // track how much time has passed
    render() {
        this.context.save();

        // transform the origin and rotate around it 
        // using the ships rotation
        this.context.translate(this.x, this.y);
        this.context.rotate(degreesToRadians(this.rotation));

        // draw a right facing triangle
        this.context.beginPath();
        this.context.moveTo(-3, -5);
        this.context.lineTo(12, 0);
        this.context.lineTo(-3, 5);

        this.context.closePath();
        this.context.stroke();
        this.context.restore();
    },
    update() {
        // rotate the ship left or right
        if (kontra.keyPressed('left') || kontra.keyPressed('a')) {
            this.rotation += -4
        } else if (kontra.keyPressed('right') || kontra.keyPressed('d')) {
            this.rotation += 4
        }

        // move the ship forward in the direction it's facing
        const cos = Math.cos(degreesToRadians(this.rotation));
        const sin = Math.sin(degreesToRadians(this.rotation));

        if (kontra.keyPressed('up') || kontra.keyPressed('w')) {
            this.ddx = cos * 0.05;
            this.ddy = sin * 0.05;
        } else {
            this.ddx = this.ddy = 0;
        }

        this.advance();

        // set a max speed
        const magnitude = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
        if (magnitude > 5) {
            this.dx *= 0.95;
            this.dy *= 0.95;
        }

        // allow the player to fire no more than 1 bullet every 1/4 second
        this.dt += 1/60;
        if (kontra.keyPressed('space') && this.dt > 0.25) {
            this.dt = 0;
            let bullet = kontra.Sprite({
                type: 'bullet',
                // start the bullet on the ship at the end of the triangle
                x: this.x + cos * 12,
                y: this.y + sin * 12,
                // move the bullet slightly faster than the ship
                dx: this.dx + cos * 5,
                dy: this.dy + sin * 5,
                // live only 50 frames
                ttl: 50,
                // bullets are small
                width: 2,
                height: 2,
                color: 'white'
            });
            sprites.push(bullet);
        }
    }
});
sprites.push(ship);

let loop = kontra.GameLoop({
    update() {
        let canvas = kontra.getCanvas();
    
        sprites.map(sprite => {
            sprite.update();

            // sprite is beyond the left edge
            if (sprite.x < 0) {
                sprite.x = canvas.width;
            }

            // sprite is beyond the right edge
            else if (sprite.x > canvas.width) {
                sprite.x = 0;
            }

            // sprite is beyond the top edge
            if (sprite.y < 0) {
                sprite.y = canvas.height;
            }
            
            // sprite is beyond the bottom edge
            else if (sprite.y > canvas.height) {
                sprite.y = 0;
            }
        });

        // collision detection
        for (let i = 0; i < sprites.length; i++) {
            // only check for collision against asteroids
            if (sprites[i].type === 'asteroid') {
                for (let j = 0; j < sprites.length; j++) {
                    // don't check asteroid vs. asteroid collisions
                    if (sprites[j].type !== 'asteroid') {
                        let asteroid = sprites[i];
                        let sprite = sprites[j];
                        // circle vs. circle collision detection
                        let dx = asteroid.x - sprite.x;
                        let dy = asteroid.y - sprite.y;
                        if (Math.sqrt(dx * dx + dy * dy) < asteroid.radius + sprite.width) {
                            asteroid.ttl = 0;
                            sprite.ttl = 0;

                            // split the asteroid only if it's large enough
                            if (asteroid.radius > 10) {
                                for (var x = 0; x < 3; x++) {
                                    createAsteroid(asteroid.x, asteroid.y, asteroid.radius / 2.5);
                                }
                            }

                            break;
                        }
                    }
                }
            }
        }

        sprites = sprites.filter(sprite => sprite.isAlive());
    },
    render() {
        sprites.map(sprite => sprite.render());
    }
});

loop.start();

// helper function to convert degrees to radians
function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}