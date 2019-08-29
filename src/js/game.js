import Player from './player';
import { init, GameLoop } from 'kontra';

let { canvas } = init();
let sprites = [];
let dt = 0;

export default class Game {
	constructor() {
		this.player = new Player(sprites);
		sprites.push(this.player);
		this.loop = this.SetupGameLoop();
	}

	SetupGameLoop() {
		let loop = GameLoop({
			update() {
				dt += 1/60;
				sprites.map(sprite => {
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

				sprites = sprites.filter(sprite => sprite.isAlive());
				
				if (dt > 5) {
					dt = 0;
					console.log(sprites);
				}
			},
			render() {
				sprites.map(sprite => sprite.render());
			}
		});
		loop.start();
		return loop;
	}

	Reset() {
		
	}
}
