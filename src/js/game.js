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
				// if (dt > 5) {
					// dt = 0;
					addSprite(new Zombie());
				// }

				sprites = sprites.filter(sprite => sprite.isAlive());
			
				// Collision detection
				sprites.forEach(thing => {
					if (thing.type === 'bullet') {
						sprites.forEach(z => {
							if (z.type === 'zombie') {
								let dx = thing.x - z.x;
								let dy = thing.y - z.y;
								// TODO: This check needs to be adjusted, doesn't detect often enough to be accurate
								if (Math.sqrt(dx * dx + dy * dy) < thing.width + z.radius) {
									thing.ttl = 0;
									z.ttl = 0;
									// TODO: Increment score
								}
							}
						});
					} else if (thing.type === 'player') {
						sprites.forEach(z => {
							if (z.type === 'zombie') {
								let dx = thing.x - z.x;
								let dy = thing.y - z.y;
								if (Math.sqrt(dx * dx + dy * dy) < thing.width + z.radius) {
									console.log('ded');
									thing.ttl = 0;
									z.ttl = 0;
									// TODO: game over
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
