import Player from './player';
import { init, GameLoop } from 'kontra';
import Zombie from './zombie';

let { canvas } = init();
let sprites = [];
let dt = 0;

const addSprite = (sprite) => sprites.push(sprite);

export default class Game {
	constructor() {
		this.player = new Player(addSprite);
		addSprite(this.player);
		this.loop = this.SetupGameLoop();
	}

	SetupGameLoop() {
		let loop = GameLoop({
			update() {
				dt += 1/60;
				sprites.forEach(sprite => {
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

				// Add enemies every 5 seconds
				if (dt > 5) {
					// dt = 0;
					addSprite(new Zombie());
				}

				sprites = sprites.filter(sprite => sprite.isAlive());
			
				// Collision detection
				sprites.forEach(bullet => {
					if (bullet.type === 'bullet') {
						sprites.forEach(z => {
							if (z.type === 'zombie') {
								let dx = bullet.x - z.x;
								let dy = bullet.y - z.y;
								// TODO: This check needs to be adjusted, doesn't detect often enough to be accurate
								if (Math.sqrt(dx * dx + dy * dy) < bullet.width + z.radius) {
									bullet.ttl = 0;
									z.ttl = 0;
									console.log('gottem');
									// TODO: Increment score
								}
							}
						});
					}
				});
			},
			render() {
				sprites.forEach(sprite => sprite.render());
			}
		});
		loop.start();
		return loop;
	}

	Reset() {
		
	}
}
