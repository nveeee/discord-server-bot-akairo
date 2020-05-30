import { Listener, Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class CommandBlockedListener extends Listener {
	constructor() {
		super('commandBlocked', {
			emitter: 'commandHandler',
			event: 'commandBlocked'
		});
	}

	exec(msg: Message, command: Command, reason: string) {
		if (reason === 'voicechannel') return msg.reply('You must be in a voice channel to request music!');
		if (reason === 'voicejoinable') return msg.reply('I don\'t have permissions to join that channel!');

		return msg.reply('This command is not allowed here!');
	}
}