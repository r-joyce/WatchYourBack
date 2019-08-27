class Game {
    constructor() {
        kontra.init();
        kontra.initKeys();
        this.sprites = [];
        this.player = new Player();
        this.sprites.push(this.player);
        this.loop = this.SetupGameLoop();
    }

    SetupGameLoop() {
        let loop = kontra.GameLoop({
            update() {
                let canvas = kontra.getCanvas();
                
                this.sprites.map(sprite => {
                    sprite.update();

                    if (sprite.x < 0) {
                        sprite.x = 0;
                    } else if (sprite.x > canvas.width) {
                        sprite.x = canvas.width;
                    }

                    if (sprite.y < 0) {
                        sprite.y = 0;
                    } else if (sprite.y > canvas.height) {
                        sprite.y = canvas.height;
                    }
                });

                this.sprites = this.sprites.filter(sprite => sprite.isAlive());
            },
            render() {
                this.sprites.map(sprite => sprite.render());
            }
        });
        loop.start();
        return loop;
    }

    Reset() {
        
    }
}
