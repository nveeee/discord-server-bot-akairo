import { Inhibitor, Command } from "discord-akairo"
import { Message } from "discord.js";

export default class VoiceChannelInhibitor extends Inhibitor {
	constructor() {
		super('voicechannel', {
			reason: 'voicechannel',
			type: 'post'
		});
	}

	exec(msg: Message, command: Command) {
		if (command.id !== 'songrequest') return false;

		if (msg.member?.voice.channel) return false;

		return true;
	}
}
