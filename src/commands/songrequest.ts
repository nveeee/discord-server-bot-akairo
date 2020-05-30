import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import Youtube from 'simple-youtube-api';
import ytdl from 'ytdl-core-discord';
import { YOUTUBE_API_KEY } from '../config';
import { Args, VideoDetails, SongQueueClient } from '../interfaces/interfaces';
import { VoiceConnection } from 'discord.js';
import { TextChannel } from 'discord.js';
const youtube = new Youtube(YOUTUBE_API_KEY);

const playSong = async (connection: VoiceConnection, url: string, channel: TextChannel) => {
	const dispatcher = connection.play(await ytdl(url), { type: 'opus' });

	dispatcher.on('finish', () => {
		(connection.client as SongQueueClient).songQueue[connection.channel.guild.id].shift();

		if ((connection.client as SongQueueClient).songQueue[connection.channel.guild.id].length > 0) {
			playSong(connection, (connection.client as SongQueueClient).songQueue[connection.channel.guild.id][0].url, channel);
		} else {
			channel.send('No more songs in queue. Disconnecting.');
			connection.disconnect();
		}
	});
};

export default class SongRequestCommand extends Command {
	constructor() {
		super('songrequest', {
			aliases: ['songrequest', 'sr', 'requestsong', 'play'],
			channel: 'guild',
			args: [
				{
					id: 'query',
					type: 'string',
					match: 'content',
					default: null
				}
			]
		});
	}

	async exec(msg: Message, { query }: Args) {
		const result = await youtube.searchVideos(query, 1);

		const videoDetails: VideoDetails = {
			title: result[0].title,
			url: `https://www.youtube.com/watch?v=${result[0].id}`
		};

		if (!(this.client as SongQueueClient).songQueue[msg.guild!.id]) (this.client as SongQueueClient).songQueue[msg.guild!.id] = [];
		(this.client as SongQueueClient).songQueue[msg.guild!.id].push(videoDetails);

		if (msg.guild?.voice?.connection) return msg.reply(`**${videoDetails.title} has been added to the queue!**`);

		return msg.member?.voice.channel?.join()
			.then(connection => {
				msg.reply(`Music Bot Started! Now Playing **${videoDetails.title}**`);
				playSong(connection, videoDetails.url, msg.channel as TextChannel);
			});
	}
}