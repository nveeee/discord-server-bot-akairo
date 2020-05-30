import { Listener } from 'discord-akairo';

export default class ReadyListener extends Listener {
	constructor() {
		super('ready', {
			emitter: 'client',
			event: 'ready',
			type: 'once'
		});
	}

	exec() {
		console.log('Bot is online!');
	}
}