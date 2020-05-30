import { Command } from "discord-akairo";
import { Message } from "discord.js";

export default class NicknameCommand extends Command {
	constructor() {
		super('nickname', { aliases: ['nickname'], channel: 'guild' });
	}

	exec(msg: Message) {
		return msg.reply(`Your nickname is ${msg.member?.nickname}`);
	}
}