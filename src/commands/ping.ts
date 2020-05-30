import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class PingCommand extends Command {
	constructor() {
		super('ping', { aliases: ['ping'] });
	}

	async exec(msg: Message) {
		const m = await msg.channel.send('Ping?');
		m.edit(`Pong! Latency is ${m.createdTimestamp - msg.createdTimestamp}ms API Latency is ${Math.round(msg.client.ws.ping)}ms`);
	}
}