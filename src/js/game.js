import Player from './player';
import { init, GameLoop } from 'kontra';
import Zombie from './zombie';

let { canvas } = init();
let sprites = [];
let dt = 0;
let score = 0;
let viewDistance = 250;
let maxZombies = 0;

const addSprite = (sprite) => sprites.push(sprite);

export default class Game {
	constructor() {
		this.player = new Player(addSprite);
		addSprite(this.player);
		this.loop = this.setupGameLoop();
	}

	setupGameLoop() {
		let loop = GameLoop({
			update() {
				dt += 1/60;

				// Wall detection
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

				sprites = sprites.filter(sprite => sprite.isAlive());
			
				// Add a zombie randomly between 1 and 7 seconds after the last
				if (dt > Math.floor((Math.random() * 7) + 1)) {
					dt = 0;

					// Only ever allow a set number of zombies to be at play, at a time
					if (sprites.filter(sprite => sprite.type === 'zombie').length < maxZombies) {
						addSprite(new Zombie(sprites.find(s => s.type === 'player')));
					}
				}

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
									score += 5;
								}
							}
						});
					} else if (thing.type === 'player') {
						sprites.filter(sprite => sprite.type === 'zombie').forEach(z => {
						// sprites.forEach(z => {
							// if (z.type === 'zombie') {
								let dx = thing.x - z.x;
								let dy = thing.y - z.y;
								if (Math.sqrt(dx * dx + dy * dy) < thing.width + z.radius) {
									thing.ttl = 0;
									z.ttl = 0;
									console.log('Score: ' + score);
									// TODO: game over
								}
							// }
						});
					}
				});
			},
			render() {
				let player = sprites.find(s => s.type === 'player');
				if (player != null) {
					player.render();
					sprites.filter(sprite => sprite.type != 'player').forEach(sprite => {
						if (Math.abs(player.x - sprite.x) < viewDistance) {
							sprite.render();
						}
					});
				}
			}
		});
		loop.start();
		return loop;
	}

	reset() {
		// TODO: Show score and listen for a click
		// TODO: On click, reset score and map
		score = 0;
	}
}
