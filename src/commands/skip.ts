import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { SongQueueClient } from '../interfaces/interfaces';

export default class SkipCommand extends Command {
	constructor() {
		super('skip', { aliases: ['skip'], channel: 'guild' });
	}

	exec(msg: Message) {
		if (!msg.guild?.voice?.connection) return;
		if (msg.member?.voice.channel?.id !== msg.guild.voice.connection.channel.id) return;

		if ((this.client as SongQueueClient).songQueue[msg.guild.id].length > 0) msg.reply(`Song Skipped! Now Playing **${(this.client as SongQueueClient).songQueue[msg.guild.id][1].title}**`);
		msg.guild.voice.connection.dispatcher.emit('finish');
	}
}