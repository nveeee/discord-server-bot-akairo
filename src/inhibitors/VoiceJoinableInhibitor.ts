import { Inhibitor, Command } from "discord-akairo"
import { Message } from "discord.js";

export default class VoiceJoinableInhibitor extends Inhibitor {
	constructor() {
		super('voicejoinable', {
			reason: 'voicejoinable',
			type: 'post'
		});
	}

	exec(msg: Message, command: Command) {
		if (command.id !== 'songrequest') return false;

		if (msg.member?.voice.channel?.joinable) return false;

		return true;
	}
}
